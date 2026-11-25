# Estándares aplicados y plan de adopción

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-15 |
| Contexto | Equipo de cuatro personas (Juan Miguel Blanco, Paola Camacho, Sebastián Huertas y Jhonnyd Bleyck Arias Santafé, incorporado en la Unidad 8), proyecto de diez semanas, entregable: un SRS. Se adopta lo que mejora el SRS y se justifica lo que se omite |

## 1. Matriz de aplicabilidad

| Estándar | Qué regula | Aplica | Uso en el proyecto |
|---|---|---|---|
| ISO/IEC/IEEE 29148:2018 | Procesos de ingeniería de requisitos, características de un buen requisito y contenido del SRS | Sí | Estructura del SRS, atributos de cada requisito y lista de verificación de calidad |
| IEEE 830-1998 | Práctica recomendada para el SRS (reemplazada por 29148) | Parcial | Se toman sus ocho características del SRS como lista de verificación |
| ISO/IEC 25010:2023 | Modelo de calidad del producto | Sí | Clasificación y relevancia de los requisitos de calidad |
| ISO 9241-11:2018 | Usabilidad: eficacia, eficiencia y satisfacción en un contexto de uso | Sí | Requisitos de usabilidad medibles y evaluación del prototipo |
| WCAG 2.2 | Accesibilidad de contenidos web | Parcial | Nivel AA en contraste, tamaño de objetivos táctiles y etiquetas de formularios |
| ISO/IEC/IEEE 12207:2017 | Procesos del ciclo de vida del software | Parcial | Solo los procesos de definición de necesidades y de requisitos |
| ISO/IEC 29110 | Ciclo de vida para organizaciones muy pequeñas | Referencia | El perfil básico orienta qué documentos mínimos pedir a quien construya el sistema |
| CMMI V3.0 | Mejora de procesos; área de desarrollo y gestión de requisitos | Referencia | Guía para la autoevaluación de la sección 3 |
| ISO/IEC 33000 | Evaluación de procesos | No | No se hace una evaluación formal; se usa solo su escala de niveles |
| UML 2.5 | Notación de modelado | Sí | Diagramas de casos de uso, actividades, secuencia, estados y clases |
| Guía del PMBOK | Dirección de proyectos | Parcial | Acta de constitución y registro de riesgos |
| Ley 1581 de 2012 (Colombia) | Protección de datos personales | Sí | Acuerdo de confidencialidad y anonimización |

## 2. Adaptación

| Elemento del estándar | Decisión | Justificación |
|---|---|---|
| Estructura del SRS (29148) | Se adopta | Es el entregable principal. |
| Atributos de cada requisito (29148) | Se adapta: identificador, descripción, justificación, fuente, criterio de ajuste, prioridad, dependencias e historial | Ocho campos bastan para trazar y verificar; se omiten riesgo y dificultad por requisito, que ya están en la priorización. |
| Especificación de requisitos de interesados, StRS (29148) | Se sustituye | La cubren el acta de constitución, la ficha de organización y el inventario de requisitos candidatos. |
| Especificación de requisitos del sistema, SyRS (29148) | Se omite | El sistema es solo software; no hay hardware que especificar. |
| Las nueve características de calidad (25010) | Se adapta | Se especifican las de relevancia alta o media; mantenibilidad y protección se justifican como bajas. |
| Evaluación con usuarios (9241-11) | Se adapta | Prueba con pocos participantes y cuestionario SUS, por el acceso limitado a la empresa. |
| Gestión de cambios (12207) | Se adapta | Solicitudes de cambio `SC-nn` y versiones etiquetadas en el repositorio, sin comité formal. |

## 3. Autoevaluación de la capacidad del proceso

Escala: 0 incompleto · 1 realizado · 2 gestionado · 3 definido.

| Práctica | Nivel | Evidencia | Brecha |
|---|---|---|---|
| Obtener las necesidades de los interesados | 2 | Plan de levantamiento, cuestionario, dos entrevistas con hallazgos numerados | Faltan el residente y el contador como fuentes directas. |
| Transformar necesidades en requisitos | 2 | Inventario de candidatos, árbol de metas, catálogo en EARS con fichas | — |
| Analizar y resolver conflictos | 2 | Seis conflictos con opciones y acuerdo | Los acuerdos son propuestas hasta la sesión de validación. |
| Priorizar | 2 | MoSCoW y matriz de valor, costo y riesgo | Las calificaciones son del equipo. |
| Mantener la trazabilidad | 2 | Matriz en ambos sentidos, sin requisitos huérfanos | Se actualiza a mano. |
| Validar los requisitos con los interesados | 1 | Actas enviadas para validación | No hay todavía respuesta de los entrevistados ni sesión de revisión. |
| Verificar la especificación | 1 | Revisión cruzada de cada pull request | Falta la inspección formal del SRS. |
| Gestionar los cambios | 1 | Historial de versiones en cada documento | Falta el registro de solicitudes de cambio. |

## 4. Plan de adopción

| # | Acción | Estándar | Entregable | Fecha (2026) |
|---|---|---|---|---|
| 1 | Redactar el SRS con la estructura adoptada | 29148 | SRS 0.5 | 16 nov |
| 2 | Verificar el SRS contra las ocho características y la lista de calidad de requisitos | IEEE 830, 29148 | Lista de verificación diligenciada | 18 nov |
| 3 | Evaluar el prototipo con heurísticas y con usuarios | 9241-11, WCAG 2.2 | Informe de evaluación | 18 nov |
| 4 | Inspección formal del SRS | 29148 | Acta de inspección con defectos y métricas | 20 nov |
| 5 | Abrir el registro de solicitudes de cambio y congelar la línea base | 12207 | SRS 0.9 y registro `SC-nn` | 20 nov |
| 6 | Sesión de validación con la empresa | 29148 | Acta de revisión y SRS 1.0 | 23 – 27 nov |
