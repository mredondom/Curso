# Instrucciones para GitHub Copilot!!!!

## Contexto del proyecto

Motor & Ruta es una página editorial estática sobre el mundo del automóvil. Consulta [README.md](../README.md) para conocer sus secciones y cómo ejecutarla.

- `index.html`: estructura y contenido en español.
- `styles.css`: presentación, temas claro/oscuro y diseño adaptable.
- `main.js`: selector de tema, reloj analógico y año del pie de página.
- No hay frameworks, dependencias, proceso de compilación ni pruebas automatizadas.

## Pautas de implementación

- Mantén la solución como HTML, CSS y JavaScript nativo. No añadas dependencias ni herramientas de compilación salvo que se soliciten.
- Conserva el idioma español en el contenido visible y usa nombres coherentes con los existentes: identificadores JavaScript en `camelCase`, clases y propiedades CSS en `kebab-case`.
- Sigue el formato del proyecto: indentación de dos espacios, comillas dobles en HTML y JavaScript y punto y coma en JavaScript.
- Mantén el marcado semántico y accesible: usa elementos HTML apropiados, nombres accesibles para controles, `aria-hidden="true"` solo en contenido decorativo y estados accesibles actualizados cuando cambie la interfaz.
- Al añadir navegación interna, comprueba que el destino exista y que los identificadores no estén duplicados.
- Reutiliza las variables CSS existentes para colores, superficies, bordes y transiciones; si añades un tema o componente, asegúrate de que funciona tanto en tema claro como oscuro.
- Comprueba los cambios visuales en escritorio y móvil. Conserva los puntos de adaptación existentes y respeta `prefers-reduced-motion` para animaciones o desplazamientos.
- Prioriza cambios pequeños y coherentes con la estética actual. Las ilustraciones existentes se construyen con CSS y SVG; evita incorporar recursos externos sin necesidad.
- Actualiza el README cuando cambien de forma relevante la estructura, las funciones o la manera de ejecutar el proyecto.

## Verificación

No hay una suite de pruebas ni comandos de compilación. Para validar cambios, ejecuta la página en un navegador —puedes iniciar el servidor local indicado en el README— y comprueba la función modificada, la navegación, el diseño adaptable y la consola del navegador.