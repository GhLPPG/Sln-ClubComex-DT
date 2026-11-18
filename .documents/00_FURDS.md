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



------------------------------------------------------------
## DISEÑO TÉCNICO Y ESPECIFICACIONES DE LA SOLUCIÓN
> 04_TecDesign.md

### Contexto

#### Introducción

>  Información General

- Nombre de la Solución: Sln.ClubComex (confirmado por el usuario).
- Objetivo: Implementar el registro de clientes, las ventas vinculadas a cliente y el sistema de puntos de lealtad (acumulación automática, consulta de saldo e historial, y reversión por cancelación o devolución), según RF01–RF07 y NE01–NE05 de `02_ReqsDefinition.md`. El alcance verificable está en EH01–EH10, EU01–EU07 y CR01–CR07 de `03_AcceptCriteria.md`.

---

#### Interoperabilidad

| Componente | Tipo          | Descripción | Dependencia |
| ---------- | ------------- | ----------- | ----------- |
| Módulo de Ventas | Interno | Registra ventas vinculadas a cliente y provee el subtotal sin IVA y después de descuentos | Depende de Clientes y Puntos |
| Módulo de Clientes y Puntos | Interno | Registro de clientes, acumulación, saldo e historial de puntos, y reversión | Base de datos |
| Sistemas externos | Ninguno | No hay integraciones externas por ahora (confirmado por el usuario) | No aplica |

---

### Lineamientos de Diseño y Arquitectura de Código

#### Tecnologías

| Categoría            | Tecnología |
| -------------------- | ---------- |
| Plataforma           | .NET Framework 4.5 (confirmado por el usuario) |
| IDE                  | Pendiente de confirmar |
| Lenguaje             | C# (confirmado por el usuario) |
| Frameworks           | Pendiente de confirmar |
| Base de Datos        | SQL Server (versión pendiente de confirmar) |
| Librerías            | Pendiente de confirmar |
| Control de Versiones | Git (repositorio GitHub `GhLPPG/Sln-ClubComex-DT`) |

---

#### Arquitectura

##### Separación de Responsabilidades por Capas

> Capas confirmadas por el usuario: LCommon, LData, LBusiness y UI. No existe código aún; esta sección describe la arquitectura objetivo.

###### LCommon

Utilidades compartidas, constantes, enumeraciones, validaciones genéricas, helpers y manejo de configuraciones comunes.

###### LData

Entidades, DTOs, objetos de transferencia, repositorios, acceso a datos, mapeos y persistencia.

###### LBusiness

Casos de uso, reglas de negocio, servicios, procesos de validación, orquestación de operaciones e integración entre capas.

###### UI

Pantallas, formularios, componentes visuales, eventos de usuario, navegación y presentación de información.

---

### Diseño UI

#### Modo de Creación de Controles

| Modalidad           | Descripción                                               |
| ------------------- | --------------------------------------------------------- |
| Tiempo de Diseño    | Controles definidos y configurados durante el desarrollo. |
| Tiempo de Ejecución | Controles generados dinámicamente en tiempo de ejecución. |

---

### Aspectos Técnicos

#### [Datos]

##### Modelado y Almacenamiento

| Elemento | Descripción |
| -------- | ----------- |
| Entidades propuestas | Cliente, Venta, MovimientoPuntos y SaldoPuntos (propuesta; pendiente de validar contra el glosario de `02_ReqsDefinition.md`) |
| Datos mínimos de Cliente | Nombre(s), dirección y RFC (confirmado por el usuario). Validación de formato del RFC pendiente de definir. |
| Regla de cálculo | 1 punto por cada $10 MXN; base = subtotal sin IVA y después de descuentos; redondeo hacia abajo (NE01–NE03) |
| Ventas sin cliente | No permitidas: toda venta debe estar asociada a un cliente registrado (confirmado por el usuario) |
| Integridad | Un movimiento de reversión no debe eliminar movimientos previos (propuesta, pendiente de confirmar) |
| Índices, respaldo y retención | Omitido por decisión del usuario (sin política definida) |

