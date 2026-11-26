#!/usr/bin/env node
/* revisar-srs.js · Revisor mecánico (del curso, Unidad 7 · Sesión 1; datos adaptados al proyecto) de un SRS escrito en Markdown
   -------------------------------------------------------------------------------------------------
   Qué hace: aplica a su documento las comprobaciones que una persona hace mal o lento y un script hace
   igual cada vez. NO juzga si un requisito es correcto: eso lo hacen las personas con el checklist.
   Comprobaciones:
     1. Vaguedades: palabras que impiden verificar o admiten dos lecturas («rápido», «y/o», «etc.»…).
     2. Identificadores citados que no existen (RF-031, RN-40, P-20, [R15]…) y pendientes PD sin definir.
     3. Términos prohibidos por el glosario («código de verificación» → «código de consulta»…).
     4. Referencias rotas a apéndices y apartados, y referencias que cambiaron de lugar.
     5. Valores que deben definirse en un solo lugar y aparecen repetidos.
     6. Cobertura: todo RF-001..RF-045 debe figurar en la tabla de funciones (apartado 2.2).
     7. Singularidad: más de un «deberá» en una línea de requisito.
     8. Pendientes con fecha ya vencida y sin reprogramación.
   Uso:   node revisar-srs.js archivo.md [--hoy=AAAA-MM-DD] [--json]
   Salida: lista de hallazgos con número de línea. Código de salida 1 si hay algún ERROR, 0 si no.
   Sin dependencias: solo Node.js. Las listas de abajo son datos: edítelas para su proyecto. */
"use strict";
const fs = require("fs");

// ------------------------------------------------------------------ datos del proyecto (edítelos)
const CATALOGO = {
  RF: [1, 45], RNF: [1, 13], CU: [1, 20], HU: [1, 3], NI: [1, 13], PER: [1, 3], RN: [1, 22], PA: [1, 10],
  PU: [1, 1], TBD: [1, 1], DES: [1, 3], DCU: [1, 2], DAC: [1, 5], DSE: [1, 4], DCL: [1, 4],
};
const RNF_HIJOS = {};
const PANTALLAS = [1, 19], PANTALLAS_RESERVADAS = [0, 0], MENSAJES = [1, 99], MENSAJES_RESERVADOS = [0, 0];
const METAS = new Set(["G0", "G1", "G1.1", "G1.2", "G1.3", "G1.4", "G1.5", "G2", "G2.1", "G2.2", "G2.3", "G2.4", "G2.5", "G2.6", "G2.7", "G2.8",
  "G3", "G3.1", "G3.2", "G3.3", "G3.4", "G4", "G4.1", "G4.2", "G4.3", "G5", "G5.1", "G5.2", "G5.3", "G5.4", "G5.5"]);
const LB = new Set(["0.5", "0.8", "0.9", "1.0"]);
const APENDICES = new Set(["A", "B", "C", "D", "E", "F", "G"]);
const APARTADOS = new Set(["1.1", "1.2", "1.3", "1.4", "1.5", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6",
  "3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.2.1", "3.2.2", "3.2.3", "3.2.4", "3.2.5", "3.3.1", "3.3.2", "3.3.3", "3.4.1", "3.4.2", "3.4.3", "3.6.1", "3.6.2"]);

const VAGAS = [
  /\br[áa]pid[oa]s?\b/i, /\bf[áa]cil(es|mente)?\b/i, /\badecuad[oa]s?\b/i, /\boportun[oa]s?(mente)?\b/i, /\bamigable\b/i,
  /\beficiente(s)?\b/i, /\bintegral(es|mente)?\b/i, /\brobust[oa]s?\b/i, /\bflexible(s)?\b/i, /\bintuitiv[oa]s?\b/i,
  /\bsuficiente(s)?\b/i, /\betc\b\.?/i, /\by\/o\b/i, /seg[úu]n corresponda/i, /cuando sea posible/i, /\bentre otros\b/i,
  /\botras funciones\b/i, /\bpr[óo]xim[oa]s? a\b/i, /lo antes posible/i, /a la brevedad/i, /de ser necesario/i, /\bconvenientes?\b/i,
];
const TERMINOS_PROHIBIDOS = [
  { re: /director de obra/i, usar: "«gerente de obra» (GLO-24)", salvo: /No usar|\| GLO-/i },
  { re: /requisici[óo]n/i, usar: "«solicitud de compra»", salvo: /\| GLO-/i },
  { re: /\bautorizador/i, usar: "«aprobador»", salvo: /\| GLO-/i },
  { re: /periodo de reporte/i, usar: "«corte»", salvo: /\| GLO-/i },
  { re: /\bSUP-\d\d\b/, usar: "PD-nn: los supuestos pasaron a pendientes (G.3)" },
];
const REFERENCIAS_MOVIDAS = [];
const VALORES_UNICOS = [
  { texto: /\b5 d[íi]as h[áa]biles\b/i, definidoEn: "4", nombre: "plazo de legalización (E.1)" },
  { texto: /\$1\.000\.000\b/, definidoEn: "4", nombre: "tope de caja menor (E.1)" },
];

