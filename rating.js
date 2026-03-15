// js/rating.js
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