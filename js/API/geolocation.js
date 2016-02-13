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

		var latYlong = new google.maps.LatLng(geolocation.latitud, geolocation.longitud);
		//var latYlong = new google.maps.LatLng(-34.397,150.644);

		var options = {
			zoom: 13,
			center: latYlong,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("canvas"), options);

		var marker = new google.maps.Marker({
			position: latYlong,
			map: map,
			title: "Mi ubicación"
		});
	},

	getPosition: function(){
alert("obteniendo ubicacion");
		navigator.geolocation.getCurrentPosition(geolocation.exito, geolocation.error);
	}
};