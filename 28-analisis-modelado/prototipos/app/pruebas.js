/* Autopruebas de las reglas. Se ejecutan en el navegador (pruebas.html) o con «node pruebas.js». */
(function (raiz) {
  "use strict";
  var enNode = typeof module !== "undefined";
  var Reglas = enNode ? require("./reglas.js") : raiz.Reglas;
  var DATOS = enNode ? require("./datos.js") : raiz.DATOS;
  function copia() { var e = JSON.parse(JSON.stringify(DATOS)); e.devoluciones = []; return e; }
  var U = { res: { id: "u1", rol: "residente" }, adm: { id: "u2", rol: "administradora" }, go: { id: "u3", rol: "gerenteObra" }, gg: { id: "u4", rol: "gerenteGeneral" } };
  var HOY = "2026-11-16";
  function sol(e, valor, rubro) { return Reglas.registrarSolicitud(e, { rubro: rubro || "r1", insumo: "Cemento", cantidad: "10 bultos", valor: valor, fechaRequerida: "2026-11-25", hoy: HOY, usuario: "u1" }); }
  function igual(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  var PRUEBAS = [
    ["AP-01", "RN-01", "El saldo es el presupuesto menos el gasto acumulado: $20.000.000 − $16.500.000 = $3.500.000", function () { return Reglas.saldo(copia(), "r1") === 3500000; }],
    ["AP-02", "RN-01", "Una solicitud pendiente no cuenta en el gasto acumulado", function () { var e = copia(); sol(e, 1500000); return Reglas.saldo(e, "r1") === 3500000; }],
    ["AP-03", "RN-02", "Dentro del saldo y no grande: la ruta es la administradora", function () { return igual(Reglas.rutaDeAprobacion(copia(), "r1", 1500000), ["administradora"]); }],
    ["AP-04", "RN-03", "Dentro del saldo y mayor al 10 % del rubro: gerente de obra y después administradora", function () { return igual(Reglas.rutaDeAprobacion(copia(), "r1", 2500000), ["gerenteObra", "administradora"]); }],
    ["AP-05", "RN-04", "Exceso de $500.000 que cabe en imprevistos: administradora y gerente de obra", function () { return igual(Reglas.rutaDeAprobacion(copia(), "r1", 4000000), ["administradora", "gerenteObra"]); }],
    ["AP-06", "RN-05", "Exceso de $2.500.000 que supera imprevistos: gerente general", function () { return igual(Reglas.rutaDeAprobacion(copia(), "r1", 6000000), ["gerenteGeneral"]); }],
    ["AP-07", "RF-002", "Sin rubro, insumo, cantidad, valor ni fecha se devuelven los cinco errores", function () { return igual(Reglas.validarSolicitud(copia(), {}), ["ERR-01", "ERR-02", "ERR-03", "ERR-04", "ERR-05"]); }],
    ["AP-08", "RF-002", "Una fecha requerida anterior a hoy se rechaza", function () { return igual(Reglas.validarSolicitud(copia(), { rubro: "r1", insumo: "x", cantidad: "1", valor: 1, fechaRequerida: "2026-11-01", hoy: HOY }), ["ERR-06"]); }],
    ["AP-09", "RF-001", "Una solicitud válida queda «Pendiente» con su ruta y no cambia el saldo", function () { var e = copia(), r = sol(e, 1500000); return r.ok && r.compra.estado === "Pendiente" && igual(r.compra.ruta, ["administradora"]) && Reglas.saldo(e, "r1") === 3500000; }],
    ["AP-10", "RF-006", "Una solicitud de $4.000.000 con saldo de $3.500.000 registra un exceso de $500.000", function () { var e = copia(); return sol(e, 4000000).compra.exceso === 500000; }],
    ["AP-11", "T-04 · RF-008", "Aprobar una solicitud de ruta simple la deja «Aprobada» y baja el saldo en su valor", function () { var e = copia(), c = sol(e, 1500000).compra, r = Reglas.decidir(e, c.id, U.adm, "Aprobada", "", HOY); return r.transicion === "T-04" && c.estado === "Aprobada" && Reglas.saldo(e, "r1") === 2000000; }],
    ["AP-12", "T-02 · RF-042", "Con ruta de dos, la primera aprobación la deja «Pendiente» y no cambia el saldo", function () { var e = copia(), c = sol(e, 2500000).compra, r = Reglas.decidir(e, c.id, U.go, "Aprobada", "", HOY); return r.transicion === "T-02" && c.estado === "Pendiente" && Reglas.saldo(e, "r1") === 3500000 && Reglas.siguienteAprobador(c) === "administradora"; }],
    ["AP-13", "T-04 · RN-19", "Con ruta de dos, la segunda aprobación la deja «Aprobada»", function () { var e = copia(), c = sol(e, 2500000).compra; Reglas.decidir(e, c.id, U.go, "Aprobada", "", HOY); var r = Reglas.decidir(e, c.id, U.adm, "Aprobada", "", HOY); return r.transicion === "T-04" && Reglas.saldo(e, "r1") === 1000000; }],
    ["AP-14", "RN-19", "No puede decidir quien no sigue en la ruta", function () { var e = copia(), c = sol(e, 2500000).compra; return igual(Reglas.decidir(e, c.id, U.adm, "Aprobada", "", HOY).errores, ["ERR-12"]); }],
    ["AP-15", "T-05 · RF-009", "Rechazar exige motivo; con motivo queda «Rechazada» y el saldo no cambia", function () { var e = copia(), c = sol(e, 1500000).compra; var sin = Reglas.decidir(e, c.id, U.adm, "Rechazada", " ", HOY); var con = Reglas.decidir(e, c.id, U.adm, "Rechazada", "No está en el plan", HOY); return igual(sin.errores, ["ERR-13"]) && con.transicion === "T-05" && Reglas.saldo(e, "r1") === 3500000; }],
    ["AP-16", "T-03 · RF-043", "Si el saldo se consume antes de decidir, la ruta se reasigna y la solicitud sigue «Pendiente»", function () { var e = copia(), c = sol(e, 1500000).compra; e.compras.push({ id: "U-900", tipo: "urgente", rubro: "r1", valor: 3000000, estado: "Por legalizar", ruta: [], decisiones: [] }); var r = Reglas.decidir(e, c.id, U.adm, "Aprobada", "", HOY); return r.transicion === "T-03" && c.estado === "Pendiente" && igual(c.ruta, ["administradora", "gerenteObra"]); }],
    ["AP-17", "RN-06", "Nadie decide una solicitud que él mismo registró", function () { var e = copia(), r = Reglas.registrarSolicitud(e, { rubro: "r1", insumo: "x", cantidad: "1", valor: 1000, fechaRequerida: "2026-11-25", hoy: HOY, usuario: "u2" }); return igual(Reglas.decidir(e, r.compra.id, U.adm, "Aprobada", "", HOY).errores, ["ERR-11"]); }],
    ["AP-18", "T-06 · RF-038", "Solo el solicitante anula, con motivo, y el saldo no cambia", function () { var e = copia(), c = sol(e, 1500000).compra; var otro = Reglas.anular(e, c.id, U.adm, "x", HOY); var ok = Reglas.anular(e, c.id, U.res, "Ya no se necesita", HOY); return igual(otro.errores, ["ERR-12"]) && ok.transicion === "T-06" && c.estado === "Anulada" && Reglas.saldo(e, "r1") === 3500000; }],
    ["AP-19", "Estado × evento", "Una solicitud aprobada no admite otra decisión", function () { var e = copia(), c = sol(e, 1500000).compra; Reglas.decidir(e, c.id, U.adm, "Aprobada", "", HOY); return igual(Reglas.decidir(e, c.id, U.adm, "Rechazada", "x", HOY).errores, ["ERR-10"]); }],
    ["AP-20", "T-07 · RN-07", "Una compra urgente de $800.000 queda «Por legalizar» y el saldo pasa a $2.700.000", function () { var e = copia(), r = Reglas.registrarUrgente(e, { rubro: "r1", valor: 800000, soporte: "factura.jpg", hoy: HOY, usuario: "u1" }); return r.ok && r.compra.estado === "Por legalizar" && r.saldo === 2700000; }],
    ["AP-21", "RN-07", "Una compra urgente mayor que el saldo se registra y deja el saldo negativo", function () { var e = copia(); e.compras.push({ id: "U-900", tipo: "urgente", rubro: "r1", valor: 3000000, estado: "Legalizada", ruta: [], decisiones: [] }); var r = Reglas.registrarUrgente(e, { rubro: "r1", valor: 800000, soporte: "f.jpg", hoy: HOY, usuario: "u1" }); return r.ok && r.saldo === -300000; }],
    ["AP-22", "RF-013 · RN-08", "Sin rubro o sin soporte la compra urgente no se registra ni cambia el saldo", function () { var e = copia(); var a = Reglas.registrarUrgente(e, { valor: 800000, soporte: "f.jpg" }); var b = Reglas.registrarUrgente(e, { rubro: "r1", valor: 800000 }); return igual(a.errores, ["ERR-01"]) && igual(b.errores, ["ERR-07"]) && Reglas.saldo(e, "r1") === 3500000; }],
    ["AP-23", "RN-09", "Una compra urgente de $1.200.000 queda marcada «sobre el tope»", function () { var e = copia(); return Reglas.registrarUrgente(e, { rubro: "r2", valor: 1200000, soporte: "f.jpg", hoy: HOY, usuario: "u1" }).compra.sobreTope === true; }],
    ["AP-24", "T-09 · RF-014", "Legalizar deja la compra «Legalizada» sin cambiar el saldo", function () { var e = copia(), c = Reglas.registrarUrgente(e, { rubro: "r1", valor: 800000, soporte: "f.jpg", hoy: HOY, usuario: "u1" }).compra; var r = Reglas.legalizar(e, c.id, U.adm, true, "", HOY); return r.transicion === "T-09" && c.estado === "Legalizada" && Reglas.saldo(e, "r1") === 2700000; }],
    ["AP-25", "T-08 · RF-039", "Devolver con observación la mantiene «Por legalizar»; sin observación se rechaza", function () { var e = copia(), c = Reglas.registrarUrgente(e, { rubro: "r1", valor: 800000, soporte: "f.jpg", hoy: HOY, usuario: "u1" }).compra; var sin = Reglas.legalizar(e, c.id, U.adm, false, "", HOY); var con = Reglas.legalizar(e, c.id, U.adm, false, "Factura ilegible", HOY); return igual(sin.errores, ["ERR-13"]) && con.transicion === "T-08" && c.estado === "Por legalizar"; }],
    ["AP-26", "RN-11 · RF-020", "La alerta se genera cuando el gasto llega al 80 % del presupuesto del rubro", function () { var e = copia(); return Reglas.alertaUmbral(e, "r1") === true && Reglas.alertaUmbral(e, "r2") === false; }],
    ["AP-27", "RN-12 · RF-033", "Una devolución de $300.000 sube el saldo a $3.800.000", function () { var e = copia(); e.devoluciones.push({ rubro: "r1", valor: 300000 }); return Reglas.saldo(e, "r1") === 3800000; }],
    ["AP-28", "RN-16 · PD-05", "El residente ve solo saldos; administradora, gerentes y contador ven el presupuesto completo", function () { return Reglas.vistaPresupuesto("residente") === "saldos" && ["administradora", "gerenteObra", "gerenteGeneral", "contador"].every(function (r) { return Reglas.vistaPresupuesto(r) === "completo"; }); }],
    ["AP-29", "RN-13 · RF-023", "Un avance de 120 % o sin fotografía se rechaza", function () { var e = Reglas.validarAvance([{ actividad: "a1", porcentaje: 120, foto: "f.jpg" }, { actividad: "a2", porcentaje: 30 }]); return e.length === 2 && e[0].codigo === "ERR-08" && e[1].codigo === "ERR-09"; }],
    ["AP-30", "T-10 · RF-024", "Sin conexión el reporte queda «Pendiente de sincronizar»", function () { var e = copia(), r = Reglas.registrarAvance(e, "2026-11-15", [{ actividad: "a1", porcentaje: 70, foto: "f.jpg" }], false); return r.ok && r.reporte.estado === "Pendiente de sincronizar"; }],
    ["AP-31", "T-11 · RF-025", "Al recuperar la conexión se sincroniza una sola vez", function () { var e = copia(); Reglas.registrarAvance(e, "2026-11-15", [{ actividad: "a1", porcentaje: 70, foto: "f.jpg" }], false); var a = Reglas.sincronizar(e, true), b = Reglas.sincronizar(e, true); return a === 1 && b === 0 && e.reportes.filter(function (x) { return x.corte === "2026-11-15"; }).length === 1; }],
    ["AP-32", "RN-14", "Un corte con reporte vigente no admite otro", function () { var e = copia(); return Reglas.registrarAvance(e, "2026-11-01", [{ actividad: "a1", porcentaje: 70, foto: "f.jpg" }], true).errores[0].codigo === "ERR-14"; }],
    ["AP-33", "T-12 · T-13", "Un reporte devuelto con motivo admite una versión nueva y conserva la anterior", function () { var e = copia(); var d = Reglas.devolverReporte(e, "2026-11-01", U.go, "El avance de excavación no coincide"); var r = Reglas.registrarAvance(e, "2026-11-01", [{ actividad: "a1", porcentaje: 55, foto: "f.jpg" }], true); return d.transicion === "T-12" && r.ok && r.reporte.version === 2 && e.reportes.filter(function (x) { return x.corte === "2026-11-01"; }).length === 2; }]
  ];

  function ejecutar() {
    return PRUEBAS.map(function (p) { var ok = false, error = ""; try { ok = p[3]() === true; } catch (x) { error = String(x); } return { id: p[0], regla: p[1], nombre: p[2], ok: ok, error: error }; });
  }
  if (enNode) {
    module.exports = { ejecutar: ejecutar };
    if (require.main === module) {
      var res = ejecutar(), mal = res.filter(function (r) { return !r.ok; });
      res.forEach(function (r) { console.log((r.ok ? "PASA " : "FALLA ") + r.id + " · " + r.regla + " · " + r.nombre + (r.error ? " · " + r.error : "")); });
      console.log(res.length - mal.length + " de " + res.length + " pruebas pasan");
      process.exit(mal.length ? 1 : 0);
    }
  } else { raiz.Pruebas = { ejecutar: ejecutar }; }
})(this);
