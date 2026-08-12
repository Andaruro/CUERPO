// ==========================================
// ANIMALES
// ==========================================

const animales = [
    {
        nombre: "GATO",
        imagen: "img/gato.png"
    },

    {
        nombre: "PERRO",
        imagen: "img/perro.png"
    },

    {
        nombre: "PATO",
        imagen: "img/pato.png"
    },

    {
        nombre: "VACA",
        imagen: "img/vaca.png"
    },

    {
        nombre: "PEZ",
        imagen: "img/pez.png"
    },

    {
        nombre: "LEON",
        imagen: "img/leon.png"
    },

    {
        nombre: "MONO",
        imagen: "img/mono.png"
    },

    {
        nombre: "RANA",
        imagen: "img/rana.png"
    }
];


// ==========================================
// VOCALES
// ==========================================

const vocales = ["A", "E", "I", "O", "U"];


// ==========================================
// VARIABLES
// ==========================================

let animalActual = 0;

let vocalesEncontradas = [];

let estrellas = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS
// ==========================================

const imagenAnimal = document.getElementById("imagenAnimal");

const palabra = document.getElementById("palabra");

const teclas = document.getElementById("teclas");

const mensaje = document.getElementById("mensaje");

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

    const animal = animales[animalActual];

    bloqueado = false;

    vocalesEncontradas = [];


    // Imagen

    imagenAnimal.src = animal.imagen;

    imagenAnimal.alt = animal.nombre;


    // Palabra

    actualizarPalabra();


    // Vocales visuales

    crearVocales();


    // Mensaje

    mensaje.textContent = "";


    // Estrellas

    estrellasElemento.textContent =
        "⭐".repeat(estrellas);


    // Progreso

    progreso.textContent =
        `Animal ${animalActual + 1} de ${animales.length}`;
}


// ==========================================
// MOSTRAR PALABRA
// ==========================================

function actualizarPalabra() {

    const animal = animales[animalActual];

    let resultado = "";


    for (let letra of animal.nombre) {

        if (
            esVocal(letra) &&
            !vocalesEncontradas.includes(letra)
        ) {

            resultado += "_";

        } else {

            resultado += letra;

        }
    }


    palabra.textContent = resultado;
}


// ==========================================
// COMPROBAR VOCAL
// ==========================================

function esVocal(letra) {

    return vocales.includes(letra);
}


// ==========================================
// CREAR VOCALES
// ==========================================

function crearVocales() {

    teclas.innerHTML = "";


    vocales.forEach(function(vocal) {

        const boton =
            document.createElement("button");


        boton.textContent = vocal;


        // No se puede hacer clic

        boton.disabled = true;


        teclas.appendChild(boton);

    });
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


        // Solo aceptar vocales

        if (!vocales.includes(tecla)) {
            return;
        }


        comprobarVocal(tecla);

    }
);


// ==========================================
// COMPROBAR VOCAL
// ==========================================

function comprobarVocal(vocal) {

    const animal = animales[animalActual];


    // Si ya fue introducida

    if (
        vocalesEncontradas.includes(vocal)
    ) {

        return;

    }


    // La vocal existe

    if (
        animal.nombre.includes(vocal)
    ) {

        vocalesEncontradas.push(vocal);


        actualizarPalabra();


        mensaje.textContent =
            "👍 ¡Muy bien!";

        mensaje.style.color =
            "#4CAF50";


        // Comprobar si terminó

        if (palabraCompleta()) {

            completarAnimal();

        }

    }

    // La vocal NO existe

    else {

        mensaje.textContent =
            "😊 Esa vocal no está";

        mensaje.style.color =
            "#F44336";


        palabra.classList.add("error");


        setTimeout(function() {

            palabra.classList.remove("error");

        }, 400);

    }
}


// ==========================================
// COMPROBAR PALABRA
// ==========================================

function palabraCompleta() {

    const animal = animales[animalActual];


    for (let letra of animal.nombre) {

        if (
            esVocal(letra) &&
            !vocalesEncontradas.includes(letra)
        ) {

            return false;

        }
    }


    return true;
}


// ==========================================
// ANIMAL COMPLETADO
// ==========================================

function completarAnimal() {

    bloqueado = true;


    const animal = animales[animalActual];


    palabra.textContent =
        animal.nombre;


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


    setTimeout(function() {

        palabra.classList.remove(
            "correcto"
        );


        siguienteAnimal();

    }, 1400);
}


// ==========================================
// SIGUIENTE ANIMAL
// ==========================================

function siguienteAnimal() {

    animalActual++;


    if (
        animalActual >= animales.length
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

    bloqueado = true;


    imagenAnimal.src =
        animales[0].imagen;


    imagenAnimal.alt =
        "Felicitaciones";


    palabra.textContent =
        "¡LO LOGRASTE!";


    mensaje.textContent =
        "🏆 ¡Excelente trabajo! 🏆";


    mensaje.style.color =
        "#1976D2";


    teclas.innerHTML = "";


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

    vocalesEncontradas = [];


    botonReiniciar.style.display =
        "none";


    cargarAnimal();
}


// ==========================================
// INICIAR
// ==========================================

cargarAnimal();
