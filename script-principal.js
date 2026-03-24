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

// BANNER COOKIES
document.getElementById('cookie-accept').addEventListener('click', function(){
    document.getElementById('cookie-banner').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
});
window.addEventListener('load', function(){
    if(localStorage.getItem('cookiesAccepted') === 'true'){
        document.getElementById('cookie-banner').style.display = 'none';
    }
});

// ÍNDICE DE CATEGORÍAS
const categorias = document.querySelectorAll(".categoria");
    const herramientas = document.querySelectorAll("#contenedor-herramientas > div");
    function mostrarHerramientas(categoria) {
        let cont = 0;
        herramientas.forEach(function (tool) {
            if (categoria === "all") {
                tool.style.display = "block";
                return;
            }
            if (tool.dataset.categoria.includes(categoria)) {
                tool.style.display = "block";
            } else {
                tool.style.display = "none";
            }
        });
    }
    function mostrarTop() {
        let cont = 0;
        herramientas.forEach(function (tool) {
            if (tool.dataset.categoria.includes("top") && cont < 6) {
                tool.style.display = "block";
                cont++;
            } else {
                tool.style.display = "none";
            }
        });
    }
    categorias.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let categoria = this.dataset.categoria;
            if (categoria === "top") {
                mostrarTop();
            } else {
                mostrarHerramientas(categoria);
            }
        });
    });
    mostrarTop();

// BUSCADOR
    document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    const herramientas = document.querySelectorAll(".tool-card");
    buscador.addEventListener("keyup", function () {
        let filtro = buscador.value.toLowerCase();
        herramientas.forEach(function (tool) {
            let nombre = tool.querySelector(".nombre-herramienta").textContent.toLowerCase();
            if (nombre.includes(filtro)) {
                tool.parentElement.style.display = "block";
            } else {
                tool.parentElement.style.display = "none";
            }
        });
    });
    function resetBuscar() {
        buscador.value = "";
        herramientas.forEach(function (tool) {
            if (tool.parentElement.dataset.categoria.includes("top")) {
                tool.parentElement.style.display = "block";
            } else {
                tool.parentElement.style.display = "none";
            }
        });
    }
    window.resetBuscar = resetBuscar;
    herramientas.forEach(function (tool) {
        if (tool.parentElement.dataset.categoria.includes("top")) {
            tool.parentElement.style.display = "block";
        } else {
            tool.parentElement.style.display = "none";
        }
    });

});
