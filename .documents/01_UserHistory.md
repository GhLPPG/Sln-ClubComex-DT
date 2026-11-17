## HISTORIA DE USUARIO

> 01_UserHistory.md

### HISTORIA Y PROPOSITO

> Definir el problema / necesidad desde la perspectiva del usuario [ <span style="color:#c1e8c1">Discovery</span> ]

- QUIEN: Un cajero de una tienda minorista que registra las ventas en el sistema de lealtad. El cliente es el beneficiario de los puntos acumulados.
- QUE QUIERE: Registrar manualmente cada venta asociada a un cliente para que el sistema calcule puntos de lealtad de forma proporcional, a razón de 1 punto por cada $10 MXN del importe total pagado.
- PARA QUE: El cliente pueda acumular beneficios por sus compras, incentivando futuras compras en el establecimiento.

#### Mapeo del Proceso Actual (**)

> Realizar un "walkthrough"" del proceso para conocer cómo funciona (****Opcional**)  [ <span style="color:#c1e8c1">Discovery</span> ] 

1. El cliente acude a la tienda y selecciona los productos que desea comprar.
2. El cajero registra los productos en el punto de venta y genera el importe total de la compra.
3. El cliente realiza el pago correspondiente.
4. Actualmente, las compras no generan puntos de lealtad ni existe un registro centralizado de los beneficios acumulados.
5. El cliente no cuenta con un mecanismo para consultar los puntos obtenidos por sus compras.

### OBJETIVO PRINCIPAL

> La metas funcionales concretas del proyecto  [ <span style="color:#c1e8c1">Discovery</span> ]   [ <span style="color:#fad598">Análisis</span> ]

- Implementar un sistema de lealtad que incentive la recurrencia de compra de los clientes mediante la asignación de puntos por sus consumos.

#### Propuesta General de Solución (**)

> Resumen de ALTO nivel de cómo el equipo planea resolver ese problema  (****Opcional**)  [<span style="color:#c1e8c1">Discovery</span>] [<span style="color:#fad598">Análisis</span>] [<span style="color:#9be4f2">Diseño</span>]

- Desarrollar una aplicación que permita registrar clientes y que el cajero capture manualmente cada venta asociada a un cliente, incluyendo un identificador de cliente y el importe total pagado. El tipo de identificador está pendiente de definición.

- Incorporar un mecanismo de cálculo automático y proporcional de puntos por venta, con base en el importe total pagado y la equivalencia de $10 MXN por punto.

- Implementar un módulo de consulta que permita visualizar el saldo acumulado de puntos por cliente y el historial de movimientos generados por sus compras.



### DETERMINAR ALCANCE

> Identificar Límites donde inicia y termina, y que se incluye y excluye explícitamente  

- \- **Incluye:**

  - Registro de clientes.
  - Registro manual de ventas asociadas a un cliente mediante un identificador de cliente y el importe total pagado; el tipo de identificador está pendiente de definición.
  - Cálculo automático proporcional de puntos con base en la regla de $10 MXN = 1 punto.
  - Acumulación y consulta del saldo de puntos.
  - Consulta del historial de ventas y puntos generados.

  \- **No incluye:**

  - Canje de puntos por productos, descuentos o recompensas.
  - Administración de promociones o reglas especiales de acumulación.
  - Integración con sistemas externos de punto de venta.
  - Transferencia de puntos entre clientes.

_ _ _ 