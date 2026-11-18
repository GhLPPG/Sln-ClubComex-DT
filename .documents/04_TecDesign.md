## DISEÑO TÉCNICO Y ESPECIFICACIONES DE LA SOLUCIÓN

> 04_TecDesign.md
> Este documento describe la arquitectura técnica, lineamientos de diseño, componentes tecnológicos, flujo de funcionamiento y estado actual de implementación de la solución.

---

### Contexto

#### Introducción

> Describir el objetivo técnico de la solución, el problema que resuelve y el alcance de la implementación.

>  Información General

- Nombre de la Solución: Sln.ClubComex (confirmado por el usuario).
- Objetivo: Implementar el registro de clientes, las ventas vinculadas a cliente y el sistema de puntos de lealtad (acumulación automática, consulta de saldo e historial, y reversión por cancelación o devolución), según RF01–RF07 y NE01–NE05 de `02_ReqsDefinition.md`. El alcance verificable está en EH01–EH10, EU01–EU07 y CR01–CR07 de `03_AcceptCriteria.md`.

---

#### Interoperabilidad

> Describir las conexiones, dependencias e interacción con componentes internos y externos.

>  **GUIA**

> Sistemas origen y destino. | 
> Protocolos de comunicación. | 
> Dependencias críticas. | 
> Servicios compartidos. | 
> Compatibilidad tecnológica. | 
> Sistema | API | Servicio | Base de Datos | 

| Componente | Tipo          | Descripción | Dependencia |
| ---------- | ------------- | ----------- | ----------- |
| Módulo de Ventas | Interno | Registra ventas vinculadas a cliente y provee el subtotal sin IVA y después de descuentos | Depende de Clientes y Puntos |
| Módulo de Clientes y Puntos | Interno | Registro de clientes, acumulación, saldo e historial de puntos, y reversión | Base de datos |
| Sistemas externos | Ninguno | No hay integraciones externas por ahora (confirmado por el usuario) | No aplica |



---

### Lineamientos de Diseño y Arquitectura de Código

#### Tecnologías

> Definir el stack tecnológico utilizado para la solución.

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

> Principios técnicos que deben regir la implementación.
> Modularidad | 
> Atomicidad | 
> Encapsulamiento | 
> Reutilización | 
> Escalabilidad | 
> Mantenibilidad | 
> Bajo Acoplamiento | 
> Alta Cohesión | 

- 
- 

---

##### Separación de Responsabilidades por Capas

> Capas confirmadas por el usuario: LCommon, LData, LBusiness y UI. No existe código aún; esta sección describe la arquitectura objetivo.

---

###### LCommon


> **Responsabilidades Comunes**

> Utilidades compartidas. | 
> Constantes. | 
> Enumeraciones. | 
> Validaciones genéricas. | 
> Helpers. | 
> Manejo de configuraciones comunes. | 

- 

---

###### LData

> **Responsabilidades de Datos y Modelos**

> Entidades.
> DTOs.
> Objetos de transferencia.
> Repositorios.
> Acceso a datos.
> Mapeos.
> Persistencia.

- 

---

###### LBusiness

> **Responsabilidades de Lógica y Servicios de Negocio**

> Casos de uso. | 
> Reglas de negocio. | 
> Servicios. | 
> Procesos de validación. | 
> Orquestación de operaciones. | 
> Integración entre capas. | 

- 

---

###### UI

> **Responsabilidades de la Interfaz de Usuario**

> Pantallas. | 
> Formularios. | 
> Componentes visuales. | 
> Eventos de usuario. | 
> Navegación. | 
> Presentación de información. | 

- 

---

### Diseño UI

#### Modo de Creación de Controles

| Modalidad           | Descripción                                               |
| ------------------- | --------------------------------------------------------- |
| Tiempo de Diseño    | Controles definidos y configurados durante el desarrollo. |
| Tiempo de Ejecución | Controles generados dinámicamente en tiempo de ejecución. |

---

#### Estilo de Controles

> Definir lineamientos visuales y de experiencia de usuario.

> Colores corporativos. | 
> Tipografía. | 
> Distribución de elementos. | 
> Responsividad. | 
> Accesibilidad. | 
> Convenciones de interacción. | 

- 

---

### Aspectos Técnicos

#### [Datos]

##### Modelado y Almacenamiento

>  **GUIA**

> Integridad de datos. | 
> Normalización. | 
> Rendimiento de consultas. | 
> Retención de información. | 

> | Base de Datos | |

> | Tablas Principales | |

> | Relaciones | |

> | Índices | |

> | Estrategia de Respaldo | |

| Elemento | Descripción |
| -------- | ----------- |
| Entidades propuestas | Cliente, Venta, MovimientoPuntos y SaldoPuntos (propuesta; pendiente de validar contra el glosario de `02_ReqsDefinition.md`) |
| Datos mínimos de Cliente | Nombre(s), dirección y RFC (confirmado por el usuario). Validación de formato del RFC pendiente de definir. |
| Regla de cálculo | 1 punto por cada $10 MXN; base = subtotal sin IVA y después de descuentos; redondeo hacia abajo (NE01–NE03) |
| Ventas sin cliente | No permitidas: toda venta debe estar asociada a un cliente registrado (confirmado por el usuario) |
| Integridad | Un movimiento de reversión no debe eliminar movimientos previos (propuesta, pendiente de confirmar) |
| Índices, respaldo y retención | Omitido por decisión del usuario (sin política definida) |

