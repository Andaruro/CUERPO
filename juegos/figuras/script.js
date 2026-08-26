// ==========================================
// FIGURAS DISPONIBLES
// ==========================================

const figurasDisponibles = [

    {
        id: "circulo",
        nombre: "CÍRCULO",
        imagen: "img/circulo.png"
    },

    {
        id: "cuadrado",
        nombre: "CUADRADO",
        imagen: "img/cuadrado.png"
    },

    {
        id: "triangulo",
        nombre: "TRIÁNGULO",
        imagen: "img/triangulo.png"
    },

    {
        id: "rectangulo",
        nombre: "RECTÁNGULO",
        imagen: "img/rectangulo.png"
    },

    {
        id: "ovalo",
        nombre: "ÓVALO",
        imagen: "img/ovalo.png"
    },

    {
        id: "rombo",
        nombre: "ROMBO",
        imagen: "img/rombo.png"
    }

];


// ==========================================
// CONFIGURACIÓN
// ==========================================

const TOTAL_RONDAS = 10;

const FIGURAS_POR_RONDA = 5;


// ==========================================
// VARIABLES
// ==========================================

let rondaActual = 1;

let figurasRonda = [];

let figurasCorrectas = 0;

let intentos = 0;

let colocadas = 0;

let bloqueado = false;

let figuraArrastrada = null;


// ==========================================
// ELEMENTOS
// ==========================================

const contenedorFiguras =
    document.getElementById(
        "figuras"
    );


const contenedorNombres =
    document.getElementById(
        "nombres"
    );


const progreso =
    document.getElementById(
        "progreso"
    );


const estrellas =
    document.getElementById(
        "estrellas"
    );


const mensaje =
    document.getElementById(
        "mensaje"
    );


const resultado =
    document.getElementById(
        "resultado"
    );


const resultadoTitulo =
    document.getElementById(
        "resultadoTitulo"
    );


const resultadoIntentos =
    document.getElementById(
        "resultadoIntentos"
    );


const botonSiguiente =
    document.getElementById(
        "siguiente"
    );


const botonReiniciar =
    document.getElementById(
        "reiniciar"
    );


// ==========================================
// MEZCLAR ARRAY
// ==========================================

function mezclar(array) {

    const copia =
        [...array];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
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
// CREAR RONDA
// ==========================================

function crearRonda() {

    bloqueado = false;

    intentos = 0;

    colocadas = 0;

    figuraArrastrada = null;


    // Elegir 5 de las 6 figuras

    figurasRonda =
        mezclar(
            figurasDisponibles
        ).slice(
            0,
            FIGURAS_POR_RONDA
        );


    mostrarRonda();

}


// ==========================================
// MOSTRAR RONDA
// ==========================================

function mostrarRonda() {

    contenedorFiguras.innerHTML = "";

    contenedorNombres.innerHTML = "";

    mensaje.textContent = "";

    resultado.style.display = "none";


    progreso.textContent =
        `Ronda ${rondaActual} de ${TOTAL_RONDAS}`;


    estrellas.textContent =
        "⭐".repeat(figurasCorrectas);


    // ======================================
    // CREAR FIGURAS
    // ======================================

    const figurasMezcladas =
        mezclar(
            figurasRonda
        );


    figurasMezcladas.forEach(
        function(figura) {

            crearFigura(figura);

        }
    );


    // ======================================
    // CREAR NOMBRES
    // ======================================

    const nombresMezclados =
        mezclar(
            figurasRonda
        );


    nombresMezclados.forEach(
        function(figura) {

            crearNombre(figura);

        }
    );

}


// ==========================================
// CREAR FIGURA
// ==========================================

function crearFigura(figura) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.classList.add(
        "figura"
    );


    elemento.dataset.id =
        figura.id;


    elemento.setAttribute(
        "aria-label",
        figura.nombre
    );


    const imagen =
        document.createElement(
            "img"
        );


    imagen.src =
        figura.imagen;


    imagen.alt =
        figura.nombre;


    elemento.appendChild(
        imagen
    );


    // ======================================
    // POINTER DOWN
    // ======================================

    elemento.addEventListener(
        "pointerdown",
        iniciarArrastre
    );


    contenedorFiguras.appendChild(
        elemento
    );

}


// ==========================================
// CREAR NOMBRE
// ==========================================

function crearNombre(figura) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.classList.add(
        "nombre"
    );


    elemento.dataset.id =
        figura.id;


    elemento.textContent =
        figura.nombre;


    // ======================================
    // POINTER EVENTS
    // ======================================

    elemento.addEventListener(
        "pointerenter",
        function() {

            if (
                figuraArrastrada &&
                !elemento.classList.contains(
                    "correcto"
                )
            ) {

                elemento.classList.add(
                    "hover"
                );

            }

        }
    );


    elemento.addEventListener(
        "pointerleave",
        function() {

            elemento.classList.remove(
                "hover"
            );

        }
    );


    elemento.addEventListener(
        "pointerup",
        finalizarArrastre
    );


    contenedorNombres.appendChild(
        elemento
    );

}


