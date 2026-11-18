# FORMATO ÚNICO DE REQUERIMIENTOS Y DISEÑO DE SOLUCIÓN

> "00_FURDS.md" - 
>  Formato Único de Requerimientos y Diseño de Solución

------------------------------------------------------------

## HISTORIA DE USUARIO
> 01_UserHistory.md
### HISTORIA Y PROPOSITO
- **Quien:** Un Cajero de una tienda minorista que realiza ventas de manera recurrente.
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
---

### Diccionario de Lenguaje de Negocio (Opcional)

> Términos de alta relevancia dentro del contexto del negocio que participan en los procesos, funcionalidades y reglas descritas en este documento.

| Término | Definición | Observaciones |
| ------- | ---------- | ------------- |
| Cajero | Usuario de la tienda minorista que registra las ventas. | Rol principal identificado en la historia de usuario. |
| Cliente | Persona a quien se asocian las ventas y los puntos de lealtad. | |
| Punto de lealtad | Unidad acumulable generada por el consumo del cliente. | Equivalencia: 1 punto por cada $10 MXN. |
| Saldo de puntos | Total de puntos acumulados por un cliente. | |
| Movimiento de puntos | Registro de los puntos generados por una venta. | Conforma el historial de puntos. |
| Canje | Uso de puntos para obtener productos, descuentos o recompensas. | Fuera de alcance; queda como alcance futuro. |
| Venta | Compra registrada en el punto de venta y asociada a un cliente. | Registrada por el Cajero. |
| Importe base de puntos | Subtotal de la venta sin IVA y después de descuentos, expresado en MXN. | Base sobre la que se calculan los puntos. |

---

### Matriz de Requerimientos Funcionales

> Flujo(s) e interacción de funciones, procedimientos y/o acciones requeridas para la solución.

> **Guía**

> **ID:** Nomenclatura Ejemplo `RF00`. | 
> **Nombre Módulo / Elemento:** Nombre del módulo, proceso, pantalla, integración o componente involucrado. |

> **Preexistencia y Funcionamiento Actual:** Descripción del comportamiento actual o referencia al sistema existente. |
> **Descripción:** Acción (Integrar / Modificar / Eliminar), indicando propósito(s), función(es) y objetivo(s).

> **Clasificación:** Nivel de impacto o complejidad (`Bajo`, `Medio`, `Alto`).

| ID   | Nombre Módulo / Elemento | Preexistencia y Funcionamiento Actual | Descripción                                                                          | Clasificación       |
| ---- | ------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------ | ------------------- |
| RF01 | Registro de clientes | No existe un registro centralizado de clientes ni de beneficios acumulados. | Integrar<br>Permitir registrar clientes para asociarles ventas y puntos de lealtad. Acción restringida al rol Cajero. | Bajo |
| RF02 | Registro de ventas asociadas a un cliente | El cajero registra los productos en el punto de venta y genera el importe total; la venta no se asocia a un cliente en esta solución. | Integrar<br>Permitir registrar ventas y asociarlas a un cliente, conservando el importe total de la compra. Acción restringida al rol Cajero. | Medio |
| RF03 | Cálculo automático de puntos | Las compras no generan puntos de lealtad. | Integrar<br>Calcular automáticamente los puntos de cada venta a partir de su importe base de puntos, según las reglas NE01 a NE03. | Medio |
| RF04 | Acumulación de puntos y saldo por cliente | No existe registro de puntos acumulados. | Integrar<br>Acumular los puntos generados por cada venta en el saldo del cliente. | Medio |
| RF05 | Consulta de saldo de puntos | El cliente no cuenta con un mecanismo para consultar los puntos obtenidos. | Integrar<br>Permitir consultar el saldo acumulado de puntos por cliente. | Bajo |
| RF06 | Consulta de historial de ventas y puntos | No existe historial de ventas ni de puntos asociado al cliente. | Integrar<br>Permitir consultar el historial de ventas y de movimientos de puntos generados por las compras de cada cliente. | Medio |
| RF07 | Reversión de puntos por cancelación o devolución | No existe mecanismo para revertir puntos de ventas canceladas o devueltas. | Integrar<br>Restar del saldo del cliente los puntos generados por una venta cancelada o devuelta, según NE05. | Medio |

