# Escenarios de secuencia y operaciones del sistema

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Nivel | 1, caja negra: el sistema es un único participante. No hay clases, pantallas ni tecnologías |
| Diagramas | [DSE-01](dse-01-cu-01-solicitar-compra.puml) · [DSE-02](dse-02-cu-02-decidir-solicitud.puml) · [DSE-03](dse-03-cu-03-registrar-compra-urgente.puml) · [DSE-04](dse-04-cu-09-registrar-avance.puml) |

**Notación.** Flecha llena: mensaje síncrono, el emisor espera la respuesta. Flecha punteada: respuesta. Flecha de punta abierta: mensaje asíncrono, el emisor no espera. Cada fragmento lleva el número de la extensión del caso de uso que representa.

## ESC-01 · CU-01 Solicitar compra de insumos · DSE-01

| Paso del caso de uso | Mensaje | De → a | Requisito | Observaciones |
|---|---|---|---|---|
| 1 Registra la solicitud | registrar solicitud de compra | Residente → Sistema | RF-001 | Viajan obra, rubro, insumo, cantidad, valor estimado y fecha requerida. |
| 2 Valida los datos | (dentro del sistema; se ve solo si falla) | — | RF-002 | Extensión 2a. |
| 3 Calcula el saldo | calcular saldo del rubro | Sistema → Sistema | RF-005 | Incluye CU-05. |
| 4 Determina la ruta | determinar ruta de aprobación | Sistema → Sistema | RF-003 | Tabla de decisión RN-02 a RN-05. |
| 5 Registra «pendiente» | registrar solicitud «pendiente» | Sistema → Sistema | RF-001 | Transición T-01. |
| 6 Notifica al aprobador | notificar solicitud pendiente | Sistema → Aprobador | RF-004 | Asíncrono: el residente no espera a que el aprobador lea. |
| 7 Confirma al residente | solicitud registrada y ruta de aprobación | Sistema → Residente | RF-001 | Respuesta del mensaje del paso 1. |

| Extensión | Condición | Fragmento | Requisito |
|---|---|---|---|
| 2a | Falta un dato o el rubro no es de la obra | `break`, dibujada | RF-002 |
| 3a | El valor estimado supera el saldo | `opt`, dibujada | RF-006 |

## ESC-02 · CU-02 Decidir solicitud de compra · DSE-02

| Paso del caso de uso | Mensaje | De → a | Requisito | Observaciones |
|---|---|---|---|---|
| 1 Abre la solicitud | abrir solicitud pendiente | Aprobador → Sistema | RF-005 | |
| 2 Presenta valor y saldo | calcular saldo del rubro; solicitud, valor solicitado y saldo disponible | Sistema → Sistema; Sistema → Aprobador | RF-005, RNF-005 | El saldo se calcula en ese momento. Tiempo máximo: 3 segundos. |
| 3 Aprueba | aprobar solicitud | Aprobador → Sistema | RF-007 | |
| 4 Registra la decisión | registrar decisión | Sistema → Sistema | RF-007 | Aprobador, fecha y saldo vigente. |
| 5 Deja «aprobada» y suma | dejar solicitud «aprobada»; sumar valor al gasto acumulado | Sistema → Sistema | RF-008 | Transición T-04. |
| 6 Notifica al residente | notificar aprobación; solicitud aprobada | Sistema → Residente; Sistema → Aprobador | RF-010 | La notificación es asíncrona. |

| Extensión | Condición | Fragmento | Requisito |
|---|---|---|---|
| 2a | El saldo es menor que el valor solicitado | `opt`, dibujada | RF-006 |
| 3a | El aprobador rechaza | rama `else` del `alt`, dibujada | RF-009, RF-010 |
| 3b | La ruta ya no corresponde al saldo vigente | `break`, dibujada | RF-043 |
| 4a | Falta la decisión de otro aprobador | `break`, dibujada | RF-042 |
| 5a | El gasto llega al umbral de alerta | No dibujada: es el caso de uso CU-08 | RF-020 |

