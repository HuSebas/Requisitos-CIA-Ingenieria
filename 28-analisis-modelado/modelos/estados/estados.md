# Máquinas de estados

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Objetos | Solicitud de compra (DES-01), compra urgente (DES-02) y reporte de avance (DES-03) |
| Regla común | Toda transición escribe un registro de cambio con usuario, fecha y valor anterior (RF-034) |

Un estado es una situación en la que el objeto permanece y que cambia lo que se puede hacer con él. Las marcas («sobre el tope», «plazo vencido», «verificada», «con exceso») son datos del objeto, no estados.

## 1. DES-01 · Solicitud de compra

Diagrama: [`des-01-solicitud-compra.puml`](des-01-solicitud-compra.puml).

### Transiciones

| ID | Origen → destino | Evento · quién lo produce | Guarda | Acción | Caso de uso | Requisitos |
|---|---|---|---|---|---|---|
| T-01 | Inicio → Pendiente | registrar solicitud · Residente de obra | — | determinar ruta de aprobación | CU-01 | RF-001, RF-003 |
| T-02 | Pendiente → Pendiente | aprobar · Aprobador | falta la decisión de otro aprobador | notificar al aprobador que sigue | CU-02 | RF-042 |
| T-03 | Pendiente → Pendiente | aprobar · Aprobador | la ruta ya no corresponde al saldo | reasignar ruta | CU-02 | RF-043 |
| T-04 | Pendiente → Aprobada | aprobar · Aprobador | aprobaron todos los de la ruta | sumar valor al gasto acumulado | CU-02 | RF-007, RF-008, RF-010 |
| T-05 | Pendiente → Rechazada | rechazar · Aprobador | con motivo | — | CU-02 | RF-009, RF-010 |
| T-06 | Pendiente → Anulada | anular · Residente de obra | la anula su solicitante, con motivo | — | CU-19 | RF-038 |

### Estado × evento

Cada celda dice a qué estado lleva el evento. «✗» significa que el sistema lo rechaza.

| Estado | aprobar | rechazar | anular |
|---|---|---|---|
| Pendiente | Pendiente (T-02) · Pendiente (T-03) · Aprobada (T-04) | Rechazada (T-05) | Anulada (T-06) |
| Aprobada | ✗ | ✗ | ✗ |
| Rechazada | ✗ | ✗ | ✗ |
| Anulada | ✗ | ✗ | ✗ |

### Qué puede hacer cada rol

| Acción | Estado | Residente de obra | Aprobador de la ruta | Otros roles |
|---|---|---|---|---|
| Consultar la solicitud | Cualquiera | Sí, las suyas | Sí | Administradora, gerente de obra y gerente general |
| Aprobar o rechazar | Pendiente | No | Sí, quien sigue en la ruta y no la registró (RN-06) | No |
| Anular | Pendiente | Sí, su solicitante, con motivo | No | No |
| Cualquier cambio | Aprobada, Rechazada, Anulada | No | No | No |

### Estados

| Estado | Definición | Qué se permite | Qué se prohíbe |
|---|---|---|---|
| Pendiente | La solicitud está registrada y espera la decisión de uno o más aprobadores de su ruta. | Aprobar, rechazar, anular, consultar. | Sumar su valor al gasto acumulado; registrar su orden de compra. |
| Aprobada | Todos los aprobadores de la ruta la aprobaron y su valor ya cuenta en el gasto acumulado. | Registrar la orden de compra (CU-20), la recepción (CU-13) y la verificación (CU-15). | Volver a decidirla o anularla. |
| Rechazada | Un aprobador la rechazó con motivo. El saldo no cambió. | Consultar. | Cualquier cambio. Si la necesidad persiste, se registra una solicitud nueva. |
| Anulada | Su solicitante la retiró antes de la decisión. | Consultar. | Cualquier cambio. |

**Pregunta abierta.** ¿Puede anularse una solicitud ya aprobada si todavía no tiene orden de compra? Hoy no se permite. Se pregunta a la administradora de proyectos.

## 2. DES-02 · Compra urgente

Diagrama: [`des-02-compra-urgente.puml`](des-02-compra-urgente.puml).

### Transiciones

| ID | Origen → destino | Evento · quién lo produce | Guarda | Acción | Caso de uso | Requisitos |
|---|---|---|---|---|---|---|
| T-07 | Inicio → Por legalizar | registrar compra urgente · Residente de obra | con rubro, valor y soporte | sumar valor al gasto acumulado | CU-03 | RF-012, RF-040 |
| T-08 | Por legalizar → Por legalizar | devolver con observación · Aprobador | — | notificar al residente | CU-04 | RF-039, RF-041 |
| T-09 | Por legalizar → Legalizada | legalizar · Aprobador | — | registrar aprobador y fecha | CU-04 | RF-014, RF-041 |

