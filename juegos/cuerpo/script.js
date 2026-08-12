// ==========================================
// PARTES DEL CUERPO
// ==========================================

const partes = [

    {
        nombre: "MANOS",
        imagen: "img/manos.png",
        palabra: "M_NOS",
        letra: "A",
        opciones: ["A", "E", "O"]
    },

    {
        nombre: "BRAZO",
        imagen: "img/brazo.png",
        palabra: "BRA_O",
        letra: "Z",
        opciones: ["S", "Z", "P"]
    },

    {
        nombre: "OJOS",
        imagen: "img/ojos.png",
        palabra: "OJ_S",
        letra: "O",
        opciones: ["A", "O", "E"]
    },

    {
        nombre: "NARIZ",
        imagen: "img/nariz.png",
        palabra: "NA_IZ",
        letra: "R",
        opciones: ["L", "R", "T"]
    },

    {
        nombre: "BOCA",
        imagen: "img/boca.png",
        palabra: "BO_A",
        letra: "C",
        opciones: ["G", "C", "P"]
    },

    {
        nombre: "PIERNA",
        imagen: "img/pierna.png",
        palabra: "PIE_NA",
        letra: "R",
        opciones: ["R", "L", "M"]
    },

    {
        nombre: "PIE",
        imagen: "img/pie.png",
        palabra: "P_E",
        letra: "I",
        opciones: ["A", "I", "O"]
    },

    {
        nombre: "CABEZA",
        imagen: "img/cabeza.png",
        palabra: "CABE_A",
        letra: "Z",
        opciones: ["S", "Z", "R"]
    }

];


// ==========================================
// VARIABLES
// ==========================================

let parteActual = 0;

let estrellas = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const imagenParte =
    document.getElementById(
        "imagenParte"
    );

const palabra =
    document.getElementById(
        "palabra"
    );

const opciones =
    document.getElementById(
        "opciones"
    );

const mensaje =
    document.getElementById(
        "mensaje"
    );

const estrellasElemento =
    document.getElementById(
        "estrellas"
    );

const progreso =
    document.getElementById(
        "progreso"
    );

const botonReiniciar =
    document.getElementById(
        "reiniciar"
    );


// ==========================================
// CARGAR PARTE
// ==========================================

function cargarParte() {

    const parte =
        partes[parteActual];


    bloqueado = false;


    imagenParte.src =
        parte.imagen;

    imagenParte.alt =
        parte.nombre;


    palabra.textContent =
        parte.palabra;


    mensaje.textContent =
        "";


    mensaje.style.color =
        "#333";


    opciones.innerHTML =
        "";


    // Mezclar opciones

    const letras =
        [...parte.opciones]
        .sort(
            () =>
                Math.random() - 0.5
        );


    letras.forEach(
        function(letra) {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                letra;


            boton.onclick =
                function() {

                    comprobarRespuesta(
                        letra
                    );

                };


            opciones.appendChild(
                boton
            );

        }
    );


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Parte ${parteActual + 1} de ${partes.length}`;

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(
    letra
) {

    if (bloqueado) {
        return;
    }


    const parte =
        partes[parteActual];


    // CORRECTA

    if (
        letra === parte.letra
    ) {

        bloqueado = true;


        estrellas++;


        mensaje.textContent =
            "🎉 ¡MUY BIEN! 🎉";


        mensaje.style.color =
            "#4CAF50";


        palabra.textContent =
            parte.nombre;


        estrellasElemento.textContent =
            "⭐".repeat(estrellas);


        setTimeout(
            function() {

                siguienteParte();

            },
            1200
        );

    }


    // INCORRECTA

    else {

        mensaje.textContent =
            "😊 ¡Intenta otra vez!";


        mensaje.style.color =
            "#F44336";

    }

}


// ==========================================
// SIGUIENTE
// ==========================================

function siguienteParte() {

    parteActual++;


    if (
        parteActual >=
        partes.length
    ) {

        terminarJuego();

        return;

    }


    cargarParte();

}


// ==========================================
// FINAL
// ==========================================

function terminarJuego() {

    imagenParte.src =
        "img/cabeza.png";


    palabra.textContent =
        "¡LO LOGRASTE!";


    mensaje.textContent =
        "🏆 ¡Excelente trabajo! 🏆";


    mensaje.style.color =
        "#1565C0";


    opciones.innerHTML =
        "";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Completaste ${partes.length} actividades`;


    botonReiniciar.style.display =
        "inline-block";

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciarJuego() {

    parteActual = 0;

    estrellas = 0;


    botonReiniciar.style.display =
        "none";


    cargarParte();

}


// ==========================================
// INICIAR
// ==========================================

cargarParte();
