var almacen = {
	db:null,
	tipoHabitacion: null,
	numPersonas: null,
	numHabitaciones: null,
	numDias: null,
	guardarReserva: function(tipoH, numP, numH, numD){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.tipoHabitacion  = tipoH;
		almacen.numPersonas     = numP;
		almacen.numHabitaciones = numH;
		almacen.numDias         = numD;
		almacen.db.transaction(almacen.tablaReserva, almacen.error, almacen.confirmarReservaGuardada);
	},
	error: function(error){
console.log(error);
		alert("Error: "+error.message);
	},
	tablaReserva: function(tx){
		// CREAR TABLA SI TODAVIA NO EXISTE
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservas_pendientes (id INTEGER PRIMARY KEY, tipoh, nump, numh, numd)');
		// INSERTAR DATOS EN LA TABLA DE "RESERVAS"
		tx.executeSql('INSERT INTO reservas_pendientes(tipoh, nump, numh, numd) VALUES ("'+almacen.tipoHabitacion+'","'+almacen.numPersonas+'","'+almacen.numHabitaciones+'","'+almacen.numDias+'")');
	},
	confirmarReservaGuardada: function(){
		alert("Reserva guardada en el dispositivo");
	},
	agregarHistorial: function(th, np, nh, nd){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.tipoHabitacion  = th;
		almacen.numPersonas     = np;
		almacen.numHabitaciones = nh;
		almacen.numDias         = nd;
		almacen.db.transaction(almacen.tablaHistorial, almacen.error, almacen.confirmarHistorial);
	},
	tablaHistorial: function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY, tipoh, nump, numh, numd)');
		tx.executeSql('INSERT INTO historial (tipoh, nump, numh, numd) VALUES("'+almacen.tipoHabitacion+'","'+almacen.numPersonas+'","'+almacen.numHabitaciones+'","'+almacen.numDias+'")');
	},
	confirmarHistorial: function(){
		alert("Reserva guardada en el historial");
	},
	leerPendientes: function(){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.db.transaction(almacen.enviarPendientes, almacen.error, almacen.confirmarPendientes);
	},
	enviarPendientes: function(tx){
alert("leyendo pendientes");
		tx.executeSql('SELECT * FROM reservas_pendientes', [], procesarPendientes);
	},
	procesarPendientes: function(tx, resultados){
	var cantidad = resultados.rows.length;
alert("procesando pendientes");
		if(cantidad > 0){
			for(var i = 0; i < cantidad; i++){
				var th = resultados.rows.item(i).tipoh;
				var np = resultados.rows.item(i).nump;
				var nh = resultados.rows.item(i).numh;
				var nd = resultados.rows.item(i).numd;

				fn.enviarReservas(th, np, nh, nd);
				tx.executeSql('DELETE FROM reservas_pendientes WHERE id = "'+resultados.rows.item(i).id+'"');
			}
		}
alert("FIN Procesado de pendientes");
	},

	confirmarPendientes: function(){
		alert("Sincronizado correctamente con el servidor");
	},
	registrosHistorial: function(){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.db.transaction(almacen.leerHistorial, almacen.error);
	},
	leerHistorial: function(tx){
		tx.executeSql("SELECT * FROM historial",[],almacen.mostrarResultadosHistorial, null);
	},
	mostrarResultadosHistorial: function(tx,res){
		var cantidad  = res.rows.length;
		var resultado = '<tr><td colspan="4">No hay reservas</td>';

		if(cantidad > 0){
			resultado = '';
			for(var i = 0; i < cantidad; i++){
				var th = res.rows.item(i).tipoh;
				var np = res.rows.item(i).nump;
				var nh = res.rows.item(i).numh;
				var nd = res.rows.item(i).numd;
				resultado += '<tr><td>'+th+'</td><td>'+np+'</td><td>'+nh+'</td><td>'+nd+'</td></tr>';
			}
		}
		$("#listaHistorial").html(resultado);
	},

	registrosPendientes: function(){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.db.transaction(almacen.leerP, almacen.error);
	},

	leerP: function(tx){
		tx.executeSql("SELECT * FROM reservas_pendientes",[], almacen.mostrarResutadosPendientes, null);
	},

	mostrarResutadosPendientes: function(tx,res){
		var cantidad  = res.rows.length;
		var resultado = '<tr><td colspan="4">No hay pendientes</td>';

		if(cantidad > 0){
			resultado = '';
			for(var i = 0; i < cantidad; i++){
				var th = res.rows.item(i).tipoh;
				var np = res.rows.item(i).nump;
				var nh = res.rows.item(i).numh;
				var nd = res.rows.item(i).numd;
				resultado += '<tr><td>'+th+'</td><td>'+np+'</td><td>'+nh+'</td><td>'+nd+'</td></tr>';
			}
		}
		$("#listaPendientes").html(resultado);
	}
};
