const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

function validarCantidad(cantidad) {
    if (cantidad.length == 0) return false;
    if (isNaN(cantidad)) return false;
    if (Number(cantidad) <= 0) return false;
    return true;
}

function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
}

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = ""; // ← corregido
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML =
            "<strong>El nombre del producto no es correcto</strong><br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad(txtNumber.value)) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        let precio = getPrecio();
        cont++;

        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`; // ← tr corregido

        totalEnProductos += Number(txtNumber.value);
        costoTotal += precio * Number(txtNumber.value);

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX",
            { style: "currency", currency: "MXN" }).format(costoTotal);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});
