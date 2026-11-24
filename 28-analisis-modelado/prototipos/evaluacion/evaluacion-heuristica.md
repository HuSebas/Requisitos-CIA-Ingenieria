# Evaluación heurística del prototipo

| Campo | Valor |
|---|---|
| Objeto | Prototipo v1.0, pantallas P-01 a P-11 |
| Fecha | 2026-11-16 |
| Método | Recorrido de los cinco flujos en un navegador a 360 × 740 px, contrastando cada pantalla con las diez heurísticas de Nielsen y con los requisitos AC-01 a AC-05 |
| Evaluadores | Primera pasada hecha. Falta que cada integrante repita el recorrido por separado y agregue sus hallazgos: una evaluación heurística gana con tres a cinco evaluadores |

## 1. Flujos recorridos

| Flujo | Pasos | Rol |
|---|---|---|
| F1 | Enviar una solicitud vacía, corregirla y enviarla | Residente |
| F2 | Registrar una compra urgente con foto | Residente |
| F3 | Registrar el avance sin conexión y recuperar la conexión | Residente |
| F4 | Dar la primera y la segunda aprobación de una ruta de dos; rechazar sin motivo | Gerente de obra, administradora |
| F5 | Legalizar una compra urgente, consultar el presupuesto y devolver un reporte | Administradora, gerente de obra |

## 2. Escala de severidad

0: no es un problema · 1: cosmético · 2: menor · 3: mayor, conviene corregirlo antes de probar con usuarios · 4: impide completar la tarea.

## 3. Hallazgos

| ID | Heurística | Dónde | Qué se encontró | Sev. | Estado |
|---|---|---|---|---|---|
| HH-01 | 1 Visibilidad del estado · 9 Recuperarse de errores | P-03, P-07, P-09 | Los mensajes de error seguían visibles después de corregir el campo. | 3 | Corregido: el mensaje desaparece al escribir. |
| HH-02 | 5 Prevención de errores | P-03, P-07 | El valor se escribía sin separador de miles: «2500000» y «25000000» se confunden. | 3 | Corregido: se separan los miles al escribir. |
| HH-03 | 2 Lenguaje del usuario | P-04, P-06, P-08, P-11 | Las fechas aparecían en formato técnico (2026-12-01). | 2 | Corregido: día/mes/año. |
| HH-04 | 1 Visibilidad del estado · AC-01 | Todas | El indicador de foco tenía contraste de 1,7:1 sobre el fondo claro; el mínimo es 3:1. | 3 | Corregido: 15,2:1 sobre el fondo y 6,7:1 sobre la barra. |
| HH-05 | 9 Recuperarse de errores | P-07 | Al mostrar los errores se borraba el aviso del tope de caja menor y, al volver a escribir el valor, se producía un error y el aviso no regresaba. | 4 | Corregido: avisos y errores son elementos distintos. |
| HH-06 | 3 Control y libertad · 5 Prevención de errores | P-04, P-06, P-08 | Aprobar, rechazar, anular y legalizar no se pueden deshacer y se ejecutan con un solo toque. | 3 | Abierto. Requisito nuevo RNF-012. |
| HH-07 | 2 Lenguaje del usuario · 4 Consistencia | P-07, P-09, P-03 | El selector de archivo y el campo de fecha muestran el texto y el formato del navegador, que pueden no estar en español. | 2 | Abierto. Nota de diseño: controles propios para foto y fecha. |
| HH-08 | 7 Eficiencia · 8 Diseño minimalista | P-04 | «Mis registros» mezcla compras de todos los estados y reportes en una sola lista, sin filtro; lo pendiente no queda arriba. | 2 | Abierto. Cambio de diseño para la siguiente versión. |
| HH-09 | 1 Visibilidad del estado | P-02, P-04, P-05 | Los avisos desaparecen al cambiar de pantalla y no hay un lugar donde volver a verlos. Las notificaciones de RF-004, RF-010, RF-040 y RF-041 no tienen medio definido. | 3 | Abierto. Pregunta a la empresa y precisión de esos requisitos. |
| HH-10 | 1 Visibilidad del estado · 5 Prevención de errores | P-03, P-07 | Sin conexión solo funciona el avance. La solicitud y la compra urgente no avisan que necesitan conexión. | 3 | Abierto. Pregunta a los residentes y posible requisito. |
| HH-11 | 8 Diseño minimalista | P-03, P-09 | A 360 px el título se parte en dos líneas junto al botón de conexión. | 1 | Abierto. |
| HH-12 | 10 Ayuda | P-03, P-06 | «Rubro» y «ruta de aprobación» no tienen explicación para quien entra por primera vez. | 1 | Abierto. Se observa en la prueba con usuarios. |

Cinco de los doce hallazgos se corrigieron en el prototipo antes de probarlo con usuarios; los siete abiertos pasan a [hallazgos y cambios](hallazgos-cambios.md).

## 4. Lo que funciona bien

| Heurística | Evidencia |
|---|---|
| 1 Visibilidad del estado | Cada registro muestra su estado con nombre y color; el residente ve quién decide ahora. |
| 2 Lenguaje del usuario | Las acciones usan los verbos del glosario: solicitar, legalizar, devolver. |
| 5 Prevención de errores | El saldo y la ruta aparecen antes de enviar; el exceso se avisa sin bloquear. |
| 6 Reconocer antes que recordar | El avance muestra el último valor registrado de cada actividad. |
| 9 Recuperarse de errores | Cada error dice qué hacer, junto al campo, y el foco va al primero. |

## 5. Accesibilidad comprobada

| Requisito | Resultado | Cómo se comprobó |
|---|---|---|
| AC-01 Contraste | Cumple | Once pares de color medidos; el menor es 4,7:1. Tabla en la guía de estilo. |
| AC-02 Objetivos táctiles | Cumple | Medición automática en las 16 capturas: ningún botón ni campo mide menos de 44 px de alto. |
| AC-03 Teclado y foco | Parcial | El foco es visible y va al primer error. Falta el recorrido completo solo con teclado. |
| AC-04 Etiquetas y errores | Cumple | Todos los campos tienen etiqueta visible y los errores están asociados al campo. |
| AC-05 Sin desplazamiento horizontal | Cumple | Comprobado en las 16 capturas a 360 px. |
