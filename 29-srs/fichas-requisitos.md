# Fichas de requisitos

| Campo | Valor |
|---|---|
| Versión | 1.3 · 2026-11-16 — revisión interna del SRS: identificadores de tres dígitos, «deberá» como verbo de obligación, RF-016 dividido en RF-016 y RF-045, RF-035 y RF-040 con una sola obligación |
| Formato | Ficha de ocho campos basada en la plantilla Volere |

Campos: identificador y tipo · descripción · justificación · fuente · criterio de ajuste · prioridad · dependencias · historial.

## RF-001

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando el residente de obra registre una solicitud de compra, el sistema deberá guardarla en estado «pendiente» con obra, actividad o rubro, insumo, cantidad, valor estimado, fecha requerida, solicitante y fecha de registro. |
| Justificación | Hoy la solicitud se hace por llamada y no queda nada escrito. |
| Fuente | RC-01 · metas G2.1 |
| Criterio de ajuste | Una solicitud registrada se consulta después con los nueve datos y en estado «pendiente». |
| Prioridad | Debe |
| Dependencias | CU-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-002

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si a una solicitud de compra le falta un dato obligatorio o su rubro no pertenece al presupuesto de la obra, entonces el sistema deberá impedir el registro, indicar el dato que falta y conservar los datos ya ingresados. |
| Justificación | Una solicitud incompleta obliga a volver a llamar al residente. |
| Fuente | RC-01 · metas G2.1 |
| Criterio de ajuste | Con cada dato obligatorio omitido por separado, la solicitud no se registra y el mensaje nombra ese dato. |
| Prioridad | Debe |
| Dependencias | CU-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-003

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando se registre una solicitud de compra, el sistema deberá asignarle la ruta de aprobación que determinan las reglas RN-02 a RN-05. |
| Justificación | La ruta de aprobación depende del saldo y de los imprevistos, y hoy se resuelve por teléfono. |
| Fuente | RC-02, RC-06 · metas G2.2 |
| Criterio de ajuste | Para cada columna de la tabla de decisión, la solicitud queda con los aprobadores que la columna indica. |
| Prioridad | Debe |
| Dependencias | CU-01, RN-02, RN-03, RN-04, RN-05, RN-06, RN-19, PD-02 |
| Historial | 1.0 · 2026-11-15 · creación<br>1.1 · 2026-11-16 · ajuste por la ruta de aprobación |

## RF-004

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando una solicitud de compra quede en estado «pendiente», el sistema deberá notificar al primer aprobador de su ruta. |
| Justificación | Si la aprobación se demora, la actividad se frena o se compra con caja menor. |
| Fuente | RC-03 · metas G2.2 |
| Criterio de ajuste | El aprobador recibe la notificación en menos de 1 minuto con conexión disponible. |
| Prioridad | Debería |
| Dependencias | CU-01 |
| Historial | 1.0 · 2026-11-15 · creación<br>1.1 · 2026-11-16 · ajuste por la ruta de aprobación |

## RF-005

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando el aprobador abra una solicitud pendiente, el sistema deberá mostrar el valor solicitado y el saldo disponible del rubro calculado en ese momento según RN-01. |
| Justificación | El gerente de obra aprobó una compra sin conocer el saldo y hubo que ajustar el presupuesto. |
| Fuente | RC-04 · metas G2.3 |
| Criterio de ajuste | El saldo mostrado es igual a presupuesto menos gasto acumulado, incluidas las compras urgentes por legalizar registradas hasta ese instante. |
| Prioridad | Debe |
| Dependencias | CU-02, CU-05, HU-01, RN-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-006

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si el valor solicitado supera el saldo disponible del rubro, entonces el sistema deberá mostrar el valor del exceso sin aprobar ni rechazar la solicitud. |
| Justificación | La decisión sobre un exceso es del aprobador, no del sistema. |
| Fuente | RC-04 · metas G2.3 |
| Criterio de ajuste | Con saldo de $3.500.000 y solicitud de $4.000.000 se muestra un exceso de $500.000 y la solicitud sigue «pendiente». |
| Prioridad | Debe |
| Dependencias | CU-02, HU-01, RN-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-007

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando el aprobador decida una solicitud, el sistema deberá registrar la decisión, el aprobador, la fecha y el saldo del rubro vigente al decidir. |
| Justificación | La empresa necesita saber quién aprobó cada gasto y con qué información. |
| Fuente | RC-05 · metas G2.5 |
| Criterio de ajuste | Toda solicitud aprobada o rechazada muestra los cuatro datos y no admite modificarlos. |
| Prioridad | Debe |
| Dependencias | CU-02 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-008

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando una solicitud de compra sea aprobada por todos los aprobadores de su ruta, el sistema deberá sumar su valor al gasto acumulado del rubro. |
| Justificación | El gasto debe quedar al día sin esperar el consolidado semanal. |
| Fuente | RC-12 · metas G1.2 |
| Criterio de ajuste | Tras aprobar una solicitud de $2.000.000, el saldo del rubro disminuye exactamente en $2.000.000. |
| Prioridad | Debe |
| Dependencias | CU-02, RN-01, RN-19 |
| Historial | 1.0 · 2026-11-15 · creación<br>1.1 · 2026-11-16 · ajuste por la ruta de aprobación |

