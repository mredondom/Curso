# Motor & Ruta1

Sitio web estático de estilo editorial dedicado al mundo del automóvil. Reúne novedades, categorías de coches y artículos sobre rutas, cuidados y diseño en una página adaptable a distintos tamaños de pantalla.

## Características

- Navegación entre las secciones de novedades, coches, artículos y presentación.
- Selector para alternar entre tema claro y oscuro.
- Reloj analógico que muestra la hora local y se actualiza cada segundo.
- Año del pie de página actualizado automáticamente.
- Ilustraciones creadas con CSS y SVG, sin recursos externos.
- Diseño adaptable y compatibilidad con la preferencia de movimiento reducido.
- Elementos interactivos con soporte de foco visible y etiquetas accesibles.

## Tecnologías

- HTML
- CSS
- JavaScript, sin dependencias ni frameworks

## Cómo ejecutar

No es necesario instalar dependencias ni compilar el proyecto. Abre `index.html` directamente en un navegador o inicia un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después, visita [http://localhost:8000](http://localhost:8000).

## Estructura

```text
.
├── index.html   # Contenido y estructura de la página
├── styles.css   # Estilos, temas y adaptación responsive
├── main.js      # Selector de tema, reloj y año del pie
├── tests/
│   ├── index.html       # Página para ejecutar las pruebas
│   ├── test-runner.js   # Comprobaciones en navegador
│   └── site.test.js     # Pruebas ejecutables con Node.js
├── .github/workflows/
│   └── tests.yml        # Ejecución automática en GitHub Actions
└── README.md    # Documentación del proyecto
```

## Desarrollo

Edita los archivos HTML, CSS y JavaScript y recarga la página en el navegador para ver los cambios.

## Pruebas

Las pruebas usan las API nativas del navegador y no requieren instalar dependencias. Inicia el servidor local indicado arriba y abre [http://localhost:8000/tests/](http://localhost:8000/tests/). La página informa qué comprobaciones pasan o fallan. Se prueban los enlaces de navegación, el selector de tema, el año del pie y la actualización del reloj.

También puedes ejecutar las pruebas automatizadas desde la terminal con Node.js 22 o superior:

```bash
node --test
```

GitHub Actions ejecuta este mismo comando en cada push y pull request.
