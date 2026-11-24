# Procesos AS-IS y TO-BE: hallazgos y brechas

| Campo | Valor |
|---|---|
| Versión | 1.1 · 2026-11-16 — DAC-02 con ruta de aprobación y orden de compra registrada |
| Procesos | Compra de un insumo · Reporte del avance de un corte |
| Base del AS-IS | Entrevistas E-01 y E-02 y análisis documental. No se hizo taller de proceso ni cronometraje: las medidas son las declaradas por los entrevistados |

## 1. Diagramas

| Código | Diagrama | Tipo |
|---|---|---|
| DAC-01 | [Comprar un insumo para la obra hoy](dac-01-compras-as-is.puml) | AS-IS |
| DAC-02 | [Comprar un insumo para la obra con el sistema](dac-02-compras-to-be.puml) | TO-BE |
| DAC-03 | [Reportar el avance de un corte hoy](dac-03-avance-as-is.puml) | AS-IS |
| DAC-04 | [Reportar el avance de un corte con el sistema](dac-04-avance-to-be.puml) | TO-BE |
| DAC-05 | [Hacer una compra urgente con el sistema](dac-05-compra-urgente-to-be.puml) | TO-BE |

Cada `.puml` tiene su imagen `.png` en la misma carpeta.

## 2. Problemas del proceso actual

| ID | Familia | Dónde | Problema | Medida declarada | Fuente |
|---|---|---|---|---|---|
| PA-01 | Pérdida de información | DAC-01 · Pide el insumo por llamada | La solicitud no queda escrita. | Es el modo habitual de pedir | E-01 #1; E-02 #6 |
| PA-02 | Control débil | DAC-01 · Revisa cotizaciones y presupuesto | El saldo del rubro solo está en el consolidado semanal; quien decide no lo conoce. | Un caso de aprobación sin saldo con ajuste posterior | E-02 #7, #10 |
| PA-03 | Esperas | DAC-01 · Da el visto bueno técnico | El gerente de obra está en los frentes y responde por llamada. | No medido | E-02 #1, #6 |
| PA-04 | Control ausente | DAC-01 · Compra con caja menor | La compra urgente queda fuera del presupuesto hasta el consolidado. | «Lo más común» son facturas de caja menor perdidas | E-02 #6, #9 |
| PA-05 | Pérdida de información | DAC-01 · Reclama de palabra | La devolución no deja registro. | No medido | E-01 #8; E-02 #11 |
| PA-06 | Pérdida de información | DAC-01 · Envía la foto de la factura | El soporte viaja como foto suelta. | Facturas que hay que legalizar de nuevo | E-02 #9; E-01 #7 |
| PA-07 | Trabajo duplicado | DAC-01 y DAC-03 · Excel consolidado | Consolidación manual con varias versiones del archivo. | 4 a 8 horas semanales | E-01 #9, #10 |
| PA-08 | Trabajo duplicado | DAC-03 · Digita el avance en Excel | El avance se anota a mano y luego se digita. | 40 a 60 minutos por jornada, estimado | E-01 #11; E-02 #3 |
| PA-09 | Esperas | DAC-03 · Espera a tener señal | El reporte llega días después del corte. | «A veces días después» | E-02 #2, #3 |
| PA-10 | Reprocesos | DAC-03 · Devuelve el reporte por llamada | La corrección no deja versión anterior y desactualiza el consolidado. | No medido | E-02 #12 |

## 3. Decisiones de rediseño

| ID | Problemas | Respuesta | Decisión |
|---|---|---|---|
| D-01 | PA-01 | Automatizar | La solicitud se registra en el sistema y nace con estado y solicitante. |
| D-02 | PA-02 | Automatizar | El saldo se calcula al registrar cada compra y se muestra al decidir. |
| D-03 | PA-03 | Simplificar | El sistema asigna y notifica al aprobador; la decisión sigue siendo humana. |
| D-04 | PA-04 | Conservar y controlar | La compra urgente se mantiene, pero se registra el mismo día y queda por legalizar. |
| D-05 | PA-05 | Automatizar | La recepción y la devolución se registran contra la orden de compra. |
| D-06 | PA-06 | Combinar | El soporte se adjunta en el mismo registro de la compra. |
| D-07 | PA-07 | Eliminar | El consolidado manual desaparece; el sistema lo genera. |
| D-08 | PA-08 | Eliminar | El avance se registra una sola vez, en el frente. |
| D-09 | PA-09 | Automatizar | El registro se guarda sin conexión y se sincroniza solo. |
| D-10 | PA-10 | Automatizar | La devolución conserva la versión anterior y recalcula los consolidados. |
| D-11 | — | Conservar | Decidir la solicitud, emitir la orden de compra y gestionar el pago siguen siendo tareas de personas; el sistema solo registra la orden. |

