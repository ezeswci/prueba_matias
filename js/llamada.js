// JavaScript Document
$(document).ready(onDeviceReady);
window.llamadaSecreta=0;
function apretoLlamada(elemento){
	//alert(elemento.src);
	elemento=document.getElementById("ll_secreta");
	if(elemento.src.indexOf("llamada_desactivada")!=-1){
		elemento.src="img/llamada_activada.jpg";
		estadoLlamada(1);
		//alert("Llamada Activada");
		//document.location.href = 'tel:+01148127101';
	}else{
		elemento.src="img/llamada_desactivada.jpg";
		estadoLlamada(0);
		//alert("Llamada Desactivada");
	}
}
function onDeviceReady() {

    var dbSize = 200000;
    var dbName = "TMD";
    var dbVersion = "1.0";
    var dbDisplayName = "TMDDatabase";

    //Init DB
    //
    db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
	db.transaction(selectPass, errorCB);
	window.base=db;
}
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    //alert("Success!");
    //Select query
    //
}

function selectPass(tx) {
	//alert("hola");
    tx.executeSql('SELECT * FROM PASS', [], querySuccess, errorCB);
}

function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
	window.llamadaSecreta=p.call;
	//alert(p.call);
	if(p.call!=0){
		document.getElementById("ll_secreta").src="img/llamada_activada.jpg";
	}
    }
}
function estadoLlamada(numero){
	window.llamadaSecreta=numero;
	window.base.transaction(actualizarEstado, errorPass);
}
function actualizarEstado(tx) {
    tx.executeSql("UPDATE PASS SET call ='" +window.llamadaSecreta+"'  WHERE rowid =1  ;", [],   updatePass, errorPass);
}
function updatePass(){
}
function errorPass(){
}