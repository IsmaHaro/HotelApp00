var fn = {
	init: function(){

		if(!fn.estaRegistrado()){
			window.location.href = "#registro";
		}

		// BOTONES
		$("#registro ul[data-role  = listview] a").tap(mc.start);
		$("#registro div[data-role = footer] a").tap(fn.registar);
		$("#nr1 ul[data-role = listview] a").tap(fn.seleccionarTipo);
		$("#nr1 div[data-role = navbar] li").tap(fn.nr1Siguiente);
		$("#nr2 div[data-role = footer] a").tap(fn.nr2EnviarRegistro);
	},

	nr2EnviarRegistro: function(){
		// OBTENER DATOS PARA LA RESERVA
		var tipoHabitacion  = $("#nr1").attr("th");
		var numPersonas     = $("#resPer").val();
		var numHabitaciones = $("#resHab").val();
		var numDias         = $("#resDias").val();

		if(conexion.estaConectado()){
			// SI ESTA CONECTADO ENVIAR LA RESERVACION
alert("DISPOSITIVO CONECTADO");

		}else{
			// GUARDAR LAS RESERVAS EN EL DISPOSITIVO
alert("DISPOSITIVO DESCONECTADO");
			almacen.guardarReserva(tipoHabitacion, numPersonas, numHabitaciones, numDias);
		}
	},

	nr1Siguiente: function(){
		if($(this).index() == 1){
			if($("#nr1").attr("th") != undefined){
				window.location.href = "#nr2";

			}else{
				alert("Error, es necesario seleccionar un tipo de habitación");
			}
		}
	},

	seleccionarTipo: function(){
		$("#nr1 ul[data-role = listview] a").css("background-color", "");
		$("#nr1").attr("th", $(this).text());
		$(this).css("background-color", "#38C");
	},

	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
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
		var email  = $("#regEmail").val();
		var tel    = $("#regTel").val();
		var foto   = $("#fotoTomada").attr("rel");

		// VALIDAR DATOS
		try{
			if(typeof nombre !== "string"){
				throw new Error("El nombre no es valido");
			}

			if(Number.isNaN(Number(tel))){
				throw new Error("El telefono no es valido");
			}

			if(email == '' || foto == undefined || foto == ''){
				throw new Error("La foto y el email no son validos");
			}

			fn.enviarRegistro(nombre, email, tel, foto);

		}catch(error){
			// MANDAR ALERTA DEL ERROR
			navigator.notification.alert(error);
		}
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
				navigator.notification.alert("Error al enviar datos al servidor, Mensaje: "+msg);
			}
		});
	}
};

$(fn.deviceready);

//$(fn.init);