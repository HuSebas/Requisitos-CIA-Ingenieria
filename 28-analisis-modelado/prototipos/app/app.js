/* Prototipo funcional. La pantalla no decide nada: todas las reglas están en reglas.js. */
(function () {
  "use strict";
  var E = JSON.parse(JSON.stringify(DATOS)); E.devoluciones = []; E.alertas = [];
  var usuario = null, conConexion = true, pendienteAviso = [];
  var HOY = new Date().toISOString().slice(0, 10);
  var $ = function (id) { return document.getElementById(id); };
  var main = $("contenido");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fecha(iso) { var p = String(iso).split("-"); return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso; }
  /* Separa los miles mientras se escribe, para que un valor mal digitado se note. */
  function dinero(campo) { campo.addEventListener("input", function () { var d = campo.value.replace(/\D/g, ""); campo.value = d ? Number(d).toLocaleString("es-CO") : ""; }); }
  function pesos(n) { return (n < 0 ? "−" : "") + "$" + Math.abs(Math.round(n)).toLocaleString("es-CO"); }
  function msg(codigo, v) { return MENSAJES[codigo].replace(/\{(\w+)\}/g, function (_, k) { return v[k]; }); }
  function rol(r) { return Reglas.ROLES[r]; }
  function ruta(lista) { return lista.map(rol).join(" y después "); }
  function rubro(id) { return E.rubros.filter(function (r) { return r.id === id; })[0]; }
  function compra(id) { return E.compras.filter(function (c) { return c.id === id; })[0]; }
  function chip(estado) { return "<span class='estado " + estado.toLowerCase().replace(/ /g, "-") + "'>" + esc(estado) + "</span>"; }
  function fila(dato, valor, clase) { return "<div class='fila'><span class='dato'>" + dato + "</span><span class='valor " + (clase || "") + "'>" + valor + "</span></div>"; }

  /* Avisos: se muestran en la pantalla siguiente y los anuncia el lector de pantalla. */
  function avisar(tipo, texto) { pendienteAviso.push("<p class='" + tipo + "'>" + esc(texto) + "</p>"); }
  function pintarAvisos() { $("aviso").innerHTML = pendienteAviso.join(""); pendienteAviso = []; }
  function alertar(rubroId) {
    var r = rubro(rubroId), p = Math.round(100 * Reglas.gastoAcumulado(E, rubroId) / r.presupuesto);
    if (!E.alertas.some(function (a) { return a.rubro === rubroId; })) { E.alertas.push({ rubro: rubroId }); }
    return msg("A-01", { rubro: r.nombre, p: p });
  }

  function ir(destino) { if (location.hash === "#" + destino) { pintar(); } else { location.hash = destino; } }
  /* Estado «cargando»: simula el tiempo de respuesta antes de mostrar el resultado. */
  function cargando(despues) { main.innerHTML = "<div class='cargando' role='status'>Guardando…</div>"; setTimeout(despues, 400); }

  function errores(form, lista) {
    Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (c) { c.removeAttribute("aria-invalid"); c.removeAttribute("aria-describedby"); });
    Array.prototype.forEach.call(form.querySelectorAll(".error"), function (e) { e.remove(); });
    var primero = null;
    lista.forEach(function (x) {
      var campo = form.querySelector("[data-error~='" + x.codigo + "']" + (x.actividad ? "[data-actividad='" + x.actividad + "']" : ""));
      if (!campo) { return; }
      var p = document.createElement("p"); p.className = "error"; p.id = "err-" + campo.id; p.textContent = MENSAJES[x.codigo];
      campo.setAttribute("aria-invalid", "true"); campo.setAttribute("aria-describedby", p.id); campo.parentNode.appendChild(p);
      primero = primero || campo;
    });
    if (primero) { primero.focus(); }
  }
  function cod(lista) { return lista.map(function (c) { return typeof c === "string" ? { codigo: c } : c; }); }
  function opcionesRubro() { return "<option value=''>Elija un rubro</option>" + E.rubros.filter(function (r) { return !r.imprevistos; }).map(function (r) { return "<option value='" + r.id + "'>" + esc(r.nombre) + "</option>"; }).join(""); }

  /* ---------- P-01 · Ingreso */
  function vIngreso() {
    cabecera("Gestión de obras", "", false);
    main.innerHTML = "<h1>¿Con qué rol quiere entrar?</h1><p class='nota'>El prototipo no pide contraseña: el ingreso real se especifica en RF-036.</p><div class='menu'>" +
      E.usuarios.map(function (u) { return "<button class='boton menu-item' type='button' data-u='" + u.id + "'>" + esc(u.nombre) + "<span aria-hidden='true'>›</span></button>"; }).join("") + "</div>";
    Array.prototype.forEach.call(main.querySelectorAll("[data-u]"), function (b) {
      b.onclick = function () { usuario = E.usuarios.filter(function (u) { return u.id === b.dataset.u; })[0]; ir("inicio"); };
    });
  }

  /* ---------- P-02 · Inicio por rol */
  function porDecidir() {
    return E.compras.filter(function (c) {
      return (c.tipo === "solicitud" && c.estado === "Pendiente" && Reglas.siguienteAprobador(c) === usuario.rol && c.solicitante !== usuario.id) ||
             (c.tipo === "urgente" && c.estado === "Por legalizar" && c.ruta[0] === usuario.rol);
    });
  }
  function vInicio() {
    cabecera(E.obra.nombre, usuario.nombre, false);
    var items = [];
    if (usuario.rol === "residente") {
      items = [["nueva-solicitud", "Solicitar una compra"], ["compra-urgente", "Registrar una compra urgente"], ["avance", "Registrar el avance del corte"], ["mis-registros", "Mis registros"], ["presupuesto", "Saldos de los rubros"]];
    } else if (usuario.rol === "contador") {
      items = [["presupuesto", "Presupuesto y ejecución"]];
    } else {
      items = [["por-decidir", "Por decidir (" + porDecidir().length + ")"], ["presupuesto", "Presupuesto y ejecución"], ["avance-obra", "Avance de la obra"]];
    }
    var alertas = (usuario.rol === "administradora" || usuario.rol === "gerenteObra") ? E.alertas.map(function (a) { return "<p class='ale'>" + esc(alertar(a.rubro)) + "</p>"; }).join("") : "";
    main.innerHTML = "<h1>Inicio</h1>" + (alertas ? "<div class='aviso' style='padding:0;margin:0 0 12px'>" + alertas + "</div>" : "") + "<nav class='menu' aria-label='Acciones'>" +
      items.map(function (i) { return "<button class='boton menu-item' type='button' data-ir='" + i[0] + "'>" + esc(i[1]) + "<span aria-hidden='true'>›</span></button>"; }).join("") + "</nav>";
    enlaces();
  }

  /* ---------- P-03 · Solicitar una compra (CU-01) */
  function vNuevaSolicitud() {
    cabecera("Solicitar una compra", usuario.nombre, true);
    main.innerHTML = "<h1>Solicitar una compra</h1><form id='f' novalidate>" +
      "<div class='campo'><label for='rubro'>Rubro</label><select id='rubro' data-error='ERR-01'>" + opcionesRubro() + "</select></div>" +
      "<div class='campo'><label for='insumo'>Insumo</label><input id='insumo' data-error='ERR-02' autocomplete='off'></div>" +
      "<div class='campo'><label for='cantidad'>Cantidad</label><p class='ayuda' id='a-cant'>Con su unidad. Por ejemplo: 50 bultos.</p><input id='cantidad' data-error='ERR-03' aria-describedby='a-cant' autocomplete='off'></div>" +
      "<div class='campo'><label for='valor'>Valor estimado, en pesos</label><input id='valor' data-error='ERR-04' inputmode='numeric' autocomplete='off'></div>" +
      "<div class='campo'><label for='fecha'>Fecha en que lo necesita</label><input id='fecha' type='date' data-error='ERR-05 ERR-06' min='" + HOY + "'></div>" +
      "<div id='previa' class='tarjeta' hidden></div>" +
      "<div class='acciones'><button class='boton' type='submit'>Enviar solicitud</button></div></form>";
    var f = $("f");
    function previa() {
      var r = $("rubro").value, v = Number($("valor").value.replace(/\D/g, "")), caja = $("previa");
      if (!r || !(v > 0)) { caja.hidden = true; return; }
      var s = Reglas.saldo(E, r);
      caja.hidden = false;
      caja.innerHTML = fila("Saldo del rubro", pesos(s)) + fila("La decide", esc(ruta(Reglas.rutaDeAprobacion(E, r, v)))) + (v > s ? "<p class='advertencia'>" + esc(msg("A-03", { exceso: pesos(v - s) })) + " Puede enviarla: quien decide verá el exceso.</p>" : "");
    }
    dinero($("valor")); $("rubro").onchange = previa; $("valor").addEventListener("input", previa);
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var d = { rubro: $("rubro").value, insumo: $("insumo").value, cantidad: $("cantidad").value, valor: Number($("valor").value.replace(/\D/g, "")), fechaRequerida: $("fecha").value, hoy: HOY, usuario: usuario.id };
      var e = Reglas.validarSolicitud(E, d);
      if (e.length) { errores(f, cod(e)); return; }
      cargando(function () {
        var r = Reglas.registrarSolicitud(E, d);
        avisar("ok", msg("OK-01", { id: r.compra.id, ruta: ruta(r.compra.ruta) }));
        ir("mis-registros");
      });
    };
  }

  /* ---------- P-07 · Registrar una compra urgente (CU-03) */
  function vUrgente() {
    cabecera("Compra urgente", usuario.nombre, true);
    main.innerHTML = "<h1>Registrar una compra urgente</h1><p class='nota'>Para compras que ya hizo con caja menor. El valor se descuenta hoy del saldo del rubro.</p><form id='f' novalidate>" +
      "<div class='campo'><label for='rubro'>Rubro</label><select id='rubro' data-error='ERR-01'>" + opcionesRubro() + "</select></div>" +
      "<div class='campo'><label for='valor'>Valor pagado, en pesos</label><input id='valor' data-error='ERR-04' inputmode='numeric' autocomplete='off'><p id='tope' class='advertencia' hidden></p></div>" +
      "<div class='campo'><label for='desc'>Qué compró (opcional)</label><input id='desc' autocomplete='off'></div>" +
      "<div class='campo'><label for='foto'>Foto de la factura</label><input id='foto' type='file' accept='image/*,application/pdf' capture='environment' data-error='ERR-07'></div>" +
      "<div class='acciones'><button class='boton' type='submit'>Registrar compra</button></div></form>";
    var f = $("f");
    dinero($("valor")); $("valor").addEventListener("input", function () { var v = Number($("valor").value.replace(/\D/g, "")), t = $("tope"); t.hidden = !(v > E.parametros.topeCajaMenor); t.textContent = MENSAJES["A-02"] + " Se registra igual y el aprobador lo verá."; });
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var a = $("foto").files[0];
      var d = { rubro: $("rubro").value, valor: Number($("valor").value.replace(/\D/g, "")), descripcion: $("desc").value, soporte: a ? a.name : "", hoy: HOY, usuario: usuario.id };
      var e = Reglas.validarCompraUrgente(E, d);
      if (e.length) { errores(f, cod(e)); return; }
      cargando(function () {
        var r = Reglas.registrarUrgente(E, d);
        avisar("ok", msg("OK-07", { id: r.compra.id, saldo: pesos(r.saldo) }));
        if (r.alerta) { alertar(d.rubro); }
        ir("mis-registros");
      });
    };
  }

  /* ---------- P-09 · Registrar el avance del corte (CU-09) */
  function vAvance() {
    cabecera("Avance del corte", usuario.nombre, true);
    var anterior = E.reportes.filter(function (r) { return r.estado === "Registrado"; }).slice(-1)[0];
    main.innerHTML = "<h1>Registrar el avance del corte</h1><form id='f' novalidate>" +
      "<div class='campo'><label for='corte'>Corte</label><select id='corte' data-error='ERR-14'>" + E.cortes.map(function (c) { return "<option value='" + c + "'" + (c === E.cortes[E.cortes.length - 1] ? " selected" : "") + ">" + fecha(c) + "</option>"; }).join("") + "</select></div>" +
      E.actividades.map(function (a) {
        var ant = anterior ? (anterior.avances.filter(function (x) { return x.actividad === a.id; })[0] || {}).porcentaje : null;
        return "<fieldset class='tarjeta'><legend>" + esc(a.nombre) + "</legend>" +
          "<div class='campo'><label for='p-" + a.id + "'>Avance acumulado, en porcentaje</label>" + (ant !== null && ant !== undefined ? "<p class='ayuda'>Último registrado: " + ant + " %</p>" : "") +
          "<input id='p-" + a.id + "' inputmode='numeric' data-error='ERR-08' data-actividad='" + a.id + "' autocomplete='off'></div>" +
          "<div class='campo'><label for='f-" + a.id + "'>Fotografía</label><input id='f-" + a.id + "' type='file' accept='image/*' capture='environment' data-error='ERR-09' data-actividad='" + a.id + "'></div></fieldset>";
      }).join("") + "<div class='acciones'><button class='boton' type='submit'>Guardar reporte</button></div></form>";
    var f = $("f");
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var avances = E.actividades.map(function (a) { var v = $("p-" + a.id).value.trim(), ft = $("f-" + a.id).files[0]; return { actividad: a.id, porcentaje: v === "" ? "" : Number(v), foto: ft ? ft.name : "" }; });
      var corte = $("corte").value;
      var previo = E.reportes.filter(function (r) { return r.corte === corte; }).slice(-1)[0];
      if (previo && previo.estado !== "Devuelto") { errores(f, [{ codigo: "ERR-14" }]); return; }
      var e = Reglas.validarAvance(avances);
      if (e.length) { errores(f, e); return; }
      cargando(function () {
        Reglas.registrarAvance(E, corte, avances, conConexion);
        if (conConexion) { avisar("ok", msg("OK-10", { corte: fecha(corte) })); } else { avisar("ale", MENSAJES["A-04"]); }
        ir("mis-registros");
      });
    };
  }

  /* ---------- P-04 · Mis registros (CU-19) */
  function vMisRegistros() {
    cabecera("Mis registros", usuario.nombre, true);
    var mias = E.compras.filter(function (c) { return c.solicitante === usuario.id; }).slice().reverse();
    var reps = E.reportes.slice().reverse();
    if (!mias.length && !reps.length) { main.innerHTML = "<h1>Mis registros</h1><p class='vacio'>" + MENSAJES["V-01"] + "</p>"; return; }
    main.innerHTML = "<h1>Mis registros</h1><h2>Compras</h2>" + mias.map(function (c) {
      var ult = c.decisiones[c.decisiones.length - 1], sig = c.tipo === "solicitud" ? Reglas.siguienteAprobador(c) : c.ruta[0];
      return "<article class='tarjeta'><div class='fila'><strong>" + c.id + " · " + esc(c.insumo) + "</strong>" + chip(c.estado) + "</div>" +
        fila("Rubro", esc(rubro(c.rubro).nombre)) + fila("Valor", pesos(c.valor)) +
        ((c.estado === "Pendiente" || c.estado === "Por legalizar") && sig ? fila(c.tipo === "urgente" ? "La legaliza" : "La decide ahora", esc(rol(sig))) : "") +
        (ult && ult.motivo ? fila(ult.resultado, esc(ult.motivo)) : "") +
        (c.tipo === "solicitud" && c.estado === "Pendiente" ? "<div class='acciones'><button class='boton peligro' type='button' data-anular='" + c.id + "'>Anular solicitud</button></div>" : "") + "</article>";
    }).join("") + "<h2>Reportes de avance</h2>" + (reps.length ? reps.map(function (r) {
      return "<article class='tarjeta'><div class='fila'><strong>Corte " + fecha(r.corte) + " · versión " + r.version + "</strong>" + chip(r.estado) + "</div>" + (r.motivoDevolucion ? fila("Motivo de la devolución", esc(r.motivoDevolucion)) : "") + "</article>";
    }).join("") : "<p class='vacio'>" + MENSAJES["V-03"] + "</p>");
    Array.prototype.forEach.call(main.querySelectorAll("[data-anular]"), function (b) {
      b.onclick = function () {
        var caja = b.parentNode, id = b.dataset.anular;
        caja.innerHTML = "<form novalidate><div class='campo'><label for='m-" + id + "'>Motivo de la anulación</label><textarea id='m-" + id + "' data-error='ERR-13'></textarea></div><button class='boton peligro' type='submit'>Confirmar anulación</button></form>";
        var f = caja.querySelector("form"); $("m-" + id).focus();
        f.onsubmit = function (ev) {
          ev.preventDefault();
          var r = Reglas.anular(E, id, usuario, $("m-" + id).value, HOY);
          if (!r.ok) { errores(f, cod(r.errores)); return; }
          avisar("ok", msg("OK-06", { id: id })); pintar();
        };
      };
    });
  }

  /* ---------- P-05 · Por decidir */
  function vPorDecidir() {
    cabecera("Por decidir", usuario.nombre, true);
    var lista = porDecidir();
    if (!lista.length) { main.innerHTML = "<h1>Por decidir</h1><p class='vacio'>" + MENSAJES["V-02"] + "</p>"; return; }
    main.innerHTML = "<h1>Por decidir</h1>" + lista.map(function (c) {
      return "<button class='boton menu-item tarjeta' type='button' data-ir='" + (c.tipo === "urgente" ? "legalizar/" : "decidir/") + c.id + "'><span><strong>" + c.id + " · " + esc(c.insumo) + "</strong><br><span class='dato'>" +
        (c.tipo === "urgente" ? "Compra urgente por legalizar" : "Solicitud de compra") + " · " + esc(rubro(c.rubro).nombre) + "</span></span><span class='valor'>" + pesos(c.valor) + "</span></button>";
    }).join("");
    enlaces();
  }

  function historial(c) {
    return c.decisiones.length ? "<h2>Decisiones anteriores</h2><div class='tarjeta'>" + c.decisiones.map(function (d) { return fila(esc(rol(d.rol)) + " · " + fecha(d.fecha), esc(d.resultado) + (d.motivo ? ": " + esc(d.motivo) : "")); }).join("") + "</div>" : "";
  }

  /* ---------- P-06 · Decidir una solicitud (CU-02) */
  function vDecidir(id) {
    var c = compra(id); cabecera("Solicitud " + id, usuario.nombre, true);
    if (!c) { ir("por-decidir"); return; }
    var s = Reglas.saldo(E, c.rubro), exc = c.valor - s;
    main.innerHTML = "<h1>Solicitud " + c.id + "</h1><div class='tarjeta'>" + fila("Insumo", esc(c.insumo)) + fila("Cantidad", esc(c.cantidad)) + fila("Rubro", esc(rubro(c.rubro).nombre)) + fila("La necesita el", fecha(c.fechaRequerida)) + fila("Ruta de aprobación", esc(ruta(c.ruta))) + "</div>" +
      "<div class='tarjeta'>" + fila("Valor solicitado", pesos(c.valor), "grande") + fila("Saldo del rubro hoy", pesos(s), "grande") + (exc > 0 ? "<p class='advertencia'>" + esc(msg("A-03", { exceso: pesos(exc) })) + "</p>" : "") + "</div>" + historial(c) +
      "<form id='f' novalidate><div class='campo'><label for='motivo'>Motivo</label><p class='ayuda' id='a-m'>Obligatorio si rechaza.</p><textarea id='motivo' data-error='ERR-13 ERR-11 ERR-12 ERR-10' aria-describedby='a-m'></textarea></div>" +
      "<div class='acciones'><button class='boton' type='submit' value='Aprobada'>Aprobar</button><button class='boton peligro' type='submit' value='Rechazada'>Rechazar</button></div></form>";
    var f = $("f");
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var que = ev.submitter ? ev.submitter.value : "Aprobada";
      var r = Reglas.decidir(E, id, usuario, que, $("motivo").value, HOY);
      if (!r.ok) { errores(f, cod(r.errores)); return; }
      cargando(function () {
        if (r.transicion === "T-04") { avisar("ok", msg("OK-02", { id: id, saldo: pesos(Reglas.saldo(E, c.rubro)) })); if (r.alerta) { avisar("ale", alertar(c.rubro)); } }
        if (r.transicion === "T-02") { avisar("ok", msg("OK-03", { rol: rol(Reglas.siguienteAprobador(c)) })); }
        if (r.transicion === "T-03") { avisar("ale", msg("OK-05", { ruta: ruta(c.ruta) })); }
        if (r.transicion === "T-05") { avisar("ok", msg("OK-04", { id: id })); }
        ir("por-decidir");
      });
    };
  }

  /* ---------- P-08 · Legalizar una compra urgente (CU-04) */
  function vLegalizar(id) {
    var c = compra(id); cabecera("Compra urgente " + id, usuario.nombre, true);
    if (!c) { ir("por-decidir"); return; }
    main.innerHTML = "<h1>Compra urgente " + c.id + "</h1><div class='tarjeta'>" + fila("Qué se compró", esc(c.insumo)) + fila("Rubro", esc(rubro(c.rubro).nombre)) + fila("Fecha", fecha(c.fecha)) + fila("Soporte", esc(c.soporte)) + "</div>" +
      "<div class='tarjeta'>" + fila("Valor pagado", pesos(c.valor), "grande") + fila("Saldo del rubro hoy", pesos(Reglas.saldo(E, c.rubro)), "grande") + "<p class='nota'>El saldo ya descuenta esta compra.</p>" + (c.sobreTope ? "<p class='advertencia'>" + MENSAJES["A-02"] + "</p>" : "") + "</div>" + historial(c) +
      "<form id='f' novalidate><div class='campo'><label for='obs'>Observación</label><p class='ayuda' id='a-o'>Obligatoria si la devuelve.</p><textarea id='obs' data-error='ERR-13 ERR-12 ERR-10' aria-describedby='a-o'></textarea></div>" +
      "<div class='acciones'><button class='boton' type='submit' value='si'>Legalizar</button><button class='boton secundario' type='submit' value='no'>Devolver con observación</button></div></form>";
    var f = $("f");
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var acepta = !(ev.submitter && ev.submitter.value === "no");
      var r = Reglas.legalizar(E, id, usuario, acepta, $("obs").value, HOY);
      if (!r.ok) { errores(f, cod(r.errores)); return; }
      cargando(function () { avisar("ok", msg(acepta ? "OK-08" : "OK-09", { id: id })); ir("por-decidir"); });
    };
  }

  /* ---------- P-10 · Presupuesto y ejecución (CU-07) */
  function vPresupuesto() {
    var vista = Reglas.vistaPresupuesto(usuario.rol);
    cabecera(vista === "completo" ? "Presupuesto y ejecución" : "Saldos de los rubros", usuario.nombre, true);
    main.innerHTML = "<h1>" + (vista === "completo" ? "Presupuesto y ejecución" : "Saldos de los rubros") + "</h1>" + E.rubros.map(function (r) {
      var g = Reglas.gastoAcumulado(E, r.id), s = r.presupuesto - g, p = Math.round(100 * g / r.presupuesto), alto = Reglas.alertaUmbral(E, r.id);
      if (vista !== "completo") { return "<article class='tarjeta'>" + fila("<strong>" + esc(r.nombre) + "</strong>", pesos(s)) + "</article>"; }
      return "<article class='tarjeta'><strong>" + esc(r.nombre) + "</strong>" + fila("Presupuesto", pesos(r.presupuesto)) + fila("Gasto acumulado", pesos(g)) + fila("Saldo", pesos(s)) +
        "<div class='barra-avance" + (alto ? " alto" : "") + "' role='img' aria-label='Ejecutado " + p + " por ciento'><span style='width:" + Math.min(100, Math.max(0, p)) + "%'></span></div><p class='nota'>Ejecutado: " + p + " %" + (alto ? " · alcanzó el umbral de alerta" : "") + "</p></article>";
    }).join("");
  }

  /* ---------- P-11 · Avance de la obra (CU-10, CU-11) */
  function vAvanceObra() {
    cabecera("Avance de la obra", usuario.nombre, true);
    var vigentes = E.cortes.map(function (c) { return E.reportes.filter(function (r) { return r.corte === c && r.estado !== "Pendiente de sincronizar"; }).slice(-1)[0]; }).filter(Boolean).reverse();
    if (!vigentes.length) { main.innerHTML = "<h1>Avance de la obra</h1><p class='vacio'>" + MENSAJES["V-03"] + "</p>"; return; }
    main.innerHTML = "<h1>Avance de la obra</h1>" + vigentes.map(function (r) {
      return "<article class='tarjeta'><div class='fila'><strong>Corte " + fecha(r.corte) + " · versión " + r.version + "</strong>" + chip(r.estado) + "</div>" + r.avances.map(function (a) {
        var act = E.actividades.filter(function (x) { return x.id === a.actividad; })[0];
        return fila(esc(act.nombre), a.porcentaje + " %") + "<div class='barra-avance' role='img' aria-label='" + a.porcentaje + " por ciento'><span style='width:" + a.porcentaje + "%'></span></div>";
      }).join("") + (r.motivoDevolucion ? fila("Motivo de la devolución", esc(r.motivoDevolucion)) : "") +
      (usuario.rol === "gerenteObra" && r.estado === "Registrado" ? "<div class='acciones'><button class='boton secundario' type='button' data-devolver='" + r.corte + "'>Devolver para corrección</button></div>" : "") + "</article>";
    }).join("");
    Array.prototype.forEach.call(main.querySelectorAll("[data-devolver]"), function (b) {
      b.onclick = function () {
        var caja = b.parentNode, corte = b.dataset.devolver;
        caja.innerHTML = "<form novalidate><div class='campo'><label for='md'>Qué debe corregir el residente</label><textarea id='md' data-error='ERR-13'></textarea></div><button class='boton' type='submit'>Devolver reporte</button></form>";
        var f = caja.querySelector("form"); $("md").focus();
        f.onsubmit = function (ev) {
          ev.preventDefault();
          var r = Reglas.devolverReporte(E, corte, usuario, $("md").value);
          if (!r.ok) { errores(f, cod(r.errores)); return; }
          avisar("ok", msg("OK-11", { corte: fecha(corte) })); pintar();
        };
      };
    });
  }

  /* ---------- Marco común */
  function cabecera(titulo, sub, atras) {
    $("titulo").textContent = titulo; $("subtitulo").textContent = sub; document.title = titulo + " · Gestión de obras";
    $("atras").hidden = !atras; $("salir").hidden = !usuario;
    $("conexion").hidden = !(usuario && usuario.rol === "residente");
  }
  function enlaces() { Array.prototype.forEach.call(main.querySelectorAll("[data-ir]"), function (b) { b.onclick = function () { ir(b.dataset.ir); }; }); }
  var VISTAS = { "inicio": vInicio, "nueva-solicitud": vNuevaSolicitud, "compra-urgente": vUrgente, "avance": vAvance, "mis-registros": vMisRegistros, "por-decidir": vPorDecidir, "decidir": vDecidir, "legalizar": vLegalizar, "presupuesto": vPresupuesto, "avance-obra": vAvanceObra };
  var PERMISOS = { residente: ["inicio", "nueva-solicitud", "compra-urgente", "avance", "mis-registros", "presupuesto"], contador: ["inicio", "presupuesto"] };
  function pintar() {
    var partes = location.hash.replace("#", "").split("/"), vista = partes[0];
    if (!usuario) { vIngreso(); pintarAvisos(); return; }
    var permitidas = PERMISOS[usuario.rol] || ["inicio", "por-decidir", "decidir", "legalizar", "presupuesto", "avance-obra"];
    if (!VISTAS[vista] || permitidas.indexOf(vista) < 0) { vista = "inicio"; }
    VISTAS[vista](partes[1]);
    pintarAvisos(); main.focus(); window.scrollTo(0, 0);
  }
  $("atras").onclick = function () { ir("inicio"); };
  $("salir").onclick = function () { usuario = null; location.hash = ""; pintar(); };
  $("conexion").onclick = function () {
    conConexion = !conConexion;
    this.setAttribute("aria-pressed", String(conConexion)); this.textContent = conConexion ? "Con conexión" : "Sin conexión";
    if (conConexion) { var n = Reglas.sincronizar(E, true); if (n) { avisar("ok", msg("OK-12", { n: n })); pintar(); } }
  };
  /* Al corregir un campo, su mensaje de error desaparece. */
  function limpiarError(ev) {
    var c = ev.target;
    if (!c.getAttribute || c.getAttribute("aria-invalid") !== "true") { return; }
    var p = $("err-" + c.id); if (p) { p.remove(); }
    c.removeAttribute("aria-invalid"); c.removeAttribute("aria-describedby");
  }
  main.addEventListener("input", limpiarError); main.addEventListener("change", limpiarError);
  window.addEventListener("hashchange", pintar);
  pintar();
})();
