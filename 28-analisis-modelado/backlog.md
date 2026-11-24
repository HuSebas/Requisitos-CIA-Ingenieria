# Backlog priorizado

| Campo | Valor |
|---|---|
| Versión | 1.3 · 2026-11-16 — revisión interna del SRS: identificadores de tres dígitos, «deberá» como verbo de obligación, RF-016 dividido en RF-016 y RF-045, RF-035 y RF-040 con una sola obligación |
| Orden | Primero por categoría MoSCoW y, dentro de cada una, por la prioridad calculada |

| # | ID | Requisito | MoSCoW | Prioridad | Entrega |
|---|---|---|---|---|---|
| 1 | RF-006 | Si el valor solicitado supera el saldo disponible del rubro, entonces el sistema deberá mostrar el valor del exceso sin aprobar ni rechazar la solicitud. | Debe | 2,06 | 1 |
| 2 | RF-009 | Si el aprobador rechaza una solicitud, entonces el sistema deberá exigir el motivo y dejar sin cambio el saldo del rubro. | Debe | 1,57 | 1 |
| 3 | RF-013 | Si a una compra urgente le falta el rubro o el soporte, entonces el sistema deberá impedir el registro, indicar lo que falta y conservar los datos ya ingresados. | Debe | 1,57 | 1 |
| 4 | RF-007 | Cuando el aprobador decida una solicitud, el sistema deberá registrar la decisión, el aprobador, la fecha y el saldo del rubro vigente al decidir. | Debe | 1,44 | 1 |
| 5 | RF-008 | Cuando una solicitud de compra sea aprobada por todos los aprobadores de su ruta, el sistema deberá sumar su valor al gasto acumulado del rubro. | Debe | 1,32 | 1 |
| 6 | RNF-007 | El sistema deberá impedir que los roles de campo modifiquen valores calculados: saldo, gasto acumulado y consolidados. | Debe | 1,32 | 1 |
| 7 | RF-035 | El sistema deberá impedir la eliminación de presupuestos, compras y reportes de avance, que solo admiten anulación con motivo (RN-17). | Debe | 1,14 | 1 |
| 8 | RF-002 | Si a una solicitud de compra le falta un dato obligatorio o su rubro no pertenece al presupuesto de la obra, entonces el sistema deberá impedir el registro, indicar el dato que falta y conservar los datos ya ingresados. | Debe | 1,08 | 1 |
| 9 | RF-014 | Cuando el aprobador legalice una compra urgente, el sistema deberá cambiar su estado a «legalizada» sin modificar el gasto acumulado del rubro. | Debe | 1,08 | 1 |
| 10 | RF-001 | Cuando el residente de obra registre una solicitud de compra, el sistema deberá guardarla en estado «pendiente» con obra, actividad o rubro, insumo, cantidad, valor estimado, fecha requerida, solicitante y fecha de registro. | Debe | 1,00 | 1 |
| 11 | RF-036 | El sistema deberá autenticar a cada usuario y asignarle un único rol por obra. | Debe | 0,93 | 1 |
| 12 | RF-027 | El sistema deberá mostrar al gerente de obra, a la administradora de proyectos y al gerente general el avance de cada obra por actividad y por corte. | Debe | 0,89 | 1 |
| 13 | RF-005 | Cuando el aprobador abra una solicitud pendiente, el sistema deberá mostrar el valor solicitado y el saldo disponible del rubro calculado en ese momento según RN-01. | Debe | 0,88 | 1 |
| 14 | RNF-008 | El registro de cambios no deberá poder modificarse ni eliminarse desde ningún rol. | Debe | 0,82 | 1 |
| 15 | RF-044 | El sistema deberá permitir a la administradora de proyectos registrar la orden de compra de una solicitud aprobada, con número, proveedor y fecha. | Debe | 0,78 | 1 |
| 16 | RF-023 | El sistema deberá permitir al residente de obra registrar en cada corte la cantidad ejecutada o el porcentaje de avance de cada actividad, con al menos una fotografía. | Debe | 0,70 | 1 |
| 17 | RNF-006 | El sistema deberá aplicar el control de acceso por rol a toda consulta de presupuesto, compras y soportes, y cifrar las comunicaciones. | Debe | 0,67 | 1 |
| 18 | RF-037 | El sistema deberá mostrar las partidas del presupuesto solo a los roles autorizados en RN-16. | Debe | 0,67 | 1 |
| 19 | RF-012 | Cuando el residente registre una compra urgente con rubro, valor y fotografía del soporte, el sistema deberá guardarla en estado «por legalizar» y sumar su valor al gasto acumulado del rubro en la misma fecha del registro. | Debe | 0,66 | 1 |
| 20 | RF-011 | El sistema deberá permitir asociar a cada compra uno o más soportes en imagen o PDF, ligados a la compra y a la obra. | Debe | 0,65 | 1 |
| 21 | RF-034 | Cuando se cree o modifique un presupuesto, una compra o un reporte de avance, el sistema deberá registrar el usuario, la fecha y el valor anterior. | Debe | 0,65 | 1 |
| 22 | RNF-003 | El sistema deberá poder usarse desde el navegador de un celular con pantalla de 360 px de ancho o más y desde un portátil. | Debe | 0,65 | 1 |
| 23 | RF-019 | El sistema deberá mostrar por obra, en una sola vista, el presupuesto, el gasto acumulado y el saldo por actividad y rubro, junto con el avance físico por actividad. | Debe | 0,60 | 1 |
| 24 | RF-030 | El sistema deberá permitir al residente de obra registrar la recepción de un material contra su orden de compra, con la cantidad recibida y el estado. | Debe | 0,57 | 1 |
| 25 | RF-042 | Mientras a una solicitud de compra le falte la decisión de un aprobador de su ruta, el sistema deberá mantenerla «pendiente» y notificar al aprobador que sigue. | Debe | 0,54 | 1 |
| 26 | RF-017 | El sistema deberá permitir al gerente de obra registrar el presupuesto de una obra por actividad y rubro, incluido el rubro de imprevistos. | Debe | 0,53 | 1 |
| 27 | RF-043 | Si al decidir una solicitud la ruta que corresponde al saldo vigente es distinta de la asignada, entonces el sistema deberá reasignar la ruta y notificar al nuevo aprobador. | Debe | 0,49 | 1 |
| 28 | RF-003 | Cuando se registre una solicitud de compra, el sistema deberá asignarle la ruta de aprobación que determinan las reglas RN-02 a RN-05. | Debe | 0,44 | 1 |
| 29 | RNF-004 | El sistema deberá conservar sin pérdida los reportes de avance guardados sin conexión durante al menos 72 horas. | Debe | 0,42 | 1 |
| 30 | RF-024 | Mientras el dispositivo esté sin conexión, el sistema deberá guardar en el dispositivo los reportes de avance que registre el residente. | Debe | 0,35 | 1 |
| 31 | RF-025 | Cuando el dispositivo recupere la conexión, el sistema deberá sincronizar los reportes pendientes sin intervención del residente y sin duplicarlos. | Debe | 0,35 | 1 |
| 32 | RNF-002 | Los formularios de registro en campo deberán tener como máximo 8 campos obligatorios. | Debería | 1,76 | 2 |
| 33 | RNF-012 | El sistema deberá pedir confirmación antes de registrar una aprobación, un rechazo, una anulación o una legalización. | Debería | 1,08 | 2 |
| 34 | RNF-013 | El sistema deberá cumplir el nivel AA de WCAG 2.2 en contraste, tamaño de los objetivos táctiles, etiquetas de los campos e indicador de foco. | Debería | 1,08 | 2 |
| 35 | RF-045 | El sistema deberá mostrar al contador solo las compras verificadas, con su soporte. | Debería | 0,83 | 2 |
| 36 | RF-040 | Cuando se registre una compra urgente, el sistema deberá notificar al aprobador a quien corresponde legalizarla. | Debería | 0,83 | 2 |
| 37 | RF-020 | Cuando el gasto acumulado de un rubro alcance el umbral de alerta, el sistema deberá alertar a la administradora de proyectos y al gerente de obra. | Debería | 0,78 | 2 |
| 38 | RF-033 | Cuando se registre una devolución, el sistema deberá restar su valor del gasto acumulado del rubro. | Debería | 0,75 | 2 |
| 39 | RF-039 | Si el aprobador no acepta una compra urgente, entonces el sistema deberá exigir la observación y mantener la compra «por legalizar». | Debería | 0,73 | 2 |
| 40 | RF-026 | El sistema deberá permitir a la administradora de proyectos definir la periodicidad de corte de cada obra: semanal, quincenal, mensual o trimestral. | Debería | 0,73 | 2 |
| 41 | RF-038 | Mientras una solicitud de compra esté «pendiente», el sistema deberá permitir a su solicitante anularla con motivo. | Debería | 0,72 | 2 |
| 42 | RF-041 | Cuando una compra urgente sea legalizada o devuelta con observación, el sistema deberá notificar al residente que la registró. | Debería | 0,69 | 2 |
| 43 | RF-031 | Si el material recibido difiere de la orden de compra en cantidad, estado o proveedor, entonces el sistema deberá marcar la recepción «con novedad» y alertar a la administradora de proyectos. | Debería | 0,67 | 2 |
| 44 | RF-032 | El sistema deberá permitir al residente de obra registrar una devolución con el material, la cantidad, el motivo y la orden de compra asociada. | Debería | 0,67 | 2 |
| 45 | RNF-010 | El sistema deberá exportar el presupuesto, el consolidado y los reportes de avance a formato .xlsx. | Debería | 0,67 | 2 |
| 46 | RF-016 | El sistema deberá permitir a la administradora de proyectos marcar una compra como verificada contra cotización, orden de compra y soporte. | Debería | 0,63 | 2 |
| 47 | RNF-009 | El sistema deberá conservar la información de cada obra durante al menos 5 años después de su cierre. | Debería | 0,63 | 2 |
| 48 | RNF-001 | El sistema deberá permitir que un residente de obra registre el avance de un corte de hasta 10 actividades en 15 minutos o menos. | Debería | 0,56 | 2 |
| 49 | RF-004 | Cuando una solicitud de compra quede en estado «pendiente», el sistema deberá notificar al primer aprobador de su ruta. | Debería | 0,56 | 2 |
| 50 | RF-010 | Cuando una solicitud sea aprobada o rechazada, el sistema deberá notificar la decisión al residente que la registró. | Debería | 0,56 | 2 |
| 51 | RNF-005 | El sistema deberá mostrar el saldo del rubro en 3 segundos o menos con una conexión móvil 3G. | Debería | 0,56 | 2 |
| 52 | RF-021 | El sistema deberá generar, por obra y periodo, un consolidado con las compras, el gasto acumulado, el saldo por rubro y el avance por actividad. | Debería | 0,50 | 2 |
| 53 | RF-018 | Cuando se apruebe un ajuste al presupuesto de una obra, el sistema deberá guardar una nueva versión y conservar la anterior. | Debería | 0,49 | 2 |
| 54 | RF-028 | Cuando el gerente de obra devuelva un reporte de avance, el sistema deberá exigir el motivo, notificar al residente y conservar la versión devuelta. | Debería | 0,46 | 2 |
| 55 | RF-029 | Cuando se corrija un reporte de avance devuelto, el sistema deberá recalcular los consolidados que usaron la versión anterior. | Debería | 0,37 | 2 |
| 56 | RF-015 | Si una compra urgente sigue «por legalizar» al vencer el plazo de legalización, entonces el sistema deberá alertar al aprobador que la tiene a cargo. | Podría | 0,59 | 3 |
| 57 | RF-022 | El sistema deberá reportar por mes y por obra la cantidad de solicitudes de compra en cada estado. | Podría | 0,48 | 3 |
| 58 | RNF-011 | El sistema deberá estar disponible el 99 % del tiempo entre las 6:00 y las 18:00, de lunes a sábado. | Podría | 0,40 | 3 |

**Entrega 1:** los «Debe»: el flujo completo de compras con saldo, compra urgente, presupuesto, registro de avance con y sin conexión, recepción, trazabilidad y acceso por rol.
**Entrega 2:** los «Debería»: notificaciones, alertas, consolidado, devoluciones y correcciones.
**Entrega 3:** los «Podría».
