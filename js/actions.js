var fn = {

	deviceready: function(){
		//Esto es necesario para PhoneGap para que pueda ejecutar la aplicación
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){
		//Usuario registrado?
		if(!fn.estaRegistrado()){
			window.location.href="#registro"; //window: pantalla del navegador
		}
		$("#btnRegistrar").tap(fn.registrar);
		$(".producto-link").on('tap', function(){
			var categoria = $(this).attr('categoria');
			console.log(categoria);
			fn.renderizarProductos(categoria);
			$("#menu").panel('close');
		});
		$("#boton-ubicacion").tap(fn.mostrarUbicacion);
		fn.renderizarProductos();
	},

	estaRegistrado: function(){
		if(window.localStorage.getItem("user")){
			return true;
		}else{
			return false;
		}

	},

	registrar: function(){
		var nombre = document.getElementById("nombre");
		var email = document.getElementById("email");
		var password = document.getElementById("password");

		try{
			if(nombre == null){
				throw new Error("Necesitas ingresar un Nombre");
			}
			if(email == null){
				throw new Error("Necesitas ingresar un Correo Electronico");
			}
			if(password == null){
				throw new Error("Necesitas ingresar una Contraseña");
			}

			almacen.guardarUsuarios(email, password);
			window.localStorage.setItem('user', email);
			window.location.href="#productos";
		}catch(error){
			alert("Error: " + error);
			//window.localStorage.setItem('user', email);
			window.location.href="#productos";
		}
	}, 

	renderizarProductos: function(categoria){
		if(categoria == undefined){
			categoria = "todos";
		}
		var contenedor = $("#productos-contenido");
		contenedor.empty();
		$("#titulo-productos").text(categoria);
		var html = null;
		var impar = 0;
		productos.forEach(function(elemento){
			if(elemento.categoria == categoria || categoria == "todos"){
				if(!impar){
			contenedor.append('<div class="ui-block-a">\
				<img class="productos" idProducto="'+ elemento.id +'" src="img/' + elemento.imagen +'">\
				<div class="precio">'+ elemento.precio + '</div>\
				</div>');
				impar = 1;
			}else{
				contenedor.append('<div class="ui-block-b">\
				<img class="productos" idProducto="'+ elemento.id +'" src="img/' + elemento.imagen + '">\
				<div class="precio">'+ elemento.precio + '</div>\
				</div>');
				impar = 0;
			}
			}
		});
		$(".productos").tap(fn.productoDetalle);
	},

	productoDetalle: function(){
		var id = $(this).attr("idProducto");

		var producto = productos.filter(function(obj){
			return obj.id == id;
		});
		var img = '<img src="img/' + producto[0].imagen + '">';

		$("#tabla-detalle .imagen").html(img);
		$("#tabla-detalle .nombre").html(producto[0].nombre);
		$("#tabla-detalle .descripcion").html(producto[0].descripcion);
		$("#tabla-detalle .categoria").html(producto[0].categoria);
		$("#tabla-detalle .cantidad").html(producto[0].cantidad);
		$("#tabla-detalle .precio").html(producto[0].precio);

		$.mobile.changePage($('#detalle'));
	},

	mostrarUbicacion: function(){
		$.getScript('https//:maps.googleapis.com/maps/api/js?key=AIzaSyBIxqfWtl8iH2jm0uDrQKomHAgwpxe2JmA&callback=mapa');
	}
};

//EJECUTAR EN PHONEGAP
//
$(fn.deviceready);

//EJECUTAR EN NAVEGADOR
//fn.init(); Ejecución por JS
//$(fn.init); //Ejecución por jQuery


