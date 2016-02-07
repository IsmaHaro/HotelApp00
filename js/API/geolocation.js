var geolocation = {
	latitud = null,
	longitud = null,

	error: function(error){
		alert("Error: "+error.message);
	},

	exito: function(position){
		geolocation.latitud = position.coords.latitude;
		geolocation.longitud = position.coords.longitude;
	},

	getPosition: function(){
		navigator.geolocation.getCurrentPosition(geolocation.exito, geolocation.error);
	}
};