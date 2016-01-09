var mc = {
	start: function(){
		navigator.device.capture.captureImage(mc.exito, mc.error, {limit: 1});
	},

	exito: function(mediaFiles){
		// RECUPERAR EL PATH DE LA FOTO
		var path = mediaFiles[0].fullPath;

		// DESPLEGAR LA FOTO EN EL LI
		$("#fotoTomada").html('<img src="'+path+'" width="100%" >');

		// INDICAR QUE EL USUARIO YA TOMO UNA FOTO
		$("#fotoTomada").attr("rel", path);
	},

	error: function(error){
		navigator.notification.alert("Error: "+error.code, null, "Capture Error");
	}
};