// ------------------------------------------------------------------ utilidades
const args = process.argv.slice(2);
const archivo = args.find((a) => !a.startsWith("--"));
if (!archivo) { console.error("Uso: node revisar-srs.js archivo.md [--hoy=AAAA-MM-DD] [--json]"); process.exit(2); }
const hoyArg = (args.find((a) => a.startsWith("--hoy=")) || "").slice(6);
const HOY = hoyArg || new Date().toISOString().slice(0, 10);
const AS_JSON = args.includes("--json");
const lineas = fs.readFileSync(archivo, "utf8").split(/\r?\n/);
const hallazgos = [];
const hallar = (nivel, regla, n, msg) => hallazgos.push({ nivel, regla, linea: n, msg });

// sección vigente por línea (según los encabezados "## 1.3 …" o "### 1.3 …")
const seccionDe = []; let sec = "";
lineas.forEach((l, i) => { const m = l.match(/^#{2,4}\s+(\d(?:\.\d)*)\b/); if (m) sec = m[1]; seccionDe[i] = sec; });
const esTexto = (l) => !/^\s*(#|>?\s*$)/.test(l);

// definiciones del propio documento
const pdDefinidos = new Set(), refsDefinidas = new Set();
lineas.forEach((l) => {
  let m;
  if ((m = l.match(/^\|\s*(PD-\d{2})\s*\|/))) pdDefinidos.add(m[1]);
  if ((m = l.match(/^\|\s*\[(R\d+)\]\s*\|/))) refsDefinidas.add(m[1]);
});

// ------------------------------------------------------------------ 1 y 3 y 4: línea por línea
lineas.forEach((l, i) => {
  const n = i + 1;
  if (!esTexto(l)) return;
  const sinCodigo = l.replace(/`[^`]*`/g, "");
  for (const re of VAGAS) { const m = sinCodigo.match(re); if (m) hallar("AVISO", "vaguedad", n, `«${m[0]}» no se puede verificar o admite dos lecturas`); }
  for (const t of TERMINOS_PROHIBIDOS) { if (t.re.test(sinCodigo) && !(t.salvo && t.salvo.test(sinCodigo))) hallar("ERROR", "término", n, `término fuera del glosario: usar ${t.usar}`); }
  for (const r of REFERENCIAS_MOVIDAS) { if (r.re.test(sinCodigo)) hallar("ERROR", "referencia", n, r.aviso); }
  // «N días» sin decir si son hábiles o calendario
  const dm = sinCodigo.match(/\b\d+\s+d[íi]as?\b(?!\s+(h[áa]biles|h[áa]bil|calendario|de la semana))/gi);
  if (dm) dm.forEach((x) => { if (!/^(1\s+d[íi]a\s+h)/i.test(x)) hallar("AVISO", "plazo", n, `«${x}»: ¿días hábiles o calendario?`); });
  // singularidad
  if (/^\s*(\|\s*)?(RF|RNF)-\d{3}(\.\d)?\s*[:·|]/.test(sinCodigo)) {
    const c = (sinCodigo.match(/deber[áa]n?\b/gi) || []).length;
    if (c > 1) hallar("AVISO", "singular", n, `${c} veces «deberá» en una línea de requisito: ¿son dos requisitos?`);
    if (/\bdebe\b/i.test(sinCodigo)) hallar("AVISO", "convención", n, "«debe» no está en las convenciones del documento (1.3): usar «deberá»");
  }
  // pendiente con fecha vencida
  if (/pendiente/i.test(sinCodigo) && !/venci[óo]|reprogram|nueva fecha/i.test(sinCodigo)) {
    const f = sinCodigo.match(/\b(\d{2})\/(\d{2})\/(\d{4})\b/);
    if (f && `${f[3]}-${f[2]}-${f[1]}` < HOY) hallar("ERROR", "fecha", n, `pendiente con fecha ${f[0]} anterior a ${HOY}: reprogramar o cerrar`);
  }
  // valores que se definen en un solo lugar
  for (const v of VALORES_UNICOS) {
    if (v.texto.test(sinCodigo) && seccionDe[i] && seccionDe[i] !== v.definidoEn && !/^[1]\.3/.test(seccionDe[i]))
      hallar("AVISO", "valor", n, `${v.nombre} escrito en ${seccionDe[i]}; debe definirse solo en ${v.definidoEn} y citarse por su nombre`);
  }
});

// ------------------------------------------------------------------ 2: identificadores
const fuera = (num, [a, b]) => num < a || num > b;
lineas.forEach((l, i) => {
  const n = i + 1;
  if (!esTexto(l)) return;
  const t = l.replace(/`[^`]*`/g, "");
  let m;
  const re = /\b(RNF|RF|CU|HU|NI|PER|RN|PA|PU|TBD|DES|DCU|DAC|DSE|DCL)-(\d{2,3})(?:\.(\d))?\b/g;
  while ((m = re.exec(t))) {
    const [, tipo, num, hijo] = m; const k = parseInt(num, 10);
    if (fuera(k, CATALOGO[tipo])) {
      const extra = tipo === "RN" && k >= 15 ? " (las reglas RN-15 en adelante las asigna la Sesión 4)" : "";
      hallar("ERROR", "id", n, `${m[0]} no existe en el catálogo del proyecto${extra}`);
    } else if (hijo) {
      if (!(tipo === "RNF" && RNF_HIJOS[k] && parseInt(hijo, 10) <= RNF_HIJOS[k])) hallar("ERROR", "id", n, `${m[0]}: no hay requisito hijo con ese número`);
    }
  }
  const rp = /\bP-(\d{2})\b/g;
  while ((m = rp.exec(t))) { const k = parseInt(m[1], 10);
    if (!fuera(k, PANTALLAS)) continue;
    if (!fuera(k, PANTALLAS_RESERVADAS)) hallar("AVISO", "id", n, `${m[0]} está reservada, todavía sin pantalla`); else hallar("ERROR", "id", n, `${m[0]} no existe en el inventario de pantallas`); }
  const rm = /\bM-(\d{2})\b/g;
  while ((m = rm.exec(t))) { const k = parseInt(m[1], 10);
    if (!fuera(k, MENSAJES)) continue;
    if (!fuera(k, MENSAJES_RESERVADOS)) hallar("AVISO", "id", n, `${m[0]} está reservado, todavía sin diseño`); else hallar("ERROR", "id", n, `${m[0]} no existe en el catálogo de mensajes`); }
  const rg = /\bG\d(?:\.\d)?\b/g;
  while ((m = rg.exec(t))) { if (!METAS.has(m[0])) hallar("ERROR", "id", n, `la meta ${m[0]} no existe`); }
  const rl = /\bLB-(\d\.\d)\b/g;
  while ((m = rl.exec(t))) { if (!LB.has(m[1])) hallar("ERROR", "id", n, `${m[0]} no es una línea base del documento`); }
  const rpd = /\bPD-(\d{2})\b/g;
  while ((m = rpd.exec(t))) { if (pdDefinidos.size && !pdDefinidos.has(m[0])) hallar("ERROR", "id", n, `${m[0]} se cita pero no está en la tabla de pendientes`); }
  const rr = /\[(R\d+)\]/g;
  while ((m = rr.exec(t))) { if (refsDefinidas.size && !refsDefinidas.has(m[1]) && !/^\|\s*\[R\d+\]/.test(l)) hallar("ERROR", "id", n, `la referencia [${m[1]}] no está definida en 1.4`); }
  const ra = /\b[Aa]p[ée]ndice\s+([A-Z])\b/g;
  while ((m = ra.exec(t))) { if (!APENDICES.has(m[1])) hallar("ERROR", "referencia", n, `no existe el apéndice ${m[1]} (hay A a G)`); }
  const rs = /\b(?:secci[óo]n|apartado)\s+(\d(?:\.\d){0,2})\b/g;
  while ((m = rs.exec(t))) { if (!APARTADOS.has(m[1]) && !/^[1-4]$/.test(m[1])) hallar("ERROR", "referencia", n, `no existe el apartado ${m[1]}`); }
});

// ------------------------------------------------------------------ 6: cobertura de RF en 2.2
(function cobertura() {
  const idx = lineas.map((l, i) => (seccionDe[i] === "2.2" ? i : -1)).filter((i) => i >= 0);
  if (!idx.length) return;
  const texto = idx.map((i) => lineas[i]).join("\n");
  const presentes = new Set((texto.match(/RF-\d{3}/g) || []));
  const faltan = [];
  for (let k = 1; k <= CATALOGO.RF[1]; k++) { const id = "RF-" + String(k).padStart(3, "0"); if (!presentes.has(id)) faltan.push(id); }
  if (faltan.length) hallar("ERROR", "cobertura", idx[0] + 1, `en 2.2 no figuran en ninguna función: ${faltan.join(", ")}`);
})();

// ------------------------------------------------------------------ salida
const orden = { ERROR: 0, AVISO: 1 };
hallazgos.sort((a, b) => orden[a.nivel] - orden[b.nivel] || a.linea - b.linea);
if (AS_JSON) { console.log(JSON.stringify(hallazgos, null, 2)); }
else {
  console.log(`revisar-srs.js · ${archivo} · fecha de referencia ${HOY}`);
  if (!hallazgos.length) console.log("Sin hallazgos mecánicos. (Eso no reemplaza la revisión con el checklist de propiedades.)");
  hallazgos.forEach((h) => console.log(`${h.nivel.padEnd(6)} línea ${String(h.linea).padStart(3)} [${h.regla}] ${h.msg}`));
  const e = hallazgos.filter((h) => h.nivel === "ERROR").length, a = hallazgos.length - e;
  console.log(`\nResumen: ${e} errores y ${a} avisos en ${lineas.length} líneas.`);
}
process.exit(hallazgos.some((h) => h.nivel === "ERROR") ? 1 : 0);
