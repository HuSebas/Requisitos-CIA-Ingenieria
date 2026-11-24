# Identificación de stakeholders y matriz de poder-interés

> Criterio de puntuación usado: poder e interés se califican de 1 a 5. Se toma como ALTO un puntaje de 4 o 5, y como BAJO un puntaje de 1 a 3. El interés se mide por afectación directa en el trabajo diario, no por opinión favorable hacia el proyecto: por eso alguien puede querer el sistema y aun así tener interés medio, si el problema no lo toca todos los días.

**Nombre del proyecto**

Sistema de información para la gestión de obras — CIA Ingeniería

**Equipo e integrantes**

Paola Andrea Camacho González
Sebastián Felipe Huertas Salas
Juan Miguel Blanco Perilla

**Historial**

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-09-07 | Mapeo organizacional a partir del cuestionario preliminar. |
| 1.1 | 2026-09-29 | Ampliación por bola de nieve después de las entrevistas E-01 y E-02. |
| 1.2 | 2026-11-15 | Roles unificados con el glosario; responsable de SST y calidad registrado como excluido. |

## 1. Identificación de stakeholders

Partimos del mapeo organizacional que la empresa entregó en el cuestionario preliminar, y lo ampliamos con bola de nieve durante la entrevista a la administradora de proyectos.

| Stakeholder | Categoría | Cómo se identificó |
|---|---|---|
| Gerente general | Alta dirección / patrocinador | Mapeo organizacional: la empresa lo declara como quien toma las decisiones a nivel empresarial y aprueba los presupuestos. |
| Gerente de obra | Mando medio administrativo | Mapeo organizacional: la empresa lo declara como responsable de presupuestos y compras, junto con el contador. |
| Contador | Área financiera y contable | Mapeo organizacional: la empresa declara que los presupuestos y compras son manejados por gerentes de obra y contador. |
| Residente de obra | Usuario final operativo | Mapeo organizacional: la empresa lo señala directamente como el más afectado por la pérdida de información, ya que es quien genera los reportes en campo. |
| Administradora de proyectos | Usuaria final administrativa | Mapeo organizacional. Fue la persona entrevistada en la primera sesión de elicitación. |
| Ingeniero de obra | Usuario técnico | Mapeo organizacional: participa en las reuniones semanales donde se toman las decisiones técnicas a partir del informe del residente. |
| Proveedores de materiales | Externo — proveedor | Análisis de impacto: la empresa declara roces con proveedores por retrasos en la validación de procesos y facturas fuera de término. |
| Cliente de la obra | Externo — cliente | Análisis de impacto: la empresa declara que los retrasos en las entregas le han costado imagen frente a sus clientes. |

**Excluido de la matriz.** El responsable de seguridad y salud en el trabajo y de calidad no se incluye: sus procesos están fuera del alcance (acta de constitución, sección 2). Si el alcance crece hacia SST o control de calidad, entra a la matriz y se entrevista.

Los términos «director de obra» y «gerente de obra» designan el mismo cargo; en todos los artefactos se usa **gerente de obra**.

## 2. Matriz de poder-interés

