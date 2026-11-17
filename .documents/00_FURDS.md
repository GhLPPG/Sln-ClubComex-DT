# FORMATO ÚNICO DE REQUERIMIENTOS Y DISEÑO DE SOLUCIÓN

> "00_FURDS.md" - 
>  Formato Único de Requerimientos y Diseño de Solución

------------------------------------------------------------

## HISTORIA DE USUARIO
> 01_UserHistory.md
### HISTORIA Y PROPOSITO
- **Quien:** Un **Cajero** de una tienda minorista que realiza ventas de manera recurrente.
  **Que Quiere:** Que para cada cliente se puedan acumular puntos de lealtad automáticamente por cada compra realizada, obteniendo 1 punto por cada $10 pesos mexicanos (MXN) consumidos (solo por bloques completos de $10; redondeo hacia abajo).
  **Para que:** Obtener beneficios y recompensas por su fidelidad, incentivando futuras compras en el establecimiento.

#### Mapeo del Proceso Actual (**)
1. El cliente acude a la tienda y selecciona los productos que desea comprar.
2. El cajero registra los productos en el punto de venta y genera el importe total de la compra.
3. El cliente realiza el pago correspondiente.
4. Actualmente, las compras no generan puntos de lealtad ni existe un registro centralizado de los beneficios acumulados.
5. El cliente no cuenta con un mecanismo para consultar los puntos obtenidos por sus compras.

### OBJETIVO PRINCIPAL
- Implementar un sistema de lealtad que incentive la recurrencia de compra de los clientes mediante la asignación de puntos por sus consumos.

#### Propuesta General de Solución (**)
- Desarrollar una aplicación que permita registrar clientes y asociarles las ventas realizadas en el establecimiento.
- Incorporar un mecanismo de cálculo automático que determine los puntos generados por cada venta, tomando como referencia el importe total y la equivalencia establecida de $10 MXN por punto.
- Implementar un módulo de consulta que permita visualizar el saldo acumulado de puntos por cliente y el historial de movimientos generados por sus compras.

### DETERMINAR ALCANCE
- **Incluye:**
  - Registro de clientes.
  - Registro de ventas asociadas a un cliente.
  - Cálculo automático de puntos con base en la regla de $10 MXN = 1 punto (solo bloques completos de $10; redondeo hacia abajo).
  - Acumulación y consulta del saldo de puntos.
  - Consulta del historial de ventas y puntos generados.

- **No incluye:**
  - Canje de puntos por productos, descuentos o recompensas (queda como alcance futuro).
  - Administración de promociones o reglas especiales de acumulación.
  - Integración con sistemas externos de punto de venta.
  - Transferencia de puntos entre clientes.



------------------------------------------------------------
## DEFINICIÓN DE REQUERIMIENTOS
> 02_ReqsDefinition.md
### Diccionario de Lenguaje de Negocio (Opcional)
### Matriz de Requerimientos Funcionales
### Matriz de Reglas de Negocio
### Matriz de Requerimientos No Funcionales
#### Disponibilidad 
#### Escalabilidad
#### Seguridad
#### Trazabilidad



------------------------------------------------------------
## CRITERIOS DE ACEPTACIÓN
>  03_AcceptCriteria.md
### Escenarios "Happy Path"
### Escenarios "UnHappy Path"
### Criterios de Rechazo



------------------------------------------------------------
## DISEÑO TÉCNICO Y ESPECIFICACIONES DE LA SOLUCIÓN
> 04_TecDesign.md

### Contexto
#### Introducción
#### Interoperabilidad

### Lineamientos de Diseño y Arquitectura de Código
#### Tecnologías
#### Arquitectura
##### Separación de Responsabilidades por Capas

### Diseño UI
#### Modo de Creación de Controles
#### Estilo de Controles

### Aspectos Técnicos
#### [Datos]
##### Modelado y Almacenamiento
#### [Configuración]
###### Variables y Parámetros
#### [Interacción UI]
#### Diseño Visual y Navegación
#### [Seguridad]
##### Controles de Seguridad
#### [Manejo de Excepciones]
###### Estrategia de Gestión de Errores
#### [Procesos BackEnd]
###### Procesamiento y Servicios
#### [Integraciones Externas]
##### Integraciones con Terceros

### Flujo de Funcionamiento General
##### Diagrama de Flujo (Opcional)

### Avances
#### Estructura Actual de la Solución
#### Flujo del Funcionamiento Actual Implementado



------------------------------------------------------------
## PLAN DE DESARROLLO
> 05_PlanDev.md

### Plan de Desarrollo (Desarrollo)
#### Actividades
### Consideraciones
### Criterios para Inicio de Desarrollo
### Aprobación Técnica