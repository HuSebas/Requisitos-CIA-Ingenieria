# Catálogo de requisitos

| Campo | Valor |
|---|---|
| Versión | 1.3 · 2026-11-16 — revisión interna del SRS: identificadores de tres dígitos, «deberá» como verbo de obligación, RF-016 dividido en RF-016 y RF-045, RF-035 y RF-040 con una sola obligación |
| Sintaxis | EARS (ubicuo, por evento «cuando», por estado «mientras», no deseado «si… entonces») |
| Calidad | Cada requisito es atómico, verificable y trazable a su fuente (ISO/IEC/IEEE 29148) |

**Prioridad (MoSCoW).** Debe · Debería · Podría · No en esta versión. El método está en [priorización](../28-analisis-modelado/priorizacion/priorizacion.md).
**Fuente.** Identificador del [inventario de requisitos candidatos](../27-levantamiento/requisitos-candidatos.md), que a su vez cita el hallazgo de origen.
**Detalle.** La justificación y el criterio de ajuste de cada requisito están en las [fichas](fichas-requisitos.md).

## 1. Requisitos funcionales

### Compras

| ID | Requisito | Prioridad | Fuente | Meta | Caso de uso |
|---|---|---|---|---|---|
| RF-001 | Cuando el residente de obra registre una solicitud de compra, el sistema deberá guardarla en estado «pendiente» con obra, actividad o rubro, insumo, cantidad, valor estimado, fecha requerida, solicitante y fecha de registro. | Debe | RC-01 | G2.1 | CU-01 |
| RF-002 | Si a una solicitud de compra le falta un dato obligatorio o su rubro no pertenece al presupuesto de la obra, entonces el sistema deberá impedir el registro, indicar el dato que falta y conservar los datos ya ingresados. | Debe | RC-01 | G2.1 | CU-01 |
| RF-003 | Cuando se registre una solicitud de compra, el sistema deberá asignarle la ruta de aprobación que determinan las reglas RN-02 a RN-05. | Debe | RC-02, RC-06 | G2.2 | CU-01 |
| RF-004 | Cuando una solicitud de compra quede en estado «pendiente», el sistema deberá notificar al primer aprobador de su ruta. | Debería | RC-03 | G2.2 | CU-01 |
| RF-005 | Cuando el aprobador abra una solicitud pendiente, el sistema deberá mostrar el valor solicitado y el saldo disponible del rubro calculado en ese momento según RN-01. | Debe | RC-04 | G2.3 | CU-02, CU-05 |
| RF-006 | Si el valor solicitado supera el saldo disponible del rubro, entonces el sistema deberá mostrar el valor del exceso sin aprobar ni rechazar la solicitud. | Debe | RC-04 | G2.3 | CU-02 |
| RF-007 | Cuando el aprobador decida una solicitud, el sistema deberá registrar la decisión, el aprobador, la fecha y el saldo del rubro vigente al decidir. | Debe | RC-05 | G2.5 | CU-02 |
| RF-008 | Cuando una solicitud de compra sea aprobada por todos los aprobadores de su ruta, el sistema deberá sumar su valor al gasto acumulado del rubro. | Debe | RC-12 | G1.2 | CU-02 |
| RF-009 | Si el aprobador rechaza una solicitud, entonces el sistema deberá exigir el motivo y dejar sin cambio el saldo del rubro. | Debe | RC-05 | G2.4, G2.5 | CU-02 |
| RF-010 | Cuando una solicitud sea aprobada o rechazada, el sistema deberá notificar la decisión al residente que la registró. | Debería | RC-03 | G2.2 | CU-02 |
| RF-011 | El sistema deberá permitir asociar a cada compra uno o más soportes en imagen o PDF, ligados a la compra y a la obra. | Debe | RC-07 | G2.5 | CU-03, CU-13 |
| RF-012 | Cuando el residente registre una compra urgente con rubro, valor y fotografía del soporte, el sistema deberá guardarla en estado «por legalizar» y sumar su valor al gasto acumulado del rubro en la misma fecha del registro. | Debe | RC-08 | G2.6 | CU-03 |
| RF-013 | Si a una compra urgente le falta el rubro o el soporte, entonces el sistema deberá impedir el registro, indicar lo que falta y conservar los datos ya ingresados. | Debe | RC-08 | G2.6 | CU-03 |
| RF-014 | Cuando el aprobador legalice una compra urgente, el sistema deberá cambiar su estado a «legalizada» sin modificar el gasto acumulado del rubro. | Debe | RC-08 | G2.6 | CU-04 |
| RF-015 | Si una compra urgente sigue «por legalizar» al vencer el plazo de legalización, entonces el sistema deberá alertar al aprobador que la tiene a cargo. | Podría | RC-08 | G2.6 | CU-04 |
| RF-016 | El sistema deberá permitir a la administradora de proyectos marcar una compra como verificada contra cotización, orden de compra y soporte. | Debería | RC-09 | G2.8 | CU-15 |
| RF-045 | El sistema deberá mostrar al contador solo las compras verificadas, con su soporte. | Debería | RC-09 | G2.8 | CU-18 |
| RF-038 | Mientras una solicitud de compra esté «pendiente», el sistema deberá permitir a su solicitante anularla con motivo. | Debería | DES-01 · T-06 | G2.1 | CU-19 |
| RF-039 | Si el aprobador no acepta una compra urgente, entonces el sistema deberá exigir la observación y mantener la compra «por legalizar». | Debería | DES-02 · T-08 | G2.6 | CU-04 |
| RF-040 | Cuando se registre una compra urgente, el sistema deberá notificar al aprobador a quien corresponde legalizarla. | Debería | DSE-03 | G2.6 | CU-03 |
| RF-041 | Cuando una compra urgente sea legalizada o devuelta con observación, el sistema deberá notificar al residente que la registró. | Debería | DES-02 · T-08, T-09 | G2.6 | CU-04 |
| RF-042 | Mientras a una solicitud de compra le falte la decisión de un aprobador de su ruta, el sistema deberá mantenerla «pendiente» y notificar al aprobador que sigue. | Debe | RC-02, RC-06 | G2.2, G2.4 | CU-02 |
| RF-043 | Si al decidir una solicitud la ruta que corresponde al saldo vigente es distinta de la asignada, entonces el sistema deberá reasignar la ruta y notificar al nuevo aprobador. | Debe | RC-02 | G2.2 | CU-02 |
| RF-044 | El sistema deberá permitir a la administradora de proyectos registrar la orden de compra de una solicitud aprobada, con número, proveedor y fecha. | Debe | DCL-02 | G4.1 | CU-20 |

