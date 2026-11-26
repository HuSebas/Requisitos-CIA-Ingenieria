# Checklist de propiedades del SRS

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Documento | [SRS-GO-001](../srs.md) v0.9 |
| Referencia | Las ocho características de un buen SRS de IEEE 830-1998 y las características del requisito individual de ISO/IEC/IEEE 29148:2018 (verificar la edición vigente) |

## 1. Propiedades del documento

| Propiedad | Prueba | ¿Cumple? | Evidencia | Qué falta |
|---|---|---|---|---|
| Correcto | Cada requisito corresponde a una necesidad expresada por la empresa | Parcial | 51 de 58 requisitos tienen fuente en una entrevista o documento de la empresa; las actas E-01 y E-02 están sin validar | Validación de la empresa; confirmar RF-038 a RF-041 y RF-044 (modelado) y RNF-012 y RNF-013 (evaluación del prototipo) |
| No ambiguo | Una sola lectura posible; sin palabras de la lista de vaguedades | Parcial | Revisor mecánico: 0 vaguedades; un «deberá» por enunciado | La prueba de dos lectores no se aplicó; RN-03 tiene una condición sin criterio (PD-02) |
| Completo | Están todas las funciones del alcance, las respuestas a entradas inválidas y los pendientes declarados | Parcial | 2.2 cubre RF-001 a RF-045; 21 pendientes con dueño; 2.6 declara lo postergado | Administración de usuarios (PD-14); corrección de compra urgente devuelta (PD-15) |
| Consistente | Sin contradicciones entre requisitos, reglas, casos de uso y pantallas | Sí | Revisión interna, filtro 3; matriz de consistencia de los modelos (8 de 10 reglas en «Sí», 2 parciales declaradas) | — |
| Clasificado por importancia y estabilidad | Cada requisito tiene prioridad | Sí | MoSCoW en 3.2 y 3.5: 31 Must, 24 Should, 3 Could | La estabilidad se expresa por los pendientes que cita cada requisito |
| Verificable | Cada requisito tiene un procedimiento finito para comprobarlo | Sí | 60 escenarios de aceptación; método de verificación por requisito; 13 no funcionales con medida y umbral | 17 escenarios están por ejecutar o medir |
| Modificable | Estructura estable, sin redundancia; un valor vive en un solo lugar | Sí | Reglas en 3.3; parámetros en E.1; el documento y la matriz se generan del mismo catálogo | — |
| Trazable | Hacia atrás (origen) y hacia adelante (verificación) | Sí | Verificador: 58 de 58 con cadena mínima; 0 errores | Tres requisitos transversales sin caso de uso (D.3) |

## 2. Características del requisito individual

La revisión requisito por requisito (necesario, apropiado, no ambiguo, completo, singular, factible, verificable, conforme y atributos) está en la [revisión interna](revision-interna-v0.8.md), sección C: los 26 funcionales Must, una muestra del resto y los 13 no funcionales.

## 3. Conclusión

El documento cumple cinco propiedades y cumple de forma parcial tres: correcto, no ambiguo y completo. Las tres dependen de la empresa: validar las actas, responder los pendientes y leer el documento en la sesión de revisión.
