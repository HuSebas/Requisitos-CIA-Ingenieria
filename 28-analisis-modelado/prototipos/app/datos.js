/* Datos de ejemplo del prototipo, en formato JSON. Ninguna cifra es real. */
var DATOS = {
  "parametros": { "umbralAlerta": 0.8, "compraGrande": 0.1, "topeCajaMenor": 1000000, "plazoLegalizarDias": 5 },
  "usuarios": [
    { "id": "u1", "nombre": "Residente de obra", "rol": "residente" },
    { "id": "u2", "nombre": "Administradora de proyectos", "rol": "administradora" },
    { "id": "u3", "nombre": "Gerente de obra", "rol": "gerenteObra" },
    { "id": "u4", "nombre": "Gerente general", "rol": "gerenteGeneral" },
    { "id": "u5", "nombre": "Contador", "rol": "contador" }
  ],
  "obra": { "id": "o1", "nombre": "Vía de acceso (obra de ejemplo)", "periodicidadCorte": "Quincenal" },
  "rubros": [
    { "id": "r1", "nombre": "Materiales / cemento", "presupuesto": 20000000, "imprevistos": false },
    { "id": "r2", "nombre": "Materiales / acero", "presupuesto": 35000000, "imprevistos": false },
    { "id": "r3", "nombre": "Materiales / agregados", "presupuesto": 18000000, "imprevistos": false },
    { "id": "r9", "nombre": "Imprevistos", "presupuesto": 5000000, "imprevistos": true }
  ],
  "actividades": [
    { "id": "a1", "nombre": "Excavación", "unidad": "m³" },
    { "id": "a2", "nombre": "Base granular", "unidad": "m³" },
    { "id": "a3", "nombre": "Concreto de placa", "unidad": "m³" }
  ],
  "compras": [
    { "id": "S-001", "tipo": "solicitud", "rubro": "r1", "insumo": "Cemento gris", "cantidad": "400 bultos", "valor": 12000000, "fechaRequerida": "2026-10-20", "fecha": "2026-10-14", "solicitante": "u1", "estado": "Aprobada", "ruta": ["gerenteObra", "administradora"], "decisiones": [], "exceso": 0 },
    { "id": "S-002", "tipo": "solicitud", "rubro": "r1", "insumo": "Cemento gris", "cantidad": "150 bultos", "valor": 4500000, "fechaRequerida": "2026-11-03", "fecha": "2026-10-28", "solicitante": "u1", "estado": "Aprobada", "ruta": ["gerenteObra", "administradora"], "decisiones": [], "exceso": 0 },
    { "id": "S-003", "tipo": "solicitud", "rubro": "r2", "insumo": "Acero de refuerzo", "cantidad": "2 toneladas", "valor": 10000000, "fechaRequerida": "2026-11-05", "fecha": "2026-10-30", "solicitante": "u1", "estado": "Aprobada", "ruta": ["gerenteObra", "administradora"], "decisiones": [], "exceso": 0 },
    { "id": "S-004", "tipo": "solicitud", "rubro": "r9", "insumo": "Alquiler de motobomba", "cantidad": "5 días", "valor": 3000000, "fechaRequerida": "2026-11-06", "fecha": "2026-11-02", "solicitante": "u1", "estado": "Aprobada", "ruta": ["gerenteGeneral"], "decisiones": [], "exceso": 0 },
    { "id": "S-005", "tipo": "solicitud", "rubro": "r3", "insumo": "Arena lavada", "cantidad": "12 m³", "valor": 1200000, "fechaRequerida": "2026-11-20", "fecha": "2026-11-14", "solicitante": "u1", "estado": "Pendiente", "ruta": ["administradora"], "decisiones": [], "exceso": 0 }
  ],
  "cortes": ["2026-11-01", "2026-11-15"],
  "reportes": [
    { "corte": "2026-11-01", "version": 1, "estado": "Registrado", "avances": [ { "actividad": "a1", "porcentaje": 60 }, { "actividad": "a2", "porcentaje": 20 }, { "actividad": "a3", "porcentaje": 0 } ] }
  ]
};
if (typeof module !== "undefined") { module.exports = DATOS; }
