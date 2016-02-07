var geolocation = {
	latitud: null,
	longitud: null,

	error: function(error){
		alert("Error: "+error.message);
	},

	exito: function(position){
alert("Position: "+position.coords.latitude+" "+position.coords.longitude);
		geolocation.latitud = position.coords.latitude;
		geolocation.longitud = position.coords.longitude;
	},

	getPosition: function(){
alert("obteniendo ubicacion");
		navigator.geolocation.getCurrentPosition(geolocation.exito, geolocation.error);
	}
};