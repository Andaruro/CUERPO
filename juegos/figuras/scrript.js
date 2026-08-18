// ==========================================
// FIGURAS
// ==========================================

const figuras = [

    {
        nombre: "CÍRCULO",
        imagen: "img/circulo.png"
    },

    {
        nombre: "CUADRADO",
        imagen: "img/cuadrado.png"
    },

    {
        nombre: "TRIÁNGULO",
        imagen: "img/triangulo.png"
    },

    {
        nombre: "RECTÁNGULO",
        imagen: "img/rectangulo.png"
    },

    {
        nombre: "ÓVALO",
        imagen: "img/ovalo.png"
    },

    {
        nombre: "ROMBO",
        imagen: "img/rombo.png"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let figuraActual = 0;

let intentos = 0;

let aciertos = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const nombreFigura =
    document.getElementById(
        "nombreFigura"
    );


const contenedorFiguras =
    document.getElementById(
        "figuras"
    );


const mensaje =
    document.getElementById(
        "mensaje"
    );


const estrellas =
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


const resultadoIntentos =
    document.getElementById(
        "resultadoIntentos"
    );


const botonReiniciar =
    document.getElementById(
        "reiniciar"
    );


// ==========================================
// CARGAR FIGURA
// ==========================================

function cargarFigura() {

    bloqueado = false;

    intentos = 0;


    const figura =
        figuras[figuraActual];


    nombreFigura.textContent =
        figura.nombre;


    mensaje.textContent =
        "";


    estrellas.textContent =
        "⭐".repeat(aciertos);


    progreso.textContent =
        `Figura ${figuraActual + 1} de ${figuras.length}`;


    resultado.style.display =
        "none";


    contenedorFiguras.innerHTML =
        "";


    crearOpciones();

}


// ==========================================
// CREAR OPCIONES
// ==========================================

function crearOpciones() {

    let opciones = [...figuras];


    // Mezclar las opciones

    for (
        let i = opciones.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            opciones[i],
            opciones[j]
        ] = [
            opciones[j],
            opciones[i]
        ];

    }


    opciones.forEach(
        function(figura) {

            const tarjeta =
                document.createElement(
                    "div"
                );


            tarjeta.classList.add(
                "figura"
            );


            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                figura.imagen;


            imagen.alt =
                figura.nombre;


            tarjeta.appendChild(
                imagen
            );


            tarjeta.addEventListener(
                "click",
                function() {

                    comprobarFigura(
                        figura,
                        tarjeta
                    );

                }
            );


            contenedorFiguras.appendChild(
                tarjeta
            );

        }
    );

}


// ==========================================
// COMPROBAR FIGURA
// ==========================================

function comprobarFigura(
    figura,
    tarjeta
) {

    if (bloqueado) {
        return;
    }


    intentos++;


    const correcta =
        figuras[figuraActual];


    // ======================================
    // CORRECTA
    // ======================================

    if (
        figura.nombre ===
        correcta.nombre
    ) {

        bloqueado = true;


        tarjeta.classList.add(
            "correcta"
        );


        aciertos++;


        estrellas.textContent =
            "⭐".repeat(aciertos);


        mensaje.textContent =
            "🎉 ¡MUY BIEN! 🎉";


        mensaje.style.color =
            "#4CAF50";


        mostrarResultado();

    }


    // ======================================
    // INCORRECTA
    // ======================================

    else {

        tarjeta.classList.add(
            "incorrecta"
        );


        mensaje.textContent =
            "😊 ¡Intenta otra vez!";


        mensaje.style.color =
            "#F44336";


        setTimeout(
            function() {

                tarjeta.classList.remove(
                    "incorrecta"
                );

            },
            400
        );

    }

}


// ==========================================
// RESULTADO
// ==========================================

function mostrarResultado() {

    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🎉 ¡Muy bien!";


    resultadoIntentos.textContent =
        `Intentos: ${intentos}`;

}


// ==========================================
// SIGUIENTE FIGURA
// ==========================================

function siguienteFigura() {

    figuraActual++;


    if (
        figuraActual >=
        figuras.length
    ) {

        terminarJuego();

        return;

    }


    cargarFigura();

}


// ==========================================
// TERMINAR
// ==========================================

function terminarJuego() {

    bloqueado = true;


    contenedorFiguras.innerHTML =
        "";


    nombreFigura.textContent =
        "🏆 ¡LO LOGRASTE!";


    mensaje.textContent =
        "¡Completaste todas las figuras!";


    mensaje.style.color =
        "#1976D2";


    estrellas.textContent =
        "⭐".repeat(aciertos);


    progreso.textContent =
        `Completaste ${figuras.length} figuras`;


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🏆 ¡Excelente trabajo!";


    resultadoIntentos.textContent =
        `Figuras correctas: ${aciertos}`;


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

    figuraActual = 0;

    intentos = 0;

    aciertos = 0;


    botonReiniciar.style.display =
        "none";


    document.getElementById(
        "siguiente"
    ).style.display =
        "inline-block";


    cargarFigura();

}


// ==========================================
// INICIAR
// ==========================================

cargarFigura();
