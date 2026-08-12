// ==========================================
// ANIMALES
// ==========================================

const animales = [

    {
        nombre: "GATO",
        imagen: "img/animales/gato.png",
        palabra: "G_TO",
        letra: "A"
    },

    {
        nombre: "PERRO",
        imagen: "img/animales/perro.png",
        palabra: "P_RRO",
        letra: "E"
    },

    {
        nombre: "PATO",
        imagen: "img/animales/pato.png",
        palabra: "P_TO",
        letra: "A"
    },

    {
        nombre: "VACA",
        imagen: "img/animales/vaca.png",
        palabra: "V_CA",
        letra: "A"
    },

    {
        nombre: "PEZ",
        imagen: "img/animales/pez.png",
        palabra: "P_Z",
        letra: "E"
    },

    {
        nombre: "LEON",
        imagen: "img/animales/leon.png",
        palabra: "L_ON",
        letra: "E"
    },

    {
        nombre: "MONO",
        imagen: "img/animales/mono.png",
        palabra: "M_NO",
        letra: "O"
    },

    {
        nombre: "RANA",
        imagen: "img/animales/rana.png",
        palabra: "R_NA",
        letra: "A"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let animalActual = 0;

let estrellas = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const imagenAnimal =
    document.getElementById("imagenAnimal");

const palabra =
    document.getElementById("palabra");

const mensaje =
    document.getElementById("mensaje");

const estrellasElemento =
    document.getElementById("estrellas");

const progreso =
    document.getElementById("progreso");

const botonReiniciar =
    document.getElementById("reiniciar");


// ==========================================
// CARGAR ANIMAL
// ==========================================

function cargarAnimal() {

    const animal =
        animales[animalActual];


    bloqueado = false;


    imagenAnimal.src =
        animal.imagen;

    imagenAnimal.alt =
        animal.nombre;


    palabra.textContent =
        animal.palabra;


    mensaje.textContent = "";

    mensaje.className =
        "mensaje";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Animal ${animalActual + 1} de ${animales.length}`;

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


        if (tecla.length !== 1) {
            return;
        }


        comprobarRespuesta(tecla);

    }
);


// ==========================================
// COMPROBAR
// ==========================================

function comprobarRespuesta(tecla) {

    const animal =
        animales[animalActual];


    // CORRECTA

    if (tecla === animal.letra) {

        bloqueado = true;


        estrellas++;


        mensaje.textContent =
            "🎉 ¡MUY BIEN! 🎉";

        mensaje.style.color =
            "#4CAF50";


        palabra.textContent =
            animal.nombre;


        palabra.classList.add(
            "correcto"
        );


        estrellasElemento.textContent =
            "⭐".repeat(estrellas);


        setTimeout(
            function() {

                palabra.classList.remove(
                    "correcto"
                );

                siguienteAnimal();

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
// SIGUIENTE
// ==========================================

function siguienteAnimal() {

    animalActual++;


    if (
        animalActual >=
        animales.length
    ) {

        terminarJuego();

        return;

    }


    cargarAnimal();

}


// ==========================================
// FINAL
// ==========================================

function terminarJuego() {

    imagenAnimal.src =
        "img/animales/final.png";


    imagenAnimal.alt =
        "Felicitaciones";


    palabra.textContent =
        "¡LO LOGRASTE!";


    mensaje.textContent =
        "🏆 ¡Excelente trabajo! 🏆";


    mensaje.style.color =
        "#1976D2";


    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    progreso.textContent =
        `Completaste ${animales.length} animales`;


    botonReiniciar.style.display =
        "inline-block";

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciarJuego() {

    animalActual = 0;

    estrellas = 0;


    botonReiniciar.style.display =
        "none";


    cargarAnimal();

}


// ==========================================
// INICIAR
// ==========================================

cargarAnimal();
