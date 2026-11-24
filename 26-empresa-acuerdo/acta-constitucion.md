# Acta de constitución del proyecto

| Campo | Valor |
|---|---|
| Proyecto | Ingeniería de requisitos del sistema de información para la gestión de obras — CIA Ingeniería |
| Patrocinador | Gerente general de CIA Ingeniería |
| Responsable de la iniciativa | Administradora de proyectos de CIA Ingeniería |
| Equipo | Paola Andrea Camacho González · Sebastián Felipe Huertas Salas · Juan Miguel Blanco Perilla |
| Versión | 1.1 |

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-09-20 | Versión acordada en la reunión de inicio. |
| 1.1 | 2026-11-15 | Objetivo y criterios de éxito verificables; alcance alineado con el árbol de metas (compras y recepción de materiales explícitas); cronograma acotado al proyecto de requisitos; roles unificados con el glosario. |

## 1. Objetivo del proyecto

Entregar a CIA Ingeniería, a más tardar el 27 de noviembre de 2026, la especificación de requisitos de software (SRS 1.0) validada de un sistema de información que centralice, para las obras ya aprobadas, el control de presupuesto y costos, las compras de insumos, el avance de obra y la recepción de materiales, procesos que hoy se llevan en hojas de Excel, llamadas y fotografías de soportes.

El desarrollo del sistema no hace parte de este proyecto: el SRS es el insumo para contratarlo o construirlo en una fase posterior.

## 2. Alcance

### Dentro del alcance

Requisitos de los cuatro procesos que ocurren durante la ejecución de una obra ya aprobada:

- **Presupuesto y costos de la obra:** presupuesto por actividad y rubro, gasto acumulado, saldo y alertas (meta G1).
- **Compras de insumos:** solicitud, aprobación contra el saldo del rubro, compras urgentes y soportes (meta G2).
- **Avance de obra:** registro por corte desde el frente de obra, con o sin conexión, y consulta (meta G3).
- **Recepción de materiales:** verificación contra la orden de compra y devoluciones (meta G4).

Y, de forma transversal, el control de acceso por rol y la trazabilidad de cambios (meta G5).

### Fuera del alcance

| Excluido | Motivo |
|---|---|
| Contratación inicial y presupuestación inicial de la obra, y su aprobación | La empresa los considera información reservada. |
| Inventario de maquinaria, herramienta y equipos | No hubo acceso al trabajo de campo para levantar el proceso. |
| Seguridad y salud en el trabajo, control de calidad y control documental general | La empresa los mencionó como procesos adicionales; exceden el plazo del proyecto. |
| Nómina y contabilidad general | Son responsabilidad del contador y tienen herramientas propias. |
| Diseño detallado, construcción y puesta en producción del sistema | Fase posterior a este proyecto. |

## 3. Supuestos y restricciones

### Supuestos

- La administradora de proyectos y el gerente de obra atienden las sesiones de validación en las fechas del cronograma.
- El personal que maneja los archivos de Excel explica cómo calcula hoy los costos.
- En el frente de obra hay conectividad intermitente, suficiente para sincronizar al menos una vez por jornada.
- El personal de obra dispone de celular o portátil para registrar información.

### Restricciones

- El plazo es fijo: el SRS 1.0 se entrega en la semana 16 del semestre académico (23 al 27 de noviembre de 2026).
- La información de la empresa es confidencial: las personas se citan por cargo, no se publican cifras reales de presupuestos y los datos se devuelven o eliminan al cierre.
- El acceso a la empresa es limitado: lo que no se pueda confirmar se registra como supuesto o como pendiente, con la persona a quien preguntarle.
- El sistema especificado debe poder operar en los equipos que la empresa ya tiene y con tecnologías de uso libre o ya contratadas por ella.
- Durante la transición el esquema actual en Excel sigue funcionando; el sistema no puede interrumpir la operación de la obra.

## 4. Stakeholders y roles

