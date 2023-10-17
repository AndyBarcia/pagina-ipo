const bonoSelect = document.getElementById("bono");
const tipoClaseSelect = document.getElementById("tipo-clase");
const cantidadBonosSelect = document.getElementById("cantidad-bonos");
const cantidadPersonasSelect = document.getElementById("numero-personas");

function obtenerParametrosURL() {
    let parametros = {};
    let url = window.location.search.substring(1);
    let pares = url.split('&');
    for (let i = 0; i < pares.length; i++) {
        let par = pares[i].split('=');
        parametros[par[0]] = par[1];
    }
    return parametros;
}

const parametros = obtenerParametrosURL();
if (parametros.clase)
    tipoClaseSelect.value = parametros.clase;
if (parametros.bono) {
    bonoSelect.value = parametros.bono;
    if (parametros.cantidad)
        cantidadBonosSelect.value = parametros.cantidad;
}

let savedTipoClase = undefined;
let savedNumeroPersonas = undefined;
bonoSelect.addEventListener("change", function () {
    if (bonoSelect.value === "diverso") {
        tipoClaseSelect.disabled = true;
        savedTipoClase = tipoClaseSelect.value;
        tipoClaseSelect.value = "";
        cantidadPersonasSelect.disabled = true;
        savedNumeroPersonas = cantidadPersonasSelect.value;
        cantidadPersonasSelect.value = 1;
    } else if (bonoSelect.value === "grupo") {
        tipoClaseSelect.disabled = false;
        tipoClaseSelect.value = savedTipoClase;
        cantidadPersonasSelect.disabled = false;
        cantidadPersonasSelect.value = savedNumeroPersonas;
    } else {
        tipoClaseSelect.disabled = false;
        tipoClaseSelect.value = savedTipoClase;
        cantidadPersonasSelect.disabled = true;
        savedNumeroPersonas = cantidadPersonasSelect.value;
        cantidadPersonasSelect.value = 1;
    }

});

const totalValue = document.getElementById("total-value");

function updateTotal() {
    let total = 0.0;
    switch (bonoSelect.value) {
        case "normal": {
            switch (cantidadBonosSelect.value) {
                case "1": total = 20.0; break;
                case "5": total = 60.0; break;
                case "10": total = 100.0; break;
            }
        } break;
        case "diverso": {
            switch (cantidadBonosSelect.value) {
                case "1": total = 20.0; break;
                case "5": total = 80.0; break;
                case "10": total = 120.0; break;
            }
        } break;
        case "grupo": {
            switch (cantidadBonosSelect.value) {
                case "1": total = 20.0 + (cantidadPersonasSelect.value-1)*5.0; break;
                case "5": total = 80.0 + (cantidadPersonasSelect.value-1)*20.0; break;
                case "10": total = 120.0 + (cantidadPersonasSelect.value-1)*40.0; break;
            }
        } break;
    }
    totalValue.textContent = `Total: $${total.toFixed(2)}`;
}

bonoSelect.addEventListener('change', updateTotal);
cantidadBonosSelect.addEventListener('change', updateTotal);
cantidadPersonasSelect.addEventListener('input', updateTotal);

updateTotal();