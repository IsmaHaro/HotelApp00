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
		$("#boton-historial").tap(fn.mostrarHistorial);
		$("#boton-pendientes").tap(fn.mostrarPendientes);
		$("#boton-ubicacion").tap(fn.mostrarUbicacion);

		// ASOCIAR EVENTO A LA CONEXION
		document.addEventListener("online", fn.sincronizarReservasPendientes, false);

		// PONER FECHA
		fn.ponerFecha();
	},

	mostrarUbicacion: function(){
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCKrZkh24ZjiYdD0BS445a5NjNEtn6oBeg&callback=mapa');
	},

	mostrarHistorial: function(){
		almacen.registrosHistorial();
	},

	mostrarPendientes: function(){
		$.mobile.loading("show");
		almacen.registrosPendientes();
	},

	nr2EnviarRegistro: function(){
		// OBTENER DATOS PARA LA RESERVA
		var tipoHabitacion  = $("#nr1").attr("th");
		var numPersonas     = $("#resPer").val();
		var numHabitaciones = $("#resHab").val();
		var numDias         = $("#resDias").val();

		$.mobile.loading("show");

		if(conexion.estaConectado()){
			// SI ESTA CONECTADO ENVIAR LA RESERVACION
			fn.enviarReservas(tipoHabitacion, numPersonas, numHabitaciones, numDias);
		}else{
			// GUARDAR LAS RESERVAS EN EL DISPOSITIVO
			almacen.guardarReserva(tipoHabitacion, numPersonas, numHabitaciones, numDias);
		}

		$("#nr1 ul[data-role = listview] a").css("background-color", "");
		$("#nr1").removeAttr("th");
		$("#nr2 select").prop("selectedIndex", 0).selectmenu("refresh", true);
		window.location.href= "#home";
	},

	sincronizarReservasPendientes: function(){
//alert("Se detecto que el dispositivo esta online");
		// ALMACEN DEBE DE ENVIAR LAS RESERVAS PENDIENTES
		almacen.leerPendientes();
	},

	enviarReservas: function(th, np, nh, nd){
		$.ajax({
			type: "POST",
			url: "http://carlos.igitsoft.com/apps/test.php",
			data: {
				tipo: th,
				habitaciones: nh,
				personas: np,
				dias: nd
			}
		}).done(function(respuesta){
			if( respuesta == 1){
				// AGREGAR AL HISTORIAL
				almacen.agregarHistorial(th, np, nh, nd);
				$.mobile.loading("hide");
			}else{
				alert("Error al guardar reserva en el servidor");
			}
		});
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

			$.mobile.loading("show");
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
				$.mobile.loading("hide");
				alert("Error de conexion con AJAX");
			}

		}).done(function( msg ){
			if(msg == 1){
				ft.start(foto);

			}else{
				navigator.notification.alert("Error al enviar datos al servidor, Mensaje: "+msg);
			}
			$.mobile.loading("hide");
		});
	},

	ponerFecha: function(){
		var hoy = new Date();

		var dia  = hoy.getDate();
		var mes  = hoy.getMonth()+1;
		var anio = hoy.getFullYear();

		if(dia < 10){
			dia = "0"+dia;
		}

		if(mes < 10){
			mes = "0"+mes;
		}

		hoy = dia+" / "+mes+" / "+anio;

		$(".fecha").html(hoy);
	}
};

$(fn.deviceready);

//$(fn.init);
