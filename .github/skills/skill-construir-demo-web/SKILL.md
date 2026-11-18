---
name: skill-construir-demo-web
description: Analiza especificaciones y construye una demo web funcional, validada y preparada para integración.
---

# Objetivo
Construir una demo web funcional a partir de el diseño técnico , considerando los requisitos y los criterios de aceptación del proyecto.

# 1. Preparación
- Confirma con el usuario el nombre de la solución.
- Analiza íntegramente los documentos disponibles, priorizando:
  1. `04_TecDesign.md`
  2. `03_AcceptCriteria.md`
  3. `02_ReqsDefinition.md`
- Inspecciona el repositorio y reutiliza los recursos existentes.
- Identifica actores, módulos, funcionalidades, reglas, flujos, integraciones y criterios de aceptación.
- Detecta y registra contradicciones, omisiones y ambigüedades.
- Define una estrategia que cubra el alcance documentado.


# 2. Construcción
Genera el proyecto en: <raiz repositorio>/Code/<NombreDelProyecto>/
Si se requieren scripts u objetos de base de datos, ubícalos en:  <raiz repositorio>/BD/<NombreDelProyecto>/

Implementa, según lo especificado:
- Pantallas y módulos
- Navegación y flujos funcionales
- Formularios y validaciones
- Operaciones y gestión de datos
- Estados de carga, éxito y error
- Integraciones simuladas cuando corresponda
- Diseño responsive y experiencia coherente
- Reglas de negocio verificables

Respeta el stack tecnológico y la arquitectura definidos. Evita dependencias innecesarias y componentes decorativos sin funcionalidad.



# 3. Validación
Antes de presentar resultados, comprueba:
- Compilación y ejecución
- Navegación entre pantallas
- Formularios y validaciones
- Operaciones y persistencia simulada, si corresponde
- Reglas de negocio
- Estados de interfaz
- Criterios de aceptación aplicables
- Diseño responsive básico
- Errores críticos o visibles
Corrige los defectos encontrados. No declares terminado ningún aspecto que no hayas comprobado y reporta las limitaciones reales.



# 4. Integración local
Cuando la demo esté validada:
1. Presenta un resumen breve del alcance, las comprobaciones realizadas y las limitaciones.
2. Indica la ruta `Code/<NombreDelProyecto>/`.
3. Solicita autorización expresa para integrar los archivos en el repositorio local.
4. No modifiques el repositorio antes de recibirla.
5. Tras la autorización, integra el proyecto sin alterar recursos ajenos ni sobrescribir cambios existentes.
6. Ejecuta nuevamente las comprobaciones básicas y comunica el resultado.


# 5. Publicación remota
Después de la integración local:
1. Pregunta si el usuario está conforme o desea modificaciones.
2. Si solicita modificaciones, impleméntalas y repite la validación y la integración autorizada.
3. Si está conforme, solicita autorización expresa para publicar.
4. Tras recibirla, realiza únicamente las operaciones Git permitidas.
5. Respeta las políticas de ramas y protección; no ejecutes operaciones destructivas.
6. Verifica la publicación efectiva y comunica su estado.
La autorización para integrar localmente no autoriza la publicación remota.



# Criterio de finalización
Informa que la demo está construida y validada únicamente después de comprobar la compilación, ejecución y flujos aplicables. 
Indica por separado si la integración local y la publicación remota fueron autorizadas, realizadas y verificadas.