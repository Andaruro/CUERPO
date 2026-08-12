* {
    box-sizing: border-box;
}

body {
    margin: 0;

    min-height: 100vh;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background:
        linear-gradient(
            135deg,
            #8ed8ff,
            #dff8ff
        );

    display: flex;

    justify-content: center;

    align-items: center;

    color: #333;
}


/* ==========================================
   CONTENEDOR PRINCIPAL
   ========================================== */

.contenedor {
    width: 90%;

    max-width: 850px;

    background: white;

    border-radius: 30px;

    padding: 30px;

    text-align: center;

    box-shadow:
        0 10px 30px
        rgba(0, 0, 0, 0.15);

    position: relative;
}


/* ==========================================
   BOTÓN VOLVER
   ========================================== */

.volver {
    position: absolute;

    top: 20px;

    left: 20px;

    text-decoration: none;

    background: #eeeeee;

    color: #333;

    padding: 10px 18px;

    border-radius: 12px;

    font-size: 17px;

    font-weight: bold;
}

.volver:hover {
    background: #dddddd;
}


/* ==========================================
   TÍTULO
   ========================================== */

h1 {
    color: #1976d2;

    font-size: 48px;

    margin-top: 45px;

    margin-bottom: 15px;
}


/* ==========================================
   INSTRUCCIÓN
   ========================================== */

.instruccion {
    font-size: 25px;

    margin-bottom: 25px;

    color: #555;
}


/* ==========================================
   IMAGEN DEL ANIMAL
   ========================================== */

.imagen-container {
    width: 300px;

    height: 250px;

    margin: 0 auto 25px;

    display: flex;

    justify-content: center;

    align-items: center;

    background: #f5f5f5;

    border-radius: 25px;

    overflow: hidden;
}

.imagen-container img {
    max-width: 90%;

    max-height: 90%;

    object-fit: contain;
}


/* ==========================================
   PALABRA
   ========================================== */

.palabra {
    font-size: 65px;

    font-weight: bold;

    letter-spacing: 12px;

    color: #1565c0;

    margin: 25px 0;

    min-height: 80px;
}


/* ==========================================
   AYUDA
   ========================================== */

.ayuda {
    font-size: 24px;

    background: #fff3cd;

    padding: 15px 25px;

    border-radius: 15px;

    display: inline-block;

    margin-bottom: 20px;
}


/* ==========================================
   VOCALES
   Solo son una referencia visual.
   NO se pueden presionar.
   ========================================== */

.teclas {
    display: flex;

    justify-content: center;

    align-items: center;

    gap: 15px;

    margin: 10px 0 20px;
}


/* Vocal */

.teclas button {
    width: 75px;

    height: 75px;

    border: none;

    border-radius: 18px;

    background: #64b5f6;

    color: white;

    font-size: 40px;

    font-weight: bold;

    cursor: default;

    opacity: 0.8;

    pointer-events: none;
}


/* ==========================================
   MENSAJE
   ========================================== */

.mensaje {
    min-height: 55px;

    font-size: 38px;

    font-weight: bold;

    margin-top: 15px;
}


/* ==========================================
   ESTRELLAS
   ========================================== */

.estrellas {
    font-size: 42px;

    min-height: 50px;

    margin: 10px;
}


/* ==========================================
   PROGRESO
   ========================================== */

.progreso {
    font-size: 22px;

    color: #666;

    margin-top: 15px;
}


/* ==========================================
   BOTÓN REINICIAR
   ========================================== */

#reiniciar {
    display: none;

    margin-top: 25px;

    padding: 18px 35px;

    border: none;

    background: #4caf50;

    color: white;

    border-radius: 18px;

    font-size: 26px;

    cursor: pointer;

    transition: 0.2s;
}

#reiniciar:hover {
    background: #43a047;

    transform: scale(1.05);
}


/* ==========================================
   ANIMACIÓN CORRECTA
   ========================================== */

.correcto {
    animation:
        correcto 0.5s ease;
}

@keyframes correcto {

    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1);
    }
}


/* ==========================================
   ANIMACIÓN ERROR
   ========================================== */

.error {
    animation:
        error 0.3s ease;
}

@keyframes error {

    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    50% {
        transform: translateX(10px);
    }

    75% {
        transform: translateX(-10px);
    }

    100% {
        transform: translateX(0);
    }
}


/* ==========================================
   CELULARES
   ========================================== */

@media (max-width: 600px) {

    h1 {
        font-size: 34px;

        margin-top: 50px;
    }

    .instruccion {
        font-size: 20px;
    }

    .imagen-container {
        width: 240px;

        height: 200px;
    }

    .palabra {
        font-size: 45px;

        letter-spacing: 7px;
    }

    .ayuda {
        font-size: 19px;

        padding: 12px 18px;
    }

    .teclas {
        gap: 8px;
    }

    .teclas button {
        width: 55px;

        height: 55px;

        font-size: 30px;

        border-radius: 14px;
    }

    .mensaje {
        font-size: 30px;
    }

    .estrellas {
        font-size: 35px;
    }

    .progreso {
        font-size: 19px;
    }

}