// ==========================================
// INICIAR ARRASTRE
// ==========================================

function iniciarArrastre(event) {

    if (bloqueado) {
        return;
    }


    const elemento =
        event.currentTarget;


    figuraArrastrada =
        elemento;


    elemento.setPointerCapture(
        event.pointerId
    );


    elemento.style.transform =
        "scale(1.08)";


    elemento.style.zIndex =
        "100";


    mensaje.textContent =
        "👆 ¡Llévala a su nombre!";


    mensaje.style.color =
        "#1565c0";

}


// ==========================================
// FINALIZAR ARRASTRE
// ==========================================

function finalizarArrastre(event) {

    if (
        bloqueado ||
        !figuraArrastrada
    ) {

        return;

    }


    const destino =
        event.currentTarget;


    destino.classList.remove(
        "hover"
    );


    const idFigura =
        figuraArrastrada.dataset.id;


    const idDestino =
        destino.dataset.id;


    intentos++;


    // ======================================
    // CORRECTO
    // ======================================

    if (
        idFigura === idDestino
    ) {

        colocarCorrectamente(
            figuraArrastrada,
            destino
        );

    }


    // ======================================
    // INCORRECTO
    // ======================================

    else {

        respuestaIncorrecta(
            destino
        );

    }


    figuraArrastrada.style.transform =
        "";

    figuraArrastrada.style.zIndex =
        "";


    figuraArrastrada = null;

}


// ==========================================
// RESPUESTA CORRECTA
// ==========================================

function colocarCorrectamente(
    figura,
    destino
) {

    destino.classList.add(
        "correcto"
    );


    // Mover la imagen dentro
    // del nombre

    const imagen =
        figura.querySelector(
            "img"
        );


    if (imagen) {

        destino.innerHTML = "";

        destino.appendChild(
            imagen
        );

    }


    figura.remove();


    colocadas++;

    figurasCorrectas++;


    estrellas.textContent =
        "⭐".repeat(
            figurasCorrectas
        );


    mensaje.textContent =
        "🎉 ¡Muy bien!";


    mensaje.style.color =
        "#4CAF50";


    // ======================================
    // RONDA COMPLETADA
    // ======================================

    if (
        colocadas ===
        figurasRonda.length
    ) {

        finalizarRonda();

    }

}


// ==========================================
// RESPUESTA INCORRECTA
// ==========================================

function respuestaIncorrecta(
    destino
) {

    destino.classList.add(
        "incorrecto"
    );


    mensaje.textContent =
        "😊 ¡Intenta otra vez!";


    mensaje.style.color =
        "#F44336";


    setTimeout(
        function() {

            destino.classList.remove(
                "incorrecto"
            );

        },
        400
    );

}


// ==========================================
// FINALIZAR RONDA
// ==========================================

function finalizarRonda() {

    bloqueado = true;


    mensaje.textContent =
        "🌟 ¡Completaste la ronda! 🌟";


    mensaje.style.color =
        "#4CAF50";


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🎉 ¡Muy bien!";


    resultadoIntentos.textContent =
        `Intentos: ${intentos}`;


    // Última ronda

    if (
        rondaActual ===
        TOTAL_RONDAS
    ) {

        botonSiguiente.textContent =
            "🏆 Terminar";

    }

}


// ==========================================
// SIGUIENTE RONDA
// ==========================================

botonSiguiente.addEventListener(
    "click",
    function() {

        if (
            rondaActual >=
            TOTAL_RONDAS
        ) {

            terminarJuego();

            return;

        }


        rondaActual++;

        crearRonda();

    }
);


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    bloqueado = true;


    contenedorFiguras.innerHTML =
        "";


    contenedorNombres.innerHTML =
        "";


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🏆 ¡Excelente trabajo!";


    resultadoIntentos.textContent =
        `Completaste ${TOTAL_RONDAS} rondas.`;


    mensaje.textContent =
        "🎉 ¡Terminaste el juego! 🎉";


    mensaje.style.color =
        "#1565c0";


    progreso.textContent =
        "¡Juego completado!";


    botonSiguiente.style.display =
        "none";


    botonReiniciar.style.display =
        "inline-block";


    estrellas.textContent =
        "⭐".repeat(
            figurasCorrectas
        );

}


// ==========================================
// REINICIAR
// ==========================================

botonReiniciar.addEventListener(
    "click",
    function() {

        rondaActual = 1;

        figurasCorrectas = 0;

        intentos = 0;

        colocadas = 0;

        botonReiniciar.style.display =
            "none";


        botonSiguiente.style.display =
            "inline-block";


        botonSiguiente.textContent =
            "Siguiente ➜";


        crearRonda();

    }
);


// ==========================================
// INICIAR JUEGO
// ==========================================

crearRonda();