## ESC-03 · CU-03 Registrar compra urgente · DSE-03

| Paso del caso de uso | Mensaje | De → a | Requisito | Observaciones |
|---|---|---|---|---|
| 1 Registra la compra | registrar compra urgente | Residente → Sistema | RF-012 | Viajan rubro, valor, descripción y soporte. |
| 2 Valida | (dentro del sistema; se ve solo si falla) | — | RF-013 | Extensiones 2a y 2b. |
| 3 Suma el valor | sumar valor al gasto acumulado | Sistema → Sistema | RF-012 | Con la fecha del registro. |
| 4 Registra «por legalizar» | registrar compra «por legalizar»; notificar compra por legalizar | Sistema → Sistema; Sistema → Aprobador | RF-012, RF-040 | Transición T-07. |
| 5 Calcula el saldo | calcular saldo del rubro | Sistema → Sistema | RF-005 | Incluye CU-05. |
| 6 Confirma | compra registrada y saldo resultante | Sistema → Residente | RF-012 | |

| Extensión | Condición | Fragmento | Requisito |
|---|---|---|---|
| 2a | Falta el rubro, el valor o el soporte | `break`, dibujada | RF-013 |
| 2b | El valor supera el tope de caja menor | `opt`, dibujada | RF-012, RN-09 |
| 5a | El saldo queda negativo | Nota: no cambia los mensajes | RN-07 |

## ESC-04 · CU-09 Registrar avance de obra · DSE-04

| Paso del caso de uso | Mensaje | De → a | Requisito | Observaciones |
|---|---|---|---|---|
| 1 Registra el avance | registrar avance del corte | Residente → Sistema | RF-023 | Avance y fotografía por actividad. |
| 2 Valida | (dentro del sistema; se ve solo si falla) | — | RF-023 | Extensiones 1a y 2a. |
| 3 Guarda en el dispositivo | guardar reporte «pendiente de sincronizar»; reporte guardado en el dispositivo | Sistema → Sistema; Sistema → Residente | RF-024 | Transición T-10. El residente ya puede seguir. |
| 4 Sincroniza | sincronizar reporte | Sistema → Sistema | RF-025, RNF-004 | Sin intervención del residente. |
| 5 Deja «registrado» y actualiza | registrar reporte «registrado»; actualizar avance de la obra | Sistema → Sistema | RF-025, RF-027 | Transición T-11. |
| 6 Confirma | confirmar reporte registrado | Sistema → Residente | RF-025 | Asíncrono: puede ocurrir horas después del paso 1. |

| Extensión | Condición | Fragmento | Requisito |
|---|---|---|---|
| 1a | El corte ya tiene un reporte vigente no devuelto | `break`, dibujada | RN-14 |
| 2a | Avance fuera de rango o sin fotografía | `break`, dibujada | RF-023, RN-13 |
| 4a | No hay conexión | `loop`, dibujada | RF-024 |

## Operaciones del sistema

Lo que un actor le pide al sistema, visto desde el negocio.

| ID | Operación | Entra | Responde | Precondición | Caso de uso | Diagrama | Requisitos | Cobertura |
|---|---|---|---|---|---|---|---|---|
| OP-01 | Registrar solicitud de compra | Obra, rubro, insumo, cantidad, valor estimado, fecha requerida | Solicitud registrada y ruta · dato que falta | Residente asignado a la obra; presupuesto registrado | CU-01 | DSE-01 | RF-001, RF-002, RF-003, RF-004 | Completa |
| OP-02 | Abrir solicitud pendiente | Solicitud | Solicitud, valor y saldo · valor del exceso | El aprobador sigue en la ruta | CU-02 | DSE-02 | RF-005, RF-006 | Completa |
| OP-03 | Aprobar solicitud | Solicitud | Solicitud aprobada · aprobación registrada, aún pendiente · ruta reasignada | Solicitud «pendiente» | CU-02 | DSE-02 | RF-007, RF-008, RF-010, RF-042, RF-043 | Completa |
| OP-04 | Rechazar solicitud | Solicitud, motivo | Solicitud rechazada | Solicitud «pendiente» | CU-02 | DSE-02 | RF-007, RF-009, RF-010 | Completa |
| OP-05 | Registrar compra urgente | Rubro, valor, descripción, soporte | Compra registrada y saldo · dato que falta | Residente asignado a la obra; presupuesto registrado | CU-03 | DSE-03 | RF-011, RF-012, RF-013, RF-040 | Completa |
| OP-06 | Registrar avance del corte | Avance y fotografía por actividad | Reporte guardado; después, reporte registrado · corte con reporte vigente · dato por corregir | Obra con actividades y periodicidad de corte | CU-09 | DSE-04 | RF-023, RF-024, RF-025, RF-027 | Completa |