## 4. Brechas

| ID | Problema | Cambio en el TO-BE | Requisitos | Caso de uso |
|---|---|---|---|---|
| B-01 | PA-01 | DAC-02 · Registra la solicitud de compra | RF-001, RF-002 | CU-01 |
| B-02 | PA-02 | DAC-02 · Calcula el saldo del rubro; Revisa la solicitud con el saldo | RF-005, RF-006, RF-008 | CU-02, CU-05 |
| B-03 | PA-03 | DAC-02 · Determina la ruta de aprobación; Notifica al aprobador que sigue en la ruta | RF-003, RF-004, RF-010, RF-042 | CU-01, CU-02 |
| B-04 | PA-04 | DAC-05 · Registra la compra urgente; Deja la compra «por legalizar»; Legaliza | RF-012, RF-013, RF-014, RF-015 | CU-03, CU-04 |
| B-05 | PA-05 | DAC-02 · Registra la orden de compra; Registra la recepción del material | RF-044, RF-030, RF-031, RF-032, RF-033 | CU-20, CU-13, CU-14 |
| B-06 | PA-06 | DAC-02 · Adjunta el soporte de la compra; Verifica la compra | RF-011, RF-016, RF-045 | CU-13, CU-15, CU-18 |
| B-07 | PA-07 | DAC-04 · Actualiza los consolidados de la obra | RF-019, RF-021 | CU-07, CU-17 |
| B-08 | PA-08 | DAC-04 · Registra o corrige el avance del corte | RF-023 | CU-09 |
| B-09 | PA-09 | DAC-04 · Guarda el reporte en el dispositivo; Sincroniza el reporte | RF-024, RF-025, RNF-004 | CU-09 |
| B-10 | PA-10 | DAC-04 · Devuelve el reporte con su motivo | RF-028, RF-029 | CU-11 |

## 5. Cobertura del TO-BE

| Acción del sistema | Diagrama | Caso de uso | Requisito |
|---|---|---|---|
| Valida los datos de la solicitud | DAC-02 | CU-01 | RF-002 |
| Calcula el saldo del rubro | DAC-02 | CU-05 | RF-005 |
| Determina la ruta de aprobación | DAC-02 | CU-01 | RF-003 |
| Notifica al aprobador que sigue en la ruta | DAC-02 | CU-01, CU-02 | RF-004, RF-042 |
| Registra la aprobación | DAC-02 | CU-02 | RF-007 |
| Suma el valor de la solicitud al gasto acumulado | DAC-02 | CU-02 | RF-008 |
| Notifica la aprobación al residente | DAC-02 | CU-02 | RF-010 |
| Registra el rechazo con su motivo | DAC-02 | CU-02 | RF-009 |
| Notifica el rechazo al residente | DAC-02 | CU-02 | RF-010 |
| Valida el rubro, el valor y el soporte | DAC-05 | CU-03 | RF-013 |
| Suma el valor al gasto acumulado del rubro | DAC-05 | CU-03 | RF-012 |
| Deja la compra «por legalizar» | DAC-05 | CU-03 | RF-012 |
| Cambia el estado de la compra a «legalizada» | DAC-05 | CU-04 | RF-014 |
| Guarda el reporte en el dispositivo | DAC-04 | CU-09 | RF-024 |
| Mantiene el reporte pendiente de sincronizar | DAC-04 | CU-09 | RF-024 |
| Sincroniza el reporte | DAC-04 | CU-09 | RF-025 |
| Actualiza el avance de la obra | DAC-04 | CU-10 | RF-027 |
| Actualiza los consolidados de la obra | DAC-04 | CU-17 | RF-021, RF-029 |

