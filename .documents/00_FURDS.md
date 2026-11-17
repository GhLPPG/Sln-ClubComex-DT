# FORMATO ÚNICO DE REQUERIMIENTOS Y DISEÑO DE SOLUCIÓN

> "00_FURDS.md" - 
>  Formato Único de Requerimientos y Diseño de Solución

------------------------------------------------------------

## HISTORIA DE USUARIO
> 01_UserHistory.md
### HISTORIA Y PROPOSITO

- QUIEN: Cliente de una tienda minorista que realiza compras frecuentes y desea acumular beneficios por su fidelidad.
- QUE QUIERE: Que cada compra genere puntos de lealtad de forma automática, considerando la regla de 1 punto por cada $10 MXN consumidos.
- PARA QUE: Obtener recompensas por su fidelidad, incentivar su continuidad de compra y fortalecer la relación con el establecimiento.

#### Mapeo del Proceso Actual (**)

1. El cliente selecciona los productos que desea comprar.
2. El cajero registra los productos en el punto de venta y calcula el importe total de la compra.
3. El cliente realiza el pago correspondiente.
4. Actualmente, la compra no genera puntos de lealtad ni se consolida un registro de beneficios acumulados.
5. El cliente no puede consultar el saldo de puntos ni el historial de compras asociadas a su fidelidad.

### OBJETIVO PRINCIPAL

- Implementar un sistema de lealtad que incentive la recurrencia de compra mediante la asignación automática de puntos por cada compra realizada.

#### Propuesta General de Solución (**)

- Desarrollar una solución que permita registrar clientes y asociarles sus ventas en el establecimiento.
- Incorporar un cálculo automático de puntos por compra, aplicando la regla definida de $10 MXN = 1 punto.
- Implementar una consulta del saldo acumulado y del historial de movimientos para que el cliente pueda conocer sus beneficios y su evolución.

### DETERMINAR ALCANCE

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