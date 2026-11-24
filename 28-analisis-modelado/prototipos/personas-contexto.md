# Personas, contexto de uso y requisitos de usabilidad

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Marco | ISO 9241-11:2018 (usabilidad en un contexto de uso) y WCAG 2.2 |
| Fuentes | Entrevistas E-01 y E-02, cuestionario preliminar y fichas de actor |

Una persona es un arquetipo, no un individuo: no lleva nombre propio. Dos salen de entrevistas directas; la del residente es una hipótesis construida con lo que los otros dos dijeron de él, y así está marcada.

## 1. Personas

### PER-01 · El residente en el frente de obra

| Campo | Contenido |
|---|---|
| Actor | Residente de obra |
| Fuente | Indirecta: E-01 #7, #11 y E-02 #3, #6, #9. **Hipótesis por validar con un residente** |
| Quién es | Ingeniero responsable de una obra. Pasa la jornada en el frente, de pie y al aire libre |
| Qué hace hoy | Anota a mano, toma fotos con el celular, pide insumos por llamada y al final del día pasa todo a Excel: 40 a 60 minutos |
| Qué quiere | Registrar una sola vez y volver a la obra. Que la compra se decida rápido |
| Qué teme | Que el sistema le pida más datos que la libreta; ser señalado cuando se pierde una factura |
| Tecnología | Celular propio y portátil. Señal irregular |
| Frase | «Si registrar me toma más que anotarlo, lo anoto y lo paso después.» (hipótesis) |

**Escenario.** A media mañana se acaba el cemento del frente 2. Sin soltar el plano, saca el celular, pide 80 bultos y ve quién debe aprobarlo. A las cuatro registra el avance del corte desde una zona sin señal; el reporte se envía solo cuando vuelve a la oficina de obra.

### PER-02 · El gerente de obra que decide desde el frente

