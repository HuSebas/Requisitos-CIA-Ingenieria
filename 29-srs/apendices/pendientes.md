# Pendientes y decisiones abiertas (Apéndice F del SRS)

| Campo | Valor |
|---|---|
| Versión | 2.0 · 2026-11-16 — sustituye a la lista de supuestos; cada pendiente tiene dueño, fecha, valor provisional y consecuencia |
| Documento | [SRS](../srs.md), apéndice F |

Cada pendiente es una pregunta a la empresa con dueño, fecha, valor provisional y consecuencia. El valor provisional es lo que el documento asume mientras no hay decisión; en el texto de un requisito se reconoce porque cita el pendiente. Un pendiente no se borra: se marca resuelto con la decisión, la fecha y quién decidió, y se actualiza el requisito y el historial. Si la fecha límite pasa sin respuesta, el pendiente se lleva a la sesión de revisión con la empresa.

## F.1 Preguntas a la empresa (PD)

| ID | Pregunta | Afecta | Dueño en la empresa · quién pregunta | Fecha límite | Valor provisional | Si no se resuelve | Estado |
|---|---|---|---|---|---|---|---|
| PD-01 | ¿Con qué porcentaje de ejecución de un rubro debe generarse la alerta? | RF-020, RN-11 | Gerente de obra y administradora de proyectos · Sebastián Huertas | 2026-11-23 | 80 % del presupuesto del rubro, configurable por obra | Se entrega con 80 %; si resulta alto o bajo, se ajusta el parámetro sin cambiar el requisito | Abierto |
| PD-02 | ¿Desde qué monto una compra exige el visto bueno técnico del gerente de obra? ¿Y cómo se sabe que una compra «cambia lo planeado»? | RF-003, RN-03 | Gerente general y administradora de proyectos · Juan Miguel Blanco | 2026-11-23 | Compra mayor al 10 % del presupuesto del rubro; «cambia lo planeado» no se detecta | RN-03 se aplica solo por monto; la parte de «cambia lo planeado» queda postergada | Abierto |
| PD-03 | ¿Cuál es el monto máximo de una compra urgente por caja menor? | RF-012, RN-09 | Contador y administradora de proyectos · Juan Miguel Blanco | 2026-11-23 | $1.000.000, configurable por obra | Se entrega con ese tope como parámetro | Abierto |
| PD-04 | ¿En cuánto tiempo debe legalizarse una compra urgente? | RF-015, RN-09 | Contador y administradora de proyectos · Juan Miguel Blanco | 2026-11-23 | 5 días hábiles | RF-015 se entrega con ese plazo; es un parámetro | Abierto |
| PD-05 | ¿Qué cargos ven el presupuesto completo y cuáles solo su parte? | RF-037, RN-16 | Gerente general · Juan Miguel Blanco | 2026-11-23 | Completo: gerente general, gerente de obra, administradora y contador. El residente ve solo saldos; el ingeniero de obra, nada | RF-037 se entrega con esa matriz; cambiarla es cambiar una tabla | Abierto |
| PD-06 | ¿Quién define la periodicidad de corte de cada obra? | RF-026 | Administradora de proyectos y gerente de obra · Paola Camacho | 2026-11-23 | La administradora, al crear la obra | RF-026 asigna la acción a la administradora | Abierto |
| PD-07 | ¿Cuánto tiempo se conserva la información de una obra? | RNF-009 | Administradora de proyectos · Paola Camacho | 2026-11-23 | 5 años después del cierre de la obra | Se entrega con 5 años, el máximo que declaró la empresa | Abierto |
| PD-08 | ¿Quién legaliza una compra urgente? | RF-014, RF-040 | Gerente general y administradora de proyectos · Juan Miguel Blanco | 2026-11-23 | Una sola persona: el último aprobador de la ruta que tendría una solicitud de ese valor | CU-04 se entrega con esa regla | Abierto |
| PD-09 | ¿Cuánto tarda hoy un residente en registrar la jornada, y cuál es una meta razonable? | RNF-001 | Residentes de obra · Sebastián Huertas | 2026-11-23 | Meta de 15 minutos por corte; línea base de 40 a 60 minutos, estimada por la administradora | La meta se revisa con la medición de la prueba de usabilidad | Abierto |
| PD-10 | ¿El contador decide solicitudes o solo consulta? | RF-045 | Contador · Juan Miguel Blanco | 2026-11-23 | Solo consulta las compras verificadas | Si decide, hay que agregarlo a la tabla de decisión | Abierto |
| PD-11 | ¿Quién aprueba un ajuste del presupuesto de una obra? | RF-018 | Gerente general · Juan Miguel Blanco | 2026-11-23 | El gerente general | CU-16 se entrega con esa regla | Abierto |
| PD-12 | ¿Por qué medio deben llegar las notificaciones: dentro del sistema, por correo o por WhatsApp? | RF-004, RF-010, RF-040, RF-041 | Administradora de proyectos y gerente de obra · Paola Camacho | 2026-11-23 | Dentro del sistema, en la lista de cada usuario | Los cuatro requisitos se entregan sin medio externo; el criterio de tiempo se revisa | Abierto |
| PD-13 | ¿Los residentes necesitan registrar la compra urgente sin conexión? | RF-012, RF-024 | Residentes de obra · Sebastián Huertas | 2026-11-23 | No: solo el avance funciona sin conexión | Si la respuesta es sí, se propone extender RF-024 y RF-025 a la compra urgente | Abierto |
| PD-14 | ¿Quién crea los usuarios y les asigna el rol en cada obra? | RF-036, RN-21 | Gerente general · Juan Miguel Blanco | 2026-11-23 | No definido: no hay caso de uso de administración de usuarios | RF-036 queda sin caso de uso; se propone uno para la siguiente versión | Abierto |
| PD-15 | ¿Cómo corrige el residente una compra urgente devuelta con observación, y qué pasa si la compra no corresponde a la obra? | RF-039 | Contador y administradora de proyectos · Juan Miguel Blanco | 2026-11-23 | La compra sigue «por legalizar» con la observación; no hay corrección ni anulación | Falta un requisito; se agrega cuando se defina qué puede corregirse | Abierto |
| PD-16 | ¿Puede anularse una solicitud ya aprobada si todavía no tiene orden de compra? | RF-038 | Administradora de proyectos · Paola Camacho | 2026-11-23 | No: solo se anula mientras está pendiente | RF-038 se entrega con esa restricción | Abierto |
| PD-17 | ¿Cómo se controlan la mano de obra y los subcontratos dentro del presupuesto? | RC-19 | Residentes de obra, contador y administradora de proyectos · Sebastián Huertas | 2026-11-23 | Fuera de alcance | Postergado; consta en la sección 2.6 | Abierto |
| PD-18 | ¿Ocurren pedidos duplicados? El cuestionario dice que sí; las dos entrevistas, que no. | RC-10 | Contador y residentes de obra · Juan Miguel Blanco | 2026-11-23 | No ocurren: no se especifica la alerta | Si ocurren, se retoma RC-10 como solicitud de cambio | Abierto |
| PD-19 | ¿Qué dispositivo y qué conectividad hay en cada frente de obra? | RF-024, RNF-003, RNF-004 | Residentes de obra · Sebastián Huertas | 2026-11-23 | Celular propio con señal intermitente; 72 horas máximas sin conexión | RNF-004 se entrega con 72 horas | Abierto |
| PD-20 | ¿Una solicitud aprobada origina siempre una sola orden de compra? | RF-044, RN-22 | Administradora de proyectos · Paola Camacho | 2026-11-23 | Sí: como máximo una | Si hay compras parciales, cambia la multiplicidad del dominio | Abierto |
| PD-21 | ¿Qué días cuentan como hábiles para el plazo de legalización: se excluyen sábados y festivos? | RF-015, RN-09 | Contador · Juan Miguel Blanco | 2026-11-23 | Lunes a viernes, sin excluir festivos | RF-015 se entrega con esa definición; excluir festivos exige un calendario administrable | Abierto |

## F.2 Tareas del equipo (PT)

| ID | Tarea | Responsable | Fecha |
|---|---|---|---|
| PT-01 | Aplicar la prueba de usabilidad con 3 a 5 personas y registrar tiempos (RNF-001) y puntaje SUS. | Sebastián Huertas | 2026-11-23 |
| PT-02 | Prototipar las pantallas P-12 a P-19 y ejecutar los escenarios marcados «Por ejecutar». | Paola Camacho | Siguiente versión |
| PT-03 | Cerrar los hallazgos abiertos de la evaluación heurística (HH-06 a HH-12). | Juan Miguel Blanco | Siguiente versión |
| PT-04 | Especificar el caso de uso de administración de usuarios cuando se resuelva PD-14. | Juan Miguel Blanco | Tras PD-14 |
| PT-05 | Agregar el diagrama de comportamiento de CU-06 y CU-07 (hallazgo HC-01 de la matriz de consistencia). | Sebastián Huertas | Siguiente versión |
