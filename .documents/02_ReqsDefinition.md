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
| RF01 | Registro de clientes | No existe un registro centralizado de clientes ni de beneficios acumulados. | Integrar<br>Permitir registrar clientes para asociarles ventas y puntos de lealtad. | Pendiente de confirmar |
| RF02 | Registro de ventas asociadas a un cliente | El cajero registra los productos en el punto de venta y genera el importe total; la venta no se asocia a un cliente en esta solución. | Integrar<br>Permitir registrar ventas y asociarlas a un cliente, conservando el importe total de la compra. | Pendiente de confirmar |
| RF03 | Cálculo automático de puntos | Las compras no generan puntos de lealtad. | Integrar<br>Calcular automáticamente los puntos de cada venta a partir de su importe total, según las reglas NE01 a NE03. | Pendiente de confirmar |
| RF04 | Acumulación de puntos y saldo por cliente | No existe registro de puntos acumulados. | Integrar<br>Acumular los puntos generados por cada venta en el saldo del cliente. | Pendiente de confirmar |
| RF05 | Consulta de saldo de puntos | El cliente no cuenta con un mecanismo para consultar los puntos obtenidos. | Integrar<br>Permitir consultar el saldo acumulado de puntos por cliente. | Pendiente de confirmar |
| RF06 | Consulta de historial de ventas y puntos | No existe historial de ventas ni de puntos asociado al cliente. | Integrar<br>Permitir consultar el historial de ventas y de movimientos de puntos generados por las compras de cada cliente. | Pendiente de confirmar |

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
| NE03 | Base del cálculo | Los puntos se calculan sobre el importe total de la venta, expresado en MXN. |
| NE04 | Puntos solo para ventas asociadas a un cliente | Los puntos se generan y acumulan únicamente cuando la venta está asociada a un cliente registrado. |
| NE05 | Exclusiones de la acumulación | No se contemplan canje de puntos (alcance futuro), promociones o reglas especiales de acumulación, ni transferencia de puntos entre clientes. |

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

- Pendiente de definir: autenticación, autorización y gestión de accesos.
- Pendiente de definir: protección de datos de clientes y cumplimiento normativo.

#### Trazabilidad

> Registrar eventos relevantes para auditoría.
> Mantener histórico de operaciones y cambios realizados.

- Pendiente de definir: eventos a auditar.
- El historial de ventas y de movimientos de puntos por cliente es requerimiento funcional (RF06); su política de retención está pendiente de definir.

---