**Requisitos que no aparecen en estos diagramas.** No son pasos de una compra ni de un reporte: registrar y ajustar el presupuesto (RF-017, RF-018), consultar y alertar (RF-019, RF-020, RF-022, RF-027), definir la periodicidad (RF-026) y los transversales (RF-034 a RF-037).

## 6. Efecto sobre las personas

| Quién | Deja de hacer | Empieza a hacer |
|---|---|---|
| Residente de obra | Pedir por llamada; digitar en Excel al final de la jornada | Registrar solicitudes, avance y recepciones desde el frente |
| Administradora de proyectos | Consolidar a mano; buscar soportes en mensajes | Decidir solicitudes en el sistema y verificar compras |
| Gerente de obra | Llamar para saber cuánto se ha gastado | Decidir con el saldo a la vista; devolver reportes con motivo |
| Gerente general | Enterarse del exceso por teléfono | Decidir en el sistema los excesos sobre imprevistos |
| Contador | Reconstruir soportes | Consultar compras ya verificadas |

## 7. Lista de verificación

Revisión hecha sobre las imágenes generadas. D1 a D5 corresponden a DAC-01 a DAC-05.

| ID | Pregunta | D1 | D2 | D3 | D4 | D5 |
|---|---|---|---|---|---|---|
| A1 | ¿Hay un solo nodo inicial? | Sí | Sí | Sí | Sí | Sí |
| A2 | ¿Todo camino llega a un final? | Sí | Sí | Sí | Sí | Sí |
| A3 | ¿Cada decisión tiene todas sus salidas con guardas excluyentes? | Sí | Sí | Sí | Sí | Sí |
| A4 | ¿Cada bifurcación tiene su unión? | N. A. | N. A. | N. A. | N. A. | N. A. |
| A5 | ¿Se usa fusión para caminos alternativos? | Sí | Sí | Sí | Sí | Sí |
| A6 | ¿Cada acción empieza con verbo y nombra su objeto? | Sí | Sí | Sí | Sí | Sí |
| A8 | ¿Cada ciclo tiene condición de salida? | N. A. | Sí | Sí | Sí | Sí |
| B1 | ¿Cada calle tiene un dueño real? | Sí | Sí | Sí | Sí | Sí |
| B2 | ¿Cada acción está en una sola calle? | Sí | Sí | Sí | Sí | Sí |
| B3 | ¿Cada acción viene de una fuente? | Sí | Sí | Sí | Sí | Sí |
| B4 | ¿Reproduce un caso real no usado para construirlo? | No | No | No | No | No |
| B5 | ¿Hay al menos una excepción dibujada? | Sí | Sí | Sí | Sí | Sí |
| B6 | ¿Todo está a una sola altura de abstracción? | Sí | Sí | Sí | Sí | Sí |
| B7 | ¿Se ve la frontera entre persona y sistema? | N. A. | Sí | N. A. | Sí | Sí |
| B8 | ¿Los nombres son los del glosario? | Sí | Sí | Sí | Sí | Sí |
| C1 | ¿Los problemas del AS-IS están numerados y medidos? | Parcial | N. A. | Parcial | N. A. | N. A. |
| C2 | ¿Cada acción del sistema tiene requisito? | N. A. | Sí | N. A. | Sí | Sí |
| C4 | ¿Cada acción del sistema pertenece a un caso de uso? | N. A. | Sí | N. A. | Sí | Sí |
| C6 | ¿Hay confirmación escrita de los dueños de calle? | No | No | No | No | No |
| C7 | ¿Cabe en una hoja legible (unos 30 elementos)? | Sí | Sí | Sí | Sí | Sí |

**Pendientes.** B4 y C6 se cierran en la sesión de validación, recorriendo un caso real con la administradora y el gerente de obra. C1 es parcial porque cuatro problemas no tienen medida: se piden a la empresa los datos de PA-03, PA-05 y PA-10 y la frecuencia de compras urgentes.

**Nota de lectura de DAC-01.** La decisión «¿El exceso cabe en imprevistos?» la toma administración; la herramienta la dibuja sobre la calle del gerente de obra porque centra el rombo entre sus dos ramas.

**Nota de lectura de DAC-02.** El ciclo «¿Falta otro aprobador de la ruta?» da una vuelta por cada aprobador: una en las rutas de una persona y dos en las de visto bueno técnico o exceso en imprevistos (RN-19).
