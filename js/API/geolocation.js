var geolocation = {
	latitud: null,
	longitud: null,

	error: function(error){
		alert("Error: "+error.message);
	},

	exito: function(position){
		geolocation.latitud = position.coords.latitude;
		geolocation.longitud = position.coords.longitude;

		var latYlong = new google.maps.LatLng(geolocation.latitud, geolocation.longitud);
		//var latYlong = new google.maps.LatLng(-34.397,150.644);

		var hotel = {
			lat: 19.046583, 
			lng: -98.207966
		};

		var options = {
			zoom: 13,
			center: latYlong,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("canvas"), options);

		// var marker = new google.maps.Marker({
		// 	position: latYlong,
		// 	map: map,
		// 	title: "Mi ubicación"
		// });

		var directionsDisplay = new google.maps.DirectionsRenderer({
		    map: map
		});

		// Set destination, origin and travel mode.
		var request = {
			destination: hotel,
		    origin: latYlong,
		    travelMode: google.maps.TravelMode.DRIVING
		};

		  // Pass the directions request to the directions service.
		var directionsService = new google.maps.DirectionsService();
		
		directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		      // Display the route on the map.
		      directionsDisplay.setDirections(response);
		    }
		});
	},

	getPosition: function(){
		navigator.geolocation.getCurrentPosition(geolocation.exito, geolocation.error);
	}
};