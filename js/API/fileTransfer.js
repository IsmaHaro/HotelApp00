var ft = {
	exito: function(r){
		if(r.response){
			navigator.notification.alert("Registrado Correctamente", function(){
				navigator.vibrate(1000);
				navigator.notification.beep(1);

				window.localStorage.setItem("user", $("#regNom").val());
				window.location.href = "#home";
			}, "Bienvenido", "Siguiente");

		}else{
			navigator.notification.alert("Error al subir foto");
		}
	},

	error: function(error){
		navigator.notification.alert("Error al subir foto, error: "+error.code);
	},

	start: function(path){
		// OPCIONES DE ENVIO
		var options      = new FileUploadOptions();
		options.fileKey  = "foto";
		options.fileName = "Carlos";
		options.mimeType = "image/jpeg";

		// ENVIAR LA FOTO
		var ft2 = new FileTransfer();
		ft2.upload(path, "http://carlos.igitsoft.com/apps/test.php", ft.exito, ft.error, options);
	}
};