// FIREBASE - RAITING
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZMIgZN9iNUiWEg4cy9267p6FaFRxWkk4",
  authDomain: "herramientasweb-35d2e.firebaseapp.com",
  projectId: "herramientasweb-35d2e",
  storageBucket: "herramientasweb-35d2e.firebasestorage.app",
  messagingSenderId: "209726055874",
  appId: "1:209726055874:web:eafaece6b421898675625b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async function iniciarRating() {
  const ratingBoxes = document.querySelectorAll(".rating-box");

  ratingBoxes.forEach(async (ratingBox) => {
    const tool = ratingBox.dataset.tool;
    const stars = ratingBox.querySelectorAll(".star");
    const text = ratingBox.querySelector(".rating-text");
    const ref = doc(db, "ratings", tool);

    let total = 0;
    let votos = 0;

    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        total = data.total || 0;
        votos = data.votos || 0;
        if (votos > 0) {
          const promedio = total / votos;
          text.innerText = `${promedio.toFixed(1)} ☆`;
          pintarEstrellasPromedio(promedio, stars);
        }
      }
    } catch (e) {
      console.log("Error Firebase:", e);
    }

    // Hover dinámico
    stars.forEach((star, i) => {
      star.addEventListener("mouseover", () => {
        stars.forEach((s, j) => {
          if (j <= i) s.classList.add("hovered");
          else s.classList.remove("hovered");
        });
      });

      star.addEventListener("mouseout", () => {
        stars.forEach(s => s.classList.remove("hovered"));
        const promedio = votos > 0 ? total / votos : 0;
        pintarEstrellasPromedio(promedio, stars);
      });

      star.addEventListener("click", async () => {
        const value = Number(star.dataset.value);
        total += value;
        votos++;
        await setDoc(ref, { total, votos });
        const promedio = total / votos;
        text.innerText = `${promedio.toFixed(1)} ☆`;
        localStorage.setItem("rating_" + tool, value);
        pintarEstrellasPromedio(promedio, stars);
      });
    });
  });

  function pintarEstrellasPromedio(promedio, stars) {
    stars.forEach(star => {
      const val = Number(star.dataset.value);
      if (val <= Math.floor(promedio)) {
        star.classList.add("promedio");
      } else {
        star.classList.remove("promedio");
      }
    });
  }

})();


// BANNER DE COOKIES
document.getElementById('cookie-accept').addEventListener('click', function () {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});
window.addEventListener('load', function () {
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookie-banner').style.display = 'none';
  }
});

// BOTÓN DE COMPARTIR
document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Herramientas Web',
            url: window.location.href
        });
    } else {
        alert('Tu navegador no soporta compartir automáticamente');
    }
});

// HERRAMIENTAS SUGERIDAS
const herramientas = [
    //{ nombre: "Calculadora Básica", link: "calculadora-basica.html" },
    //{ nombre: "Área y Perímetro", link: "area-perimetro.html" },
    //{ nombre: "Calculadora de Porcentajes", link: "calculadora-porcentajes.html" },
    //{ nombre: "Calculadora de Promedios", link: "calculadora-promedios.html" }, //4
    { nombre: "Convertidor a PDF", link: "convertidor-pdf.html" },
    { nombre: "Convertidor a ZIP", link: "convertidor-zip.html" },
    { nombre: "Código de Colores", link: "codigo-colores.html" },
    { nombre: "Convertidor de Imágenes", link: "convertidor-imagenes.html" },
    //{ nombre: "Convertidor de Números", link: "convertidor-numeros.html" },
    //{ nombre: "Convertidor de Unidades", link: "convertidor-unidades.html" },
    //{ nombre: "Contador de Texto", link: "contador-texto.html" },
    { nombre: "Generador de Border-Radius", link: "border-radius.html" },
    { nombre: "Generador de Box-Shadow", link: "box-shadow.html" },
    //{ nombre: "Generador de Código de Barras", link: "codigo-barras.html" },
    //{ nombre: "Generador de Password", link: "generador-password.html" },
    { nombre: "Generador de Gradientes", link: "gradientes.html" },
    //{ nombre: "Generador de Meta Tag SEO", link: "meta-tag-seo.html" },
    { nombre: "Generador QR", link: "generador-qr.html" },
    { nombre: "Generador de Sopa de Letras", link: "sopa-letras.html" },
    //{ nombre: "Tablas de Multiplicar", link: "tablas-multiplicar.html" },
    //{ nombre: "Invertir Texto", link: "invertir-texto.html" },
    //{ nombre: "Minificador de CSS", link: "minificador-css.html" },
    //{ nombre: "Números Aleatorios", link: "numeros-aleatorios.html" },
    { nombre: "Ruleta Personalizable", link: "ruleta-personalizable.html" }
    //{ nombre: "Letra Aleatoria", link: "letra-aleatoria.html" }
];

// Detectar página actual
const paginaActual = window.location.pathname.split("/").pop();

// Filtrar para NO incluir la actual
const herramientasFiltradas = herramientas.filter(h => h.link !== paginaActual);

// Mezclar (mejor método Fisher-Yates)
function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Seleccionar 5
const seleccionadas = mezclar([...herramientasFiltradas]).slice(0, 5);

// Render
const ul = document.getElementById("herramientasRandom");

seleccionadas.forEach(h => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${h.link}">${h.nombre}</a>`;
    ul.appendChild(li);
});
