document.addEventListener("DOMContentLoaded", () => {
  const txtName   = document.getElementById("Name");
  const txtNumber = document.getElementById("Number");
  const btnAgregar = document.getElementById("btnAgregar");

  const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
  const alertValidaciones      = document.getElementById("alertValidaciones");

  const contadorProductos = document.getElementById("contadorProductos");
  const productosTotal    = document.getElementById("productosTotal");
  const precioTotal       = document.getElementById("precioTotal");

  const tablaListaCompras = document.getElementById("tablaListaCompras");
  const cuerpoTabla       = tablaListaCompras.getElementsByTagName("tbody").item(0);

  // ====== ESTADO ======
  let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

  function validarCantidad(cantidad) {
    if (cantidad.length === 0) return false;
    if (isNaN(cantidad)) return false;
    if (Number(cantidad) <= 0) return false;
    return true;
  }

  function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
  }

  function mostrarError(msg) {
    alertValidacionesTexto.innerHTML = msg;
    alertValidaciones.style.display = "block";
  }

  function limpiarError() {
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
  }

  // ====== GUARDAR EN LOCALSTORAGE (lista + resumen) ======
  function guardarEnLocalStorage() {
    // guardar lista de productos
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras));

    // construir resumen
    const cont = listaCompras.length;
    const totalEnProductos = listaCompras.reduce((acc, p) => acc + p.cantidad, 0);
    const costoTotal = listaCompras.reduce((acc, p) => acc + p.subtotal, 0);

    const resumen = { cont, totalEnProductos, costoTotal };
    localStorage.setItem("resumen", JSON.stringify(resumen));
  }

  // ====== DIBUJAR TABLA ======
  function renderTabla() {
    cuerpoTabla.innerHTML = "";
    listaCompras.forEach((p, idx) => {
      const row = `<tr>
        <td>${idx + 1}</td>
        <td>${p.nombre}</td>
        <td>${p.cantidad}</td>
        <td>${p.subtotal.toFixed(2)}</td>
      </tr>`;
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
  }

  // ====== ACTUALIZAR PANEL RESUMEN ======
  function actualizarResumen() {
    const cont = listaCompras.length;
    const totalEnProductos = listaCompras.reduce((acc, p) => acc + p.cantidad, 0);
    const costoTotal = listaCompras.reduce((acc, p) => acc + p.subtotal, 0);

    contadorProductos.innerText = cont;
    productosTotal.innerText    = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(costoTotal);
  }

  // ====== AGREGAR PRODUCTO ======
  btnAgregar.addEventListener("click", (event) => {
    event.preventDefault();
    limpiarError();

    txtName.style.border = "";
    txtNumber.style.border = "";

    let valido = true;

    if (txtName.value.trim().length < 3) {
      txtName.style.border = "solid medium red";
      mostrarError("<strong>El nombre del producto no es correcto</strong><br/>");
      valido = false;
    }

    if (!validarCantidad(txtNumber.value.trim())) {
      txtNumber.style.border = "solid medium red";
      alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>";
      alertValidaciones.style.display = "block";
      valido = false;
    }

    if (!valido) return;

    const cantidad = Number(txtNumber.value.trim());
    const precioUnit = getPrecio();
    const subtotal   = cantidad * precioUnit;

    const producto = {
      nombre: txtName.value.trim(),
      cantidad,
      precioUnit,
      subtotal
    };

    listaCompras.push(producto);
    guardarEnLocalStorage();
    renderTabla();
    actualizarResumen();

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  });

  // ====== INICIALIZAR PÁGINA ======
  renderTabla();
  actualizarResumen();

});