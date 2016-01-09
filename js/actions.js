var fn = {
	init: function(){

		if(!fn.estaRegistrado()){
			window.location.href = "#registro";
		}

		$("#registro ul[data-role  = listview] a").tap(mc.start);
		$("#registro div[data-role = footer] a").tap(fn.registar);
	},

	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false)
	},

	estaRegistrado: function(){
		if(window.localStorage.getItem("user") != undefined ){
			return true;
		}

		return false;
	},

	registar: function(){
		// OBTENER LOS DATOS
		var nombre = $("#regNom").val();
		var email  = $("#regMail").val();
		var tel    = $("#regTel").val();
		var foto   = $("#fotoTomada").attr("rel");

		// VALIDAR DATOS
		if(typeof nombre !== "string"){
			navigator.notification.alert("El nombre debe de ser valido");
		}

		// if(typeof tel !== "number"){
		// 	navigator.notification.alert("El telefono debe de ser un número");	
		// }

		if(email == '' || foto == undefined || foto == ''){
			navigator.notification.alert("El email y la foto son obligatorios");		
		}

		fn.enviarRegistro(nombre, email, tel, foto);
	},

	enviarRegistro: function(nombre, email, tel, foto){
		$.ajax({
			method: "POST",
			url: "http://carlos.igitsoft.com/apps/test.php",
			data: {
				nom: nombre,
				mail: email,
				tel: tel
			},
			error: function(){
				alert("Error de conexion con AJAX");
			}

		}).done(function( msg ){
			if(msg == 1){
				ft.start(foto);

			}else{
				navigator.notification.alert("Error al enviar datos al servidor");
			}
		});
	}
};

$(fn.deviceready);