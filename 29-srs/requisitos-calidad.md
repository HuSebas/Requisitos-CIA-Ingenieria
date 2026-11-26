# Requisitos de calidad

| Campo | Valor |
|---|---|
| Versión | 1.1 · 2026-11-16 — RNF-012 y RNF-013, surgidos del prototipo |
| Modelo | ISO/IEC 25010:2023, modelo de calidad del producto (nueve características) |

## 1. Matriz de relevancia

Relevancia de cada característica para este sistema, según lo que dijeron las fuentes. Alta: hay un hallazgo que la exige. Media: se deriva del contexto. Baja: no hay evidencia de necesidad en esta versión.

| Característica | Relevancia | Por qué | Requisitos |
|---|---|---|---|
| Adecuación funcional | Alta | Los cálculos de saldo y gasto deben ser exactos: de ellos depende la decisión de compra. | RF-005, RF-008, RN-01 |
| Eficiencia de desempeño | Media | El aprobador consulta el saldo desde la obra con conexión móvil. | RNF-005 |
| Compatibilidad | Media | El Excel sigue en uso durante la transición. | RNF-010, RES-02 |
| Capacidad de interacción | Alta | Si registrar cuesta más que la libreta, el residente no lo usa (E-01 #11, #12). El residente trabaja al aire libre y con el celular en una mano. | RNF-001, RNF-002, RNF-012, RNF-013 |
| Fiabilidad | Alta | La señal en los frentes es irregular y un reporte perdido obliga a rehacerlo (E-02 #3). | RNF-004, RNF-009, RNF-011 |
| Seguridad | Alta | El presupuesto es reservado y la traza de cambios es un objetivo del proyecto (E-02 #5; E-01 #9). | RNF-006, RNF-007, RNF-008 |
| Mantenibilidad | Baja | Es una decisión de diseño; no hay requisito de la empresa. Los umbrales y topes se piden configurables (PD-01 a PD-04). | — |
| Flexibilidad | Alta | El sistema se usa desde celulares y portátiles que la empresa ya tiene. | RNF-003, RES-01 |
| Protección (*safety*) | Baja | El sistema no controla procesos físicos; la seguridad en el trabajo está fuera de alcance. | — |

## 2. Catálogo

Los trece requisitos de calidad, con su medida, están en la sección 2 del [catálogo de requisitos](catalogo-requisitos.md) y en sus [fichas](fichas-requisitos.md).

## 3. Cómo se verifica cada uno

| ID | Método | Momento |
|---|---|---|
| RNF-001 | Prueba cronometrada con un residente | Prueba de usabilidad del prototipo y aceptación |
| RNF-002 | Inspección de los formularios | Revisión del prototipo |
| RNF-003 | Prueba en celular de 360 px y en portátil | Aceptación |
| RNF-004 | Prueba de sincronización tras 72 horas sin conexión | Aceptación |
| RNF-005 | Medición del percentil 95 con red 3G simulada | Pruebas de desempeño |
| RNF-006 | Prueba de acceso con cada rol; inspección del tráfico | Pruebas de seguridad |
| RNF-007 | Inspección de formularios del residente | Revisión del prototipo y aceptación |
| RNF-008 | Intento de edición y borrado del registro de cambios con cada rol | Pruebas de seguridad |
| RNF-009 | Revisión de la política de retención y restauración de una copia | Operación |
| RNF-010 | Exportación y apertura de los tres archivos | Aceptación |
| RNF-011 | Monitoreo mensual | Operación |
| RNF-012 | Inspección de las cuatro acciones en el prototipo | Revisión del prototipo y aceptación |
| RNF-013 | Medición de contraste, tamaño de objetivos y revisión de etiquetas y foco | Revisión del prototipo y aceptación |
