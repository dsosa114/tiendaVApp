var fn = {

	deviceready: function(){
		//Esto es necesario para PhoneGap para que pueda ejecutar la aplicación
		document.addEventListener("deviceready", scarlett.onDeviceReady, false);
	},

	init: function(){
		//Usuario registrado?
		if(!fn.estaRegistrado()){
			window.location.href="#registro"; //window: pantalla del navegador
		}
		$("#btnRegistrar").tap(fn.registrar);
	},

	estaRegistrado: function(){
		if(window.localStorage.getItem("user")){
			return true;
		}else{
			return false;
		}

	},

	registrar: function(){
		var nombre = getElementById("nombre");
		var email = getElementById("email");
		var password = getElementById("password");

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
			window.location.href="#todos";
		}catch(error){
			alert("Error: " + error);

		}
	}
};

//EJECUTAR EN PHONEGAP
//
$(fn.deviceready);

//EJECUTAR EN NAVEGADOR
//fn.init(); Ejecución por JS
//$(fn.init); //Ejecución por jQuery


