# Modelo de dominio

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Diagramas | [DCL-01 · Presupuesto y compras](dcl-01-presupuesto-compras.puml) · [DCL-02 · Avance y recepción](dcl-02-avance-recepcion.puml) |
| Alcance | Clases del negocio con atributos y relaciones. No incluye operaciones ni decisiones de diseño: esas están en [patrones de diseño](patrones-diseno.md) |

## 1. Fichas de clase

C: crea · R: consulta · U: actualiza. Los atributos con «/» se calculan.

### Obra

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01, DCL-02 |
| Propósito | Proyecto de construcción aprobado que la empresa ejecuta, con su presupuesto y sus actividades. |
| Atributos | nombre, periodicidadCorte |
| Reglas de negocio | RN-20 |
| Casos de uso | C: CU-06 · U: CU-12 · R: CU-01, CU-07 |
| Requisitos | RF-017, RF-026 |
| Glosario | Obra |

### Presupuesto

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01 |
| Propósito | Versión del presupuesto aprobado de una obra. Solo una está vigente. |
| Atributos | version, fechaAprobacion, vigente |
| Reglas de negocio | RN-20 |
| Casos de uso | C: CU-06, CU-16 · R: CU-01, CU-05, CU-07 |
| Requisitos | RF-017, RF-018 |
| Glosario | Presupuesto de obra |

### Rubro

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01, DCL-02 |
| Propósito | Partida del presupuesto a la que se imputan las compras. Su saldo se calcula, no se digita. |
| Atributos | nombre, valorPresupuestado, esImprevistos, /gastoAcumulado, /saldo |
| Reglas de negocio | RN-01, RN-11, RN-12 |
| Casos de uso | C: CU-06, CU-16 · R: CU-01, CU-02, CU-03, CU-05, CU-07, CU-08, CU-14, CU-17 |
| Requisitos | RF-017, RF-018 |
| Glosario | Rubro |

### Actividad

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01, DCL-02 |
| Propósito | Unidad de trabajo de la obra sobre la que se mide el avance. |
| Atributos | nombre, unidad, cantidadPlaneada |
| Reglas de negocio | RN-13 |
| Casos de uso | C: CU-06 · R: CU-09, CU-10 |
| Requisitos | RF-017 |
| Glosario | Actividad |

### Compra

| Campo | Contenido |
|---|---|
| Tipo · vista | Abstracta · DCL-01 |
| Propósito | Clase abstracta: lo común a toda adquisición imputada a un rubro. |
| Atributos | valor, descripcion, fechaRegistro, verificada |
| Reglas de negocio | RN-01, RN-17 |
| Casos de uso | A través de SolicitudCompra y CompraUrgente |
| Requisitos | — |
| Glosario | Compra |

### SolicitudCompra

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01, DCL-02 |
| Propósito | Petición de insumos que debe ser decidida por su ruta de aprobación antes de comprar. |
| Atributos | insumo, cantidad, fechaRequerida, estado : EstadoSolicitud |
| Reglas de negocio | RN-02 a RN-06, RN-10, RN-19, RN-22 |
| Casos de uso | C: CU-01 · U: CU-02, CU-15, CU-19 · R: CU-05, CU-17, CU-18, CU-20 |
| Requisitos | RF-001, RF-002, RF-003, RF-004, RF-005, RF-006, RF-007, RF-008, RF-009, RF-010, RF-016, RF-038, RF-042, RF-043 |
| Glosario | Solicitud de compra |

### CompraUrgente

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01 |
| Propósito | Compra ya hecha con caja menor, sin solicitud previa, que debe legalizarse. |
| Atributos | sobreTope, estado : EstadoCompraUrgente |
| Reglas de negocio | RN-07, RN-08, RN-09 |
| Casos de uso | C: CU-03 · U: CU-04, CU-15 · R: CU-05, CU-17, CU-18 |
| Requisitos | RF-011, RF-012, RF-013, RF-014, RF-015, RF-016, RF-039, RF-040, RF-041 |
| Glosario | Compra urgente |