| Stakeholder | Rol en el proyecto |
|---|---|
| Gerente general | Patrocinador: aprueba el proyecto y puede detenerlo. Autoriza gastos que superan los imprevistos. |
| Gerente de obra | Responde por plazo y presupuesto de la obra; autoriza compras. Fuente E-02. |
| Contador | Responsable financiero y de los soportes contables. |
| Administradora de proyectos | Responsable de la iniciativa y usuaria administrativa principal. Fuente E-01. |
| Residente de obra | Usuario operativo y fuente principal de los requisitos de campo. |
| Ingeniero de obra | Usuario técnico: participa en las decisiones técnicas semanales. |
| Proveedores de materiales | Externos, sin rol formal en el proyecto. |
| Cliente de la obra | Externo, beneficiario indirecto. |

El detalle está en la [matriz de poder-interés](matriz-poder-interes.md).

## 5. Cronograma de alto nivel

| Hito | Fechas (2026) | Entregable |
|---|---|---|
| Concepción e inicio | 7 – 20 sep | Cuestionario preliminar, acta de constitución, stakeholders |
| Levantamiento | 21 – 29 sep | Entrevistas E-01 y E-02 |
| Metas, historias y casos de uso | 30 sep – 20 oct | Árbol de metas, HU, CU, diagramas de casos de uso |
| Análisis y modelado | 21 oct – 13 nov | Modelos UML, catálogo de requisitos, priorización |
| Prototipo y evaluación | 9 – 18 nov | Prototipo y hallazgos de usabilidad |
| Especificación | 13 – 20 nov | SRS 0.5, 0.8 y 0.9 |
| Validación y cierre | 23 – 27 nov | SRS 1.0, acta de aceptación, informe final y sustentación |

## 6. Riesgos iniciales

| Riesgo | Impacto | Estrategia |
|---|---|---|
| Disponibilidad limitada de la empresa para entrevistas y validaciones. | Alto: requisitos sin confirmar al cierre. | Sesiones cortas de 30 a 45 minutos; cada duda queda registrada con su destinatario; lo no confirmado se marca como supuesto. |
| El personal prefiere seguir con sus archivos de Excel. | Alto: el sistema especificado no se adoptaría. | Involucrar a residentes y administración en la validación del prototipo; exigir que registrar cueste menos que el método actual. |
| Los Excel actuales tienen datos desordenados o contradictorios. | Medio: reglas de cálculo mal entendidas. | Revisar una muestra de los archivos antes de cerrar las reglas de negocio. |
| Conectividad deficiente en los frentes de obra. | Medio: el registro en campo no sería viable. | Especificar el registro sin conexión con sincronización posterior (HU-02). |
| Las fuentes se contradicen (por ejemplo, pedidos duplicados). | Medio: requisitos sin sustento. | Registrar cada contradicción y resolverla con un tercero antes de especificar. |

## 7. Criterios de éxito

### Del proyecto

| Criterio | Medida | Plazo |
|---|---|---|
| SRS aceptado | Acta de aceptación de la versión 1.0 por parte de la empresa | 27 nov 2026 |
| Requisitos trazables | 100 % de los requisitos con fuente, prioridad y criterio de aceptación | SRS 0.9 |
| Calidad de la especificación | Ningún defecto mayor abierto después de la inspección formal | SRS 1.0 |

### Del sistema, verificables tras su puesta en marcha

| Criterio | Línea base | Meta |
|---|---|---|
| Tiempo semanal de consolidación de la administradora | 4 a 8 horas (E-01 #10) | 2 horas o menos |
| Tiempo del residente para registrar la jornada | 40 a 60 minutos, estimado (E-01 #11) | 15 minutos o menos |
| Disponibilidad del avance después de cada corte | Varios días | 2 días o menos (E-02 #13) |
| Compras con soporte asociado | No medido | 100 % |

## 8. Aprobación

| Rol | Cargo | Fecha |
|---|---|---|
| Patrocinador | Gerente general de CIA Ingeniería | 2026-09-20 |
| Responsable técnico | Líder del equipo de ingeniería de requisitos | 2026-09-20 |
