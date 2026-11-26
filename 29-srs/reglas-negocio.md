# Reglas de negocio

| Campo | Valor |
|---|---|
| Versión | 1.1 · 2026-11-16 — ruta de aprobación (RN-19), reglas del modelo de dominio (RN-20 a RN-22) y ajustes a RN-09 y RN-17 |
| Qué es | Políticas y cálculos de la empresa que el sistema debe respetar, existan o no en software |

## 1. Catálogo

| ID | Regla | Tipo | Fuente | Requisitos |
|---|---|---|---|---|
| RN-01 | Saldo del rubro = presupuesto del rubro − gasto acumulado. El gasto acumulado suma las compras aprobadas y las urgentes (por legalizar y legalizadas), y resta las devoluciones. | Cálculo | E-02 #7, #10; HU-01 | RF-005, RF-006, RF-008, RF-019 |
| RN-02 | Una solicitud cuyo valor cabe en el saldo del rubro la decide la administradora de proyectos. | Autorización | E-02 #6 | RF-003 |
| RN-03 | Si además la compra es grande (PD-02) o cambia lo planeado, requiere el visto bueno técnico del gerente de obra antes de la decisión. | Autorización | E-02 #6 | RF-003 |
| RN-04 | Una solicitud que supera el saldo del rubro pero cabe en el saldo de imprevistos la deciden la administradora de proyectos y el gerente de obra, ambos. | Autorización | E-02 #8 | RF-003 |
| RN-05 | Una solicitud que supera el saldo del rubro y el saldo de imprevistos la decide el gerente general. | Autorización | E-02 #8 | RF-003 |
| RN-06 | Nadie decide una solicitud que él mismo registró. | Restricción | Propuesta del equipo, por confirmar | RF-003 |
| RN-07 | Una compra urgente se descuenta del saldo en la fecha de su registro, aunque el saldo quede negativo, y permanece «por legalizar» hasta que el aprobador la valida. | Restricción | E-02 #6, #9; HU-03 | RF-012, RF-014 |
| RN-08 | Una compra urgente solo se registra con rubro, valor y fotografía del soporte. | Restricción | E-02 #9; HU-03 | RF-012, RF-013 |
| RN-09 | Una compra urgente que supera el tope de caja menor (PD-03) se registra marcada «sobre el tope». Toda compra urgente se legaliza dentro del plazo (PD-04). | Restricción | PD-03, PD-04 | RF-012, RF-015 |
| RN-10 | Todo rechazo lleva motivo. | Restricción | CU-02 | RF-009 |
| RN-11 | La alerta de un rubro se genera cuando el gasto acumulado alcanza el umbral (PD-01). | Disparador | E-02 #10; E-01 #4 | RF-020 |
| RN-12 | El valor del material devuelto se resta del gasto acumulado del rubro. | Cálculo | E-01 #8 | RF-033 |
| RN-13 | El avance acumulado de una actividad está entre 0 % y 100 %. | Restricción | Dominio | RF-023 |
| RN-14 | Hay un solo reporte de avance vigente por obra y corte; una corrección crea una versión nueva y conserva la anterior. | Restricción | E-02 #12 | RF-023, RF-028 |
| RN-15 | Una recepción tiene novedad si la cantidad recibida difiere de la pedida, el material llega dañado o el proveedor no es el de la orden. | Definición | E-02 #11; E-01 #8 | RF-030, RF-031 |
| RN-16 | El presupuesto es información reservada: cada rol ve lo que indica PD-05. | Autorización | E-02 #5 | RF-019, RF-036, RF-037 |
| RN-17 | Ningún presupuesto, compra o reporte se elimina; se anula con motivo y queda consultable. Un registro anulado no cuenta en el gasto acumulado. | Restricción | E-01 #9 | RF-034, RF-035, RF-038 |
| RN-18 | Un solo dispositivo registra el avance de una obra en cada corte. | Restricción | E-01 #11; HU-02 | RF-024, RF-025 |
| RN-19 | La ruta de aprobación de una solicitud tiene uno o dos aprobadores, en orden. La solicitud queda «aprobada» cuando todos la aprueban y «rechazada» cuando uno la rechaza. | Definición | E-02 #6, #8 | RF-003, RF-008, RF-042 |
| RN-20 | Cada obra tiene un solo presupuesto vigente; un ajuste aprobado crea una versión nueva y deja la anterior como histórica. | Restricción | E-01 #4 | RF-018 |
| RN-21 | Cada usuario tiene un único rol en cada obra. | Restricción | E-02 #5; cuestionario §5 | RF-036 |
| RN-22 | Una solicitud aprobada origina como máximo una orden de compra. | Restricción | Modelo de dominio, por confirmar | RF-044 |

## 2. Tabla de decisión: quién decide una solicitud de compra

Condiciones evaluadas al registrar la solicitud (RF-003) y de nuevo al decidir (RF-043; CU-02, extensión 3b).

| Condición | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| El valor cabe en el saldo del rubro | Sí | Sí | No | No |
| La compra es grande o cambia lo planeado | No | Sí | — | — |
| El exceso cabe en el saldo de imprevistos | — | — | Sí | No |
| **Ruta de aprobación (en orden)** | Administradora | Gerente de obra (visto bueno técnico) → administradora | Administradora → gerente de obra | Gerente general |
| Regla | RN-02 | RN-02, RN-03 | RN-04 | RN-05 |

Exceso = valor de la solicitud − saldo del rubro.

## 3. Ejemplos de cálculo

Rubro «Materiales / cemento» con presupuesto de $20.000.000; imprevistos de la obra con saldo de $2.000.000.

| Caso | Gasto acumulado | Saldo (RN-01) | Solicitud | Resultado |
|---|---|---|---|---|
| Dentro del saldo | $16.500.000 | $3.500.000 | $1.500.000 (7,5 % del rubro) | R1: ruta de una persona, la administradora. |
| Compra grande | $10.000.000 | $10.000.000 | $2.500.000 (12,5 % del rubro) | R2: ruta de dos; primero el gerente de obra y después la administradora. |
| Exceso en imprevistos | $16.500.000 | $3.500.000 | $4.000.000 | Exceso de $500.000, cabe en imprevistos. R3: ruta de dos; aprueban la administradora y el gerente de obra. |
| Exceso sobre imprevistos | $16.500.000 | $3.500.000 | $6.000.000 | Exceso de $2.500.000, supera imprevistos. R4: gerente general. |
| Compra urgente | $16.500.000 | $3.500.000 | Urgente de $800.000 | Saldo pasa a $2.700.000 el mismo día (RN-07). |
| Alerta | $15.000.000 | $5.000.000 | Aprobada de $1.000.000 | Gasto llega a $16.000.000 = 80 %: se genera la alerta (RN-11). |
| Devolución | $16.500.000 | $3.500.000 | Devolución de $300.000 | Gasto baja a $16.200.000; saldo de $3.800.000 (RN-12). |
