//$(document).ready(onDeviceReady);

//Global database
//
var db;
window.sis_vers_act="1.0";
// PhoneGap is ready
//
function registrarEnBase() {
    var dbSize = 200000;
    var dbName = "TMD";
    var dbVersion = "1.0";
    var dbDisplayName = "TMDDatabase";
	//alert("Entre");

    //Init DB
    //
   window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   db.transaction(initDB, errorCB, successCB);
	

}

// Init the table
//
function initDB(tx) {
    //La tabla lote usuario tambien controla el sistema
	// sis_ip a donde apunta
	// sis_tabs son los tabs que el country tiene disponibles Noticias - visitas- emergencias - reservas // 0 no- 1 si ej: 0/1/1/0
	// sis_vers_act  La utlima version disponible, por cada paso de entero es obligatorio actualizar
	// sis_ult_ver  La utlima verificacion echa, hacer una por semana?
	tx.executeSql('CREATE TABLE IF NOT EXISTS PASS (pass_id unique, pass_true, pass_false, pass_estado, call, usu_id, sis_ip)');// tipo: 1- alpha 0-normal
	//tx.executeSql('CREATE TABLE IF NOT EXISTS COUNTRY (co_id, co_nombre)');
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
	db.transaction(insertUsu, errorCB);
	// Para la demo
	//db.transaction(selectHist, errorCB);
}

function selectHist(tx) {
    tx.executeSql('SELECT * FROM PASS', [], querySuccess, errorCB);
}
function insertUsu(tx){
	//var id=device.uuid;
	//alert('Cargo usuario');
	 //var id='123';// Sacarlo para el cel
	 //var query = 'INSERT INTO USUARIOS (usu_id, usu_udid, usu_nombre, usu_apellido, usu_celular, usu_estado ) VALUES (?,?,?,?,?,?)';
     //tx.executeSql(query, [1, id, "Ezequiel", "Wernicke", "1161749820", "A"]);
	 //var query1 = 'INSERT INTO LOTES (lot_id, lot_nombre , lot_coun_id , lot_flia) VALUES (?,?,?,?)';
     //tx.executeSql(query1, [1, "T-63", 1, "Wernicke"]);
	  /*Lo unico que va*/
	 sis_ult_ver= new Date();
	 cero=0;
	 var query2 = 'INSERT INTO PASS ( usu_id, sis_ip, cel_code) VALUES (?,?,?)';
     tx.executeSql(query2, [window.usu_id, window.sis_ip, window.cel_code]); 
	 
	 tx.executeSql('SELECT * FROM PASS', [], querySuccess, errorCB);
	 //var query3 = 'INSERT INTO COUNTRY (co_id, co_nombre) VALUES (?,?)';
     //tx.executeSql(query3, [1, "Ayres de Pilar"]);/**/
	 
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert(rs.rows.length);
	if(rs.rows.length>0){
		window.location = "inicial.html";
	}else{
		 //window.location = "sincronizar.html";
		 alert("error");
	}
}
