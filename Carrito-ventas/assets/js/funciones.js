// js/funciones.js


//pinta los artículos en la página
const listarPrendas = prendas => {
    $("#listado-prendas").html("");
    for (const item of prendas) {
        $("#listado-prendas").append(`
            <div>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="assets/img/prendas/${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <div>
                                    <span class="fw-bold">Precio: </span>
                                    <span> $${item.precio.toLocaleString('es-CL')}</span>
                                </div>
                                <div class="mt-4 d-flex justify-content-end">
                                    <input class="form-control dimension" type="number" value="1" readonly>
                                    <button class="btn btn-success cantidades aumenta">+</button>
                                    <button class="btn btn-danger cantidades disminuye">-</button>
                                    <button class="btn btn-primary btn-agregar" data-id="${item.id}">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
};

//agregar al carrito desde el carrito
const agregarAlCarrito = (idPrenda, cantidad) => {
    const itemCarrito = carrito.find(item => item.id == idPrenda);
    const prenda = prendas.find(item => item.id == idPrenda);

    if (!itemCarrito) {
        carrito.push({
            ...prenda,
            cantidad: cantidad
        });
    } else {
        itemCarrito.cantidad += cantidad;
    }

    actualizarCarrito();
};


//actualizar carrito ante cualquier evento
const actualizarCarrito = () => {
    mostrarResumen(carrito);
    const total = calcularTotal(carrito);
    $("#monto-total").html(`$${total.toLocaleString('es-CL')}`);
};


//elimina productos desde el carrito
const eliminarDelCarrito = (idPrenda) => {
    const index = carrito.findIndex(item => item.id == idPrenda);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
};


//modifica cantidad de productos desde el carrito
const modificarCantidadCarrito = (idPrenda, cantidad) => {
    const itemCarrito = carrito.find(item => item.id == idPrenda);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
        if (itemCarrito.cantidad <= 0) {
            eliminarDelCarrito(idPrenda);
        } else {
            actualizarCarrito();
        }
    }
};


//pinta carrito en pagina;boton elimina, aumenta y desminuye productos desde el carrito
const mostrarResumen = carrito => {
    $("#resumen table").html("");
    for (const item of carrito) {
        const totalPorProducto = item.precio * item.cantidad;
        $("#resumen table").append(`
            <tr>
                <td>
                    <div><h4 class="card-title">${item.nombre}</h4></div>
                    <div><b>Cantidad:</b> ${item.cantidad}</div>
                    <div><b>Precio Unitario:</b> $${item.precio.toLocaleString('es-CL')}</div>
                    
                </td>
                <td>
                <div class="d-flex align-items-end flex-column bd-highlight mb-3"> 
                    <button class="btn btn-danger btn-sm btn-eliminar cambiar" data-id="${item.id}">X</button>
                    <button class="btn btn-success btn-sm aumenta-carrito cambiar" data-id="${item.id}">+</button>
                    <button class="btn btn-warning btn-sm disminuye-carrito cambiar" data-id="${item.id}">-</button>
                    <div><b>Total:</b> $${totalPorProducto.toLocaleString('es-CL')}</div>
                </div>
                </td>
                
            </tr>
        `);
    }
};


//calcula el resultado de compra en el carrito de la página
const calcularTotal = carrito => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
};


//vaciar carrito,actualizar vista carrito-vacio
const limpiarCarrito = () => {
    carrito.length = 0;
    actualizarCarrito();
};


//funcion que despliega el informe-boleta
const mostrarInformeCompra = () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Por favor, agrega productos antes de comprar.");
        return;
    }

    let informeHTML = "";

    for (const item of carrito) {
        const totalPorProducto = item.precio * item.cantidad;
        
        
        informeHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>$${totalPorProducto.toLocaleString('es-CL')}</td>
            </tr>
            
        `;
    }
        //se calculan los totales y se pintan en informe
       const totales = calcularTotal(carrito);
        informeHTML+=`<tr>
        <td class="fw-bold">Total de la compra : $${totales.toLocaleString('es-CL')}</td>
        </tr>`;

    $("#detalle-compra table").html(`
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            
            ${informeHTML}
            
        </tbody>
    `);

    $("#informe-compra").show();
};
