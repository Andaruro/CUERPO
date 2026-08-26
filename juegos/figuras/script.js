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
// VARIABLES
// ==========================================

let figuraActualIndex = 0; // Índice de la figura actual (0-5)
let figurasCorrectas = 0;
let intentos = 0;
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
// MOSTRAR PREGUNTA ACTUAL
// ==========================================

function mostrarPregunta() {

    // Verificar si ya completó todas
    if (figuraActualIndex >= figurasDisponibles.length) {
        terminarJuego();
        return;
    }

    bloqueado = false;
    figuraArrastrada = null;

    // Limpiar contenedores
    contenedorFiguras.innerHTML = "";
    contenedorNombres.innerHTML = "";
    mensaje.textContent = "";
    resultado.style.display = "none";

    // Actualizar progreso
    progreso.textContent =
        `Figura ${figuraActualIndex + 1} de ${figurasDisponibles.length}`;

    // Actualizar estrellas
    estrellas.textContent =
        "⭐".repeat(figurasCorrectas);

    // Obtener la figura actual
    const figuraActual = figurasDisponibles[figuraActualIndex];

    // ======================================
    // CREAR FIGURA (solo una)
    // ======================================
    crearFigura(figuraActual);

    // ======================================
    // CREAR NOMBRES (mezclados)
    // ======================================
    const nombresMezclados = mezclar(figurasDisponibles);
    
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


    // Mover la imagen dentro del nombre
    const imagen =
        figura.querySelector(
            "img"
        );


    if (imagen) {

        // Guardamos el nombre
        const nombre =
            destino.textContent;

        // Limpiamos el contenido
        destino.innerHTML = "";

        // Creamos un contenedor para la imagen
        const imagenCorrecta =
            document.createElement("img");

        imagenCorrecta.src =
            imagen.src;

        imagenCorrecta.alt =
            imagen.alt;

        imagenCorrecta.classList.add(
            "imagen-colocada"
        );

        // Volvemos a mostrar el nombre
        const texto =
            document.createElement("span");

        texto.textContent =
            nombre;

        // Añadimos ambos elementos
        destino.appendChild(
            imagenCorrecta
        );

        destino.appendChild(
            texto
        );

    }


    figura.remove();


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
    // PASAR A LA SIGUIENTE FIGURA
    // ======================================

    bloqueado = true;

    // Esperar un momento y pasar a la siguiente
    setTimeout(
        function() {
            figuraActualIndex++;
            mostrarPregunta();
        },
        800
    );

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
        `Completaste las 6 figuras en ${intentos} intentos.`;


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

        figuraActualIndex = 0;
        figurasCorrectas = 0;
        intentos = 0;
        bloqueado = false;

        botonReiniciar.style.display =
            "none";

        botonSiguiente.style.display =
            "inline-block";

        botonSiguiente.textContent =
            "Siguiente ➜";

        mostrarPregunta();

    }
);


// ==========================================
// ELIMINAR BOTÓN "SIGUIENTE"
// ==========================================

// Ocultamos el botón siguiente porque ya no es necesario
botonSiguiente.style.display = "none";


// ==========================================
// INICIAR JUEGO
// ==========================================

mostrarPregunta();
