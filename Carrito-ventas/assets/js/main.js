// js/main.js

//esperar que cargue toda la pagina
$(() => {

    //se llama funcion para pintar los articulos en la pagina
    listarPrendas(prendas);

    //aumenta la cantidad de articulos
    $(".aumenta").click(function() {
        let valor = $(this).siblings("input").val();
        valor++;
        $(this).siblings("input").val(valor);
    });

    //disminuye la cantidad de articulos hasta cero
    $(".disminuye").click(function() {
        let valor = $(this).siblings("input").val();
        if(Number(valor) !== 1) {
            valor--;
            $(this).siblings("input").val(valor);
        }
    });

    //boton agregar articulos al carrito
    $(".btn-agregar").click(function() {
        const idPrenda = $(this).attr("data-id");
        let cantidad = Number($(this).siblings("input").val());
        const itemCarrito = carrito.find(item => item.id == idPrenda);
        
        if(!itemCarrito) {
            const prenda = prendas.find(item => item.id == idPrenda);
            carrito.push({
                ...prenda,
                cantidad: cantidad
            });
        } else {
            itemCarrito.cantidad += cantidad;
        }
        $(this).siblings("input").val(1);

        //el boton tambien llama la funcion que pinta en en la pagina el carrito
        mostrarResumen(carrito);

        //el boton tambien llama a funcion para calcular el total de compra
        const total = calcularTotal(carrito);
        $("#monto-total").html(`$${total.toLocaleString('es-CL')}`);
    });

     // Función para limpiar el carrito
     $("#btn-limpiar").click(() => {
        limpiarCarrito();
    });

    $(document).on("click", ".btn-eliminar", function() {
        const idPrenda = $(this).attr("data-id");
        eliminarDelCarrito(idPrenda);
    });

    $(document).on("click", ".aumenta-carrito", function() {
        const idPrenda = $(this).attr("data-id");
        modificarCantidadCarrito(idPrenda, 1);
    });

    $(document).on("click", ".disminuye-carrito", function() {
        const idPrenda = $(this).attr("data-id");
        modificarCantidadCarrito(idPrenda, -1);
    });


    //captura el evento para la vista del informe-boleta
    $("#btn-comprar").click(() => {
        mostrarInformeCompra();
    });

    // Cerrar el informe-boleta flotante
    $(document).on("click", ".close-btn", function() {
        $("#informe-compra").hide();
    });

});
