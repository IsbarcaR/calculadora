let pantalla = document.getElementById("pantalla");
let entradaActual = "0";
let operador = null;
let entradaAnterior = null;

function agregarNumero(numero) {
    if (numero === "." && entradaActual.includes(".")) {
        return;
    }
    
    if (entradaActual === "0" && numero !== ".") {
        entradaActual = numero; 
    } else {
        entradaActual += numero;  
    }
    
    actualizarPantalla();
}


function agregarOperador(op) {
    if (operador !== null) {
        calcularResultado();
    }
    operador = op;
    entradaAnterior = entradaActual;
    entradaActual = "0";
}

function limpiarPantalla() {
    entradaActual = "0";
    operador = null;
    entradaAnterior = null;
    actualizarPantalla();
}

function calcular(operacion) {
    const actual = parseFloat(entradaActual);

    if (operacion === 'raiz') {
        entradaActual = Math.sqrt(actual).toString();
    } else if (operacion === 'cuadrado') {
        entradaActual = Math.pow(actual, 2).toString();
    } 

    actualizarPantalla();
}

function calcularResultado() {
    if (operador === null || entradaAnterior === null) return;

    let resultado;
    const anterior = parseFloat(entradaAnterior);
    const actual = parseFloat(entradaActual);

    switch (operador) {
        case "+":
            resultado = anterior + actual;
            break;
        case "-":
            resultado = anterior - actual;
            break;
        case "*":
            resultado =multiplicarSinOperador(anterior ,actual);
            break;
        case "/":
            resultado = dividirSinOperador( anterior , actual);
            break;
        case "%":
            resultado = anterior % actual;
            break;
    }

    entradaActual = resultado.toString();
    operador = null;
    entradaAnterior = null;
    actualizarPantalla();
}

function actualizarPantalla() {
    pantalla.innerText = entradaActual;
}
function multiplicarSinOperador(a, b) {
    let resultado = 0;
    const esNegativo = b < 0;  
    const positivoB = Math.abs(b);  //coge valor absoluto por si es negativo

    for (let i = 0; i < positivoB; i++) {
        resultado += a;  
    }

    return esNegativo ? -resultado : resultado;  
}
function dividirSinOperador(dividendo, divisor) {
    if (divisor === 0) return "Error";  

    let cociente = 0;
    let esNegativo = (dividendo < 0) !== (divisor < 0);  

    dividendo = Math.abs(dividendo);
    divisor = Math.abs(divisor);

    while (dividendo >= divisor) {
        dividendo -= divisor;
        cociente++;
    }

    return esNegativo ? -cociente : cociente; 
}