---

### Matriz de Reglas de Negocio

> Restricciones, validaciones y lógicas obligatorias que deben cumplirse dentro de la operación del negocio.

> **Guía**

> **ID:** Nomenclatura `NE00`. |
> **Nombre de la Regla:** Título representativo de la regla de negocio. |
> **Descripción Detallada de la Regla:** Explicación completa de la restricción, validación o comportamiento obligatorio.

| ID   | Nombre de la Regla | Descripción Detallada de la Regla |
| ---- | ------------------ | --------------------------------- |
| NE01 | Equivalencia de puntos | Se otorga 1 punto de lealtad por cada $10 pesos mexicanos (MXN) consumidos. |
| NE02 | Redondeo hacia abajo | Solo se otorgan puntos por bloques completos de $10 MXN; el remanente no genera puntos (ej.: una compra de $19 MXN genera 1 punto). |
| NE03 | Base del cálculo | Los puntos se calculan sobre el subtotal de la venta sin IVA y después de descuentos, expresado en MXN. |
| NE04 | Puntos solo para ventas asociadas a un cliente | Los puntos se generan y acumulan únicamente cuando la venta está asociada a un cliente registrado. |
| NE05 | Reversión de puntos | Al cancelar o devolver una venta, se restan del saldo del cliente los puntos generados por dicha venta. |

> **Exclusiones (no son reglas):** canje de puntos (alcance futuro), promociones o reglas especiales de acumulación, y transferencia de puntos entre clientes.

---

### Matriz de Requerimientos No Funcionales

> Características de calidad y restricciones técnicas que debe cumplir la solución.

> **Guía**

> Categoria: Disponibilidad | Ejemplo :Tiempo de actividad esperado (*uptime*) y ventanas de mantenimiento.   

> Categoria: Escalabilidad: | Ejemplo :Capacidad para soportar el crecimiento de usuarios o carga de trabajo.  

> Categoria: Seguridad: | Ejemplo :Protección de la confidencialidad, integridad y disponibilidad de la información y del sistema. 

> Categoria: Trazabilidad: | Ejemplo : Monitoreo, auditoría y registro de eventos, transacciones y cambios relevantes.                

| Categoría | Requerimiento |
| --------- | ------------- |
| Disponibilidad | Pendiente de definir. |
| Escalabilidad | Pendiente de definir. |
| Seguridad | Pendiente de definir. |
| Trazabilidad | Pendiente de definir. |

#### Disponibilidad

> Definir porcentaje de disponibilidad esperado.
> Especificar horarios permitidos para mantenimiento.

- Pendiente de definir: la historia de usuario no establece un porcentaje de disponibilidad.
- Pendiente de definir: horarios permitidos para mantenimiento.

#### Escalabilidad

> Definir capacidad proyectada de crecimiento.
> Considerar usuarios concurrentes, volumen de transacciones y almacenamiento.

- Pendiente de definir: capacidad proyectada de crecimiento.
- Pendiente de definir: usuarios concurrentes, volumen de ventas y almacenamiento.

#### Seguridad

> Definir autenticación, autorización, cifrado y gestión de accesos.
> Considerar cumplimiento normativo y protección de datos.

- Autorización (confirmado): solo el rol Cajero puede registrar clientes y ventas.
- Pendiente de definir: autenticación y gestión de accesos.
- Pendiente de definir: protección de datos de clientes y cumplimiento normativo.

#### Trazabilidad

> Registrar eventos relevantes para auditoría.
> Mantener histórico de operaciones y cambios realizados.

- Pendiente de definir: eventos a auditar.
- El historial de ventas y de movimientos de puntos por cliente es requerimiento funcional (RF06); su política de retención está pendiente de definir.

---



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