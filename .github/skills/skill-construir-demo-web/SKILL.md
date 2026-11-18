---
name: skill-construir-demo-web
description: Analiza especificaciones y construye una demo web funcional, validada y preparada para integración local y publicación remota.
---

# OBJETIVO
Construir una demo web funcional a partir del diseño técnico, respetando los requerimientos y criterios de aceptación documentados. La demo debe permitir simular y verificar el comportamiento esperado de la solución, sin representar necesariamente una implementación productiva definitiva.


# ACCIONES

## 1. Preparación
- Identifica el nombre de la solución. Si no está definido, solicítalo al usuario.
- Confirma con el usuario el nombre de la solución o pide que indique un nombre.
- Confirma con el usuario que los archivos del proyecto deben ir en: "<raiz repositorio>/.Demo/Code/"  o que indique lso directorio.
- Confirma con el usuario que los archivosson scripts u objetos de base de datos, ubícalos en:  "<raiz repositorio>/.Demo/BD/"  o que indique lso directorio.
- Identifica e Inspecciona los recursos y documentos existentes antes de crear o modificar archivos.


## 2. Análisis
• Analiza íntegramente los documentos disponibles, priorizando:
-. `04_TecDesign.md`: Diseño y especificaciones técnicas.
-. `03_AcceptCriteria.md`: Criterios de aceptación.
-. `02_ReqsDefinition.md`: Definición de requerimientos.

• Identifica:
- Actores, módulos y funcionalidades.
- Reglas de negocio y flujos operativos.
- Interfaces, integraciones y dependencias.
- Criterios de aceptación aplicables.

• Detecta contradicciones, omisiones y ambigüedades.




## 3. Construcción
Desarrolla la demo simulando y respetando los principios y fundamentos de funcionamiento requeridos, con el fin de;
reproducir fielmente el comportamiento y las funcionalidades especificadas en los documentos.

**Tecnologías y restricciones:**
- Utiliza prioritariamente HTML, CSS y JavaScript.
- Evita dependencias innecesarias y tecnologías que requieran infraestructura de servidor.
- La aplicación debe ejecutarse directamente desde el sistema de archivos (`file://`), sin necesidad de servidor web.
- Utiliza bibliotecas externas únicamente cuando sean justificadas y compatibles con esta restricción.
- Evita componentes decorativos sin funcionalidad.

**Implementa la funcionalidad simula de los sigientes puntos, según corresponda:**
- Pantallas y módulos.
- Navegación y flujos funcionales.
- Formularios y validaciones.
- Operaciones y gestión de datos.
- Estados de carga, éxito y error.
- Reglas de negocio verificables.
- Integraciones simuladas cuando corresponda.
- Diseño responsive y experiencia de usuario coherente.

**Simulación y persistencia:**
- Diferencia claramente las funcionalidades reales de la demo de aquellas que representan simulaciones.
- Utiliza mecanismos locales como LocalStorage, SessionStorage, IndexedDB o archivos JSON cuando corresponda.
- No presentes persistencia local como si fuera persistencia en una base de datos real.
- Identifica explícitamente las integraciones que no pueden ejecutarse realmente y utiliza simulaciones funcionales cuando sea necesario.


**Reglas de construccion:**
- No inventes requerimientos ni modifiques unilateralmente las definiciones documentadas.
- Ante contradicciones que afecten la implementación, consulta al usuario antes de continuar.
- Para omisiones menores, puedes proponer una solución razonable, documentando el supuesto adoptado.
- Si falta un documento prioritario, informa la limitación y determina si es posible continuar sin comprometer la fidelidad de la demo.
- Define una estrategia de construcción que mantenga trazabilidad entre funcionalidades, requerimientos y criterios de aceptación.






## 4. Validación
Antes de presentar resultados, ejecuta las comprobaciones aplicables:

