// JavaScript Document
//var devicePlatform = device.platform;// - "Android" - "iOS"
//Global database
//
window.clave=0;
window.clave2=0;
function generaClave(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function crearPass(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel2").style.visibility="visible";
}
function crearPassAux(){
	//si todo sale bien
	pass1=document.getElementById("clave1").value.trim();
	pass2=document.getElementById("clave2").value.trim();
	if(pass1.length==4){
	if(pass1==pass2){
	window.clave=pass1;
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").style.visibility="visible";}else{
		crearAviso(1);
		document.getElementById("clave1").value=null;
		document.getElementById("clave2").value=null;
	}
	}else{
		crearAviso(2);
		document.getElementById("clave1").value=null;
		document.getElementById("clave2").value=null;
	}
}
function crearPassFinal(){
	//si todo sale bien
	//si todo sale bien
	pass1=document.getElementById("clave3").value.trim();
	pass2=document.getElementById("clave4").value.trim();
	if(pass1.length==4){
	if(pass1==pass2){
		if(pass1!=window.clave){
		window.clave2=pass1;
		document.getElementById("cartel3").style.visibility="hidden";
		generarClaves();
		//window.location="alerta.html";
		}else{
		crearAviso(3);
		document.getElementById("clave3").value=null;
		document.getElementById("clave4").value=null;
		}
		
	}else{
		crearAviso(1);
		document.getElementById("clave3").value=null;
		document.getElementById("clave4").value=null;
	}
	}else{
		crearAviso(2);
		document.getElementById("clave3").value=null;
		document.getElementById("clave4").value=null;
	}
	
	
	
}
function crearAviso(tipo){
	if(tipo==1){
	contenidoAviso="La Clave y su confirmación no coinciden";}else if(tipo==2){
	contenidoAviso="La clave debe ser de 4 digitos";}else{
	contenidoAviso="La clave original y la señuelo deben ser distintas";}
	document.getElementById("contAlert").innerHTML=contenidoAviso;
	document.getElementById("cartel4").style.visibility="visible";
	document.getElementById("fondo_negro2").style.visibility="visible";
}
function cerrarAviso(){
	document.getElementById("cartel4").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
}
function generarClaves(){
	var dbSize = 200000;
    var dbName = "TMD";
    var dbVersion = "1.0";
    var dbDisplayName = "TMDDatabase";
	//alert("Empieza");
    //Init DB
    //
    db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
	db.transaction(insertClave, errorCB, successCB);
	
}
function errorCB(tx, err) {
    //alert("Error processing SQL: " + err);
	alert("Error al cargar los datos, por favor reinicie la App");
}

// Transaction success callback
//
function successCB() {
	window.location="alerta.html";
    //alert("Success!");
}
function insertClave(tx){
	 verdadera=window.clave;
	 falsa=window.clave2;
	 pass='0';
	 //alert("claves"+verdadera+"-fal-"+falsa);
	 //var query = 'INSERT INTO PASS (pass_true, pass_false, pass_estado,call) VALUES (?,?,?,?)';
	 var query = 'UPDATE PASS SET pass_true=?, pass_false=?, pass_estado=?, gps_estado=?,call=? WHERE usu_id != ? ';
     tx.executeSql(query, [verdadera, falsa, pass, pass, pass, pass]);
	 
}