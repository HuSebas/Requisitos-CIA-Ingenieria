#!/usr/bin/env node
// Verificador mínimo de trazabilidad (Unidad 8 · Sesión 4). Sin dependencias.
// Uso: node verificar-trazabilidad.js matriz.csv [--necesidades=NI-01,NI-02,...]
// Lee una matriz en CSV (separador coma; varios valores en una celda, separados por «;»)
// y revisa: columnas, formato de los IDs, duplicados, atributos obligatorios,
// cobertura hacia atrás (¿de dónde viene?) y hacia adelante (¿cómo se comprueba?).
const fs = require("fs");
const archivo = process.argv[2];
if (!archivo) { console.error("Uso: node verificar-trazabilidad.js matriz.csv [--necesidades=NI-01,NI-02]"); process.exit(2); }
const arg = process.argv.find((a) => a.startsWith("--necesidades="));
const necesidadesConocidas = arg ? arg.split("=")[1].split(",").map((s) => s.trim()).filter(Boolean) : [];

const COLS = ["id", "tipo", "prioridad", "estado", "fuente", "necesidad", "meta", "historia", "caso_uso", "pantalla", "regla", "ac", "verificacion"];
const FORMATO = {
  id: /^(RF|RNF)-\d{3}(\.\d+)?$/,
  fuente: /^(E|O|D)-\d{2}$/,
  necesidad: /^NI-\d{2}$/,
  meta: /^G\d(\.\d+)?$/,
  historia: /^HU-\d{2}$/,
  caso_uso: /^CU-\d{2}$/,
  pantalla: /^P-\d{2}$/,
  regla: /^RN-\d{2}$/,
  ac: /^AC-\d{2}$/,
};
const PRIORIDADES = ["Must", "Should", "Could", "Won't"];
const ESTADOS = ["propuesto", "aprobado", "implementado", "postergado", "rechazado"];
const VERIF = ["inspeccion", "analisis", "demostracion", "prueba"];

const lineas = fs.readFileSync(archivo, "utf8").split(/\r?\n/).filter((l) => l.trim() !== "");
const cab = lineas[0].split(",").map((s) => s.trim());
const errores = [], avisos = [];
COLS.forEach((c) => { if (!cab.includes(c)) errores.push(`Falta la columna «${c}».`); });
if (errores.length) { console.log(errores.join("\n")); process.exit(1); }
const filas = lineas.slice(1).map((l, i) => {
  const v = l.split(",").map((s) => s.trim());
  const o = { _n: i + 2 };
  cab.forEach((c, k) => (o[c] = v[k] || ""));
  return o;
});
const lista = (s) => (s ? s.split(";").map((x) => x.trim()).filter(Boolean) : []);
const vistos = new Set();
const necesidadesUsadas = new Set();
let completos = 0;

filas.forEach((f) => {
  const loc = `${f.id || "(sin id)"} (fila ${f._n})`;
  if (!FORMATO.id.test(f.id)) errores.push(`${loc}: el ID no tiene formato RF-nnn o RNF-nnn.`);
  if (vistos.has(f.id)) errores.push(`${loc}: ID duplicado.`);
  vistos.add(f.id);
  Object.keys(FORMATO).forEach((c) => {
    if (c === "id") return;
    lista(f[c]).forEach((x) => { if (!FORMATO[c].test(x)) errores.push(`${loc}: «${x}» no es un valor válido de la columna ${c}.`); });
  });
  if (!PRIORIDADES.includes(f.prioridad)) errores.push(`${loc}: prioridad «${f.prioridad}» no válida (Must, Should, Could, Won't).`);
  if (!ESTADOS.includes(f.estado)) errores.push(`${loc}: estado «${f.estado}» no válido.`);
  if (f.verificacion === "") errores.push(`${loc}: sin método de verificación.`);
  else if (!VERIF.includes(f.verificacion)) errores.push(`${loc}: método «${f.verificacion}» no válido (${VERIF.join(", ")}).`);
  // hacia atrás
  if (!f.fuente) errores.push(`${loc}: sin fuente (¿de dónde sale? Un requisito sin fuente es un posible «extra» que nadie pidió).`);
  if (!f.necesidad) errores.push(`${loc}: sin necesidad NI asociada.`);
  lista(f.necesidad).forEach((n) => necesidadesUsadas.add(n));
  if (necesidadesConocidas.length) lista(f.necesidad).forEach((n) => { if (!necesidadesConocidas.includes(n)) errores.push(`${loc}: la necesidad ${n} no está en la lista de necesidades conocidas.`); });
  // hacia adelante
  if (lista(f.ac).length === 0) {
    if (f.prioridad === "Must") errores.push(`${loc}: es Must y no tiene escenario de aceptación (AC).`);
    else if (f.prioridad === "Should") avisos.push(`${loc}: es Should y aún no tiene AC.`);
  }
  if (f.tipo === "RF" && f.id.startsWith("RF") && lista(f.caso_uso).length === 0 && lista(f.historia).length === 0) avisos.push(`${loc}: ningún caso de uso ni historia lo respalda.`);
  const ok = f.fuente && f.necesidad && f.verificacion && lista(f.ac).length > 0;
  if (ok) completos++;
});
if (necesidadesConocidas.length) necesidadesConocidas.forEach((n) => { if (!necesidadesUsadas.has(n)) errores.push(`La necesidad ${n} no tiene ningún requisito (hueco hacia adelante).`); });

console.log(`Matriz: ${archivo}`);
console.log(`Requisitos: ${filas.length} · con la cadena mínima completa (fuente, necesidad, AC, verificación): ${completos} (${filas.length ? Math.round((100 * completos) / filas.length) : 0} %)`);
const must = filas.filter((f) => f.prioridad === "Must");
const mustOk = must.filter((f) => f.fuente && f.necesidad && f.verificacion && lista(f.ac).length > 0);
console.log(`Must con cadena completa: ${mustOk.length} de ${must.length}`);
console.log(`\nERRORES (${errores.length})`); errores.forEach((e) => console.log("  - " + e));
console.log(`\nAVISOS (${avisos.length})`); avisos.forEach((e) => console.log("  - " + e));
process.exit(errores.length ? 1 : 0);
