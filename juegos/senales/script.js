// ==========================================
// SEÑALES DE TRÁNSITO DISPONIBLES
// ==========================================

const senalesDisponibles = [

    {
        id: "pare",
        nombre: "PARE",
        imagen: "img/pare.png",
        tipo: "Reglamentaria"
    },

    {
        id: "ceda-paso",
        nombre: "CEDA EL PASO",
        imagen: "img/ceda-paso.png",
        tipo: "Reglamentaria"
    },

    {
        id: "semaforo",
        nombre: "SEMÁFORO",
        imagen: "img/semaforo.png",
        tipo: "Reglamentaria"
    },

    {
        id: "curva-peligrosa",
        nombre: "CURVA PELIGROSA",
        imagen: "img/curva-peligrosa.png",
        tipo: "Preventiva"
    },

    {
        id: "cruce-peatones",
        nombre: "CRUCE PEATONES",
        imagen: "img/cruce-peatones.png",
        tipo: "Preventiva"
    },

    {
        id: "velocidad-maxima",
        nombre: "VELOCIDAD MÁXIMA",
        imagen: "img/velocidad-maxima.png",
        tipo: "Reglamentaria"
    },

    {
        id: "direccion-obligatoria",
        nombre: "DIRECCIÓN OBLIGATORIA",
        imagen: "img/direccion-obligatoria.png",
        tipo: "Reglamentaria"
    },

    {
        id: "zona-escolar",
        nombre: "ZONA ESCOLAR",
        imagen: "img/zona-escolar.png",
        tipo: "Preventiva"
    },

    {
        id: "prohibido-estacionar",
        nombre: "PROHIBIDO ESTACIONAR",
        imagen: "img/prohibido-estacionar.png",
        tipo: "Reglamentaria"
    },

    {
        id: "informacion",
        nombre: "INFORMACIÓN",
        imagen: "img/informacion.png",
        tipo: "Informativa"
    }

];

// ==========================================
// INFORMACIÓN SOBRE TIPOS DE SEÑALES
// ==========================================

const tiposSenales = {
    "Reglamentaria": "Indican obligaciones o prohibiciones. Su incumplimiento es una infracción.",
    "Preventiva": "Advierten sobre peligros o situaciones especiales en la vía.",
    "Informativa": "Proporcionan información sobre direcciones, distancias y servicios."
};

// ==========================================
// VARIABLES
// ==========================================

let figurasCorrectas = 0;
let intentos = 0;
let colocadas = 0;
let bloqueado = false;
let figuraArrastrada = null;
let juegoTerminado = false;
let preguntaTiposRespondida = false;

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


const botonReiniciar =
    document.getElementById(
        "reiniciar"
    );


const respuestaTipos =
    document.getElementById(
        "respuestaTipos"
    );