## RF-009

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si el aprobador rechaza una solicitud, entonces el sistema deberá exigir el motivo y dejar sin cambio el saldo del rubro. |
| Justificación | El residente necesita saber por qué no se aprobó para replantear la compra. |
| Fuente | RC-05 · metas G2.4, G2.5 |
| Criterio de ajuste | Un rechazo sin motivo no se registra; tras un rechazo válido el saldo es el mismo de antes. |
| Prioridad | Debe |
| Dependencias | CU-02, RN-10 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-010

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando una solicitud sea aprobada o rechazada, el sistema deberá notificar la decisión al residente que la registró. |
| Justificación | El residente no debe llamar para saber si puede comprar. |
| Fuente | RC-03 · metas G2.2 |
| Criterio de ajuste | El solicitante recibe la notificación en menos de 1 minuto con conexión disponible. |
| Prioridad | Debería |
| Dependencias | CU-02 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-011

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | El sistema deberá permitir asociar a cada compra uno o más soportes en imagen o PDF, ligados a la compra y a la obra. |
| Justificación | Las facturas viajan como fotos sueltas y se pierden. |
| Fuente | RC-07 · metas G2.5 |
| Criterio de ajuste | Un soporte cargado se recupera desde la compra y desde la obra a la que pertenece. |
| Prioridad | Debe |
| Dependencias | CU-03, CU-13 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-012

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando el residente registre una compra urgente con rubro, valor y fotografía del soporte, el sistema deberá guardarla en estado «por legalizar» y sumar su valor al gasto acumulado del rubro en la misma fecha del registro. |
| Justificación | Las compras de caja menor quedan fuera del control presupuestal hasta el consolidado. |
| Fuente | RC-08 · metas G2.6 |
| Criterio de ajuste | Con saldo de $3.500.000 y compra urgente de $800.000, el saldo pasa a $2.700.000 el mismo día y la compra queda «por legalizar». |
| Prioridad | Debe |
| Dependencias | CU-03, HU-03, RN-07, RN-08, PD-03 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-013

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si a una compra urgente le falta el rubro o el soporte, entonces el sistema deberá impedir el registro, indicar lo que falta y conservar los datos ya ingresados. |
| Justificación | Una compra sin rubro no se puede descontar de ningún saldo. |
| Fuente | RC-08 · metas G2.6 |
| Criterio de ajuste | Sin rubro no se registra la compra ni se descuenta ningún saldo; el valor y la foto siguen en pantalla. |
| Prioridad | Debe |
| Dependencias | CU-03, HU-03, RN-08 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-014

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando el aprobador legalice una compra urgente, el sistema deberá cambiar su estado a «legalizada» sin modificar el gasto acumulado del rubro. |
| Justificación | El valor ya se descontó al registrarla; descontarlo de nuevo duplicaría el gasto. |
| Fuente | RC-08 · metas G2.6 |
| Criterio de ajuste | El saldo antes y después de legalizar es el mismo. |
| Prioridad | Debe |
| Dependencias | CU-04, HU-03, RN-07, PD-08 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-015

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si una compra urgente sigue «por legalizar» al vencer el plazo de legalización, entonces el sistema deberá alertar al aprobador que la tiene a cargo. |
| Justificación | Una compra sin legalizar es un gasto sin validar. |
| Fuente | RC-08 · metas G2.6 |
| Criterio de ajuste | Al sexto día hábil sin legalizar se genera una alerta para el aprobador. |
| Prioridad | Podría |
| Dependencias | CU-04, RN-09, PD-04 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-016

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | El sistema deberá permitir a la administradora de proyectos marcar una compra como verificada contra cotización, orden de compra y soporte. |
| Justificación | La administradora revisa hoy esos documentos a mano antes de pedir el desembolso. |
| Fuente | RC-09 · metas G2.8 |
| Criterio de ajuste | Una compra marcada como verificada muestra quién la verificó y en qué fecha. |
| Prioridad | Debería |
| Dependencias | CU-15 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-045

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | El sistema deberá mostrar al contador solo las compras verificadas, con su soporte. |
| Justificación | El contador recibe hoy los soportes por mensajes y no sabe cuáles ya fueron revisados. |
| Fuente | RC-09 · metas G2.8 |
| Criterio de ajuste | Una compra sin verificar no aparece en la consulta del contador. |
| Prioridad | Debería |
| Dependencias | CU-18, PD-10 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-038

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Mientras una solicitud de compra esté «pendiente», el sistema deberá permitir a su solicitante anularla con motivo. |
| Justificación | Una necesidad puede desaparecer antes de la decisión y hoy no hay cómo retirar el pedido. |
| Fuente | DES-01 · T-06 · metas G2.1 |
| Criterio de ajuste | Una solicitud anulada queda «anulada», no cambia el saldo y no admite decisiones. |
| Prioridad | Debería |
| Dependencias | CU-19, RN-17 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-039

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si el aprobador no acepta una compra urgente, entonces el sistema deberá exigir la observación y mantener la compra «por legalizar». |
| Justificación | Un soporte ilegible o un rubro equivocado deben poder corregirse sin perder el registro. |
| Fuente | DES-02 · T-08 · metas G2.6 |
| Criterio de ajuste | Tras la devolución la compra sigue «por legalizar», muestra la observación y el saldo no cambia. |
| Prioridad | Debería |
| Dependencias | CU-04, HU-03 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-040

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando se registre una compra urgente, el sistema deberá notificar al aprobador a quien corresponde legalizarla. |
| Justificación | El aprobador debe enterarse el mismo día de un gasto que ya se hizo. |
| Fuente | DSE-03 · metas G2.6 |
| Criterio de ajuste | El aprobador recibe la notificación en menos de 1 minuto con conexión disponible. |
| Prioridad | Debería |
| Dependencias | CU-03, HU-03, PD-08 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-041

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Cuando una compra urgente sea legalizada o devuelta con observación, el sistema deberá notificar al residente que la registró. |
| Justificación | El residente debe saber si la compra quedó aceptada o qué debe corregir. |
| Fuente | DES-02 · T-08, T-09 · metas G2.6 |
| Criterio de ajuste | El residente recibe la notificación en menos de 1 minuto con conexión disponible. |
| Prioridad | Debería |
| Dependencias | CU-04 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-042

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Mientras a una solicitud de compra le falte la decisión de un aprobador de su ruta, el sistema deberá mantenerla «pendiente» y notificar al aprobador que sigue. |
| Justificación | Algunas compras requieren visto bueno técnico o dos aprobaciones. |
| Fuente | RC-02, RC-06 · metas G2.2, G2.4 |
| Criterio de ajuste | Con una ruta de dos aprobadores, tras la primera aprobación la solicitud sigue «pendiente», el saldo no cambia y el segundo aprobador es notificado. |
| Prioridad | Debe |
| Dependencias | CU-02, RN-03, RN-04, RN-19 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-043

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | Si al decidir una solicitud la ruta que corresponde al saldo vigente es distinta de la asignada, entonces el sistema deberá reasignar la ruta y notificar al nuevo aprobador. |
| Justificación | El saldo puede cambiar entre el registro y la decisión, y un exceso sobre imprevistos solo lo aprueba el gerente general. |
| Fuente | RC-02 · metas G2.2 |
| Criterio de ajuste | Si el saldo se consumió después del registro y la solicitud ahora supera los imprevistos, pasa al gerente general y no queda aprobada. |
| Prioridad | Debe |
| Dependencias | CU-02, RN-02, RN-04, RN-05 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-044

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Compras |
| Descripción | El sistema deberá permitir a la administradora de proyectos registrar la orden de compra de una solicitud aprobada, con número, proveedor y fecha. |
| Justificación | La recepción se valida contra la orden de compra, así que el sistema debe conocerla. |
| Fuente | DCL-02 · metas G4.1 |
| Criterio de ajuste | Una solicitud aprobada con orden registrada muestra número, proveedor y fecha, y admite recepciones. |
| Prioridad | Debe |
| Dependencias | CU-20, RN-22 |
| Historial | 1.0 · 2026-11-16 · descubierto al modelar |

