## PLAN DE DESARROLLO

> 05_PlanDev.md


---

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

---

### Consideraciones

- Bloqueantes: IDE, frameworks, librerías, versión de SQL Server, mecanismo de almacenamiento de contraseñas y formato de validación del RFC (pendientes en `04_TecDesign.md`).
- Prerrequisitos técnicos confirmados: .NET Framework 4.5, C#, SQL Server y repositorio Git `GhLPPG/Sln-ClubComex-DT`.
- Prerrequisitos pendientes: ambientes de desarrollo y accesos (no confirmados).
- Riesgos de retraso: definiciones técnicas pendientes; ausencia de política de respaldo y retención (omitida por decisión del usuario).
- Exclusiones: sin integraciones externas, sin roles adicionales y requerimientos no funcionales omitidos (confirmado por el usuario).

---

### Criterios para Inicio de Desarrollo

Antes de comenzar la ejecución del backlog deben cumplirse las siguientes condiciones:

- [ ] Requerimientos funcionales aprobados.
- [ ] Reglas de negocio definidas.
- [ ] Diseño técnico validado.
- [ ] Dependencias identificadas.
- [ ] Ambientes disponibles.
- [ ] Accesos y permisos otorgados.

---

---

### Aprobación Técnica

| Rol                       | Responsable | Fecha | Comentarios |
| ------------------------- | ----------- | ----- | ----------- |
| Arquitecto de Solución    |             |       |             |
| Líder Técnico             |             |       |             |
| Desarrollador Responsable |             |       |             |
| Responsable Funcional     |             |       |             |

---