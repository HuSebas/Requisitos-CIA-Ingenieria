# Glosario del proyecto

Términos del dominio tal como se usan en los artefactos. Un término se usa siempre con el mismo significado; los sinónimos se listan para evitarlos.

| Término | Definición | Fuente |
|---|---|---|
| Obra | Proyecto de construcción aprobado que la empresa ejecuta para un cliente, con presupuesto y cronograma propios. | Cuestionario preliminar |
| Frente de obra | Lugar físico de la obra donde se ejecuta una actividad. | E-01, E-02 |
| Actividad | Unidad de trabajo del cronograma de la obra sobre la que se mide el avance. | E-01 |
| Rubro | Partida del presupuesto de una obra a la que se imputa un gasto (materiales, mano de obra, costos de operación). | E-01 |
| Presupuesto de obra | Valor aprobado para ejecutar una obra, desglosado por actividad y rubro, incluidos los imprevistos. | Árbol de metas G1.1 |
| Imprevistos | Margen del presupuesto reservado para gastos no planeados. | Árbol de metas G1.1 |
| Gasto acumulado | Suma de las compras registradas contra un rubro, incluidas las urgentes por legalizar. | HU-01 |
| Saldo del rubro | Presupuesto del rubro menos su gasto acumulado. | HU-01 |
| Solicitud de compra | Petición de insumos hecha desde la obra, con obra, actividad o rubro, cantidad, fecha requerida y solicitante. | Árbol de metas G2.1 |
| Aprobador | Persona a quien corresponde decidir una solicitud de compra o legalizar una compra urgente. | Árbol de metas G2.2 |
| Ruta de aprobación | Lista ordenada de uno o dos aprobadores que deben decidir una solicitud, según la tabla de decisión. | RN-19 |
| Decisión | Aprobación, rechazo, legalización o devolución con observación que un aprobador registra sobre una compra. | CU-02, CU-04 |
| Compra | Adquisición de un insumo imputada a un rubro: nace de una solicitud aprobada o se registra como compra urgente. | Modelo de dominio |
| Compra urgente | Compra ejecutada en obra sin solicitud aprobada previa. | HU-03 |
| Por legalizar | Estado de una compra urgente registrada y descontada del saldo que el aprobador aún no ha validado. | Árbol de metas G2.6 |
| Soporte | Documento que respalda una compra: factura u orden de compra, en foto o archivo. | Árbol de metas G2.5 |
| Orden de compra | Documento con el que la empresa formaliza un pedido a un proveedor. | E-01 |
| Recepción de material | Verificación en el frente de obra de lo entregado por el proveedor contra la orden de compra. | Árbol de metas G4.1 |
| Devolución | Retorno al proveedor de material incompleto o dañado. | Árbol de metas G4.3 |
| Avance físico | Cantidad ejecutada o porcentaje de avance de una actividad en un corte. | Árbol de metas G3.1 |
| Reporte de avance | Registro del avance físico de las actividades de una obra en un corte. Puede tener varias versiones; solo una está vigente. | CU-09; RN-14 |
| Corte | Fecha periódica en la que se reporta el avance de una obra (semanal, quincenal, mensual o trimestral). | Árbol de metas G3.3 |
| Residente de obra | Responsable en campo de ejecutar la obra y reportar avance, compras y novedades. | Matriz de poder-interés |
| Gerente de obra | Responsable de que la obra cumpla plazo y presupuesto; autoriza compras. Sinónimo que no se usa: «director de obra». | E-02 |
| Administradora de proyectos | Consolida en la sede contratos, órdenes de compra, soportes y presupuestos de las obras. | E-01 |
| Gerente general | Máxima autoridad de la empresa y patrocinador del proyecto; autoriza los gastos que superan los imprevistos. | E-02 |
| Contador | Responsable financiero y de los soportes contables; recibe las compras verificadas para pago. | Cuestionario preliminar |
| Usuario | Persona con acceso al sistema. Tiene un único rol en cada obra a la que está asignada. | RN-21 |
| Asignación | Vínculo entre un usuario y una obra, con el rol que cumple en ella. | RN-21 |
| Registro de cambio | Anotación de quién cambió qué, cuándo y cuál era el valor anterior. No se puede modificar ni eliminar. | RF-034 |
| Caja menor | Fondo en efectivo con el que el residente paga compras urgentes en obra. | E-02 |
| Legalización | Validación que el aprobador hace de una compra urgente y de su soporte después de ejecutada. | CU-04 |
| Compra verificada | Compra que la administradora de proyectos revisó contra cotización, orden de compra y soporte, y que el contador ya puede consultar. | RF-016 |
| Novedad de recepción | Diferencia entre lo recibido y lo pedido: cantidad distinta, material dañado o proveedor distinto al de la orden. | RN-15 |
| Umbral de alerta | Porcentaje del presupuesto de un rubro a partir del cual el sistema genera la alerta. | RN-11 |
| Tope de caja menor | Valor máximo de una compra urgente sin marca «sobre el tope». | RN-09 |
| Pendiente | Pregunta abierta a la empresa, con dueño, fecha límite, valor provisional y consecuencia. Se identifica como PD-nn. | Apéndice F del SRS |