## RF-017

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | El sistema deberá permitir al gerente de obra registrar el presupuesto de una obra por actividad y rubro, incluido el rubro de imprevistos. |
| Justificación | Sin presupuesto por rubro no hay saldo que mostrar. |
| Fuente | RC-11 · metas G1.1 |
| Criterio de ajuste | La suma de los rubros registrados es igual al total del presupuesto de la obra. |
| Prioridad | Debe |
| Dependencias | CU-06 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-018

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | Cuando se apruebe un ajuste al presupuesto de una obra, el sistema deberá guardar una nueva versión y conservar la anterior. |
| Justificación | Casi todas las obras se alargan y el presupuesto se ajusta sin dejar rastro. |
| Fuente | RC-17 · metas G5.4 |
| Criterio de ajuste | Tras un ajuste se pueden consultar la versión vigente y todas las anteriores con fecha y autor. |
| Prioridad | Debería |
| Dependencias | CU-16, PD-11 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-019

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | El sistema deberá mostrar por obra, en una sola vista, el presupuesto, el gasto acumulado y el saldo por actividad y rubro, junto con el avance físico por actividad. |
| Justificación | El gerente de obra quiere ver avance y gasto sin llamar a la oficina. |
| Fuente | RC-13 · metas G1.3 |
| Criterio de ajuste | Los valores de la vista coinciden con las compras y los reportes de avance registrados hasta ese momento. |
| Prioridad | Debe |
| Dependencias | CU-07, CU-05, RN-01, RN-16 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-020

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | Cuando el gasto acumulado de un rubro alcance el umbral de alerta, el sistema deberá alertar a la administradora de proyectos y al gerente de obra. |
| Justificación | Un sobrecosto se descubrió solo al consolidar. |
| Fuente | RC-14 · metas G1.4 |
| Criterio de ajuste | Con umbral del 80 % y presupuesto de $20.000.000, la alerta se genera cuando el gasto acumulado llega a $16.000.000. |
| Prioridad | Debería |
| Dependencias | CU-08, RN-11, PD-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-021

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | El sistema deberá generar, por obra y periodo, un consolidado con las compras, el gasto acumulado, el saldo por rubro y el avance por actividad. |
| Justificación | La consolidación manual toma entre 4 y 8 horas semanales. |
| Fuente | RC-15 · metas G1.5 |
| Criterio de ajuste | El consolidado de un periodo se obtiene en menos de 1 minuto y sus totales coinciden con los registros. |
| Prioridad | Debería |
| Dependencias | CU-17 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-022

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Presupuesto y costos |
| Descripción | El sistema deberá reportar por mes y por obra la cantidad de solicitudes de compra en cada estado. |
| Justificación | No existe registro de cuántas solicitudes se procesan al mes. |
| Fuente | RC-16 · metas — |
| Criterio de ajuste | El reporte de un mes muestra un total igual al número de solicitudes registradas en ese mes. |
| Prioridad | Podría |
| Dependencias | CU-17 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-023

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | El sistema deberá permitir al residente de obra registrar en cada corte la cantidad ejecutada o el porcentaje de avance de cada actividad, con al menos una fotografía. |
| Justificación | El avance es la base del seguimiento y hoy se anota a mano. |
| Fuente | RC-20 · metas G3.1 |
| Criterio de ajuste | Un reporte de corte guardado muestra, por actividad, el avance y su fotografía. |
| Prioridad | Debe |
| Dependencias | CU-09, HU-02, RN-13, RN-14 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-024

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | Mientras el dispositivo esté sin conexión, el sistema deberá guardar en el dispositivo los reportes de avance que registre el residente. |
| Justificación | En los frentes de obra la señal es irregular. |
| Fuente | RC-21 · metas G3.2 |
| Criterio de ajuste | Sin conexión, el reporte se guarda y aparece como pendiente de sincronizar. |
| Prioridad | Debe |
| Dependencias | CU-09, HU-02, RN-18 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-025

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | Cuando el dispositivo recupere la conexión, el sistema deberá sincronizar los reportes pendientes sin intervención del residente y sin duplicarlos. |
| Justificación | El residente no debe digitar dos veces. |
| Fuente | RC-21 · metas G3.2 |
| Criterio de ajuste | Tras recuperar la conexión, cada reporte pendiente aparece una sola vez en el sistema central. |
| Prioridad | Debe |
| Dependencias | CU-09, HU-02, RN-18 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-026

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | El sistema deberá permitir a la administradora de proyectos definir la periodicidad de corte de cada obra: semanal, quincenal, mensual o trimestral. |
| Justificación | La periodicidad varía por obra y por contrato. |
| Fuente | RC-22 · metas G3.3 |
| Criterio de ajuste | Una obra con corte quincenal genera fechas de corte cada 15 días. |
| Prioridad | Debería |
| Dependencias | CU-12, PD-06 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-027

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | El sistema deberá mostrar al gerente de obra, a la administradora de proyectos y al gerente general el avance de cada obra por actividad y por corte. |
| Justificación | El avance llega hoy días después del corte, en Excel o fotos. |
| Fuente | RC-13, RC-33 · metas G3 |
| Criterio de ajuste | Un reporte sincronizado se puede consultar en menos de 1 minuto. |
| Prioridad | Debe |
| Dependencias | CU-10 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-028

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | Cuando el gerente de obra devuelva un reporte de avance, el sistema deberá exigir el motivo, notificar al residente y conservar la versión devuelta. |
| Justificación | Hoy la corrección se pide por llamada y se pierde la versión anterior. |
| Fuente | RC-23 · metas G3.4 |
| Criterio de ajuste | Tras una devolución se consultan la versión devuelta, su motivo y la versión corregida. |
| Prioridad | Debería |
| Dependencias | CU-11, RN-14 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-029

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Avance de obra |
| Descripción | Cuando se corrija un reporte de avance devuelto, el sistema deberá recalcular los consolidados que usaron la versión anterior. |
| Justificación | Un consolidado con datos corregidos queda desactualizado. |
| Fuente | RC-24 · metas G3.4 |
| Criterio de ajuste | El consolidado del periodo refleja el valor corregido sin volver a generarlo a mano. |
| Prioridad | Debería |
| Dependencias | CU-11, CU-17 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-030

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Recepción de materiales |
| Descripción | El sistema deberá permitir al residente de obra registrar la recepción de un material contra su orden de compra, con la cantidad recibida y el estado. |
| Justificación | Lo que ocurre no son duplicados sino material faltante o incompleto. |
| Fuente | RC-25 · metas G4.1 |
| Criterio de ajuste | Una recepción registrada muestra la cantidad pedida, la recibida y el estado. |
| Prioridad | Debe |
| Dependencias | CU-13, RN-15 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-031

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Recepción de materiales |
| Descripción | Si el material recibido difiere de la orden de compra en cantidad, estado o proveedor, entonces el sistema deberá marcar la recepción «con novedad» y alertar a la administradora de proyectos. |
| Justificación | Las diferencias se reclaman hoy de palabra. |
| Fuente | RC-26 · metas G4.2 |
| Criterio de ajuste | Con 100 unidades pedidas y 80 recibidas, la recepción queda «con novedad» y se genera la alerta. |
| Prioridad | Debería |
| Dependencias | CU-13, RN-15 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-032

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Recepción de materiales |
| Descripción | El sistema deberá permitir al residente de obra registrar una devolución con el material, la cantidad, el motivo y la orden de compra asociada. |
| Justificación | Las devoluciones no dejan ningún documento. |
| Fuente | RC-27 · metas G4.3 |
| Criterio de ajuste | Una devolución registrada se consulta desde la orden de compra. |
| Prioridad | Debería |
| Dependencias | CU-14 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-033

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Recepción de materiales |
| Descripción | Cuando se registre una devolución, el sistema deberá restar su valor del gasto acumulado del rubro. |
| Justificación | El costo ejecutado no debe incluir material devuelto. |
| Fuente | RC-28 · metas G2.7 |
| Criterio de ajuste | Tras devolver material por $300.000, el saldo del rubro aumenta en $300.000. |
| Prioridad | Debería |
| Dependencias | CU-14, RN-12 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-034

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Transversal |
| Descripción | Cuando se cree o modifique un presupuesto, una compra o un reporte de avance, el sistema deberá registrar el usuario, la fecha y el valor anterior. |
| Justificación | Hay varias versiones del mismo Excel sin trazabilidad. |
| Fuente | RC-29 · metas G5.1 |
| Criterio de ajuste | Para cualquier registro modificado se obtiene la lista de cambios con usuario, fecha y valor anterior. |
| Prioridad | Debe |
| Dependencias | RN-17 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-035

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Transversal |
| Descripción | El sistema deberá impedir la eliminación de presupuestos, compras y reportes de avance, que solo admiten anulación con motivo (RN-17). |
| Justificación | La información se pierde cuando cambia quien llevaba la obra. |
| Fuente | RC-29 · metas G5.1 |
| Criterio de ajuste | Ningún rol dispone de una acción de eliminar; un registro anulado sigue consultable. |
| Prioridad | Debe |
| Dependencias | RN-17 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-036

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Transversal |
| Descripción | El sistema deberá autenticar a cada usuario y asignarle un único rol por obra. |
| Justificación | El acceso por rol exige saber quién es cada usuario. |
| Fuente | RC-30 · metas G5.2 |
| Criterio de ajuste | Un usuario sin autenticar no accede a ninguna función. |
| Prioridad | Debe |
| Dependencias | RN-16 |
| Historial | 1.0 · 2026-11-15 · creación |