---

#### [Configuración]

##### Variables y Parámetros

| Parámetro | Tipo | Valor | Descripción |
| --------- | ---- | ----- | ----------- |
| MontoPorPunto | Decimal | 10 (MXN) | Monto requerido para generar 1 punto (NE01) |
| Redondeo de puntos | Texto | Hacia abajo | Regla de redondeo (NE02) |
| Secretos y credenciales | — | Pendiente | Pendiente de definir |

---

#### [Interacción UI]

##### Diseño Visual y Navegación

| Pantalla | Objetivo | Observaciones |
| -------- | -------- | ------------- |
| Pendiente | Pendiente | Pendiente de definir |

---

#### [Seguridad]

##### Controles de Seguridad

| Elemento      | Implementación |
| ------------- | -------------- |
| Autenticación | Usuario y contraseña simples (confirmado por el usuario). Mecanismo de almacenamiento de la contraseña pendiente de definir. |
| Autorización  | Solo el rol Cajero puede registrar clientes y ventas (confirmado en 02) |
| Roles         | Cajero (único rol; sin roles adicionales, confirmado por el usuario) |
| Permisos      | Solo Cajero: registrar clientes y ventas |
| Cifrado       | Pendiente (requerimientos no funcionales omitidos por decisión del usuario) |
| Auditoría     | Pendiente (trazabilidad no definida en 02) |

---

#### [Manejo de Excepciones]

##### Estrategia de Gestión de Errores

| Tipo de Error | Comportamiento Esperado | Mensaje al Usuario |
| ------------- | ----------------------- | ------------------ |
| Funcional     | Rechazar o no generar puntos y no alterar el saldo (EU01, EU02, EU04, EU06); mostrar saldo 0 o historial vacío sin error (EU05, EU07) | Mensaje de validación claro o estado vacío |
| Técnico       | Registrar el error y no dejar operaciones parciales | Pendiente de definir |
| Integración   | Pendiente (sin integraciones externas identificadas) | Pendiente |
| Seguridad     | Rechazar la operación sin modificar datos si el usuario no es Cajero (EU03); el mecanismo de autenticación está pendiente | Mensaje genérico de acceso denegado |

---

#### [Procesos BackEnd]

##### Procesamiento y Servicios

| Proceso | Descripción | Tipo          |
| ------- | ----------- | ------------- |
|         |             | Servicio      |
|         |             | Job           |
|         |             | Proceso Batch |
|         |             | Microservicio |

---

#### [Integraciones Externas]

##### Integraciones con Terceros

| Sistema / API | Propósito | Método de Comunicación |
| ------------- | --------- | ---------------------- |
| Ninguna | No hay integraciones externas por ahora (confirmado por el usuario) | No aplica |

---

### Flujo de Funcionamiento General

1. El Cajero registra o consulta al cliente (RF01).
2. El Cajero registra la venta vinculada al cliente (RF02).
3. El sistema calcula los puntos con la regla NE01–NE03 (RF03).
4. El sistema acumula los puntos y permite consultar saldo e historial (RF04–RF06).
5. Al cancelar o devolver la venta, el sistema revierte los puntos generados (RF07, NE05).

---

### Avances

#### Estructura Actual de la Solución

No existe código aún. La estructura siguiente es la objetivo por capas confirmada por el usuario:

```text
Sln.ClubComex
│
├── LCommon
├── LData
├── LBusiness
└── UI
```

---

#### Flujo del Funcionamiento Actual Implementado

| Funcionalidad | Estado        | Observaciones |
| ------------- | ------------- | ------------- |
| Registro de clientes, ventas y puntos (RF01–RF07) | No iniciado | No existe código aún; la solución es objetivo de diseño |
| Pantallas y componentes UI | Pendiente | Pendiente de definir |



