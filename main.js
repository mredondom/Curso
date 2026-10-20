const mensaje = document.querySelector("#mensaje");
const botonSaludo = document.querySelector("#boton-saludo");
const anio = document.querySelector("#anio");
const reloj = document.querySelector("#reloj");
const agujaHora = document.querySelector("#aguja-hora");
const agujaMinuto = document.querySelector("#aguja-minuto");
const agujaSegundo = document.querySelector("#aguja-segundo");

const saludos = [
  "Esta es mi primera página web. Me alegra que estés aquí.",
  "Gracias por visitarme. ¡Que tengas un día fantástico!"
];

let saludoActual = 0;

anio.textContent = new Date().getFullYear();

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

botonSaludo.addEventListener("click", () => {
  saludoActual = (saludoActual + 1) % saludos.length;
  mensaje.textContent = saludos[saludoActual];
});