## RF-037

| Campo | Contenido |
|---|---|
| Tipo | Funcional · Transversal |
| Descripción | El sistema deberá mostrar las partidas del presupuesto solo a los roles autorizados en RN-16. |
| Justificación | El presupuesto es información reservada. |
| Fuente | RC-30, RC-37 · metas G5.2, G5.3 |
| Criterio de ajuste | Con cada rol, la vista del presupuesto muestra exactamente lo que RN-16 autoriza. |
| Prioridad | Debe |
| Dependencias | CU-07, RN-16, PD-05 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-001

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Capacidad de interacción · Operabilidad |
| Descripción | El sistema deberá permitir que un residente de obra registre el avance de un corte de hasta 10 actividades en 15 minutos o menos. |
| Justificación | Deriva de RC-34. |
| Fuente | RC-34 |
| Criterio de ajuste | Tiempo medido con un residente después de una inducción de 30 minutos. Línea base: 40 a 60 minutos (E-01 #11). |
| Prioridad | Debería |
| Dependencias | RF-023, PD-09 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-002

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Capacidad de interacción · Operabilidad |
| Descripción | Los formularios de registro en campo deberán tener como máximo 8 campos obligatorios. |
| Justificación | Deriva de RC-35. |
| Fuente | RC-35 |
| Criterio de ajuste | Conteo de campos obligatorios en los formularios de avance, compra urgente y recepción. |
| Prioridad | Debería |
| Dependencias | RF-012, RF-023, RF-030 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-003

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Flexibilidad · Adaptabilidad |
| Descripción | El sistema deberá poder usarse desde el navegador de un celular con pantalla de 360 px de ancho o más y desde un portátil. |
| Justificación | Deriva de RC-32, RC-38. |
| Fuente | RC-32, RC-38 |
| Criterio de ajuste | Todas las funciones del residente se completan en un celular de 360 px sin desplazamiento horizontal. |
| Prioridad | Debe |
| Dependencias | RES-01 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-004

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Fiabilidad · Tolerancia a fallos |
| Descripción | El sistema deberá conservar sin pérdida los reportes de avance guardados sin conexión durante al menos 72 horas. |
| Justificación | Deriva de RC-21. |
| Fuente | RC-21 |
| Criterio de ajuste | Prueba: 10 reportes guardados sin conexión, dispositivo reiniciado, sincronización a las 72 horas; llegan los 10. |
| Prioridad | Debe |
| Dependencias | RF-024, RF-025 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-005

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Eficiencia de desempeño · Comportamiento temporal |
| Descripción | El sistema deberá mostrar el saldo del rubro en 3 segundos o menos con una conexión móvil 3G. |
| Justificación | Deriva de RC-04. |
| Fuente | RC-04 |
| Criterio de ajuste | Percentil 95 del tiempo de respuesta en 30 consultas. |
| Prioridad | Debería |
| Dependencias | RF-005 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-006

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Seguridad · Confidencialidad |
| Descripción | El sistema deberá aplicar el control de acceso por rol a toda consulta de presupuesto, compras y soportes, y cifrar las comunicaciones. |
| Justificación | Deriva de RC-30, RC-37. |
| Fuente | RC-30, RC-37 |
| Criterio de ajuste | Ninguna consulta de presupuesto responde sin sesión y rol válidos; todo el tráfico usa TLS. |
| Prioridad | Debe |
| Dependencias | RF-036, RF-037 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-007

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Seguridad · Integridad |
| Descripción | El sistema deberá impedir que los roles de campo modifiquen valores calculados: saldo, gasto acumulado y consolidados. |
| Justificación | Deriva de RC-36. |
| Fuente | RC-36 |
| Criterio de ajuste | Ningún formulario del residente permite editar un valor calculado. |
| Prioridad | Debe |
| Dependencias | RF-008, RF-019 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-008

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Seguridad · Responsabilidad |
| Descripción | El registro de cambios no deberá poder modificarse ni eliminarse desde ningún rol. |
| Justificación | Deriva de RC-29. |
| Fuente | RC-29 |
| Criterio de ajuste | No existe función de edición ni borrado sobre el registro de cambios. |
| Prioridad | Debe |
| Dependencias | RF-034, RF-035 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-009

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Fiabilidad · Recuperabilidad |
| Descripción | El sistema deberá conservar la información de cada obra durante al menos 5 años después de su cierre. |
| Justificación | Deriva de RC-31. |
| Fuente | RC-31 |
| Criterio de ajuste | Política de retención configurada en 5 años; restauración de una copia verificada una vez al año. |
| Prioridad | Debería |
| Dependencias | PD-07 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-010

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Compatibilidad · Interoperabilidad |
| Descripción | El sistema deberá exportar el presupuesto, el consolidado y los reportes de avance a formato .xlsx. |
| Justificación | Deriva de RC-39. |
| Fuente | RC-39 |
| Criterio de ajuste | Los tres archivos exportados abren en Excel sin errores y conservan los totales. |
| Prioridad | Debería |
| Dependencias | RES-02, RF-021 |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-011

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Fiabilidad · Disponibilidad |
| Descripción | El sistema deberá estar disponible el 99 % del tiempo entre las 6:00 y las 18:00, de lunes a sábado. |
| Justificación | Deriva de RC-33. |
| Fuente | RC-33 |
| Criterio de ajuste | Disponibilidad mensual medida en ese horario. |
| Prioridad | Podría |
| Dependencias | — |
| Historial | 1.0 · 2026-11-15 · creación |

## RNF-012

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Capacidad de interacción · Protección contra errores de usuario |
| Descripción | El sistema deberá pedir confirmación antes de registrar una aprobación, un rechazo, una anulación o una legalización. |
| Justificación | Deriva de HH-06. |
| Fuente | HH-06 |
| Criterio de ajuste | Las cuatro acciones muestran un paso de confirmación con el valor y su efecto sobre el saldo antes de registrarse. |
| Prioridad | Debería |
| Dependencias | RF-007, RF-014, RF-038 |
| Historial | 1.0 · 2026-11-16 · descubierto al prototipar |

## RNF-013

| Campo | Contenido |
|---|---|
| Tipo | De calidad · Capacidad de interacción · Inclusividad |
| Descripción | El sistema deberá cumplir el nivel AA de WCAG 2.2 en contraste, tamaño de los objetivos táctiles, etiquetas de los campos e indicador de foco. |
| Justificación | Deriva de CX-01. |
| Fuente | CX-01 |
| Criterio de ajuste | Texto con contraste de 4,5:1 o más; objetivos táctiles de 44 px o más; todo campo con etiqueta; foco visible con contraste de 3:1 o más. |
| Prioridad | Debería |
| Dependencias | RNF-003 |
| Historial | 1.0 · 2026-11-16 · descubierto al prototipar |
