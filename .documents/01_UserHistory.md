## HISTORIA DE USUARIO

> 01_UserHistory.md

### HISTORIA Y PROPOSITO

> Definir el problema / necesidad desde la perspectiva del usuario [ <span style="color:#c1e8c1">Discovery</span> ]

- QUIEN: Cliente de una tienda minorista que realiza compras frecuentes y desea acumular beneficios por su fidelidad.
- QUE QUIERE: Que cada compra genere puntos de lealtad de forma automática, considerando la regla de 1 punto por cada $10 MXN consumidos.
- PARA QUE: Obtener recompensas por su fidelidad, incentivar su continuidad de compra y fortalecer la relación con el establecimiento.

#### Mapeo del Proceso Actual (**)

> Realizar un "walkthrough" del proceso para conocer cómo funciona (****Opcional**) [ <span style="color:#c1e8c1">Discovery</span> ]

1. El cliente selecciona los productos que desea comprar.
2. El cajero registra los productos en el punto de venta y calcula el importe total de la compra.
3. El cliente realiza el pago correspondiente.
4. Actualmente, la compra no genera puntos de lealtad ni se consolida un registro de beneficios acumulados.
5. El cliente no puede consultar el saldo de puntos ni el historial de compras asociadas a su fidelidad.

### OBJETIVO PRINCIPAL

> La metas funcionales concretas del proyecto  [ <span style="color:#c1e8c1">Discovery</span> ]   [ <span style="color:#fad598">Análisis</span> ]

- Implementar un sistema de lealtad que incentive la recurrencia de compra mediante la asignación automática de puntos por cada compra realizada.

#### Propuesta General de Solución (**)

> Resumen de ALTO nivel de cómo el equipo planea resolver ese problema  (****Opcional**)  [<span style="color:#c1e8c1">Discovery</span>] [<span style="color:#fad598">Análisis</span>] [<span style="color:#9be4f2">Diseño</span>]

- Desarrollar una solución que permita registrar clientes y asociarles sus ventas en el establecimiento.
- Incorporar un cálculo automático de puntos por compra, aplicando la regla definida de $10 MXN = 1 punto.
- Implementar una consulta del saldo acumulado y del historial de movimientos para que el cliente pueda conocer sus beneficios y su evolución.

### DETERMINAR ALCANCE

> Identificar Límites donde inicia y termina, y que se incluye y excluye explícitamente

- **Incluye:**
  - Registro de clientes.
  - Registro de ventas asociadas a cada cliente.
  - Cálculo automático de puntos con base en la regla de $10 MXN = 1 punto.
  - Acumulación y consulta del saldo de puntos.
  - Consulta del historial de compras y puntos generados.

- **No incluye:**
  - Canje de puntos por productos, descuentos o recompensas.
  - Administración de promociones o reglas especiales de acumulación.
  - Integración con sistemas externos de punto de venta.
  - Transferencia de puntos entre clientes.

_ _ _ 