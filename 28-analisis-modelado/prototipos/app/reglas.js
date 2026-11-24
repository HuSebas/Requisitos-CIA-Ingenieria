/* Reglas de negocio del prototipo. Funciones puras: no tocan la pantalla.
   Cada función cita la regla (RN), el requisito (RF) o la transición (T) que implementa. */
(function (raiz) {
  "use strict";

  var ROLES = { residente: "Residente de obra", administradora: "Administradora de proyectos", gerenteObra: "Gerente de obra", gerenteGeneral: "Gerente general", contador: "Contador" };

  /* RN-01: gasto acumulado = solicitudes aprobadas + compras urgentes − devoluciones. */
  function gastoAcumulado(estado, rubroId) {
    var total = 0;
    estado.compras.forEach(function (c) {
      if (c.rubro !== rubroId) { return; }
      var cuenta = (c.tipo === "solicitud" && c.estado === "Aprobada") || (c.tipo === "urgente" && (c.estado === "Por legalizar" || c.estado === "Legalizada"));
      if (cuenta) { total += c.valor; }
    });
    (estado.devoluciones || []).forEach(function (d) { if (d.rubro === rubroId) { total -= d.valor; } });
    return total;
  }

  function rubro(estado, rubroId) { return estado.rubros.filter(function (r) { return r.id === rubroId; })[0]; }

  /* RN-01: saldo = presupuesto − gasto acumulado. */
  function saldo(estado, rubroId) { return rubro(estado, rubroId).presupuesto - gastoAcumulado(estado, rubroId); }

  function saldoImprevistos(estado) {
    var r = estado.rubros.filter(function (x) { return x.imprevistos; })[0];
    return r ? saldo(estado, r.id) : 0;
  }

  /* RN-02 a RN-05 y RN-19: tabla de decisión de la ruta de aprobación. */
  function rutaDeAprobacion(estado, rubroId, valor) {
    var disponible = saldo(estado, rubroId);
    if (valor <= disponible) {
      var grande = valor > estado.parametros.compraGrande * rubro(estado, rubroId).presupuesto;
      return grande ? ["gerenteObra", "administradora"] : ["administradora"];
    }
    var exceso = valor - disponible;
    return exceso <= saldoImprevistos(estado) ? ["administradora", "gerenteObra"] : ["gerenteGeneral"];
  }

  /* RF-002: datos obligatorios de una solicitud. Devuelve códigos del catálogo de mensajes. */
  function validarSolicitud(estado, d) {
    var e = [];
    if (!d.rubro || !rubro(estado, d.rubro)) { e.push("ERR-01"); }
    if (!d.insumo || !d.insumo.trim()) { e.push("ERR-02"); }
    if (!d.cantidad || !String(d.cantidad).trim()) { e.push("ERR-03"); }
    if (!(d.valor > 0)) { e.push("ERR-04"); }
    if (!d.fechaRequerida) { e.push("ERR-05"); } else if (d.hoy && d.fechaRequerida < d.hoy) { e.push("ERR-06"); }
    return e;
  }

  /* RF-013 y RN-08: una compra urgente exige rubro, valor y soporte. */
  function validarCompraUrgente(estado, d) {
    var e = [];
    if (!d.rubro || !rubro(estado, d.rubro)) { e.push("ERR-01"); }
    if (!(d.valor > 0)) { e.push("ERR-04"); }
    if (!d.soporte) { e.push("ERR-07"); }
    return e;
  }

  /* RF-023 y RN-13: avance entre 0 y 100, con fotografía por actividad. */
  function validarAvance(avances) {
    var e = [];
    avances.forEach(function (a) {
      if (a.porcentaje === "" || a.porcentaje === null || isNaN(a.porcentaje) || a.porcentaje < 0 || a.porcentaje > 100) { e.push({ codigo: "ERR-08", actividad: a.actividad }); }
      else if (!a.foto) { e.push({ codigo: "ERR-09", actividad: a.actividad }); }
    });
    return e;
  }

  function nuevoId(estado, prefijo) {
    var n = estado.compras.filter(function (c) { return c.id.indexOf(prefijo) === 0; }).length + 1;
    return prefijo + ("00" + n).slice(-3);
  }

  /* CU-01, T-01: registra la solicitud «pendiente» con su ruta. */
  function registrarSolicitud(estado, d) {
    var errores = validarSolicitud(estado, d);
    if (errores.length) { return { ok: false, errores: errores }; }
    var disponible = saldo(estado, d.rubro);
    var c = { id: nuevoId(estado, "S-"), tipo: "solicitud", rubro: d.rubro, insumo: d.insumo.trim(), cantidad: String(d.cantidad).trim(), valor: d.valor,
      fechaRequerida: d.fechaRequerida, fecha: d.hoy, solicitante: d.usuario, estado: "Pendiente",
      ruta: rutaDeAprobacion(estado, d.rubro, d.valor), decisiones: [], exceso: Math.max(0, d.valor - disponible) };
    estado.compras.push(c);
    return { ok: true, compra: c };
  }

  /* RN-19: aprobador que sigue en la ruta. */
  function siguienteAprobador(c) {
    var hechos = c.decisiones.filter(function (x) { return x.resultado === "Aprobada"; }).map(function (x) { return x.rol; });
    var faltan = c.ruta.filter(function (r) { return hechos.indexOf(r) < 0; });
    return faltan.length ? faltan[0] : null;
  }

  function mismaRuta(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }

  /* CU-02: decide una solicitud. Implementa T-02 a T-05, RN-06, RN-10 y RF-043. */
  function decidir(estado, id, usuario, resultado, motivo, hoy) {
    var c = estado.compras.filter(function (x) { return x.id === id; })[0];
    if (!c || c.estado !== "Pendiente") { return { ok: false, errores: ["ERR-10"] }; }
    if (c.solicitante === usuario.id) { return { ok: false, errores: ["ERR-11"] }; }
    if (siguienteAprobador(c) !== usuario.rol) { return { ok: false, errores: ["ERR-12"] }; }
    var vigente = saldo(estado, c.rubro);
    if (resultado === "Rechazada") {
      if (!motivo || !motivo.trim()) { return { ok: false, errores: ["ERR-13"] }; }
      c.decisiones.push({ rol: usuario.rol, resultado: "Rechazada", fecha: hoy, saldoVigente: vigente, motivo: motivo.trim() });
      c.estado = "Rechazada";
      return { ok: true, transicion: "T-05", compra: c };
    }
    var rutaVigente = rutaDeAprobacion(estado, c.rubro, c.valor);
    if (!mismaRuta(rutaVigente, c.ruta)) {
      c.ruta = rutaVigente; c.exceso = Math.max(0, c.valor - vigente);
      c.decisiones = c.decisiones.filter(function (x) { return rutaVigente.indexOf(x.rol) >= 0; });
      return { ok: true, transicion: "T-03", compra: c };
    }
    c.decisiones.push({ rol: usuario.rol, resultado: "Aprobada", fecha: hoy, saldoVigente: vigente, motivo: "" });
    if (siguienteAprobador(c)) { return { ok: true, transicion: "T-02", compra: c }; }
    c.estado = "Aprobada";
    return { ok: true, transicion: "T-04", compra: c, alerta: alertaUmbral(estado, c.rubro) };
  }

  /* CU-19, T-06: solo el solicitante anula, con motivo, mientras está pendiente. */
  function anular(estado, id, usuario, motivo, hoy) {
    var c = estado.compras.filter(function (x) { return x.id === id; })[0];
    if (!c || c.estado !== "Pendiente") { return { ok: false, errores: ["ERR-10"] }; }
    if (c.solicitante !== usuario.id) { return { ok: false, errores: ["ERR-12"] }; }
    if (!motivo || !motivo.trim()) { return { ok: false, errores: ["ERR-13"] }; }
    c.estado = "Anulada"; c.decisiones.push({ rol: usuario.rol, resultado: "Anulada", fecha: hoy, saldoVigente: saldo(estado, c.rubro), motivo: motivo.trim() });
    return { ok: true, transicion: "T-06", compra: c };
  }

  /* PD-08: legaliza el último aprobador de la ruta que tendría una solicitud de ese valor. */
  function aprobadorDeUrgente(estado, rubroId, valor) { var r = rutaDeAprobacion(estado, rubroId, valor); return r[r.length - 1]; }

  /* CU-03, T-07, RN-07 y RN-09: registra la compra urgente y la suma al gasto el mismo día. */
  function registrarUrgente(estado, d) {
    var errores = validarCompraUrgente(estado, d);
    if (errores.length) { return { ok: false, errores: errores }; }
    var aprobador = aprobadorDeUrgente(estado, d.rubro, d.valor);
    var c = { id: nuevoId(estado, "U-"), tipo: "urgente", rubro: d.rubro, insumo: (d.descripcion || "").trim() || "Compra urgente", cantidad: "", valor: d.valor,
      fecha: d.hoy, solicitante: d.usuario, estado: "Por legalizar", ruta: [aprobador], decisiones: [], soporte: d.soporte,
      sobreTope: d.valor > estado.parametros.topeCajaMenor, exceso: 0 };
    estado.compras.push(c);
    return { ok: true, compra: c, saldo: saldo(estado, d.rubro), alerta: alertaUmbral(estado, d.rubro) };
  }

  /* CU-04, T-08 y T-09: legaliza o devuelve con observación. El gasto no cambia. */
  function legalizar(estado, id, usuario, acepta, observacion, hoy) {
    var c = estado.compras.filter(function (x) { return x.id === id; })[0];
    if (!c || c.tipo !== "urgente" || c.estado !== "Por legalizar") { return { ok: false, errores: ["ERR-10"] }; }
    if (c.ruta[0] !== usuario.rol) { return { ok: false, errores: ["ERR-12"] }; }
    if (!acepta) {
      if (!observacion || !observacion.trim()) { return { ok: false, errores: ["ERR-13"] }; }
      c.decisiones.push({ rol: usuario.rol, resultado: "Devuelta con observación", fecha: hoy, saldoVigente: saldo(estado, c.rubro), motivo: observacion.trim() });
      return { ok: true, transicion: "T-08", compra: c };
    }
    c.decisiones.push({ rol: usuario.rol, resultado: "Legalizada", fecha: hoy, saldoVigente: saldo(estado, c.rubro), motivo: "" });
    c.estado = "Legalizada";
    return { ok: true, transicion: "T-09", compra: c };
  }

  /* RN-11 y RF-020: alerta cuando el gasto alcanza el umbral. */
  function alertaUmbral(estado, rubroId) {
    var r = rubro(estado, rubroId);
    return gastoAcumulado(estado, rubroId) >= estado.parametros.umbralAlerta * r.presupuesto;
  }

  /* RN-16 y PD-05: qué ve cada rol del presupuesto. */
  function vistaPresupuesto(rol) {
    if (rol === "residente") { return "saldos"; }
    if (rol === "administradora" || rol === "gerenteObra" || rol === "gerenteGeneral" || rol === "contador") { return "completo"; }
    return "ninguno";
  }

  /* CU-09, T-10 a T-13, RN-13 y RN-14. */
  function registrarAvance(estado, corte, avances, conConexion) {
    var vigente = estado.reportes.filter(function (r) { return r.corte === corte; }).slice(-1)[0];
    if (vigente && vigente.estado !== "Devuelto") { return { ok: false, errores: [{ codigo: "ERR-14" }] }; }
    var errores = validarAvance(avances);
    if (errores.length) { return { ok: false, errores: errores }; }
    var r = { corte: corte, version: vigente ? vigente.version + 1 : 1, estado: "Pendiente de sincronizar",
      avances: avances.map(function (a) { return { actividad: a.actividad, porcentaje: Number(a.porcentaje) }; }) };
    estado.reportes.push(r);
    if (conConexion) { sincronizar(estado, true); }
    return { ok: true, reporte: r };
  }

  /* T-11 y RF-025: sincroniza los pendientes una sola vez. */
  function sincronizar(estado, conConexion) {
    if (!conConexion) { return 0; }
    var n = 0;
    estado.reportes.forEach(function (r) { if (r.estado === "Pendiente de sincronizar") { r.estado = "Registrado"; n += 1; } });
    return n;
  }

  /* CU-11, T-12. */
  function devolverReporte(estado, corte, usuario, motivo) {
    var r = estado.reportes.filter(function (x) { return x.corte === corte; }).slice(-1)[0];
    if (!r || r.estado !== "Registrado") { return { ok: false, errores: ["ERR-10"] }; }
    if (usuario.rol !== "gerenteObra") { return { ok: false, errores: ["ERR-12"] }; }
    if (!motivo || !motivo.trim()) { return { ok: false, errores: ["ERR-13"] }; }
    r.estado = "Devuelto"; r.motivoDevolucion = motivo.trim();
    return { ok: true, transicion: "T-12", reporte: r };
  }

  var api = { ROLES: ROLES, gastoAcumulado: gastoAcumulado, saldo: saldo, saldoImprevistos: saldoImprevistos, rutaDeAprobacion: rutaDeAprobacion,
    validarSolicitud: validarSolicitud, validarCompraUrgente: validarCompraUrgente, validarAvance: validarAvance, registrarSolicitud: registrarSolicitud,
    siguienteAprobador: siguienteAprobador, decidir: decidir, anular: anular, registrarUrgente: registrarUrgente, legalizar: legalizar,
    alertaUmbral: alertaUmbral, vistaPresupuesto: vistaPresupuesto, registrarAvance: registrarAvance, sincronizar: sincronizar, devolverReporte: devolverReporte };
  if (typeof module !== "undefined") { module.exports = api; } else { raiz.Reglas = api; }
})(this);