### Presupuesto y costos

| ID | Requisito | Prioridad | Fuente | Meta | Caso de uso |
|---|---|---|---|---|---|
| RF-017 | El sistema deberá permitir al gerente de obra registrar el presupuesto de una obra por actividad y rubro, incluido el rubro de imprevistos. | Debe | RC-11 | G1.1 | CU-06 |
| RF-018 | Cuando se apruebe un ajuste al presupuesto de una obra, el sistema deberá guardar una nueva versión y conservar la anterior. | Debería | RC-17 | G5.4 | CU-16 |
| RF-019 | El sistema deberá mostrar por obra, en una sola vista, el presupuesto, el gasto acumulado y el saldo por actividad y rubro, junto con el avance físico por actividad. | Debe | RC-13 | G1.3 | CU-07, CU-05 |
| RF-020 | Cuando el gasto acumulado de un rubro alcance el umbral de alerta, el sistema deberá alertar a la administradora de proyectos y al gerente de obra. | Debería | RC-14 | G1.4 | CU-08 |
| RF-021 | El sistema deberá generar, por obra y periodo, un consolidado con las compras, el gasto acumulado, el saldo por rubro y el avance por actividad. | Debería | RC-15 | G1.5 | CU-17 |
| RF-022 | El sistema deberá reportar por mes y por obra la cantidad de solicitudes de compra en cada estado. | Podría | RC-16 | — | CU-17 |

### Avance de obra