- Sintaxis y errores de HTML, CSS y JavaScript.
- Carga y ejecución de la aplicación.
- Compatibilidad con ejecución directa mediante `file://`.
- Navegación entre pantallas.
- Formularios y validaciones.
- Operaciones y persistencia simulada.
- Reglas de negocio.
- Flujos funcionales principales.
- Criterios de aceptación aplicables.
- Errores críticos o visibles.

**Reglas de validación:**
- Ejecuta pruebas funcionales, no te limites a inspeccionar visualmente las pantallas.
- Relaciona los resultados de las pruebas con los criterios de aceptación correspondientes.
- Identifica criterios cumplidos, no cumplidos y no verificables mediante la demo.
- Corrige los defectos encontrados y repite las pruebas afectadas.
- No declares terminado ningún aspecto que no hayas comprobado.
- Reporta las limitaciones técnicas y funcionales reales.


## 5. Ejecutar Demostracion 
Cuando la demo esté construida y este validada para funcionar:
1. Presenta un resumen del alcance, funcionalidades implementadas, comprobaciones realizadas y limitaciones.
2. Ejecuta la aplicacion demo, de prefencia dentro de un apartado CANVAS que este integrado en la misma herramienta desde donde se invoco esta skill. 



## 6. Integración local
1. Cuando la demo esté construida y validada por el usuario:
2. Identifica los archivos que se crearon o modificaron.
3. Solicita autorización expresa para integrar los archivos en el repositorio local.
4. No modifiques el repositorio antes de recibir dicha autorización.
5. Antes de integrar, inspecciona el estado de Git, los archivos existentes y los cambios pendientes.
6. Integra los archivos sin alterar recursos ajenos, sobrescribir cambios existentes ni eliminar información.
7. Verifica el resultado de la integración y comunica cualquier incidencia.

**Reglas:**
- No sobrescribas archivos existentes sin autorización expresa.
- No descartes cambios locales del usuario.
- Si existen conflictos o riesgos de pérdida de información, detente y consulta al usuario.
- Conserva la estructura de directorios acordada.


## 7. Publicación remota
Después de completar la integración local:
1. Pregunta si el usuario está conforme o desea modificaciones.
2. Si solicita modificaciones, impleméntalas, repite la validación y solicita autorización para integrar los cambios adicionales.
3. Si está conforme, solicita autorización expresa para publicar los cambios.
4. Identifica la rama destino y respeta las políticas del repositorio.
5. Ejecuta las operaciones Git necesarias para publicar.
6. No realices operaciones destructivas ni alteres cambios ajenos.
7. Verifica la publicación efectiva mediante la comprobación del commit, la rama y los archivos publicados.
8. Comunica el resultado y cualquier incidencia.

**Reglas:**
- La autorización para integrar localmente no autoriza la publicación remota.
- Realiza la acciones / operaciones remotas `push` y `merges`  solo cuando ya hubo autorización del usuario.
- Respeta las políticas de protección de ramas y los mecanismos de revisión establecidos.
- Si la publicación requiere permisos o aprobaciones adicionales, informa al usuario y detente.





# CRITERIOS DE FINALIZACIÓN

Considera los siguientes estados de manera independiente:

1. **Demo construida y validada:** La aplicación fue implementada y se comprobaron su ejecución y los flujos funcionales aplicables.
2. **Integración local:** Los archivos fueron integrados al repositorio local con autorización y se verificó el resultado.
3. **Publicación remota:** Los cambios fueron publicados con autorización y se verificó su disponibilidad en el repositorio remoto.

Al finalizar, presenta un reporte que incluya:

- Funcionalidades implementadas.
- Archivos creados y modificados.
- Criterios de aceptación verificados y sus resultados.
- Funcionalidades simuladas y limitaciones.
- Comprobaciones y pruebas ejecutadas.
- Estado de la demo.
- Estado de la integración local.
- Estado de la publicación remota.

No declares completada ninguna etapa que no haya sido ejecutada y verificada.