------------------------------------------------------------
## PLAN DE DESARROLLO
> 05_PlanDev.md

### Plan de Desarrollo (Desarrollo)

> Lista jerarquizada de tareas accionables que deberán ser ejecutadas durante el ciclo de vida del proyecto.

> Responsable, fecha y estado de aprobación: pendientes de confirmar por el usuario.

#### Actividades

| ID | Actividad | Responsable | Prioridad | Estado |
| -- | --------- | ----------- | --------- | ------ |
| ACT01 | Crear la solución Sln.ClubComex con los proyectos LCommon, LData, LBusiness y UI (.NET Framework 4.5, C#) | Pendiente | Alta | Pendiente |
| ACT02 | Crear el esquema en SQL Server para Cliente, Venta, MovimientoPuntos y SaldoPuntos (versión de SQL Server pendiente) | Pendiente | Alta | Pendiente |
| ACT03 | Implementar en LCommon constantes, validaciones genéricas y la regla de cálculo (1 punto por cada $10 MXN, redondeo hacia abajo) | Pendiente | Alta | Pendiente |
| ACT04 | Implementar en LData entidades, DTOs, repositorios y mapeos | Pendiente | Alta | Pendiente |
| ACT05 | Implementar autenticación con usuario y contraseña, y autorización del rol Cajero (EU03) | Pendiente | Alta | Pendiente |
| ACT06 | Implementar registro y consulta de clientes con nombre(s), dirección y RFC (RF01) | Pendiente | Media | Pendiente |
| ACT07 | Implementar registro de ventas vinculadas a cliente; no permitir ventas sin cliente (RF02) | Pendiente | Media | Pendiente |
| ACT08 | Implementar el cálculo de puntos sobre el subtotal sin IVA y después de descuentos (RF03, NE01–NE03) | Pendiente | Alta | Pendiente |
| ACT09 | Implementar acumulación, consulta de saldo e historial de puntos (RF04–RF06) | Pendiente | Media | Pendiente |
| ACT10 | Implementar reversión de puntos por cancelación o devolución sin eliminar movimientos previos (RF07, NE05) | Pendiente | Media | Pendiente |
| ACT11 | Implementar las pantallas UI de clientes, ventas y puntos | Pendiente | Media | Pendiente |
| ACT12 | Implementar el manejo de errores funcionales y de seguridad (EH01–EH10) | Pendiente | Media | Pendiente |

### Consideraciones

- Bloqueantes: IDE, frameworks, librerías, versión de SQL Server, mecanismo de almacenamiento de contraseñas y formato de validación del RFC (pendientes en `04_TecDesign.md`).
- Prerrequisitos técnicos confirmados: .NET Framework 4.5, C#, SQL Server y repositorio Git `GhLPPG/Sln-ClubComex-DT`.
- Prerrequisitos pendientes: ambientes de desarrollo y accesos (no confirmados).
- Riesgos de retraso: definiciones técnicas pendientes; ausencia de política de respaldo y retención (omitida por decisión del usuario).
- Exclusiones: sin integraciones externas, sin roles adicionales y requerimientos no funcionales omitidos (confirmado por el usuario).

### Criterios para Inicio de Desarrollo

Antes de comenzar la ejecución del backlog deben cumplirse las siguientes condiciones:

- [ ] Requerimientos funcionales aprobados.
- [ ] Reglas de negocio definidas.
- [ ] Diseño técnico validado.
- [ ] Dependencias identificadas.
- [ ] Ambientes disponibles.
- [ ] Accesos y permisos otorgados.

### Aprobación Técnica

| Rol                       | Responsable | Fecha | Comentarios |
| ------------------------- | ----------- | ----- | ----------- |
| Arquitecto de Solución    |             |       |             |
| Líder Técnico             |             |       |             |
| Desarrollador Responsable |             |       |             |
| Responsable Funcional     |             |       |             |