| ID | Requisito | Prioridad | Fuente | Meta | Caso de uso |
|---|---|---|---|---|---|
| RF-023 | El sistema deberá permitir al residente de obra registrar en cada corte la cantidad ejecutada o el porcentaje de avance de cada actividad, con al menos una fotografía. | Debe | RC-20 | G3.1 | CU-09 |
| RF-024 | Mientras el dispositivo esté sin conexión, el sistema deberá guardar en el dispositivo los reportes de avance que registre el residente. | Debe | RC-21 | G3.2 | CU-09 |
| RF-025 | Cuando el dispositivo recupere la conexión, el sistema deberá sincronizar los reportes pendientes sin intervención del residente y sin duplicarlos. | Debe | RC-21 | G3.2 | CU-09 |
| RF-026 | El sistema deberá permitir a la administradora de proyectos definir la periodicidad de corte de cada obra: semanal, quincenal, mensual o trimestral. | Debería | RC-22 | G3.3 | CU-12 |
| RF-027 | El sistema deberá mostrar al gerente de obra, a la administradora de proyectos y al gerente general el avance de cada obra por actividad y por corte. | Debe | RC-13, RC-33 | G3 | CU-10 |
| RF-028 | Cuando el gerente de obra devuelva un reporte de avance, el sistema deberá exigir el motivo, notificar al residente y conservar la versión devuelta. | Debería | RC-23 | G3.4 | CU-11 |
| RF-029 | Cuando se corrija un reporte de avance devuelto, el sistema deberá recalcular los consolidados que usaron la versión anterior. | Debería | RC-24 | G3.4 | CU-11, CU-17 |

### Recepción de materiales

| ID | Requisito | Prioridad | Fuente | Meta | Caso de uso |
|---|---|---|---|---|---|
| RF-030 | El sistema deberá permitir al residente de obra registrar la recepción de un material contra su orden de compra, con la cantidad recibida y el estado. | Debe | RC-25 | G4.1 | CU-13 |
| RF-031 | Si el material recibido difiere de la orden de compra en cantidad, estado o proveedor, entonces el sistema deberá marcar la recepción «con novedad» y alertar a la administradora de proyectos. | Debería | RC-26 | G4.2 | CU-13 |
| RF-032 | El sistema deberá permitir al residente de obra registrar una devolución con el material, la cantidad, el motivo y la orden de compra asociada. | Debería | RC-27 | G4.3 | CU-14 |
| RF-033 | Cuando se registre una devolución, el sistema deberá restar su valor del gasto acumulado del rubro. | Debería | RC-28 | G2.7 | CU-14 |

### Transversal

| ID | Requisito | Prioridad | Fuente | Meta | Caso de uso |
|---|---|---|---|---|---|
| RF-034 | Cuando se cree o modifique un presupuesto, una compra o un reporte de avance, el sistema deberá registrar el usuario, la fecha y el valor anterior. | Debe | RC-29 | G5.1 | — |
| RF-035 | El sistema deberá impedir la eliminación de presupuestos, compras y reportes de avance, que solo admiten anulación con motivo (RN-17). | Debe | RC-29 | G5.1 | — |
| RF-036 | El sistema deberá autenticar a cada usuario y asignarle un único rol por obra. | Debe | RC-30 | G5.2 | — |
| RF-037 | El sistema deberá mostrar las partidas del presupuesto solo a los roles autorizados en RN-16. | Debe | RC-30, RC-37 | G5.2, G5.3 | CU-07 |

## 2. Requisitos de calidad

Clasificados según ISO/IEC 25010:2023. El análisis de relevancia está en [requisitos de calidad](requisitos-calidad.md).

