// ==========================================
// PALABRAS DEL JUEGO
// ==========================================

const palabras = [

    {
        palabra: "CASA",
        silabas: ["CA", "SA"],
        imagen: "img/casa.png"
    },

    {
        palabra: "GATO",
        silabas: ["GA", "TO"],
        imagen: "img/gato.png"
    },

    {
        palabra: "PATO",
        silabas: ["PA", "TO"],
        imagen: "img/pato.png"
    },

    {
        palabra: "MESA",
        silabas: ["ME", "SA"],
        imagen: "img/mesa.png"
    },

    {
        palabra: "LUNA",
        silabas: ["LU", "NA"],
        imagen: "img/luna.png"
    },

    {
        palabra: "MANO",
        silabas: ["MA", "NO"],
        imagen: "img/mano.png"
    },

    {
        palabra: "PELOTA",
        silabas: ["PE", "LO", "TA"],
        imagen: "img/pelota.png"
    },

    {
        palabra: "CAMISA",
        silabas: ["CA", "MI", "SA"],
        imagen: "img/camisa.png"
    },

    {
        palabra: "BANANA",
        silabas: ["BA", "NA", "NA"],
        imagen: "img/banana.png"
    },

    {
        palabra: "ZAPATO",
        silabas: ["ZA", "PA", "TO"],
        imagen: "img/zapato.png"
    }

];


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

let posicionActual = 0;

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

const silabasDesordenadas =
    document.getElementById(
        "silabasDesordenadas"
    );

const respuesta =
    document.getElementById("respuesta");

const mensaje =
    document.getElementById("mensaje");

const contadorIntentos =
    document.getElementById(
        "contadorIntentos"
    );

const resultado =
    document.getElementById("resultado");

const resultadoTitulo =
    document.getElementById(
        "resultadoTitulo"
    );

const resultadoIntentos =
    document.getElementById(
        "resultadoIntentos"
    );

const siguiente =
    document.getElementById("siguiente");

const reiniciar =
    document.getElementById("reiniciar");


// ==========================================
// MEZCLAR SÍLABAS
// ==========================================

function mezclar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];

    }

    return copia;

}


// ==========================================
// MOSTRAR PALABRA
// ==========================================

function mostrarPalabra() {

    const palabra =
        palabras[palabraActual];


    intentos = 0;

    posicionActual = 0;

    juegoBloqueado = false;


    // ======================================
    // PROGRESO
    // ======================================

    progreso.textContent =
        `Palabra ${palabraActual + 1} de ${TOTAL_PALABRAS}`;


    // ======================================
    // IMAGEN
    // ======================================

    imagenPalabra.src =
        palabra.imagen;

    imagenPalabra.alt =
        `Imagen de ${palabra.palabra.toLowerCase()}`;


    // ======================================
    // ESTRELLAS
    // ======================================

    estrellas.textContent =
        "★".repeat(palabraActual);


    // ======================================
    // MENSAJES
    // ======================================

    mensaje.textContent = "";

    contadorIntentos.textContent =
        "Intentos: 0";


    // ======================================
    // RESULTADO
    // ======================================

    resultado.style.display =
        "none";


    // ======================================
    // SÍLABAS DESORDENADAS
    // ======================================

    silabasDesordenadas.innerHTML =
        "";


    const mezcladas =
        mezclar(palabra.silabas);


    mezcladas.forEach(
        function(silaba) {

            const elemento =
                document.createElement("div");


            elemento.classList.add(
                "silaba"
            );


            elemento.textContent =
                silaba;


            silabasDesordenadas.appendChild(
                elemento
            );

        }
    );


    // ======================================
    // RESPUESTAS
    // ======================================

    respuesta.innerHTML =
        "";


    palabra.silabas.forEach(
        function(silaba, indice) {

            crearCaja(indice);

        }
    );


    activarCaja(0);

}


// ==========================================
// CREAR CAJA
// ==========================================

function crearCaja(indice) {

    const caja =
        document.createElement("div");


    caja.classList.add(
        "caja-silaba"
    );


    const input =
        document.createElement("input");


    input.type = "text";

    input.maxLength = 3;

    input.autocomplete = "off";

    input.autocapitalize = "characters";

    input.spellcheck = false;

    input.dataset.indice = indice;


    // ======================================
    // ESCRITURA
    // ======================================

    input.addEventListener(
        "input",
        function() {

            comprobarSilaba(input);

        }
    );


    // ======================================
    // ENTER
    // ======================================

    input.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                comprobarSilaba(input);

            }

        }
    );


    caja.appendChild(input);

    respuesta.appendChild(caja);

}


