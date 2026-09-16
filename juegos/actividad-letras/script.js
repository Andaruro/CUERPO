// ==========================================
// PALABRAS DEL JUEGO
// ==========================================

const palabras = [

    {
        palabra: "PATO",
        hueco: 0,          // posición de la letra que falta
        letra: "P",
        imagen: "img/pato.png"
    },

    {
        palabra: "DADO",
        hueco: 0,
        letra: "D",
        imagen: "img/dado.png"
    },

    {
        palabra: "MANO",
        hueco: 0,
        letra: "M",
        imagen: "img/mano.png"
    },

    {
        palabra: "NUBE",
        hueco: 0,
        letra: "N",
        imagen: "img/nube.png"
    },

    {
        palabra: "PAN",
        hueco: 0,
        letra: "P",
        imagen: "img/pan.png"
    }

];


// ==========================================
// LETRAS PERMITIDAS
// ==========================================

const LETRAS_PERMITIDAS =
    ["P", "A", "D", "M", "N"];


// ==========================================
// CONFIGURACIÓN
// ==========================================

const TOTAL_PALABRAS =
    palabras.length;


// ==========================================
// VARIABLES
// ==========================================

let palabraActual = 0;

let intentos = 0;

let juegoBloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const progreso =
    document.getElementById("progreso");

const estrellas =
    document.getElementById("estrellas");

const imagenPalabra =
    document.getElementById("imagenPalabra");

const palabraHueco =
    document.getElementById("palabraHueco");

const respuestaInput =
    document.getElementById("respuestaInput");

const mensaje =
    document.getElementById("mensaje");

const contadorIntentos =
    document.getElementById("contadorIntentos");

const resultado =
    document.getElementById("resultado");

const resultadoTitulo =
    document.getElementById("resultadoTitulo");

const resultadoIntentos =
    document.getElementById("resultadoIntentos");

const siguiente =
    document.getElementById("siguiente");

const reiniciar =
    document.getElementById("reiniciar");


// ==========================================
// MOSTRAR PALABRA
// ==========================================