No hay mensajes a sistemas externos: el sistema no se integra con otros en esta versión.

## Preguntas del recorrido

| Pregunta | Respuesta | Produce |
|---|---|---|
| ¿Y si el residente envía dos veces la misma solicitud? | No hay regla. La alerta de duplicados se descartó por falta de evidencia (conflicto C-04). | Pregunta abierta para el contador. |
| ¿Y si dos aprobadores abren la misma solicitud a la vez? | Solo decide quien sigue en la ruta; el otro no puede aprobar. | Cubierto por RN-19. |
| ¿Y si el saldo cambia entre abrir y aprobar? | El sistema registra el saldo vigente al decidir y revisa la ruta. | RF-007, RF-043. |
| ¿Y si el dispositivo se apaga antes de sincronizar? | El reporte sigue guardado y se envía al recuperar la conexión. | RNF-004. |
| ¿Y si la sincronización se repite? | El reporte aparece una sola vez. | RF-025. |
| ¿Qué queda registrado y quién lo ve? | Cada decisión y cada cambio, con usuario y fecha. | RF-007, RF-034. |

## Lista de verificación

| Ítem | Pregunta | DSE-01 | DSE-02 | DSE-03 | DSE-04 |
|---|---|---|---|---|---|
| A1 | Título con identificador, caso de uso, escenario y nivel | Sí | Sí | Sí | Sí |
| A2 | Participantes del catálogo; el sistema es uno solo | Sí | Sí | Sí | Sí |
| A3 | Sin clases, tablas, tecnologías ni pantallas | Sí | Sí | Sí | Sí |
| A5 | 25 mensajes o menos | Sí (8) | Sí (20) | Sí (8) | Sí (10) |
| B1 | Cada mensaje síncrono tiene retorno o es asíncrono con razón | Sí | Sí | Sí | Sí |
| B3 | Nombres de negocio: verbo más objeto | Sí | Sí | Sí | Sí |
| B4 | Cada fragmento tiene guarda con su extensión | Sí | Sí | Sí | Sí |
| B5 | Anidamiento de dos niveles o menos | Sí | Sí | Sí | Sí |
| C1 | Cada paso del flujo principal tiene mensaje o razón | Sí | Sí | Sí | Sí |
| C3 | Cada extensión está dibujada o marcada con su razón | Sí | Sí | Sí | Sí |
| C6 | La garantía de éxito se ve en los últimos mensajes | Sí | Sí | Sí | Sí |
| D1 | Los datos que viajan existen en el dominio | Sí | Sí | Sí | Sí |
| D2 | Todo mensaje tiene requisito | Sí | Sí | Sí | Sí |
| D3 | Cada rama dibujada tiene escenario de aceptación | No | Parcial | Parcial | Parcial |
| E1 | Un interesado lo leyó en voz alta | No | No | No | No |

**Pendientes.** D3: faltan escenarios de aceptación para CU-01 y para las extensiones 3a, 3b y 4a de CU-02, 2b de CU-03 y 1a y 2a de CU-09; se escriben con el SRS. E1: se cierra en la sesión de validación. D1 se comprobó en la [matriz de consistencia](../../matriz-consistencia.md), sección 6.