// ==========================================
// ACTIVAR CAJA
// ==========================================

function activarCaja(indice) {

    const cajas =
        respuesta.querySelectorAll(
            ".caja-silaba"
        );


    cajas.forEach(
        function(caja) {

            caja.classList.remove(
                "activa"
            );

        }
    );


    if (!cajas[indice]) {

        return;

    }


    cajas[indice].classList.add(
        "activa"
    );


    const input =
        cajas[indice].querySelector(
            "input"
        );


    input.focus();

}


// ==========================================
// COMPROBAR SÍLABA
// ==========================================

function comprobarSilaba(input) {

    if (juegoBloqueado) {

        return;

    }


    const indice =
        Number(
            input.dataset.indice
        );


    if (
        indice !== posicionActual
    ) {

        return;

    }


    const valor =
        input.value
            .trim()
            .toUpperCase();


    if (
        valor.length < 2
    ) {

        return;

    }


    const palabra =
        palabras[palabraActual];


    const correcta =
        palabra.silabas[
            posicionActual
        ];


    // ======================================
    // RESPUESTA CORRECTA
    // ======================================

    if (
        valor === correcta
    ) {

        const cajas =
            respuesta.querySelectorAll(
                ".caja-silaba"
            );


        cajas[indice]
            .classList
            .remove("activa");


        cajas[indice]
            .classList
            .add("correcta");


        input.disabled = true;


        posicionActual++;


        mensaje.textContent =
            "¡Muy bien!";


        mensaje.style.color =
            "#4CAF50";


        // SIGUIENTE SÍLABA

        if (
            posicionActual <
            palabra.silabas.length
        ) {

            activarCaja(
                posicionActual
            );

        }

        // PALABRA COMPLETA

        else {

            completarPalabra();

        }

    }


    // ======================================
    // RESPUESTA INCORRECTA
    // ======================================

    else {

        intentos++;


        contadorIntentos.textContent =
            `Intentos: ${intentos}`;


        mensaje.textContent =
            "¡Intenta otra vez!";


        mensaje.style.color =
            "#F44336";


        const caja =
            input.parentElement;


        caja.classList.add(
            "incorrecta"
        );


        setTimeout(
            function() {

                caja.classList.remove(
                    "incorrecta"
                );

            },
            400
        );


        input.value = "";

        input.focus();

    }

}


// ==========================================
// COMPLETAR PALABRA
// ==========================================

function completarPalabra() {

    juegoBloqueado = true;


    const palabra =
        palabras[palabraActual];


    mensaje.textContent =
        `¡Formaste ${palabra.palabra}!`;


    mensaje.style.color =
        "#4CAF50";


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "¡Muy bien!";


    resultadoIntentos.textContent =
        `Intentos: ${intentos}`;


    // ======================================
    // CHECKPOINT
    // ======================================

    if (
        palabraActual === 4
    ) {

        resultadoTitulo.textContent =
            "¡Muy bien! ¡Vas por la mitad!";

    }


    // ======================================
    // ÚLTIMA PALABRA
    // ======================================

    if (
        palabraActual ===
        TOTAL_PALABRAS - 1
    ) {

        siguiente.textContent =
            "Terminar";

    }

}


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


    respuesta.innerHTML = "";

    silabasDesordenadas.innerHTML = "";


    imagenPalabra.src = "";

    imagenPalabra.alt = "";


    progreso.textContent =
        "¡Juego completado!";


    mensaje.textContent =
        "¡Excelente trabajo!";


    mensaje.style.color =
        "#1565c0";


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "¡Terminaste!";


    resultadoIntentos.textContent =
        "Completaste las 10 palabras.";


    siguiente.style.display =
        "none";


    reiniciar.style.display =
        "inline-block";


    estrellas.textContent =
        "★★★★★★★★★★";

}


// ==========================================
// REINICIAR
// ==========================================

reiniciar.addEventListener(
    "click",
    function() {

        palabraActual = 0;

        intentos = 0;

        posicionActual = 0;


        siguiente.style.display =
            "inline-block";


        siguiente.textContent =
            "Siguiente";


        reiniciar.style.display =
            "none";


        mostrarPalabra();

    }
);


// ==========================================
// INICIAR
// ==========================================

mostrarPalabra();