const opcionesTipos =
    document.querySelectorAll(
        ".opcion-tipo"
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
// INICIAR JUEGO
// ==========================================

function iniciarJuego() {

    juegoTerminado = false;
    bloqueado = false;
    intentos = 0;
    colocadas = 0;
    figurasCorrectas = 0;
    figuraArrastrada = null;
    preguntaTiposRespondida = false;

    contenedorFiguras.innerHTML = "";
    contenedorNombres.innerHTML = "";
    mensaje.textContent = "";
    resultado.style.display = "none";
    botonReiniciar.style.display = "none";
    respuestaTipos.innerHTML = "";
    respuestaTipos.style.display = "none";

    // Resetear opciones de tipos
    opcionesTipos.forEach(function(boton) {
        boton.disabled = false;
        boton.style.opacity = "1";
        boton.style.borderColor = "#90a4ae";
        boton.style.backgroundColor = "white";
    });

    // Actualizar progreso
    progreso.textContent =
        `Coloca las ${senalesDisponibles.length} señales en su nombre correcto`;

    // Actualizar estrellas
    estrellas.textContent =
        "⭐".repeat(figurasCorrectas);

    // ======================================
    // CREAR TODAS LAS SEÑALES (mezcladas)
    // ======================================

    const figurasMezcladas =
        mezclar(
            senalesDisponibles
        );


    figurasMezcladas.forEach(
        function(senal) {

            crearFigura(senal);

        }
    );


    // ======================================
    // CREAR TODOS LOS NOMBRES (mezclados)
    // ======================================

    const nombresMezclados =
        mezclar(
            senalesDisponibles
        );


    nombresMezclados.forEach(
        function(senal) {

            crearNombre(senal);

        }
    );

}


// ==========================================
// CREAR FIGURA (SEÑAL)
// ==========================================

function crearFigura(senal) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.classList.add(
        "figura"
    );


    elemento.dataset.id =
        senal.id;


    elemento.setAttribute(
        "aria-label",
        senal.nombre
    );


    const imagen =
        document.createElement(
            "img"
        );


    imagen.src =
        senal.imagen;


    imagen.alt =
        senal.nombre;


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

function crearNombre(senal) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.classList.add(
        "nombre"
    );


    elemento.dataset.id =
        senal.id;


    elemento.textContent =
        senal.nombre;


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

    if (bloqueado || juegoTerminado) {
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
        !figuraArrastrada ||
        juegoTerminado
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
    // VERIFICAR SI COMPLETÓ TODAS
    // ======================================

    if (
        colocadas ===
        senalesDisponibles.length
    ) {

        terminarJuego();

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
// PREGUNTA SOBRE TIPOS DE SEÑALES
// ==========================================

opcionesTipos.forEach(function(boton) {

    boton.addEventListener(
        "click",
        function() {

            if (preguntaTiposRespondida) {
                return;
            }

            const respuesta = this.dataset.respuesta;

            // Mostrar la respuesta
            let mensajeTipo = "";
            let esCorrecto = false;

            if (respuesta === "3") {
                esCorrecto = true;
                mensajeTipo = `
                    ✅ ¡Correcto! Existen 3 tipos de señales de tránsito:
                    <br><br>
                    🟡 <strong>Reglamentarias</strong>: ${tiposSenales.Reglamentaria}
                    <br><br>
                    🔵 <strong>Preventivas</strong>: ${tiposSenales.Preventiva}
                    <br><br>
                    🟢 <strong>Informativas</strong>: ${tiposSenales.Informativa}
                `;
            } else {
                esCorrecto = false;
                mensajeTipo = `
                    ❌ No exactamente. Los tipos de señales de tránsito son 3:
                    <br><br>
                    🟡 <strong>Reglamentarias</strong>: ${tiposSenales.Reglamentaria}
                    <br><br>
                    🔵 <strong>Preventivas</strong>: ${tiposSenales.Preventiva}
                    <br><br>
                    🟢 <strong>Informativas</strong>: ${tiposSenales.Informativa}
                `;
            }

            respuestaTipos.innerHTML = mensajeTipo;
            respuestaTipos.style.display = "block";

            // Marcar la respuesta seleccionada
            this.style.borderColor = esCorrecto ? "#4CAF50" : "#F44336";
            this.style.backgroundColor = esCorrecto ? "#e8f5e9" : "#ffebee";

            // Deshabilitar todos los botones
            opcionesTipos.forEach(function(b) {
                b.disabled = true;
                b.style.opacity = "0.7";
            });

            preguntaTiposRespondida = true;

            // Cambiar estilo del botón correcto
            opcionesTipos.forEach(function(b) {
                if (b.dataset.respuesta === "3") {
                    b.style.borderColor = "#4CAF50";
                    b.style.backgroundColor = "#e8f5e9";
                }
            });

        }
    );

});


// ==========================================
// TERMINAR JUEGO
// ==========================================

function terminarJuego() {

    juegoTerminado = true;
    bloqueado = true;


    mensaje.textContent =
        "🎉 ¡Completaste todas las señales! 🎉";


    mensaje.style.color =
        "#4CAF50";


    resultado.style.display =
        "block";


    resultadoTitulo.textContent =
        "🏆 ¡Excelente trabajo!";


    resultadoIntentos.textContent =
        `Completaste las ${senalesDisponibles.length} señales en ${intentos} intentos.`;


    progreso.textContent =
        "¡Juego completado!";


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

        iniciarJuego();

    }
);


// ==========================================
// INICIAR JUEGO
// ==========================================

iniciarJuego();
