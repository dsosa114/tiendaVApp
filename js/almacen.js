var almacen = {
	correo: null,
	password: null,
	
	conectarDB: function(){
		return window.openDatabase("tiendaVApp", "1.0", "Tienda App", 200000);
	},

	error: function(error){
		alert("Error: " + error.message);
	},

	exito: function(){
		alert("Exito");

	},

	comprobarExistenciaUsuario: function(mail, password){
		almacen.db				= almacen.conectarDB();
		almacen.correo			= mail;
		almacen.password		= password;

		almacen.db.transaction(almacen.leerUsuarios, almacen.error, almacen.exito);
	},

	guardarUsuarios: function(mail, password){
		almacen.db				= almacen.conectarDB();
		almacen.correo			= mail;
		almacen.password		= password;

		almacen.db.transaction(almacen.tablaUsuarios, almacen.error, almacen.exito);

	},

	tablaUsuarios:function(tx){
		//Crear tabla de historial
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, correo, password)');
		//Insertar los datos de la nueva reservacion
		tx.executeSql('INSERT INTO usuarios (correo, password) VALUES ("' + almacen.correo + '", "' + almacen.password + '")'); 
	},

	leerUsuarios: function(tx){
		//Crear tabla de historial
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, correo, password)');
		//leer tabla historial
		tx.executeSql('SELECT * FROM usuarios', [], almacen.validarUsuario);
	},

	validarUsuario:function(tx, res){
		var cantidad = res.rows.length;
		var coincidencias = 0;
		alert(cantidad);
		if(cantidad > 0){
			for(var i = 0; i < cantidad; i++){
				var mail = res.rows.item(i).correo;
				var pass = res.rows.item(i).password;
				alert(mail + ',' + almacen.correo + ',' + pass + ',' + almacen.password);
				if(mail == almacen.correo){
					if(pass == almacen.password){
						coincidencias = 1;
						break;
					}
				}
			}
			if(coincidencias > 0){
				navigator.notification.alert("Sesión iniciada correctamente", function(){
					navigator.vibrate(1000);
					navigator.notification.beep(1);
					window.localStorage.setItem("user", almacen.correo);
					window.location.href="#home";
				}, "Bienvenido", "Siguiente");
			} else {
				navigator.notification.alert("Usuario o contraseña no válidos", function(){
					
				}, "Error", "Aceptar");
			}
		} else {
			navigator.notification.alert("Usuario o contraseña no válidos", function(){
					
			}, "Error", "Aceptar");
		}
	}
}