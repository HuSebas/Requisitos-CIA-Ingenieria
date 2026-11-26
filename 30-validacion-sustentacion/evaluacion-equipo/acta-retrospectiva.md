# Acta de la retrospectiva

| Dato | Valor |
|---|---|
| Fecha y duración | 2026-11-23 · 45 minutos |
| Facilitador (distinto del líder de la etapa) | Sebastián Felipe Huertas Salas |
| Asistentes | Jhonnyd Bleyck Arias Santafé · Juan Miguel Blanco Perilla · Paola Andrea Camacho González · Sebastián Felipe Huertas Salas |
| Reglas | Se habla del proceso y no de las personas; sin interrumpir; sirve para mejorar, no para calificar |

## 1. Línea de tiempo

Los hechos salen de la bitácora y del repositorio. Las dos últimas columnas las llena el equipo.

| Fecha | Hito o hecho | Sorpresa o dificultad | Cómo nos sentimos |
|---|---|---|---|
| 2026-09-20 | Reunión de inicio; acta de constitución | El objetivo inicial incluía programar; tocó acotarlo a especificar | Aliviados al delimitar el alcance |
| 2026-09-24 | Entrevista E-01 a la administradora de proyectos | La empresa trabaja con llamadas, WhatsApp y varios Excel | Motivados por tener un problema real |
| 2026-09-25 | Entrevista E-02 al gerente de obra | Contradicción con el cuestionario en pedidos duplicados y aprobación | Alertados; faltaba hablar con contador y residente |
| 2026-09-29 | Último pull request de septiembre | Se acumuló trabajo local sin subir al repositorio | Confiados de más al pausar commits |
| Octubre | Sin commits en el repositorio | Pausa larga por carga de otras materias y falta de citas | Preocupados al retomar en noviembre |
| 2026-11-15 | Reorganización del repositorio; modelos y prototipo | El modelado destapó 13 huecos y el error de un solo aprobador | Satisfechos con la calidad técnica |
| 2026-11-16 | SRS 0.5, 0.8 y 0.9; revisión interna | 17 hallazgos internos y 21 pendientes sin respuesta de la empresa | Exigidos por el tiempo de cierre |
| 2026-11-23 | Integración del cuarto integrante y limpieza final | Unificar formatos de Drive, plantillas Word y estructura GitHub | Organizados y listos para entrega |

## 2. Tres columnas

| Qué funcionó (mantener) | Qué no funcionó (cambiar) | Qué no sabíamos (aprender) |
|---|---|---|
| Modelar flujos completos y probar reglas con un prototipo HTML antes de cerrar el SRS | Dejar la validación con la empresa y los commits en GitHub para las últimas semanas | Que modelar estados y secuencias descubre requisitos críticos que las entrevistas no mencionan |
| Revisión cruzada entre integrantes con scripts automáticos (`revisar-srs.js`, `verificar-trazabilidad.js`) | Trabajar en archivos locales o copias de Drive sin unificar nombres ni rutas desde el inicio | Que cada supuesto sin dueño ni fecha se convierte en riesgo de rechazo al final |
| Integrar roles claros para la etapa final y separar evidencias confidenciales | Esperar confirmación verbal sin respaldo escrito ni registro inmediato en bitácora | La importancia de mantener `CONTRIBUCIONES.md` y la bitácora al día cada semana |

## 3. Causas y acciones

Para el hecho que más se repitió, preguntar «¿por qué?» tres veces.

| Hecho | Por qué (1) | Por qué (2) | Por qué (3) | Acción: cuando pase X haremos Y | Quién la recuerda |
|---|---|---|---|---|---|
| Validación con la empresa concentrada al final | No se agendaron las citas de seguimiento tras E-01 y E-02 | No había un calendario fijo con holgura desde la Sesión 1 | No se asignó seguimiento semanal de hitos con fecha límite externa | Cuando cerremos una entrevista, dejaremos agendada la fecha de validación en menos de 48 h | Paola Andrea Camacho González (enlace) |
| Trabajo local sin reflejo inmediato en GitHub | Se priorizó avanzar en documentos de Drive antes que abrir Pull Requests | No se fijó una regla semanal de al menos un PR por integrante | Se subestimó el tiempo de limpieza y trazabilidad final | Cada viernes haremos cierre semanal con al menos un PR revisado por otro integrante | Jhonnyd Bleyck Arias Santafé (custodio del repo) |

## 4. Lecciones que pasan al informe final

El capítulo 6 del [informe final](../informe-final/informe-final.pdf) tiene seis lecciones tomadas de la evidencia del repositorio. El equipo las confirma, las corrige o las reemplaza aquí.

| N.º | Hecho (con fecha) | Causa | Acción para quien lo lea | ¿Se confirma? |
|---|---|---|---|---|
| L-1 | Supuestos sin dueño ni fecha hasta el 2026-11-16 | Se anotaban dudas sin convertirlas en preguntas cerradas | Todo supuesto nace con dueño, fecha límite y valor provisional | Sí, confirmada |
| L-2 | Siete requisitos nacieron del modelado | Las entrevistas omiten excepciones y anulaciones | Modelar estados y secuencias antes de congelar el SRS | Sí, confirmada |
| L-3 | Caso de uso con un solo aprobador | Se simplificó la regla de imprevistos al redactar el primer CU | Cruzar cada tabla de decisión contra el diagrama de casos de uso | Sí, confirmada |
| L-4 | 26 Must sin escenario de aceptación | Se redactaron requisitos antes de definir cómo probarlos | Escribir el escenario AC-nn junto con cada requisito Must | Sí, confirmada |
| L-5 | Dos de cinco cargos entrevistados | Dependencia de un solo contacto para acceder a campo | Pedir acceso a todos los roles clave desde el acuerdo inicial | Sí, confirmada |
| L-6 | Validación con la empresa al final | Falta de holgura y citas confirmadas por hito | Reservar sesiones cortas de validación por cada entrega parcial | Sí, confirmada |
