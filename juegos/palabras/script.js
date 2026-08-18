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


    // Crear la primera fila de letras

    crearFilaActual();


    mensaje.textContent =
        "⌨️ Escribe las letras en orden";


    mensaje.style.color =
        "#333";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Palabra ${palabraActual + 1} de ${palabras.length}`;


    // Ocultar menú de resultado

    resultado.style.display =
        "none";


    checkpoint.style.display =
        "none";


    botonReiniciar.style.display =
        "none";

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
// CREAR FILA ACTUAL
// ==========================================

function crearFilaActual() {

    const palabraCorrecta =
        palabras[palabraActual];


    const fila =
        document.createElement(
            "div"
        );


    fila.classList.add(
        "fila-palabra",
        "fila-actual"
    );


    for (
        let i = 0;
        i < palabraCorrecta.length;
        i++
    ) {

        const casilla =
            document.createElement(
                "span"
            );


        casilla.classList.add(
            "casilla-letra"
        );


        fila.appendChild(
            casilla
        );

    }


    palabra.innerHTML = "";


    palabra.appendChild(
        fila
    );

}


// ==========================================
// ACTUALIZAR FILA ACTUAL
// ==========================================

function actualizarFilaActual() {

    const fila =
        palabra.querySelector(
            ".fila-actual"
        );


    if (!fila) {
        return;
    }


    const casillas =
        fila.querySelectorAll(
            ".casilla-letra"
        );


    casillas.forEach(
        function(casilla, indice) {

            casilla.textContent =
                letrasEscritas[indice] || "";

        }
    );


    // Cuando ya están todas las letras

    if (
        letrasEscritas.length ===
        palabras[palabraActual].length
    ) {

        mensaje.textContent =
            "↵ Presiona ENTER para comprobar";

        mensaje.style.color =
            "#1565c0";

    }
    else {

        mensaje.textContent =
            "⌨️ Escribe las letras en orden";

        mensaje.style.color =
            "#333";

    }

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


        // ==================================
        // ENTER
        // ==================================

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            comprobarPalabra();

            return;

        }


        // ==================================
        // BACKSPACE
        // ==================================

        if (
            event.key === "Backspace"
        ) {

            event.preventDefault();

            borrarLetra();

            return;

        }


        // ==================================
        // SOLO ACEPTAR LETRAS
        // ==================================

        if (
            tecla.length !== 1 ||
            !/^[A-ZÁÉÍÓÚÜÑ]$/.test(tecla)
        ) {

            return;

        }


        agregarLetra(tecla);

    }
);


// ==========================================
// AGREGAR LETRA
// ==========================================

function agregarLetra(letra) {

    const palabraCorrecta =
        palabras[palabraActual];


    // No permitir más letras de las necesarias

    if (
        letrasEscritas.length >=
        palabraCorrecta.length
    ) {

        mensaje.textContent =
            "↵ Presiona ENTER para comprobar";

        mensaje.style.color =
            "#1565c0";

        return;

    }


    letrasEscritas += letra;


    actualizarFilaActual();

}


// ==========================================
// BORRAR LETRA
// ==========================================

function borrarLetra() {

    if (
        letrasEscritas.length === 0
    ) {

        return;

    }


    letrasEscritas =
        letrasEscritas.slice(
            0,
            -1
        );


    actualizarFilaActual();

}


// ==========================================
// COMPROBAR PALABRA
// ==========================================

function comprobarPalabra() {

    const palabraCorrecta =
        palabras[palabraActual];


    // ==================================
    // NO ESTÁ COMPLETA
    // ==================================

    if (
        letrasEscritas.length <
        palabraCorrecta.length
    ) {

        mensaje.textContent =
            `⚠️ Faltan ${
                palabraCorrecta.length -
                letrasEscritas.length
            } letras`;

        mensaje.style.color =
            "#F44336";


        const fila =
            palabra.querySelector(
                ".fila-actual"
            );


        if (fila) {

            fila.classList.add(
                "error"
            );


            setTimeout(
                function() {

                    fila.classList.remove(
                        "error"
                    );

                },
                400
            );

        }


        return;

    }


    // ==================================
    // ENTER CUENTA COMO INTENTO
    // ==================================

    intentos++;


    // ==================================
    // EVALUAR LETRAS
    // ==================================

    evaluarIntento(
        letrasEscritas,
        palabraCorrecta
    );


    // ==================================
    // PALABRA CORRECTA
    // ==================================

    if (
        letrasEscritas ===
        palabraCorrecta
    ) {

        completarPalabra();

        return;

    }


    // ==================================
    // PALABRA INCORRECTA
    // ==================================

    mensaje.textContent =
        "😊 ¡Mira los colores e inténtalo otra vez!";

    mensaje.style.color =
        "#F44336";


    // Crear una nueva fila

    crearNuevaFila();


    letrasEscritas = "";

}


// ==========================================
// EVALUAR INTENTO
// ==========================================

function evaluarIntento(
    intento,
    palabraCorrecta
) {

    const fila =
        palabra.querySelector(
            ".fila-actual"
        );


    if (!fila) {
        return;
    }


    const casillas =
        fila.querySelectorAll(
            ".casilla-letra"
        );


    const letrasDisponibles =
        palabraCorrecta
            .split("");


    const resultadoLetras =
        [];


    // ==================================
    // PRIMERA PASADA
    // LETRAS VERDES
    // ==================================

    for (
        let i = 0;
        i < intento.length;
        i++
    ) {

        if (
            intento[i] ===
            palabraCorrecta[i]
        ) {

            resultadoLetras[i] =
                "correcta";


            letrasDisponibles[i] =
                null;

        }

    }


    // ==================================
    // SEGUNDA PASADA
    // AMARILLAS Y GRISES
    // ==================================

    for (
        let i = 0;
        i < intento.length;
        i++
    ) {

        if (
            resultadoLetras[i] ===
            "correcta"
        ) {

            continue;

        }


        const posicion =
            letrasDisponibles.indexOf(
                intento[i]
            );


        if (
            posicion !== -1
        ) {

            resultadoLetras[i] =
                "presente";


            letrasDisponibles[posicion] =
                null;

        }
        else {

            resultadoLetras[i] =
                "incorrecta";

        }

    }


    // ==================================
    // APLICAR COLORES
    // ==================================

    casillas.forEach(
        function(casilla, indice) {

            if (
                resultadoLetras[indice] ===
                "correcta"
            ) {

                casilla.classList.add(
                    "letra-verde"
                );

            }
            else if (
                resultadoLetras[indice] ===
                "presente"
            ) {

                casilla.classList.add(
                    "letra-amarilla"
                );

            }
            else {

                casilla.classList.add(
                    "letra-gris"
                );

            }

        }
    );


    fila.classList.remove(
        "fila-actual"
    );

}


// ==========================================
// CREAR NUEVA FILA
// ==========================================

function crearNuevaFila() {

    const palabraCorrecta =
        palabras[palabraActual];


    const fila =
        document.createElement(
            "div"
        );


    fila.classList.add(
        "fila-palabra",
        "fila-actual"
    );


    for (
        let i = 0;
        i < palabraCorrecta.length;
        i++
    ) {

        const casilla =
            document.createElement(
                "span"
            );


        casilla.classList.add(
            "casilla-letra"
        );


        fila.appendChild(
            casilla
        );

    }


    palabra.appendChild(
        fila
    );

}


// ==========================================
// COMPLETAR PALABRA
// ==========================================

function completarPalabra() {

    bloqueado = true;


    const palabraCorrecta =
        palabras[palabraActual];


    letrasEscritas =
        palabraCorrecta;


    mensaje.textContent =
        "🎉 ¡MUY BIEN! 🎉";


    mensaje.style.color =
        "#4CAF50";


    estrellas++;


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


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


    // ==================================
    // CHECKPOINT
    // ==================================

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


    // ==================================
    // TERMINAR
    // ==================================

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


    palabra.innerHTML =
        "";


    const mensajeFinal =
        document.createElement(
            "div"
        );


    mensajeFinal.classList.add(
        "mensaje-final-palabra"
    );


    mensajeFinal.textContent =
        "¡LO LOGRASTE!";


    palabra.appendChild(
        mensajeFinal
    );


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