### Decision

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01 |
| Propósito | Aprobación, rechazo, legalización o devolución con observación que un aprobador registra sobre una compra. |
| Atributos | resultado, fecha, saldoVigente, motivoUObservacion |
| Reglas de negocio | RN-06, RN-10, RN-19 |
| Casos de uso | C: CU-02, CU-04 |
| Requisitos | RF-005, RF-006, RF-007, RF-008, RF-009, RF-010, RF-014, RF-015, RF-039, RF-041, RF-042, RF-043 |
| Glosario | Decisión |

### Soporte

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01 |
| Propósito | Documento que respalda una compra: factura, orden o cotización, en foto o archivo. |
| Atributos | tipo, archivo |
| Reglas de negocio | RN-08 |
| Casos de uso | C: CU-03, CU-13 · R: CU-04, CU-15, CU-18 |
| Requisitos | RF-011, RF-012, RF-013, RF-030, RF-031, RF-040 |
| Glosario | Soporte |

### Usuario

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01, DCL-02 |
| Propósito | Persona con acceso al sistema. |
| Atributos | nombre |
| Reglas de negocio | RN-21 |
| Casos de uso | Ninguno: ver HC-02 en la [matriz de consistencia](../../matriz-consistencia.md) |
| Requisitos | RF-036, RF-037 |
| Glosario | Usuario |

### Asignacion

| Campo | Contenido |
|---|---|
| Tipo · vista | De asociación · DCL-01 |
| Propósito | Clase de asociación entre Usuario y Obra: guarda el rol del usuario en esa obra. |
| Atributos | rol |
| Reglas de negocio | RN-16, RN-21 |
| Casos de uso | Ninguno: ver HC-02 en la [matriz de consistencia](../../matriz-consistencia.md) |
| Requisitos | RF-036, RF-037 |
| Glosario | Asignación |

### RegistroCambio

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-01 |
| Propósito | Traza de un cambio: quién, cuándo y cuál era el valor anterior. |
| Atributos | fecha, valorAnterior |
| Reglas de negocio | RN-17 |
| Casos de uso | Todos los que modifican datos la escriben |
| Requisitos | RF-034, RF-035 |
| Glosario | Registro de cambio |

### Corte

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Fecha periódica en la que se reporta el avance de una obra. |
| Atributos | fecha |
| Reglas de negocio | RN-14 |
| Casos de uso | C: CU-12 · R: CU-09 |
| Requisitos | RF-026 |
| Glosario | Corte |

### ReporteAvance

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Versión del reporte de avance de un corte. Solo una está vigente. |
| Atributos | version, vigente, motivoDevolucion, estado : EstadoReporte |
| Reglas de negocio | RN-14, RN-18 |
| Casos de uso | C: CU-09 · U: CU-11 · R: CU-10, CU-17 |
| Requisitos | RF-023, RF-024, RF-025, RF-028, RF-029 |
| Glosario | Reporte de avance |

### AvanceActividad

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Avance de una actividad dentro de un reporte, con su fotografía. |
| Atributos | cantidadEjecutada, porcentaje, fotografia |
| Reglas de negocio | RN-13 |
| Casos de uso | C: CU-09 · R: CU-07, CU-10 |
| Requisitos | RF-023, RF-024, RF-025 |
| Glosario | Avance físico |

### OrdenCompra

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Documento con el que la empresa formaliza el pedido de una solicitud aprobada. |
| Atributos | numero, proveedor, fecha |
| Reglas de negocio | RN-22 |
| Casos de uso | C: CU-20 · R: CU-13, CU-14, CU-15 |
| Requisitos | RF-044 |
| Glosario | Orden de compra |

### Recepcion

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Verificación en obra de lo entregado contra la orden de compra. |
| Atributos | fecha, cantidadRecibida, estadoMaterial, conNovedad |
| Reglas de negocio | RN-15 |
| Casos de uso | C: CU-13 |
| Requisitos | RF-011, RF-030, RF-031 |
| Glosario | Recepción de material |

