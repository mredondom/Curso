const anio = document.querySelector("#anio");
const reloj = document.querySelector("#reloj");
const agujaHora = document.querySelector("#aguja-hora");
const agujaMinuto = document.querySelector("#aguja-minuto");
const agujaSegundo = document.querySelector("#aguja-segundo");
const botonTema = document.querySelector("#boton-tema");
const textoTema = botonTema.querySelector(".texto-tema");
const iconoTema = botonTema.querySelector("[aria-hidden='true']");
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

anio.textContent = new Date().getFullYear();

botonTema.addEventListener("click", () => {
  const temaOscuro = document.body.dataset.theme !== "dark";
  document.body.dataset.theme = temaOscuro ? "dark" : "light";
  textoTema.textContent = temaOscuro ? "Tema claro" : "Tema oscuro";
  iconoTema.textContent = temaOscuro ? "☀" : "☾";
  botonTema.setAttribute("aria-pressed", String(temaOscuro));
  metaThemeColor.content = temaOscuro ? "#171a18" : "#f4f5f2";
});

function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours() % 12;
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();

  agujaHora.style.transform = `translateX(-50%) rotate(${horas * 30 + minutos / 2}deg)`;
  agujaMinuto.style.transform = `translateX(-50%) rotate(${minutos * 6 + segundos / 10}deg)`;
  agujaSegundo.style.transform = `translateX(-50%) rotate(${segundos * 6}deg)`;
  reloj.setAttribute("aria-label", `Hora actual: ${ahora.toLocaleTimeString("es-ES")}`);
}

actualizarReloj();
window.setInterval(actualizarReloj, 1000);
