// JavaScript Document
function enviarMensajes(){
	//alert("Envio los mensajes");
	salenMensajes();
}
function enviarMensajesApagadoFalse(){
	alert("Envio los mensajes de apagado Falso");
}
function salenMensajes() {
    window.base.transaction(selectMsj, errorCB);
}
function selectMsj(tx) {
    tx.executeSql('SELECT * FROM CONTACT', [], querySuccessM, errorCB);
}

function querySuccessM(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert("Arrancan mensajes");
	var mails= new Array();
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		if(p.con_tipo=="Mail"){mails.push(p.con_destino);}else{      eviarMensaje(p.con_id, p.con_tipo, p.con_nombre, p.con_destino);}
        //alert(element);
    }
	if(mails.length>0){
		//alert("Lista mails");
		enviarMails(mails);
	}else{
		//alert("Lista mails vacia");
	}
}
function eviarMensaje(con_id, con_tipo, con_nombre, con_destino){
	//alert("Sale Sms");
	message="Esto es un Mensaje de la App Tu Alerta entra en este link para seguirme: http://45.79.140.250/monitoreo/vehiculos_posicion_direct_cel.php?gps="+window.celCode;
		var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }}
		var success = function () { };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(con_destino, message, options, success, error);	
}
function errorCB(){
	// Por ahora no hace nada pero podria reactivar los mensajes
}
function enviarMails(destinos) {
	//alert("Sale Mail");
	msj="Esto es un Mensaje de la App Tu Alerta entra en este link para seguirme: http://45.79.140.250/monitoreo/vehiculos_posicion_direct_cel.php?gps="+window.celCode;
	window.plugin.email.open({
    to:      destinos,
    cc:      [''],
    bcc:     [''],
    subject: 'Mensaje de la App Mi Alerta',
    body:    msj
});
}