### Devolucion

| Campo | Contenido |
|---|---|
| Tipo · vista | Concreta · DCL-02 |
| Propósito | Retorno al proveedor de material incompleto o dañado. |
| Atributos | material, cantidad, motivo, valor |
| Reglas de negocio | RN-12 |
| Casos de uso | C: CU-14 · R: CU-05 |
| Requisitos | RF-032, RF-033 |
| Glosario | Devolución |

## 2. Relaciones

| Tipo | Relación | Por qué ese tipo |
|---|---|---|
| Composición | Obra–Presupuesto, Presupuesto–Rubro, Obra–Actividad, Obra–Corte, Corte–ReporteAvance, ReporteAvance–AvanceActividad, Compra–Soporte, Compra–Decision | La parte no existe sin el todo: se crea dentro de él y desaparece con él. |
| Agregación | Obra–Usuario | El usuario existe con independencia de la obra y puede estar en varias. |
| Generalización | Compra ← SolicitudCompra, CompraUrgente | Las dos son compras imputadas a un rubro; difieren en su ciclo de vida. |
| Clase de asociación | Asignacion entre Obra y Usuario | El rol pertenece al vínculo, no al usuario ni a la obra. |
| Asociación binaria | Compra–Rubro, Compra–Usuario, Decision–Usuario, Rubro–Actividad, AvanceActividad–Actividad, SolicitudCompra–OrdenCompra, OrdenCompra–Recepcion, OrdenCompra–Devolucion, Devolucion–Rubro | Objetos independientes que se conocen. |
| Dependencia | SolicitudCompra → EstadoSolicitud, CompraUrgente → EstadoCompraUrgente, ReporteAvance → EstadoReporte | La clase usa la enumeración como tipo de su atributo estado. |

La realización no aparece en el dominio porque no hay interfaces del negocio; aparece en los [patrones de diseño](patrones-diseno.md).

## 3. Multiplicidades no triviales

| Multiplicidad | Significado | Regla o fuente |
|---|---|---|
| Obra 1 — 1..* Presupuesto | Una obra tiene una o más versiones de presupuesto; una sola vigente. | RN-20 |
| Compra 0..* — 1..2 Usuario (ruta de aprobación) | Una compra la deciden uno o dos aprobadores. | RN-19 |
| Obra 0..* — 1..* Usuario, con Asignacion | Cada usuario tiene un único rol por obra. | RN-21 |
| Corte 1 — 1..* ReporteAvance | Un corte tiene una o más versiones de su reporte; una sola vigente. | RN-14 |
| SolicitudCompra 1 — 0..1 OrdenCompra | Una solicitud aprobada origina como máximo una orden. | RN-22 (por confirmar) |
| Rubro 0..* — 0..1 Actividad | Un rubro puede no pertenecer a una actividad: es el caso de imprevistos. | E-02 #8 |
| ReporteAvance 1 — 1..* AvanceActividad | Un reporte lleva al menos el avance de una actividad. | RF-023 |
| Compra 1 — 0..* Soporte | Una solicitud puede no tener soporte hasta la recepción; una compra urgente tiene al menos uno. | RN-08 |

## 4. Estados

| Enumeración | Valores | Ciclo de vida |
|---|---|---|
| EstadoSolicitud | Pendiente, Aprobada, Rechazada, Anulada | [DES-01](../estados/estados.md) |
| EstadoCompraUrgente | Por legalizar, Legalizada | [DES-02](../estados/estados.md) |
| EstadoReporte | Pendiente de sincronizar, Registrado, Devuelto | [DES-03](../estados/estados.md) |

## 5. Glosario del dominio

Cada clase tiene su término en el [glosario del proyecto](../../../GLOSARIO.md); la correspondencia está en el campo «Glosario» de cada ficha.
