# Sln.ClubComex — Demo web (puntos de lealtad)

Demo navegable de la solución **Sln.ClubComex** construida a partir de `04_TecDesign.md`, `03_AcceptCriteria.md` y `02_ReqsDefinition.md`.

## Cómo ejecutarla
Abrir `index.html` directamente en el navegador (doble clic, `file://`). No requiere servidor, instalación ni conexión a internet.

Cuentas de la demo (simuladas): `cajero / cajero123` (rol Cajero) y `visitante / visitante123` (sin rol Cajero, solo para verificar EU03).

## Estructura (capas objetivo del diseño técnico, simuladas en JavaScript)
| Archivo | Capa | Contenido |
|---|---|---|
| `js/lcommon.js` | LCommon | Parámetros (`MontoPorPunto`=10), enumeraciones, helpers de dinero (centavos enteros) y validación |
| `js/ldata.js` | LData | Entidades Cliente, Venta, MovimientoPuntos, SaldoPuntos, repositorio y persistencia simulada (localStorage) |
| `js/lbusiness.js` | LBusiness | Casos de uso RF01–RF07, reglas NE01–NE05, autorización por rol, transacciones sin operaciones parciales |
| `js/ui.js`, `css/styles.css`, `index.html`, `js/main.js` | UI | Pantallas, formularios, navegación |
| `js/acceptance.js` | Pruebas | Escenarios EH01–EH10, EU01–EU07 y casos límite (también en la pantalla *Verificación*) |
| `tests/pruebas.html`, `tests/ui-tests.html` | Pruebas | Pruebas de negocio y de UI ejecutables abriendo el archivo en el navegador |

## Qué es real y qué es simulado
- **Real (en la demo):** cálculo de puntos, acumulación, saldo, historial, reversión, validaciones y control de rol, ejecutados por la lógica de negocio.
- **Simulado:** persistencia (localStorage del navegador, no SQL Server), autenticación (usuarios fijos, contraseña en texto plano), latencia de servicios (350 ms para mostrar estados de carga), falla técnica (se activa en *Ajustes de demo*).
- No existen integraciones externas (confirmado en el diseño técnico).

## Supuestos documentados (omisiones / ambigüedades)
1. **Pila tecnológica:** el diseño indica .NET Framework 4.5 / C# / SQL Server; la demo usa solo HTML/CSS/JS sin servidor por restricción de ejecución.
2. **Ventas sin cliente (ambigüedad resuelta por el usuario):** **no existen ventas sin cliente**. El cliente es siempre obligatorio (conforme a 04_TecDesign.md); una venta sin cliente se rechaza sin guardar datos ni generar puntos. Ya no existe ningún interruptor en *Ajustes de demo*. Pendiente documental: el escenario EU01 de 03_AcceptCriteria.md aún describe una venta sin cliente que "no genera puntos"; la demo lo verifica como rechazo y se recomienda alinear ese documento.
3. **IVA:** la tasa no está definida; se captura el monto de IVA. Base de puntos = subtotal − descuento (el IVA solo se suma al total).
4. **Subtotal** debe ser mayor a $0.00 y el descuento no puede exceder el subtotal (validación razonable no documentada).
5. **RFC:** solo obligatorio (se guarda en mayúsculas); formato y duplicados no se validan (pendiente de definir).
6. **Cancelar/devolver:** ambas acciones aplican la misma reversión (NE05); se registran como estados distintos. Se asume que solo el Cajero puede ejecutarlas.
7. **Consultas** de saldo e historial: disponibles para cualquier usuario autenticado (el documento no restringe).
8. **Reversión:** agrega un movimiento negativo y conserva los movimientos previos (propuesta del diseño, pendiente de confirmar).
9. Requerimientos no funcionales, auditoría, cifrado y retención: pendientes de definir; no se implementan.
