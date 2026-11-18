## CRITERIOS DE ACEPTACIÓN

>  03_AcceptCriteria.md

---

### Escenarios "Happy Path"

> Ruta ideal sin errores para comprobar que la funcionalidad principal cumple correctamente su propósito y objetivos esperados.

> **Guía**

> **ID:** Nomenclatura `EH00`.
> Los escenarios deben representar el flujo exitoso esperado.
> Deben validar que el usuario logra completar el objetivo principal de la funcionalidad.
> La redacción debe seguir el formato:

| ID   | Descripción                                                          |
| ---- | -------------------------------------------------------------------- |
| EH01 | Dado que el Cajero inicia el registro de un cliente, cuando guarda el registro, entonces el cliente queda registrado y disponible para asociarle ventas. |
| EH02 | Dado que existe un cliente registrado, cuando el Cajero registra una venta asociada a ese cliente, entonces la venta se guarda con su importe total y queda asociada al cliente. |
| EH03 | Dado que una venta asociada a un cliente tiene una base de puntos de $10 MXN o de $19 MXN, cuando se registra la venta, entonces se genera 1 punto en ambos casos (1 punto por cada bloque completo de $10 MXN). |
| EH04 | Dado que un cliente tiene un saldo de N puntos, cuando se registra una venta asociada a él que genera M puntos, entonces su saldo pasa a N + M. |
| EH05 | Dado que un cliente tiene puntos acumulados, cuando consulta su saldo, entonces el sistema muestra el saldo acumulado. |
| EH06 | Dado que un cliente tiene ventas registradas, cuando consulta su historial, entonces el sistema muestra sus ventas y los movimientos de puntos generados por cada una. |
| EH07 | Dado que una venta asociada a un cliente generó M puntos, cuando la venta se cancela o se devuelve, entonces el saldo del cliente se reduce en M puntos. |
| EH08 | Dado que una venta tiene un subtotal sin IVA y después de descuentos de $100 MXN, con IVA adicional, cuando se registra la venta, entonces se generan 10 puntos; el IVA no genera puntos. |
| EH09 | Dado que un cliente tiene 3 puntos de saldo, cuando registra una venta con base de puntos de $25 MXN (2 puntos), entonces su saldo pasa a 5 puntos. |
| EH10 | Dado que se acaba de registrar un cliente nuevo, cuando consulta su saldo antes de cualquier venta, entonces el saldo es 0 puntos. |

> **Pendiente de confirmar:** si se permite registrar ventas sin cliente asociado (RF02 la asocia a un cliente; NE04 solo restringe los puntos) y los datos mínimos requeridos para registrar un cliente.

---

### Escenarios "UnHappy Path"

> Ruta con posibles errores, validaciones o excepciones para comprobar el comportamiento de la funcionalidad ante situaciones no ideales.

> **Guía**

> **ID:** Nomenclatura `EU00`.
> Los escenarios deben representar errores funcionales, validaciones, restricciones o excepciones de negocio.
> Deben validar que el sistema responde de forma controlada y consistente ante condiciones inesperadas.
> La redacción debe seguir el formato:

| ID   | Descripción                                                          |
| ---- | -------------------------------------------------------------------- |
| EU01 | Dado que una venta no está asociada a ningún cliente, cuando se registra, entonces no se generan ni acumulan puntos. |
| EU02 | Dado que la base de puntos de una venta asociada a un cliente es de $9.50 MXN, cuando se registra, entonces no se generan puntos. |
| EU03 | Dado que un usuario distinto del Cajero intenta registrar un cliente o una venta, cuando envía la operación, entonces el sistema la rechaza y no modifica datos. |
| EU04 | Dado que una venta asociada a un cliente no generó puntos, cuando se cancela o se devuelve, entonces el saldo del cliente no cambia. |
| EU05 | Dado que un cliente no tiene ventas, cuando consulta su saldo, entonces el sistema muestra 0 puntos sin error. |
| EU06 | Dado que una venta ya fue cancelada o devuelta y sus puntos fueron restados, cuando se intenta revertirla nuevamente, entonces el saldo no vuelve a disminuir. |
| EU07 | Dado que un cliente no tiene ventas ni movimientos de puntos, cuando consulta su historial, entonces el sistema muestra la lista vacía sin error. |

> **Pendiente de confirmar:** el mecanismo de autenticación que aplica EU03 (pendiente en la matriz de Seguridad de `02_ReqsDefinition.md`) y EU06 es un supuesto por confirmar.

---

### Criterios de Rechazo

> Definir las condiciones que impedirán la aceptación formal de la funcionalidad, módulo o entrega.

| ID   | Condición de Rechazo | Impacto |
| ---- | -------------------- | ------- |
| CR01 | No cumple uno o más requerimientos funcionales aprobados (RF01 a RF07). | Alto |
| CR02 | Incumple una o más reglas de negocio (NE01 a NE05): cálculo, redondeo, base, asociación a cliente o reversión. | Alto |
| CR03 | Genera o acumula puntos en ventas no asociadas a un cliente. | Alto |
| CR04 | Permite registrar clientes o ventas a un rol distinto del Cajero. | Alto |
| CR05 | La reversión de puntos al cancelar o devolver una venta es incorrecta. | Alto |
| CR06 | No cumple los requerimientos no funcionales acordados (actualmente pendientes de definir). | Medio |
| CR07 | La evidencia de pruebas es insuficiente o inconsistente. | Medio |

> **Guía**

> Una funcionalidad podrá ser rechazada cuando ocurra cualquiera de las siguientes situaciones:

> No cumple con uno o más requerimientos funcionales aprobados.

> Incumple una o más reglas de negocio definidas.

> Presenta errores críticos que impidan la operación normal.

> No satisface los criterios de aceptación establecidos.

> No cumple los requerimientos no funcionales acordados.

> Presenta vulnerabilidades de seguridad consideradas críticas o altas.

> La evidencia de pruebas es insuficiente o inconsistente.

> Existen discrepancias entre el comportamiento esperado y el comportamiento observado.

---