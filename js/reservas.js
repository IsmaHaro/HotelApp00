var almacen = {
    db:null,
    th:null,
    np:null,
    nh:null,
    nd:null,
    guardarReserva:function(th,np,nh,nd){
		alert(th+np+nh+nd);
        almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
        almacen.th = th;
        almacen.np = np;
        almacen.nh = nh;
        almacen.nd = nd;
        
        almacen.db.transaction(almacen.tablaReserva, almacen.error, almacen.exito);
        
    },
    error:function(e){
        alert("Error", "codigo " + e.code);
    },
    exito:function(){
        alert("Reserva guardada, en esera de sincronizacion");
    },
    tablaReserva:function (tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS reservas (th, np, nh, nd)");
        tx.executeSql("INSERT INTO reservas (th, np, nh, nd) VALUES ('"+almacen.th+"','"+almacen.np+"','"+almacen.nh+"','"+almacen.nd+"')");
    },
	tablaHistorial:function (tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS historial (th, np, nh, nd)");
        tx.executeSql("INSERT INTO historial (th, np, nh, nd) VALUES ('"+almacen.th+"','"+almacen.np+"','"+almacen.nh+"','"+almacen.nd+"')");
    },
	guardarHistorial:function(th,np,nh,nd){
        //almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
        almacen.th = th;
        almacen.np = np;
        almacen.nh = nh;
        almacen.nd = nd;
        
        almacen.db.transaction(almacen.tablaHistorial, almacen.error, null);
        
    },
    syncData: function(){
		almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
		almacen.db.transaction(almacen.leerReservas, almacen.error, almacen.reservaLeida);
	},
	leerReservas: function(tx){
		tx.executeSql("SELECT * FROM reservas", [], function(tx2, response){
			for(i=0;i<response.rows.length;i++){
				server.envRes(response.rows.item(i).th,response.rows.item(i).np,response.rows.item(i).nh,response.rows.item(i).nd);
				almacen.guardarHistorial(response.rows.item(i).th,response.rows.item(i).np,response.rows.item(i).nh,response.rows.item(i).nd);
			}
			tx2.executeSql("DELETE FROM reservas");
		}, almacen.error);
	},
	reservaLeida: function(){
		alert("Reservas Sincronizadas");
	}
}