// Datos: leemos las sesiones guardadas o empezamos con una lista vacía.
const CLAVE = "diarioDeEstudio";
let sesiones = JSON.parse(localStorage.getItem(CLAVE)) || [];

// Guarda las sesiones en el navegador para no perderlas al recargar.
function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(sesiones));
}

// Devuelve la fecha local como "YYYY-MM-DD" (nunca usamos UTC).
function fechaLocal(fecha) {
  const ano = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

// Calcula los días consecutivos con sesión que terminan hoy (o ayer si hoy no hay).
function calcularRacha() {
  const diasConSesion = new Set(sesiones.map((s) => s.fecha));
  const cursor = new Date();

  // Si hoy todavía no hay sesión, la racha sigue viva si ayer hubo.
  if (!diasConSesion.has(fechaLocal(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!diasConSesion.has(fechaLocal(cursor))) {
      return 0;
    }
  }

  let racha = 0;
  while (diasConSesion.has(fechaLocal(cursor))) {
    racha = racha + 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return racha;
}

// Convierte "2026-10-03" en "3 de octubre de 2026".
function formatearFecha(texto) {
  const partes = texto.split("-");
  const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Suma los minutos de las sesiones de esta semana (lunes a hoy, fecha local).
function calcularMinutosSemana() {
  const hoy = new Date();
  const diaSemana = (hoy.getDay() + 6) % 7; // lunes = 0
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - diaSemana);

  const inicio = fechaLocal(lunes);
  const fin = fechaLocal(hoy);

  return sesiones
    .filter((s) => s.fecha >= inicio && s.fecha <= fin)
    .reduce((total, s) => total + s.minutos, 0);
}

// Dibuja la racha y la lista de sesiones en pantalla.
function mostrar() {
  const racha = calcularRacha();
  document.getElementById("rachaNumero").textContent = racha;
  document.getElementById("rachaTexto").textContent =
    racha === 1 ? "día de racha" : "días de racha";

  document.getElementById("semanaMinutos").textContent = calcularMinutosSemana();

  const lista = document.getElementById("listaSesiones");
  lista.innerHTML = "";

  // Ordenar de la más reciente a la más antigua.
  const ordenadas = [...sesiones].sort((a, b) => {
    if (a.fecha !== b.fecha) {
      return a.fecha < b.fecha ? 1 : -1;
    }
    return b.id - a.id;
  });

  if (ordenadas.length === 0) {
    const li = document.createElement("li");
    li.className = "vacio";
    li.textContent = "Todavía no hay sesiones.";
    lista.appendChild(li);
    return;
  }

  for (const s of ordenadas) {
    const li = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = `${s.tema} — ${formatearFecha(s.fecha)}`;
    const minutos = document.createElement("strong");
    minutos.textContent = `${s.minutos} min`;
    li.appendChild(texto);
    li.appendChild(minutos);
    lista.appendChild(li);
  }
}

// Referencias a los elementos del formulario.
const formulario = document.getElementById("formulario");
const inputFecha = document.getElementById("fecha");
const inputTema = document.getElementById("tema");
const inputMinutos = document.getElementById("minutos");

// La fecha empieza en hoy, pero se puede cambiar.
inputFecha.value = fechaLocal(new Date());

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const minutos = Number(inputMinutos.value);
  if (!inputFecha.value || !inputTema.value.trim() || !(minutos > 0)) {
    return;
  }

  sesiones.push({
    id: Date.now(),
    fecha: inputFecha.value,
    tema: inputTema.value.trim(),
    minutos: minutos,
  });

  guardar();
  mostrar();
  formulario.reset();
  inputFecha.value = fechaLocal(new Date());
});

mostrar();

// Modo oscuro: se guarda la preferencia en localStorage con otra clave.
const CLAVE_TEMA = "diarioDeEstudioTema";
const toggleTema = document.getElementById("toggleTema");

function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  toggleTema.textContent = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
}

let temaOscuro = localStorage.getItem(CLAVE_TEMA) === "oscuro";
aplicarTema(temaOscuro);

toggleTema.addEventListener("click", () => {
  temaOscuro = !temaOscuro;
  localStorage.setItem(CLAVE_TEMA, temaOscuro ? "oscuro" : "claro");
  aplicarTema(temaOscuro);
});
