// ==========================================
// PALABRAS
// ==========================================

const palabras = [

    "JUEGO",
    "FAMILIA",
    "MASCOTA",
    "CUERPO",
    "DIENTE",

    "SILLA",
    "MANZANA",
    "SOL",
    "PLATO",
    "TENEDOR",

    "PELOTA",
    "GAFAS",
    "LIBRO",
    "ROPA",
    "CARRO",

    "PRINCESA",
    "COMPUTADORA",
    "CELULAR",
    "JARRÓN",
    "TABLERO"

];


// ==========================================
// VARIABLES
// ==========================================

let palabraActual = 0;

let letrasEscritas = "";

let estrellas = 0;

let intentos = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const letrasDesordenadas =
    document.getElementById(
        "letrasDesordenadas"
    );


const palabra =
    document.getElementById(
        "palabra"
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


const resultado =
    document.getElementById(
        "resultado"
    );


const resultadoTitulo =
    document.getElementById(
        "resultadoTitulo"
    );


const resultadoPalabra =
    document.getElementById(
        "resultadoPalabra"
    );


const resultadoIntentos =
    document.getElementById(
        "resultadoIntentos"
    );


const checkpoint =
    document.getElementById(
        "checkpoint"
    );


const botonReiniciar =
    document.getElementById(
        "reiniciar"
    );


// ==========================================
// CARGAR PALABRA
// ==========================================

function cargarPalabra() {

    bloqueado = false;

    letrasEscritas = "";

    intentos = 0;


    const palabraActualTexto =
        palabras[palabraActual];


    mostrarLetrasDesordenadas(
        palabraActualTexto
    );


    palabra.textContent = "";


    mensaje.textContent = "";


    mensaje.style.color = "#333";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Palabra ${palabraActual + 1} de ${palabras.length}`;


    // Ocultar menú de resultado

    resultado.style.display = "none";


    checkpoint.style.display = "none";

}


// ==========================================
// DESORDENAR LETRAS
// ==========================================

function mostrarLetrasDesordenadas(texto) {

    letrasDesordenadas.innerHTML = "";


    const letras =
        texto.split("");


    // Mezclar las letras

    for (
        let i = letras.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            letras[i],
            letras[j]
        ] = [
            letras[j],
            letras[i]
        ];

    }


    letras.forEach(
        function(letra) {

            const elemento =
                document.createElement(
                    "span"
                );


            elemento.textContent =
                letra;


            letrasDesordenadas.appendChild(
                elemento
            );

        }
    );

}


// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (bloqueado) {
            return;
        }


        const tecla =
            event.key.toUpperCase();


        // Solo aceptar letras

        if (
            tecla.length !== 1 ||
            !/^[A-ZÁÉÍÓÚÑ]$/.test(tecla)
        ) {

            return;

        }


        comprobarLetra(tecla);

    }
);


// ==========================================
// COMPROBAR LETRA
// ==========================================

function comprobarLetra(letra) {

    const palabraCorrecta =
        palabras[palabraActual];


    const posicion =
        letrasEscritas.length;


    const letraCorrecta =
        palabraCorrecta[posicion];


    // Contar intento

    intentos++;


    // ======================================
    // LETRA CORRECTA
    // ======================================

    if (
        letra === letraCorrecta
    ) {

        letrasEscritas += letra;


        palabra.textContent =
            letrasEscritas;


        palabra.classList.add(
            "correcto"
        );


        setTimeout(
            function() {

                palabra.classList.remove(
                    "correcto"
                );

            },
            300
        );


        mensaje.textContent =
            "👍 ¡Muy bien!";


        mensaje.style.color =
            "#4CAF50";


        // ==================================
        // PALABRA COMPLETA
        // ==================================

        if (
            letrasEscritas ===
            palabraCorrecta
        ) {

            completarPalabra();

        }

    }


    // ======================================
    // LETRA INCORRECTA
    // ======================================

    else {

        mensaje.textContent =
            "😊 ¡Intenta otra vez!";


        mensaje.style.color =
            "#F44336";


        palabra.classList.add(
            "error"
        );


        setTimeout(
            function() {

                palabra.classList.remove(
                    "error"
                );

            },
            400
        );

    }

}


// ==========================================
// COMPLETAR PALABRA
// ==========================================

function completarPalabra() {

    bloqueado = true;


    const palabraCorrecta =
        palabras[palabraActual];


    palabra.textContent =
        palabraCorrecta;


    palabra.classList.add(
        "correcto"
    );


    estrellas++;


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    mensaje.textContent =
        "🎉 ¡MUY BIEN! 🎉";


    mensaje.style.color =
        "#4CAF50";


    // Mostrar menú

    mostrarResultado();

}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado() {

    const numeroPalabra =
        palabraActual + 1;


    const palabraCorrecta =
        palabras[palabraActual];


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🎉 ¡Muy bien!";


    resultadoPalabra.textContent =
        `Completaste: ${palabraCorrecta}`;


    resultadoIntentos.textContent =
        `Intentos: ${intentos}`;


    // ======================================
    // CHECKPOINT
    // ======================================

    if (
        numeroPalabra === 10
    ) {

        checkpoint.style.display =
            "block";


        checkpoint.innerHTML =
            `
            🌟 ¡VAS POR LA MITAD! 🌟
            <br>
            Has completado 10 de 20 palabras.
            `;

    }

}


// ==========================================
// SIGUIENTE PALABRA
// ==========================================

function siguientePalabra() {

    palabra.classList.remove(
        "correcto"
    );


    palabraActual++;


    // ======================================
    // TERMINAR
    // ======================================

    if (
        palabraActual >=
        palabras.length
    ) {

        terminarJuego();

        return;

    }


    cargarPalabra();

}


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    bloqueado = true;


    letrasDesordenadas.innerHTML = "";


    palabra.textContent =
        "¡LO LOGRASTE!";


    mensaje.textContent =
        "🏆 ¡Excelente trabajo! 🏆";


    mensaje.style.color =
        "#1976D2";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Completaste las ${palabras.length} palabras`;


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🏆 ¡JUEGO COMPLETADO!";


    resultadoPalabra.textContent =
        "¡Terminaste las 20 palabras!";


    resultadoIntentos.textContent =
        `⭐ Palabras completadas: ${estrellas}`;


    checkpoint.style.display =
        "none";


    document.getElementById(
        "siguiente"
    ).style.display =
        "none";


    botonReiniciar.style.display =
        "inline-block";

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciarJuego() {

    palabraActual = 0;

    letrasEscritas = "";

    estrellas = 0;

    intentos = 0;


    botonReiniciar.style.display =
        "none";


    document.getElementById(
        "siguiente"
    ).style.display =
        "inline-block";


    cargarPalabra();

}


// ==========================================
// INICIAR
// ==========================================

cargarPalabra();