| ID | Característica | Requisito | Medida | Prioridad | Fuente |
|---|---|---|---|---|---|
| RNF-001 | Capacidad de interacción · Operabilidad | El sistema deberá permitir que un residente de obra registre el avance de un corte de hasta 10 actividades en 15 minutos o menos. | Tiempo medido con un residente después de una inducción de 30 minutos. Línea base: 40 a 60 minutos (E-01 #11). | Debería | RC-34 |
| RNF-002 | Capacidad de interacción · Operabilidad | Los formularios de registro en campo deberán tener como máximo 8 campos obligatorios. | Conteo de campos obligatorios en los formularios de avance, compra urgente y recepción. | Debería | RC-35 |
| RNF-003 | Flexibilidad · Adaptabilidad | El sistema deberá poder usarse desde el navegador de un celular con pantalla de 360 px de ancho o más y desde un portátil. | Todas las funciones del residente se completan en un celular de 360 px sin desplazamiento horizontal. | Debe | RC-32, RC-38 |
| RNF-004 | Fiabilidad · Tolerancia a fallos | El sistema deberá conservar sin pérdida los reportes de avance guardados sin conexión durante al menos 72 horas. | Prueba: 10 reportes guardados sin conexión, dispositivo reiniciado, sincronización a las 72 horas; llegan los 10. | Debe | RC-21 |
| RNF-005 | Eficiencia de desempeño · Comportamiento temporal | El sistema deberá mostrar el saldo del rubro en 3 segundos o menos con una conexión móvil 3G. | Percentil 95 del tiempo de respuesta en 30 consultas. | Debería | RC-04 |
| RNF-006 | Seguridad · Confidencialidad | El sistema deberá aplicar el control de acceso por rol a toda consulta de presupuesto, compras y soportes, y cifrar las comunicaciones. | Ninguna consulta de presupuesto responde sin sesión y rol válidos; todo el tráfico usa TLS. | Debe | RC-30, RC-37 |
| RNF-007 | Seguridad · Integridad | El sistema deberá impedir que los roles de campo modifiquen valores calculados: saldo, gasto acumulado y consolidados. | Ningún formulario del residente permite editar un valor calculado. | Debe | RC-36 |
| RNF-008 | Seguridad · Responsabilidad | El registro de cambios no deberá poder modificarse ni eliminarse desde ningún rol. | No existe función de edición ni borrado sobre el registro de cambios. | Debe | RC-29 |
| RNF-009 | Fiabilidad · Recuperabilidad | El sistema deberá conservar la información de cada obra durante al menos 5 años después de su cierre. | Política de retención configurada en 5 años; restauración de una copia verificada una vez al año. | Debería | RC-31 |
| RNF-010 | Compatibilidad · Interoperabilidad | El sistema deberá exportar el presupuesto, el consolidado y los reportes de avance a formato .xlsx. | Los tres archivos exportados abren en Excel sin errores y conservan los totales. | Debería | RC-39 |
| RNF-011 | Fiabilidad · Disponibilidad | El sistema deberá estar disponible el 99 % del tiempo entre las 6:00 y las 18:00, de lunes a sábado. | Disponibilidad mensual medida en ese horario. | Podría | RC-33 |
| RNF-012 | Capacidad de interacción · Protección contra errores de usuario | El sistema deberá pedir confirmación antes de registrar una aprobación, un rechazo, una anulación o una legalización. | Las cuatro acciones muestran un paso de confirmación con el valor y su efecto sobre el saldo antes de registrarse. | Debería | HH-06 |
| RNF-013 | Capacidad de interacción · Inclusividad | El sistema deberá cumplir el nivel AA de WCAG 2.2 en contraste, tamaño de los objetivos táctiles, etiquetas de los campos e indicador de foco. | Texto con contraste de 4,5:1 o más; objetivos táctiles de 44 px o más; todo campo con etiqueta; foco visible con contraste de 3:1 o más. | Debería | CX-01 |

## 3. Restricciones

| ID | Restricción | Fuente |
|---|---|---|
| RES-01 | El sistema deberá operar en los equipos que la empresa ya tiene y construirse con tecnologías de uso libre o ya contratadas por ella. | RC-38 · Acta §3 |
| RES-02 | Durante la transición, el esquema actual en Excel deberá poder seguir usándose en paralelo. | RC-39 · Acta §3 |

## 4. Candidatos que no entran

| Candidato | Decisión | Motivo |
|---|---|---|
| RC-10 Alerta de pedido duplicado | Descartado | Las dos entrevistas niegan que ocurra (conflicto C-04). |
| RC-18 Liberación de recursos condicionada al avance | No en esta versión | La regla de liberación no fue levantada. |
| RC-19 Control de mano de obra y subcontratos | Fuera de alcance | El proceso no se levantó (conflicto C-06). |

## 5. Requisitos descubiertos al modelar y al prototipar

Nacieron de los modelos UML o del prototipo, y no directamente de un hallazgo del levantamiento. Están propuestos y se confirman con la empresa en la validación.

| ID | Dónde apareció | Hallazgo del catálogo de casos de uso |
|---|---|---|
| RF-038 | DES-01 · T-06 | H-09 |
| RF-039 | DES-02 · T-08 | H-12 |
| RF-040 | DSE-03 | H-12 |
| RF-041 | DES-02 · T-08 y T-09 | H-12 |
| RF-042 | RN-03 y RN-04 frente a DES-01 | H-10 |
| RF-043 | DSE-02 | H-11 |
| RF-044 | DCL-02 | H-13 |
| RNF-012 | Evaluación heurística del prototipo · HH-06 | — |
| RNF-013 | Ficha de contexto de uso · CX-01 | — |

## 6. Resumen

| Tipo | Debe | Debería | Podría | Total |
|---|---|---|---|---|
| Funcionales | 26 | 17 | 2 | 45 |
| De calidad | 5 | 7 | 1 | 13 |
| Restricciones | — | — | — | 2 |
