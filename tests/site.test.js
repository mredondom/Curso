const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "main.js"), "utf8");

function crearElemento() {
  const atributos = new Map();

  return {
    dataset: {},
    style: {},
    textContent: "",
    content: "",
    listeners: {},
    addEventListener(evento, callback) {
      this.listeners[evento] = callback;
    },
    getAttribute(nombre) {
      return atributos.get(nombre) ?? null;
    },
    setAttribute(nombre, valor) {
      atributos.set(nombre, valor);
    }
  };
}

function ejecutarAplicacion() {
  const anio = crearElemento();
  const reloj = crearElemento();
  const agujaHora = crearElemento();
  const agujaMinuto = crearElemento();
  const agujaSegundo = crearElemento();
  const textoTema = crearElemento();
  const iconoTema = crearElemento();
  const botonTema = crearElemento();
  const metaThemeColor = crearElemento();
  const cuerpo = { dataset: { theme: "light" } };
  let actualizarCadaSegundo;
  let intervalo;

  botonTema.setAttribute("aria-pressed", "false");
  botonTema.querySelector = (selector) => (
    selector === ".texto-tema" ? textoTema : iconoTema
  );

  const elementos = {
    "#anio": anio,
    "#reloj": reloj,
    "#aguja-hora": agujaHora,
    "#aguja-minuto": agujaMinuto,
    "#aguja-segundo": agujaSegundo,
    "#boton-tema": botonTema,
    'meta[name="theme-color"]': metaThemeColor
  };

  vm.runInNewContext(script, {
    document: {
      body: cuerpo,
      querySelector: (selector) => elementos[selector]
    },
    window: {
      setInterval(callback, milisegundos) {
        actualizarCadaSegundo = callback;
        intervalo = milisegundos;
      }
    },
    Date
  });

  return {
    anio,
    reloj,
    agujas: [agujaHora, agujaMinuto, agujaSegundo],
    botonTema,
    textoTema,
    iconoTema,
    cuerpo,
    metaThemeColor,
    actualizarCadaSegundo: () => actualizarCadaSegundo(),
    intervalo
  };
}

test("los enlaces de navegación apuntan a identificadores únicos", () => {
  const identificadores = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  const enlaces = [...html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)]
    .flatMap(([, contenido]) => [...contenido.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id));

  assert.ok(enlaces.length > 0, "Debe existir navegación principal.");

  for (const destino of enlaces) {
    assert.equal(identificadores.filter((id) => id === destino).length, 1, `#${destino} debe existir una sola vez.`);
  }
});

test("el selector cambia tema, etiqueta, icono y estado accesible", () => {
  const app = ejecutarAplicacion();
  const alternarTema = app.botonTema.listeners.click;

  alternarTema();
  assert.equal(app.cuerpo.dataset.theme, "dark");
  assert.equal(app.botonTema.getAttribute("aria-pressed"), "true");
  assert.equal(app.textoTema.textContent, "Tema claro");
  assert.equal(app.iconoTema.textContent, "☀");
  assert.equal(app.metaThemeColor.content, "#171a18");

  alternarTema();
  assert.equal(app.cuerpo.dataset.theme, "light");
  assert.equal(app.botonTema.getAttribute("aria-pressed"), "false");
  assert.equal(app.textoTema.textContent, "Tema oscuro");
  assert.equal(app.iconoTema.textContent, "☾");
  assert.equal(app.metaThemeColor.content, "#f4f5f2");
});

test("el año se actualiza y el reloj programa sus agujas cada segundo", () => {
  const app = ejecutarAplicacion();

  assert.equal(app.anio.textContent, new Date().getFullYear());
  assert.equal(app.intervalo, 1000);
  assert.match(app.reloj.getAttribute("aria-label"), /^Hora actual:/);
  assert.ok(app.agujas.every((aguja) => aguja.style.transform.includes("rotate(")));

  app.actualizarCadaSegundo();
  assert.match(app.reloj.getAttribute("aria-label"), /^Hora actual:/);
});