- 

---

#### [Configuración]

###### Variables y Parámetros

>  **GUIA**
> Variables de entorno. | 
> Configuración por ambiente. | 
> Configuración de servidor. | 
> Configuración de red. | 
> Secretos y credenciales. | 

| Parámetro | Tipo | Valor | Descripción |
| --------- | ---- | ----- | ----------- |
| MontoPorPunto | Decimal | 10 (MXN) | Monto requerido para generar 1 punto (NE01) |
| Redondeo de puntos | Texto | Hacia abajo | Regla de redondeo (NE02) |
| Secretos y credenciales | — | Pendiente | Pendiente de definir |

- 

---

#### [Interacción UI]

#### Diseño Visual y Navegación

| Pantalla | Objetivo | Observaciones |
| -------- | -------- | ------------- |
|          |          |               |

>  **GUIA**
> Experiencia de usuario.
> Flujo de navegación.
> Accesibilidad.
> Adaptabilidad.

- 

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

>  **GUIA**
> Principio de mínimo privilegio. | 
> Protección de datos sensibles. | 
> Manejo seguro de credenciales. | 
> Cumplimiento normativo. | 

- 

---

#### [Manejo de Excepciones]

###### Estrategia de Gestión de Errores

| Tipo de Error | Comportamiento Esperado | Mensaje al Usuario |
| ------------- | ----------------------- | ------------------ |
| Funcional     | Rechazar o no generar puntos y no alterar el saldo (EU01, EU02, EU04, EU06); mostrar saldo 0 o historial vacío sin error (EU05, EU07) | Mensaje de validación claro o estado vacío |
| Técnico       | Registrar el error y no dejar operaciones parciales | Pendiente de definir |
| Integración   | Pendiente (sin integraciones externas identificadas) | Pendiente |
| Seguridad     | Rechazar la operación sin modificar datos si el usuario no es Cajero (EU03); el mecanismo de autenticación está pendiente | Mensaje genérico de acceso denegado |

>  **GUIA**
> Registro de errores. | 
> Notificaciones. | 
> Recuperación controlada. | 
> Mensajes amigables. | 

- 

---

#### [Procesos BackEnd]

###### Procesamiento y Servicios

| Proceso | Descripción | Tipo          |
| ------- | ----------- | ------------- |
|         |             | Servicio      |
|         |             | Job           |
|         |             | Proceso Batch |
|         |             | Microservicio |

>  **GUIA**
> Procesamiento asíncrono.
> Optimización de recursos.
> Escalabilidad.
> Monitoreo.

- 

---

#### [Integraciones Externas]

##### Integraciones con Terceros

| Sistema / API | Propósito | Método de Comunicación |
| ------------- | --------- | ---------------------- |
| Ninguna | No hay integraciones externas por ahora (confirmado por el usuario) | No aplica |

>  **GUIA**
> Disponibilidad del servicio. | 
> Manejo de errores. | 
> Seguridad de comunicación. | 
> Versionamiento de APIs. | 
> Límites de consumo. | 

- 

---

### Flujo de Funcionamiento General

> Describir la secuencia operativa de la solución.

1. El Cajero registra o consulta al cliente (RF01).
2. El Cajero registra la venta vinculada al cliente (RF02).
3. El sistema calcula los puntos con la regla NE01–NE03 (RF03).
4. El sistema acumula los puntos y permite consultar saldo e historial (RF04–RF06).
5. Al cancelar o devolver la venta, el sistema revierte los puntos generados (RF07, NE05).

---

##### Diagrama de Flujo (Opcional)

```text
[Inicio]
    |
    v
[Proceso 1]
    |
    v
[Proceso 2]
    |
    v
[Resultado]
    |
    v
   [Fin]
```

---

### Avances

#### Estructura Actual de la Solución

> Describir la estructura técnica existente.

No existe código aún. La estructura siguiente es la objetivo por capas confirmada por el usuario:

```text
Sln.ClubComex
│
├── LCommon
├── LData
├── LBusiness
└── UI
```

- 

---

#### Flujo del Funcionamiento Actual Implementado

> Documentar el comportamiento actual de la solución previo a los cambios.
> Funcionalidades completadas. |  Funcionalidades en progreso. | 
> Componentes existentes. |  Componentes faltantes. | 
> Estado de cada módulo. | 

| Funcionalidad | Estado        | Observaciones |
| ------------- | ------------- | ------------- |
| Registro de clientes, ventas y puntos (RF01–RF07) | No iniciado | No existe código aún; la solución es objetivo de diseño |
| Pantallas y componentes UI | Pendiente | Pendiente de definir |

---