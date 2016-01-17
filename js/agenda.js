$(document).ready(onDeviceReady);
//var devicePlatform = device.platform;// - "Android" - "iOS"
//Global database
//
window.db;
window.passreal;
window.passfalsa;
window.passestado;
// PhoneGap is ready
//
function onDeviceReady() {
    var dbSize = 200000;
    var dbName = "TMD";
    var dbVersion = "1.0";
    var dbDisplayName = "TMDDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   	window.db.transaction(initDB, errorCB, successCB);
	//window.db.transaction(selectPass, errorCB);
	//db.transaction(initDB, errorCB, successCBM);

}
function selectPass(tx) {
    tx.executeSql('SELECT * FROM PASS', [], querySuccessPass, errorCB);
}

function querySuccessPass(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
        //var element = parseHistSelect(p.min, p.max, p.note, p.dd, p.mm, p.yy, p.hs, p.minut);
	//alert("verdadera: "+p.pass_true);
	//alert("Falsa: "+p.pass_false);
	window.passreal=p.pass_true;
	window.passfalsa=p.pass_false;
	window.passestado=p.pass_estado;
    }
}

// Init the table
//
function initDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS CONTACT (con_id INTEGER NOT NULL PRIMARY KEY, con_tipo, con_nombre, con_destino)');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    //alert("Success!");
    //Select query
    //
    db.transaction(selectHist, errorCB);
	db.transaction(selectPass, errorCB);
}

function selectHist(tx) {
    tx.executeSql('SELECT * FROM CONTACT', [], querySuccess, errorCB);
}

function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);

        var element = parseContacto(p.con_id, p.con_tipo, p.con_nombre, p.con_destino);
        //alert(element);
        $(".historial").append(element);
    }
}
function parseContacto(con_id, con_tipo, con_nombre, con_destino){
    return '<div class="historial_item"><div class="texto"><div class="fecha">'+con_tipo+'</div><div onclick="borrarContacto('+con_id+',this)" class="borrar">Eliminar</div><div class="contacto"><strong>'+con_nombre+': </strong>'+con_destino+'</div></div></div>';
}
function agregarContactos (){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function agregarManual(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel2").innerHTML='<div onclick="cerrarTodo();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="titulo">SMS O MAIL</div><div class="content"><p>Hay contactos que reciben el mensaje de alerta por SMS y otros que lo reciben por mail.</p><p>Elija el tipo de contacto que desea cargar:. </p></div><div class="botones"><div onclick="agregarSMSManual();" class="boton">SMS</div><div onclick="agregarMailManual();" class="boton der">MAIL</div></div>';
	document.getElementById("cartel2").style.visibility="visible";
}
function agregarSMSManual(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">INGRESE LOS DATOS</div><div class="content"><p>Ingrese el nombre del contacto a agregar como su número de teléfono a cual enviarle el mensaje sms.</p><table width="100%"><tr><td width="20%">Nombre:</td><td><input type="text" id="con_nombre" autocomplete="off" ></td></tr><tr><td>Número:</td><td><input type="text" id="con_destino" autocomplete="off" ></td></tr></table></div><input type="hidden" id="con_tipo" value="Sms" /><div class="botones"><div onclick="cerrarTodo();" class="boton">CANCELAR</div><div onclick="agregarAgenda();" class="boton der">AGREGAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}
function agregarMailManual(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">INGRESE LOS DATOS</div><div class="content"><p>Ingrese el nombre del contacto a agregar como su mail a cual enviarle el mensaje de Alerta.</p><table width="100%"><tr><td width="20%">Nombre:</td><td><input type="text" id="con_nombre" autocomplete="off" ></td></tr><tr><td>Mail:</td><td><input type="text" id="con_destino" autocomplete="off" ></td></tr></table></div><input type="hidden" id="con_tipo" value="Mail" /><div class="botones"><div onclick="cerrarTodo();" class="boton">CANCELAR</div><div onclick="agregarAgenda();" class="boton der">AGREGAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}
function successCBS(){
	window.location='contactos.html';
}
function insertContactoManual(tx){
	 tipo=document.getElementById("con_tipo").value;
	 nombre=document.getElementById("con_nombre").value;
	 destino=document.getElementById("con_destino").value;
	 //alert("claves"+verdadera+"-fal-"+falsa);CONTACT (con_id unique, con_tipo, con_nombre, con_destino)
	 var query = 'INSERT INTO CONTACT (con_tipo, con_nombre, con_destino) VALUES (?,?,?)';
     tx.executeSql(query, [tipo, nombre, destino]);
	 
}
function borrarContacto(id,element){
	element=element.parentNode;
	element.parentNode.style.display="none";
	window.delet_id=id;
	window.db.transaction(borrarContactoId, errorCB, successELI);
}
function borrarContactoId(tx){
	 id=window.delet_id;
	 tx.executeSql('DELETE FROM CONTACT WHERE con_id = ?', [id], successELI, errorCB);
	 
}
function successELI(){
	//crearAviso(1);
}
function crearAviso(tipo){
	if(tipo==1){
	contenidoAviso="El contacto fue eliminado";}else if(tipo==2){
	contenidoAviso="Error al Intentar borrar el contacto";}else if(tipo==3){
	contenidoAviso="El contacto fue Agregado";}else if(tipo==4){
	contenidoAviso="La clave no es correcta, intente nuevamente";}
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
	document.getElementById("fondo_negro3").style.visibility="hidden";
}
function agregarAgenda(){
	window.db.transaction(insertContactoManual, errorCB, successCBS);
	document.getElementById("cartel3").style.visibility="hidden";
}