function mostrarPalabra() {

    const dato =
        palabras[palabraActual];


    intentos = 0;

    juegoBloqueado = false;


    // PROGRESO

    progreso.textContent =
        `Palabra ${palabraActual + 1} de ${TOTAL_PALABRAS}`;


    // IMAGEN

    imagenPalabra.src =
        dato.imagen;

    imagenPalabra.alt =
        `Imagen de ${dato.palabra.toLowerCase()}`;


    // ESTRELLAS

    estrellas.textContent =
        "★".repeat(palabraActual);


    // MENSAJES

    mensaje.textContent = "";

    contadorIntentos.textContent =
        "Intentos: 0";


    // RESULTADO

    resultado.style.display = "none";


    // PALABRA CON HUECO

    palabraHueco.innerHTML = "";


    dato.palabra
        .split("")
        .forEach(
            function(letra, indice) {

                const span =
                    document.createElement("div");

                span.classList.add("letra");


                if (indice === dato.hueco) {

                    span.classList.add("hueco");

                    span.textContent = "?";

                } else {

                    span.textContent = letra;

                }


                palabraHueco.appendChild(span);

            }
        );


    // INPUT

    respuestaInput.value = "";

    respuestaInput.classList.remove(
        "correcta",
        "incorrecta"
    );

    respuestaInput.disabled = false;

    respuestaInput.focus();

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta() {

    if (juegoBloqueado) {

        return;

    }


    const valor =
        respuestaInput.value
            .trim()
            .toUpperCase();


    if (valor.length === 0) {

        return;

    }


    // VALIDAR QUE SEA UNA LETRA PERMITIDA

    if (!LETRAS_PERMITIDAS.includes(valor)) {

        mensaje.textContent =
            "Solo puedes usar P, A, D, M o N";

        mensaje.style.color = "#F44336";

        respuestaInput.value = "";

        respuestaInput.focus();

        return;

    }


    const dato =
        palabras[palabraActual];


    // CORRECTA

    if (valor === dato.letra) {

        respuestaInput.classList.add(
            "correcta"
        );

        respuestaInput.disabled = true;

        mensaje.textContent =
            "¡Muy bien!";

        mensaje.style.color = "#4CAF50";

        completarPalabra();

    }

    // INCORRECTA

    else {

        intentos++;


        contadorIntentos.textContent =
            `Intentos: ${intentos}`;


        mensaje.textContent =
            "¡Intenta otra vez!";

        mensaje.style.color = "#F44336";


        respuestaInput.classList.add(
            "incorrecta"
        );


        setTimeout(
            function() {

                respuestaInput.classList.remove(
                    "incorrecta"
                );

            },
            400
        );


        respuestaInput.value = "";

        respuestaInput.focus();

    }

}


// ==========================================
// COMPLETAR PALABRA
// ==========================================

function completarPalabra() {

    juegoBloqueado = true;


    const dato =
        palabras[palabraActual];


    // REEMPLAZAR EL HUECO POR LA LETRA

    const letras =
        palabraHueco.querySelectorAll(
            ".letra"
        );


    letras[dato.hueco].textContent =
        dato.letra;

    letras[dato.hueco].classList.remove(
        "hueco"
    );


    mensaje.textContent =
        `¡Formaste ${dato.palabra}!`;


    resultado.style.display = "block";

    resultadoTitulo.textContent =
        "¡Muy bien!";

    resultadoIntentos.textContent =
        `Intentos: ${intentos}`;


    // CHECKPOINT A LA MITAD

    if (palabraActual === 2) {

        resultadoTitulo.textContent =
            "¡Muy bien! ¡Vas por la mitad!";

    }


    // ÚLTIMA PALABRA

    if (
        palabraActual ===
        TOTAL_PALABRAS - 1
    ) {

        siguiente.textContent = "Terminar";

    }

}


// ==========================================
// EVENTOS DEL INPUT
// ==========================================

respuestaInput.addEventListener(
    "input",
    function() {

        // Solo 1 letra, sin espacios

        respuestaInput.value =
            respuestaInput.value
                .replace(/[^a-zA-Z]/g, "")
                .slice(0, 1)
                .toUpperCase();


        // Comprobar automáticamente al escribir

        if (respuestaInput.value.length === 1) {

            comprobarRespuesta();

        }

    }
);


respuestaInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            comprobarRespuesta();

        }

    }
);


// ==========================================
// SIGUIENTE
// ==========================================

siguiente.addEventListener(
    "click",
    function() {

        if (
            palabraActual >=
            TOTAL_PALABRAS - 1
        ) {

            terminarJuego();

            return;

        }


        palabraActual++;

        mostrarPalabra();

    }
);


// ==========================================
// TERMINAR
// ==========================================

function terminarJuego() {

    juegoBloqueado = true;


    palabraHueco.innerHTML = "";

    imagenPalabra.removeAttribute("src");

    imagenPalabra.alt = "";


    progreso.textContent =
        "¡Juego completado!";


    mensaje.textContent =
        "¡Excelente trabajo!";

    mensaje.style.color =
        "#1565c0";


    resultado.style.display = "block";

    resultadoTitulo.textContent =
        "¡Terminaste!";

    resultadoIntentos.textContent =
        "Completaste las 5 palabras.";


    siguiente.style.display = "none";

    reiniciar.style.display =
        "inline-block";


    estrellas.textContent =
        "★★★★★";

}


// ==========================================
// REINICIAR
// ==========================================

reiniciar.addEventListener(
    "click",
    function() {

        palabraActual = 0;

        intentos = 0;


        siguiente.style.display =
            "inline-block";

        siguiente.textContent =
            "Siguiente ➜";


        reiniciar.style.display =
            "none";


        mostrarPalabra();

    }
);


// ==========================================
// INICIAR
// ==========================================

mostrarPalabra();
