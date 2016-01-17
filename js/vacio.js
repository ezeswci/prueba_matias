$(document).ready(onDeviceReady);

//Global database
//
var db;

// PhoneGap is ready
//
function onDeviceReady() {
    var dbSize = 200000;
    var dbName = "TMD";
    var dbVersion = "1.0";
    var dbDisplayName = "TMDDatabase";
	//alert("Entre");

    //Init DB
    //
    db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
    db.transaction(initDB, errorCB, successCB);

}

// Init the table
//
function initDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS PASS (pass_id unique, pass_true, pass_false, pass_estado,gps_estado, call, usu_id, sis_ip, cel_code)');
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
}

function selectHist(tx) {
    tx.executeSql('SELECT * FROM PASS', [], querySuccess, errorCB);
}

function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert(rs.rows.length);
	if(rs.rows.length>0){
		var p = rs.rows.item(0);
		if(p.usu_id==0){// Este celular quedo echado del sistema
			window.location = "echado.html"
		}else{
			if(parseInt(p.pass_true)>1){
				window.location = "alerta.html";
			}else{
				window.location = "inicial.html";
			}
		}
	}else{
		window.location = "sincronizar.html";
	}
}
