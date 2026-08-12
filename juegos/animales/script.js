// ==========================================
// JUEGO DE ANIMALES
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

const vocales = [
    "A",
    "E",
    "I",
    "O",
    "U"
];


// ==========================================
// VARIABLES
// ==========================================

let animalActual = 0;

let letrasEncontradas = [];

let estrellas = 0;

let bloqueado = false;


// ==========================================
// ELEMENTOS HTML
// ==========================================

const imagenAnimal =
    document.getElementById(
        "imagenAnimal"
    );

const palabra =
    document.getElementById(
        "palabra"
    );

const teclas =
    document.getElementById(
        "teclas"
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
// CARGAR ANIMAL
// ==========================================

function cargarAnimal() {

    const animal =
        animales[animalActual];


    bloqueado = false;

    letrasEncontradas = [];


    // Imagen

    imagenAnimal.src =
        animal.imagen;

    imagenAnimal.alt =
        animal.nombre;


    // Mostrar palabra

    actualizarPalabra();


    // Crear botones

    crearBotones();


    // Limpiar mensaje

    mensaje.textContent = "";

    mensaje.style.color =
        "#333";


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

    const animal =
        animales[animalActual];


    let resultado = "";


    for (
        let i = 0;
        i < animal.nombre.length;
        i++
    ) {

        const letra =
            animal.nombre[i];


        // Si es vocal y todavía
        // no ha sido encontrada

        if (
            esVocal(letra) &&
            !letrasEncontradas.includes(letra)
        ) {

            resultado += "_";

        }

        else {

            resultado += letra;

        }

    }


    palabra.textContent =
        resultado;

}


// ==========================================
// SABER SI ES VOCAL
// ==========================================

function esVocal(letra) {

    return vocales.includes(
        letra
    );

}


// ==========================================
// CREAR BOTONES
// ==========================================

function crearBotones() {

    teclas.innerHTML = "";


    vocales.forEach(
        function(vocal) {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                vocal;


            boton.id =
                `vocal-${vocal}`;


            boton.onclick =
                function() {

                    comprobarVocal(
                        vocal
                    );

                };


            teclas.appendChild(
                boton
            );

        }
    );

}


// ==========================================
// TECLADO FÍSICO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (bloqueado) {
            return;
        }


        const tecla =
            event.key.toUpperCase();


        if (
            vocales.includes(tecla)
        ) {

            comprobarVocal(tecla);

        }

    }
);


// ==========================================
// COMPROBAR VOCAL
// ==========================================

function comprobarVocal(vocal) {

    if (bloqueado) {
        return;
    }


    const animal =
        animales[animalActual];


    // ¿La palabra contiene
    // esta vocal?

    if (
        animal.nombre.includes(vocal)
    ) {

        // Evitar repetir vocal

        if (
            letrasEncontradas.includes(
                vocal
            )
        ) {

            return;

        }


        letrasEncontradas.push(
            vocal
        );


        // Marcar botón

        const boton =
            document.getElementById(
                `vocal-${vocal}`
            );


        if (boton) {

            boton.classList.add(
                "usada"
            );

        }


        actualizarPalabra();


        // ¿Ya encontró todas
        // las vocales?

        if (
            palabraCompleta()
        ) {

            completarAnimal();

        }

        else {

            mensaje.textContent =
                "👍 ¡Muy bien!";

            mensaje.style.color =
                "#4CAF50";

        }

    }

    else {

        mensaje.textContent =
            "😊 Esa no está. ¡Intenta otra!";

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
// COMPROBAR SI ESTÁ COMPLETA
// ==========================================

function palabraCompleta() {

    const animal =
        animales[animalActual];


    for (
        let i = 0;
        i < animal.nombre.length;
        i++
    ) {

        const letra =
            animal.nombre[i];


        if (
            esVocal(letra) &&
            !letrasEncontradas.includes(
                letra
            )
        ) {

            return false;

        }

    }


    return true;

}


// ==========================================
// COMPLETAR ANIMAL
// ==========================================

function completarAnimal() {

    bloqueado = true;


    const animal =
        animales[animalActual];


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


    setTimeout(
        function() {

            palabra.classList.remove(
                "correcto"
            );


            siguienteAnimal();

        },
        1400
    );

}


// ==========================================
// SIGUIENTE ANIMAL
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
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    bloqueado = true;


    imagenAnimal.src =
        "img/gato.png";


    imagenAnimal.alt =
        "Felicitaciones";


    palabra.textContent =
        "¡LO LOGRASTE!";


    mensaje.textContent =
        "🏆 ¡Excelente trabajo! 🏆";


    mensaje.style.color =
        "#1976D2";


    teclas.innerHTML =
        "";


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

    letrasEncontradas = [];


    botonReiniciar.style.display =
        "none";


    cargarAnimal();

}


// ==========================================
// INICIAR
// ==========================================

cargarAnimal();
