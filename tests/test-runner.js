const estado = document.querySelector("#estado");
const resultados = document.querySelector("#resultados");
const pagina = document.querySelector("#pagina");
let pruebasCorrectas = 0;
let pruebasFallidas = 0;

function afirmar(condicion, mensaje) {
  if (!condicion) {
    throw new Error(mensaje);
  }
}

async function probar(nombre, callback) {
  const elemento = document.createElement("li");
  elemento.textContent = nombre;

  try {
    await callback();
    elemento.dataset.resultado = "correcto";
    elemento.textContent += " — correcto";
    pruebasCorrectas += 1;
  } catch (error) {
    elemento.dataset.resultado = "error";
    elemento.textContent += ` — error: ${error.message}`;
    pruebasFallidas += 1;
  }

  resultados.append(elemento);
}

function esperarCarga(iframe) {
  return new Promise((resolve, reject) => {
    let timeoutId;
    const limpiar = () => {
      window.clearTimeout(timeoutId);
      iframe.removeEventListener("load", comprobarCarga);
      iframe.removeEventListener("error", errorCarga);
    };

    const errorCarga = () => {
      limpiar();
      reject(new Error("No se pudo cargar index.html."));
    };

    const comprobarCarga = () => {
      try {
        if (iframe.contentDocument?.readyState === "complete"
          && iframe.contentWindow.location.href !== "about:blank") {
          limpiar();
          resolve();
        }
      } catch {
        limpiar();
        reject(new Error("Abre las pruebas desde el mismo origen, por ejemplo con el servidor local del README."));
      }
    };

    iframe.addEventListener("load", comprobarCarga);
    iframe.addEventListener("error", errorCarga, { once: true });
    timeoutId = window.setTimeout(() => {
      limpiar();
      reject(new Error("Se agotó el tiempo de espera al cargar index.html."));
    }, 5000);
    comprobarCarga();
  });
}

async function ejecutarPruebas() {
  try {
    await esperarCarga(pagina);
    const documento = pagina.contentDocument;
    afirmar(documento, "No se pudo acceder a la página. Inicia un servidor local y abre /tests/.");

    await probar("La navegación enlaza con secciones existentes", () => {
      const enlaces = [...documento.querySelectorAll(".navegacion a")];
      afirmar(enlaces.length > 0, "No se encontraron enlaces de navegación.");

      for (const enlace of enlaces) {
        const destino = enlace.getAttribute("href");
        afirmar(destino?.startsWith("#"), `El enlace «${enlace.textContent.trim()}» no es interno.`);
        afirmar(documento.querySelectorAll(destino).length === 1, `El destino «${destino}» debe existir una sola vez.`);
      }
    });

    await probar("El selector alterna tema, etiqueta y estado accesible", () => {
      const boton = documento.querySelector("#boton-tema");
      const etiqueta = boton?.querySelector(".texto-tema");
      const icono = boton?.querySelector("[aria-hidden='true']");
      const metaColor = documento.querySelector('meta[name="theme-color"]');

      afirmar(boton && etiqueta && icono && metaColor, "Falta el botón de tema o alguno de sus elementos.");
      afirmar(documento.body.dataset.theme !== "dark", "La página no inicia en tema claro.");
      afirmar(boton.getAttribute("aria-pressed") === "false", "El estado inicial del botón debería ser false.");

      boton.click();
      afirmar(documento.body.dataset.theme === "dark", "El primer clic no activa el tema oscuro.");
      afirmar(boton.getAttribute("aria-pressed") === "true", "El estado accesible no indica el tema oscuro.");
      afirmar(etiqueta.textContent === "Tema claro", "La etiqueta no ofrece volver al tema claro.");
      afirmar(icono.textContent === "☀", "El icono oscuro no se actualizó.");
      afirmar(metaColor.content === "#171a18", "El color del navegador no corresponde al tema oscuro.");

      boton.click();
      afirmar(documento.body.dataset.theme === "light", "El segundo clic no restaura el tema claro.");
      afirmar(boton.getAttribute("aria-pressed") === "false", "El estado accesible no se restauró.");
      afirmar(etiqueta.textContent === "Tema oscuro", "La etiqueta no ofrece volver al tema oscuro.");
      afirmar(icono.textContent === "☾", "El icono claro no se restauró.");
      afirmar(metaColor.content === "#f4f5f2", "El color del navegador no corresponde al tema claro.");
    });

    await probar("El pie muestra el año actual", () => {
      const anio = documento.querySelector("#anio");
      afirmar(anio?.textContent === String(new Date().getFullYear()), "El año del pie no coincide con el año actual.");
    });

    await probar("El reloj muestra la hora y actualiza sus agujas", async () => {
      const reloj = documento.querySelector("#reloj");
      const agujas = ["#aguja-hora", "#aguja-minuto", "#aguja-segundo"]
        .map((selector) => documento.querySelector(selector));

      afirmar(reloj && agujas.every(Boolean), "Falta el reloj o alguna de sus agujas.");
      afirmar(reloj.getAttribute("aria-label").startsWith("Hora actual:"), "El reloj no anuncia la hora actual.");
      afirmar(agujas.every((aguja) => aguja.style.transform.includes("rotate(")), "Las agujas no tienen rotación.");

      const etiquetaInicial = reloj.getAttribute("aria-label");
      await new Promise((resolve) => window.setTimeout(resolve, 1150));
      afirmar(reloj.getAttribute("aria-label") !== etiquetaInicial, "La hora accesible no se actualizó tras un segundo.");
    });
  } catch (error) {
    pruebasFallidas += 1;
    const elemento = document.createElement("li");
    elemento.dataset.resultado = "error";
    elemento.textContent = `No se pudieron iniciar las pruebas: ${error.message}`;
    resultados.append(elemento);
  }

  estado.textContent = pruebasFallidas === 0
    ? `Resultado: ${pruebasCorrectas} pruebas correctas.`
    : `Resultado: ${pruebasCorrectas} correctas y ${pruebasFallidas} fallidas.`;
}

ejecutarPruebas();