### Estado × evento

Cada celda dice a qué estado lleva el evento. «✗» significa que el sistema lo rechaza.

| Estado | devolver con observación | legalizar |
|---|---|---|
| Por legalizar | Por legalizar (T-08) | Legalizada (T-09) |
| Legalizada | ✗ | ✗ |

### Qué puede hacer cada rol

| Acción | Estado | Residente de obra | Aprobador (PD-08) | Otros roles |
|---|---|---|---|---|
| Consultar la compra | Cualquiera | Sí, las suyas | Sí | Administradora, gerente de obra, gerente general; contador si está verificada |
| Legalizar o devolver con observación | Por legalizar | No | Sí | No |
| Verificar | Legalizada | No | No | Administradora de proyectos (CU-15) |

### Estados

| Estado | Definición | Qué se permite | Qué se prohíbe |
|---|---|---|---|
| Por legalizar | La compra ya se hizo y su valor ya cuenta en el gasto acumulado, pero ningún aprobador la ha validado. | Legalizar o devolver con observación. | Verificarla y pasarla a pago. |
| Legalizada | Un aprobador validó la compra y su soporte. | Verificar (CU-15) y consultar. | Cambiar su valor o su rubro. |

**Preguntas abiertas (HC-03).** ¿Cómo corrige el residente una compra devuelta con observación: reemplaza el soporte, cambia el rubro? ¿Y qué ocurre si el aprobador concluye que la compra no corresponde a la obra? El modelo solo permite devolverla con observación; falta el requisito de la corrección. Se pregunta al contador y a la administradora de proyectos.

## 3. DES-03 · Reporte de avance

Diagrama: [`des-03-reporte-avance.puml`](des-03-reporte-avance.puml).

### Transiciones

| ID | Origen → destino | Evento · quién lo produce | Guarda | Acción | Caso de uso | Requisitos |
|---|---|---|---|---|---|---|
| T-10 | Inicio → Pendiente de sincronizar | registrar avance del corte · Residente de obra | avance válido y con fotografía | — | CU-09 | RF-023, RF-024 |
| T-11 | Pendiente de sincronizar → Registrado | sincronizar · Sistema, al detectar conexión | hay conexión | actualizar avance de la obra | CU-09 | RF-025, RF-027 |
| T-12 | Registrado → Devuelto | devolver · Gerente de obra | con motivo | notificar al residente | CU-11 | RF-028 |
| T-13 | Devuelto → Pendiente de sincronizar | corregir avance · Residente de obra | — | crear versión nueva y conservar la anterior | CU-09 | RF-023, RF-029 |

### Estado × evento

Cada celda dice a qué estado lleva el evento. «✗» significa que el sistema lo rechaza.

| Estado | sincronizar | devolver | corregir avance |
|---|---|---|---|
| Pendiente de sincronizar | Registrado (T-11) | ✗ | ✗ |
| Registrado | ✗ | Devuelto (T-12) | ✗ |
| Devuelto | ✗ | ✗ | Pendiente de sincronizar (T-13) |

### Qué puede hacer cada rol

| Acción | Estado | Residente de obra | Gerente de obra | Otros roles |
|---|---|---|---|---|
| Consultar el reporte | Registrado, Devuelto | Sí | Sí | Administradora y gerente general |
| Registrar | — | Sí | No | No |
| Devolver con motivo | Registrado | No | Sí | No |
| Corregir | Devuelto | Sí | No | No |

### Estados

| Estado | Definición | Qué se permite | Qué se prohíbe |
|---|---|---|---|
| Pendiente de sincronizar | El reporte está guardado en el dispositivo del residente y aún no llega al sistema central. | Sincronizar cuando hay conexión. | Consultarlo desde otro dispositivo; incluirlo en el avance de la obra. |
| Registrado | El reporte llegó al sistema central y es el vigente de su corte. | Consultar; devolver con motivo. | Registrar otro reporte para el mismo corte (RN-14). |
| Devuelto | El gerente de obra encontró datos inconsistentes y lo devolvió. | Corregir, lo que crea una versión nueva. | Usarlo en consolidados nuevos. |

**Sobre el tiempo.** T-11 la produce el sistema. Si no hay conexión, no ocurre y el reporte sigue pendiente; si la sincronización se repite, el reporte no se duplica (RF-025).