| Campo | Contenido |
|---|---|
| Actor | Gerente de obra, en su rol de aprobador |
| Fuente | E-02 (2026-09-25) |
| Quién es | Responde por el plazo y el presupuesto de la obra. Pasa casi todo el día en los frentes (E-02 #1) |
| Qué hace hoy | Recibe solicitudes por llamada o WhatsApp; para saber cuánto se ha gastado pregunta a administración (E-02 #7) |
| Qué quiere | Ver avance y gasto de su obra en un solo lugar y decidir con el saldo a la vista (E-02 #4, #10) |
| Qué teme | Volver a aprobar una compra sin saber cuánto queda del rubro |
| Tecnología | Celular y portátil; conectividad irregular |
| Frase | «Me entero de muchas cosas cuando ya pasaron.» (E-02 #3) |

**Escenario.** Entre dos frentes recibe el aviso de una solicitud de $2.500.000. La abre en el celular, ve que el rubro tiene $2.700.000 y da el visto bueno técnico en menos de un minuto.

### PER-03 · La administradora que consolida

| Campo | Contenido |
|---|---|
| Actor | Administradora de proyectos, en su rol de aprobadora y verificadora |
| Fuente | E-01 (2026-09-24) |
| Quién es | Consolida en la sede contratos, órdenes de compra, soportes y presupuestos de 3 a 4 obras |
| Qué hace hoy | Recibe fotos de facturas y Excel sueltos; dedica 4 a 8 horas semanales a consolidar (E-01 #10) |
| Qué quiere | Que cada solicitud quede escrita y que el consolidado no dependa de ella |
| Qué teme | Que el sistema pida datos que no corresponden a la obra y nadie lo use (E-01 #12) |
| Tecnología | Computador de escritorio con conexión estable |
| Frase | «Los pedidos llegan casi siempre por llamada; oficialmente no queda nada escrito.» (E-01 #1) |

**Escenario.** El lunes abre «Por decidir», aprueba las solicitudes dentro del saldo, legaliza dos compras urgentes revisando la foto de la factura y consulta la ejecución de cada rubro sin abrir ningún Excel.

## 2. Contexto de uso

| ID | Aspecto | Residente (PER-01) | Aprobadores (PER-02, PER-03) |
|---|---|---|---|
| CX-01 | Entorno físico | Frente de obra: de pie, al sol, con polvo y ruido; a veces con guantes | Frente de obra u oficina |
| CX-02 | Dispositivo | Celular en una mano; pantalla desde 360 px | Celular o computador |
| CX-03 | Conectividad | Irregular; puede no haber en todo el frente | Irregular en obra, estable en oficina |
| CX-04 | Interrupciones | Constantes: registra entre tareas | Frecuentes |
| CX-05 | Frecuencia | Avance: una vez por corte. Compras: varias por semana (por medir) | Diaria |
| CX-06 | Experiencia | Usa Excel y WhatsApp; no ha usado software de gestión | Igual |

## 3. Tareas

| ID | Tarea | Persona | Caso de uso | Pantallas | Frecuencia |
|---|---|---|---|---|---|
| TA-01 | Solicitar una compra | PER-01 | CU-01 | P-03, P-04 | Alta |
| TA-02 | Registrar una compra urgente | PER-01 | CU-03 | P-07, P-04 | Media |
| TA-03 | Registrar el avance del corte sin señal | PER-01 | CU-09 | P-09, P-04 | Una por corte |
| TA-04 | Decidir una solicitud con el saldo a la vista | PER-02, PER-03 | CU-02 | P-05, P-06 | Alta |
| TA-05 | Legalizar una compra urgente | PER-03 | CU-04 | P-05, P-08 | Media |
| TA-06 | Consultar la ejecución de un rubro | PER-02, PER-03 | CU-07 | P-10 | Alta |

## 4. Requisitos de usabilidad y accesibilidad

Medidas de ISO 9241-11: eficacia (lo logra), eficiencia (cuánto le cuesta) y satisfacción.

| ID | Dimensión | Requisito medible | Cómo se mide | Requisito del catálogo |
|---|---|---|---|---|
| US-01 | Eficacia | Al menos 4 de cada 5 participantes completan TA-01 y TA-04 sin ayuda. | Prueba de usabilidad | RNF-002 |
| US-02 | Eficiencia | Un residente registra el avance de un corte de 10 actividades en 15 minutos o menos. | Cronómetro en la prueba | RNF-001 |
| US-03 | Eficiencia | Una compra urgente se registra en 2 minutos o menos. | Cronómetro en la prueba | RNF-002 |
| US-04 | Errores | Ningún participante registra un valor equivocado sin notarlo. | Observación en la prueba | RNF-012 |
| US-05 | Satisfacción | Puntaje SUS promedio de 68 o más. | Cuestionario SUS | — |
| AC-01 | Perceptible | Texto con contraste de 4,5:1 o más; componentes y foco con 3:1 o más (WCAG 1.4.3, 1.4.11). | Medición de los pares de color | RNF-013 |
| AC-02 | Operable | Objetivos táctiles de 44 × 44 px o más (WCAG 2.5.8 exige 24; se pide más por CX-01). | Inspección del prototipo | RNF-013 |
| AC-03 | Operable | Todo se puede hacer con teclado y el foco siempre se ve (WCAG 2.1.1, 2.4.7). | Recorrido con teclado | RNF-013 |
| AC-04 | Comprensible | Cada campo tiene etiqueta visible y cada error dice qué corregir, junto al campo (WCAG 3.3.1, 3.3.2). | Inspección del prototipo | RNF-013 |
| AC-05 | Adaptable | Sin desplazamiento horizontal a 360 px de ancho (WCAG 1.4.10). | Prueba en navegador | RNF-003 |

AC-01, AC-02, AC-04 y AC-05 ya se comprobaron sobre el prototipo; los resultados están en la [evaluación heurística](evaluacion/evaluacion-heuristica.md). US-01 a US-05 y AC-03 se miden en la prueba con usuarios.
