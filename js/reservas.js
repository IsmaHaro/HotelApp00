var almacen = {
	db:null,
	tipoHabitacion: null,
	numPersonas: null,
	numHabitaciones: null,
	numDias: null,
	guardarReserva: function(tipoH, numP, numH, numD){
alert("guardando Reserva");
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.tipoHabitacion  = tipoH;
		almacen.numPersonas     = numP;
		almacen.numHabitaciones = numH;
		almacen.numDias         = numD;
alert("Iniciando transaccion");
		almacen.db.transaction(almacen.tablaReserva, almacen.error, almacen.confirmarReservaGuardada);
	},
	error: function(error){
		alert("Error al guardar reserva: "+error.code);
	},
	tablaReserva: function(tx){
alert("CREANDO TABLA");
		// CREAR TABLA SI TODAVIA NO EXISTE
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id INTEGER PRIMARY KEY, 
			                                                tipoh, 
			                                                nump, 
			                                                numh, 
			                                                numd)');
alert("INSERTANDO DATOS");
		// INSERTAR DATOS EN LA TABLA DE "RESERVAS"
		tx.executeSql('INSERT INTO reservas (tipoh, nump, numh, numd)
			           VALUES ("'+almacen.tipoHabitacion+'", 
			           	       "'+almacen.numPersonas+'", 
			           	       "'+almacen.numHabitaciones+'",
			           	       "'+almacen.numDias+'")');
alert("DATOS INSERTADOS");		
	},
	confirmarReservaGuardada: function(){
		alert("Reserva guardada en el dispositivo");
	}
}