| Stakeholder | Poder (1-5) y evidencia | Interés (1-5) y evidencia | Cuadrante | Estrategia |
|---|---|---|---|---|
| Gerente general | 5 — Aprueba o rechaza el presupuesto de cada obra y tiene autoridad para detener o cancelar el proyecto del sistema. | 3 — El problema lo golpea por resultado —sobrecostos, multas, imagen— pero no opera el proceso a diario; declaró que usaría indicadores para decidir. | Alto poder, bajo interés | Mantener satisfecho: informe ejecutivo breve por hito, centrado en costo, alcance y beneficio esperado. No saturarlo con detalle operativo. |
| Gerente de obra | 4 — Autoriza las compras junto con el contador; si no respalda el sistema, el flujo de aprobación no cambia. | 4 — Trabaja a diario contra el presupuesto de la obra y es parte del trámite que hoy demora las compras. | Alto poder, alto interés | Gestionar de cerca: validar con él el flujo de aprobación de compras y los estados de una orden antes de especificarlos. |
| Contador | 4 — Co-autoriza las compras y su aval condiciona cualquier cambio en el manejo de facturas y soportes. | 5 — Las multas por facturas presentadas fuera de término caen sobre su gestión; hoy reconstruye soportes a mano. | Alto poder, alto interés | Gestionar de cerca: entrevistarlo en la siguiente ronda para definir qué soportes son obligatorios y en qué plazo. |
| Residente de obra | 2 — Ejecuta y reporta, pero no decide sobre presupuesto, compras ni sobre la adopción del sistema. | 5 — Es quien anota a mano en obra y quien termina señalado cuando se pierde información; la empresa lo declara como el más afectado. | Bajo poder, alto interés | Mantener informado: es la fuente principal de requisitos de campo. Riesgo de adopción — si el registro le cuesta más que la libreta, no lo usará. |
| Administradora de proyectos | 3 — Concentra contratos, órdenes de compra y soportes, pero no tiene autoridad para aprobar el proyecto. | 5 — La entrevista declara que el equipo administrativo y contable "también se ve afectado al tener que hacer un seguimiento estricto a la información para evitar duplicidad o inconsistencias." | Bajo poder, alto interés | Mantener informado: validar con ella cada avance del modelo de requisitos, por ser la usuaria más intensiva. |
| Ingeniero de obra | 3 — Participa en las decisiones técnicas semanales, pero no autoriza compras ni define el alcance del sistema. | 3 — Le afecta la información desactualizada, aunque su trabajo no depende del registro documental como el del residente. | Bajo poder, bajo interés | Monitorear: consultarlo puntualmente cuando se modelen los avances de obra y el cronograma. |
| Proveedores de materiales | 2 — Son externos y no intervienen en las decisiones internas de la empresa. | 3 — Les afecta cobrar a tiempo, pero no usarían el sistema ni cambiarían su forma de trabajar por él. | Bajo poder, bajo interés | Monitorear: no se entrevistan en esta fase. Se revisa el impacto si más adelante se plantea un portal de proveedores. |
| Cliente de la obra | 2 — Contrata la obra, no el sistema; no tiene injerencia en cómo la empresa organiza su información interna. | 2 — Lo que le importa es recibir la obra a tiempo; el sistema le llega solo de forma indirecta. | Bajo poder, bajo interés | Monitorear: no participa en la elicitación. Se tiene en cuenta solo como beneficiario indirecto de los plazos. |

El gerente general queda en «mantener satisfecho» y no en «gestionar de cerca» porque la escala usada mide el interés por afectación diaria, y él sufre el problema por resultado, no por uso. Es el patrocinador del proyecto, así que igual hay que asegurarle visibilidad: si su interés sube, se mueve de cuadrante y habría que replantear la estrategia.

## 3. Resumen por cuadrante

**Alto poder, alto interés — Gestionar de cerca**

Gerente de obra — autoriza las compras y vive el trámite que hoy las demora.
Contador — co-autoriza compras y asume las multas por facturas fuera de término.

Son los dos con quienes se valida el alcance antes de especificar. Cualquier cambio en el flujo de compras pasa por ellos.

**Alto poder, bajo interés — Mantener satisfecho**

Gerente general — aprueba el proyecto y puede detenerlo, pero no opera el proceso a diario.

Comunicación corta y espaciada, en términos de costo y beneficio. El riesgo aquí no es que se oponga, sino que se desentienda y el proyecto se quede sin respaldo.

**Bajo poder, alto interés — Mantener informado**

Residente de obra — fuente principal de requisitos de campo y el más afectado por el problema.
Administradora de proyectos — usuaria más intensiva; ya fue entrevistada.

Son los aliados naturales del proyecto: no deciden, pero de ellos sale la mayoría de los requisitos y de ellos depende que el sistema se use.

**Bajo poder, bajo interés — Monitorear**

Ingeniero de obra — se consulta solo al modelar avances y cronograma.
Proveedores de materiales — fuera del alcance de esta fase.
Cliente de la obra — beneficiario indirecto, no participa en la elicitación.

No se les dedica esfuerzo de elicitación ahora, pero se revisa su posición si el alcance del proyecto crece.

**Pendiente de confirmar con la empresa**

Si existe interventoría externa en alguna de las obras en curso: sería un stakeholder con poder alto que hoy no está en la lista.
Si el gerente general y el gerente de obra son la misma persona en algunas obras — el cuestionario preliminar no lo aclara.

Los puntajes de poder del contador y del gerente de obra: los asignamos a partir de lo declarado, pero conviene verificarlos cuando se les entreviste.
