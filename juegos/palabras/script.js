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
// IMÁGENES DE LAS PALABRAS
// ==========================================
//
// Las imágenes deben estar dentro de:
//
// imagenes/
//
// Ejemplo:
//
// imagenes/juego.png
// imagenes/familia.png
// imagenes/mascota.png
//
// ==========================================

const imagenesPalabras = {

    "JUEGO":
        "imagenes/juego.png",

    "FAMILIA":
        "imagenes/familia.png",

    "MASCOTA":
        "imagenes/mascota.png",

    "CUERPO":
        "imagenes/cuerpo.png",

    "DIENTE":
        "imagenes/diente.png",

    "SILLA":
        "imagenes/silla.png",

    "MANZANA":
        "imagenes/manzana.png",

    "SOL":
        "imagenes/sol.png",

    "PLATO":
        "imagenes/plato.png",

    "TENEDOR":
        "imagenes/tenedor.png",

    "PELOTA":
        "imagenes/pelota.png",

    "GAFAS":
        "imagenes/gafas.png",

    "LIBRO":
        "imagenes/libro.png",

    "ROPA":
        "imagenes/ropa.png",

    "CARRO":
        "imagenes/carro.png",

    "PRINCESA":
        "imagenes/princesa.png",

    "COMPUTADORA":
        "imagenes/computadora.png",

    "CELULAR":
        "imagenes/celular.png",

    "JARRÓN":
        "imagenes/jarron.png",

    "TABLERO":
        "imagenes/tablero.png"

};


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

const imagenPalabra =
    document.getElementById(
        "imagenPalabra"
    );


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


const botonSiguiente =
    document.getElementById(
        "siguiente"
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


    // Mostrar imagen

    mostrarImagenPalabra();


    // Mostrar letras desordenadas

    mostrarLetrasDesordenadas(
        palabraActualTexto
    );


    // Crear primera fila

    crearFilaActual();


    mensaje.textContent =
        "⌨️ Escribe las letras en orden";


    mensaje.style.color =
        "#333";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Palabra ${palabraActual + 1} de ${palabras.length}`;


    // Ocultar resultado

    resultado.style.display =
        "none";


    checkpoint.style.display =
        "none";


    botonReiniciar.style.display =
        "none";


    botonSiguiente.style.display =
        "inline-block";

}


// ==========================================
// MOSTRAR IMAGEN
// ==========================================

function mostrarImagenPalabra() {

    const palabraCorrecta =
        palabras[palabraActual];


    const rutaImagen =
        imagenesPalabras[
            palabraCorrecta
        ];


    imagenPalabra.innerHTML =
        "";


    if (!rutaImagen) {

        return;

    }


    const imagen =
        document.createElement(
            "img"
        );


    imagen.src =
        rutaImagen;


    imagen.alt =
        `Imagen de ${palabraCorrecta}`;


    imagen.classList.add(
        "imagen-palabra-img"
    );


    // Si la imagen no existe

    imagen.onerror =
        function() {

            imagen.style.display =
                "none";

        };


    imagenPalabra.appendChild(
        imagen
    );

}


// ==========================================
// DESORDENAR LETRAS
// ==========================================

function mostrarLetrasDesordenadas(texto) {

    letrasDesordenadas.innerHTML =
        "";


    const letras =
        texto.split("");


    // Mezclar letras

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


    palabra.innerHTML =
        "";


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


    // ======================================
    // PALABRA COMPLETA
    // ======================================

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
        // SOLO LETRAS
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


    // No permitir más letras

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


    letrasEscritas +=
        letra;


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


    // ======================================
    // SI FALTAN LETRAS
    // ======================================

    if (
        letrasEscritas.length <
        palabraCorrecta.length
    ) {

        const faltan =
            palabraCorrecta.length -
            letrasEscritas.length;


        mensaje.textContent =
            `⚠️ Faltan ${faltan} letras`;


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


    // ======================================
    // ENTER = 1 INTENTO
    // ======================================

    intentos++;


    // Evaluar colores

    evaluarIntento(
        letrasEscritas,
        palabraCorrecta
    );


    // ======================================
    // CORRECTA
    // ======================================

    if (
        letrasEscritas ===
        palabraCorrecta
    ) {

        completarPalabra();


        return;

    }


    // ======================================
    // INCORRECTA
    // ======================================

    mensaje.textContent =
        "😊 ¡Mira los colores e inténtalo otra vez!";


    mensaje.style.color =
        "#F44336";


    // Nueva fila

    crearNuevaFila();


    // Vaciar letras para nuevo intento

    letrasEscritas =
        "";

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
        palabraCorrecta.split("");


    const resultadoLetras =
        [];


    // ======================================
    // PRIMERA PASADA
    // VERDES
    // ======================================

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


    // ======================================
    // SEGUNDA PASADA
    // AMARILLO / GRIS
    // ======================================

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


    // ======================================
    // APLICAR COLORES
    // ======================================

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


    // Esta fila ya no es editable

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


    letrasDesordenadas.innerHTML =
        "";


    imagenPalabra.innerHTML =
        "";


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


    botonSiguiente.style.display =
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


    botonSiguiente.style.display =
        "inline-block";


    cargarPalabra();

}


// ==========================================
// INICIAR
// ==========================================

cargarPalabra();
