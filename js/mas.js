//Not using jQuery because this is a special event for phonegap
//If not firing with this event, phonegap plugins don't work
//
if( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false){
	var devicePlatform="iOS";
}else{
	var devicePlatform="Android";
}
document.addEventListener("deviceready", onDeviceReady, false);
var email = "";
var startDate = new Date();
var endDate = new Date();
startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay, 0, 0, 0, 0, 0);
endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay, 0, 0, 0, 0, 0);
var title = "Recordar tomarme la presión.";
var location_ = "";
var notes = "Recordar tomarme la presión.";
var success = function (message) {
        //alert("Success: " + JSON.stringify(message));
};
var error = function (message) {
    //alert("Error: " + message);
};

function onDeviceReady() {
    initClickCB();
}
function agendarEvento() {
		var success = function(message) { alerta(" Tu recordatorio se guardó bien."); };
 		 var error = function(message) { alerta("Error: Hubo un error de sistema, por favor vuelva a intentar"); };
		var calendarName = "Mi presion";
		var title = "Recordar tomarme la presión.";
		var location = "Presion";
		var notes = "Recordar tomarme la presión.";
		startDate = new Date(window.yy, window.mm, window.dd, window.hs, window.minut, 0, 0, 0);
        endDate = new Date(window.yy, window.mm, window.dd, window.hs +1, window.minut, 0, 0, 0);
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error);
}
function agendarEventoIos(yy,mm,dd,hs,minut) {
		var success = function(message) { alerta(" Tu recordatorio se guardó bien."); };
 		 var error = function(message) { alerta("Error: Hubo un error de sistema, por favor vuelva a intentar"); };
		var calendarName = "Mi presion";
		var title = "Recordar tomarme la presión.";
		var location = "Presion";
		var notes = "Recordar tomarme la presión.";
		startDate = new Date(yy, mm, dd, hs, minut, 0, 0, 0);
        endDate = new Date(yy, mm, dd, hs +1, minut, 0, 0, 0);
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error);
}

function createEvent() {
	cerrarVentana();
	if(devicePlatform=='Android'){
        document.addEventListener("deviceready", elejirDia, false);
		}else{
			elejirMomento();
		}	
}
//<button onclick="window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, subject, image and link</button> kl
function sendMail() {
	window.plugins.socialsharing.share('¡Te recomiendo esta aplicación!', 'Quiero compartir contigo esta aplicación para  aumentar tu seguridad. Descarga la app Mi Alerta desde el store de tu teléfono. Aca va el Link');
}
function abrirVentana(ventana) {
    if (ventana == "1") {
        document.getElementById("cartel").style.visibility = "visible";
        document.getElementById("fondo_negro").style.visibility = "visible";
    } else {
        document.getElementById("cartel2").style.visibility = "visible";;
        document.getElementById("fondo_negro").style.visibility = "visible";
    }

}

function cerrarVentana() {
    document.getElementById("cartel").style.visibility = "hidden";
	document.getElementById("cartel2").style.visibility = "hidden";
    document.getElementById("fondo_negro").style.visibility = "hidden";

}

function initClickCB() {
    $("#amigo").click(sendMail);
	$("#envdatos").click(sendMailDatos);
    $("#permitir").click(createEvent);
    $("#recordatorio").click(function () {
        abrirVentana('1');
    });
    $("#x").click(cerrarVentana);

}
function elejirDia () {
            var options = {
                date: new Date(),
                mode: 'date'
            };

            datePicker.show(options, function (date) {

                d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                window.dd = d.getDate();
                window.mm = d.getMonth();
                window.yy = d.getFullYear();
				document.addEventListener("deviceready", elejirHora, false);
            });	
        }
function elejirHora () {
            var options = {
                date: new Date(),
                mode: 'time'
            };
            datePicker.show(options, function (date) {
                d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
                window.hs = d.getHours();
                window.minut = d.getMinutes();
				document.addEventListener("deviceready", agendarEvento, false);
            });
        }
function elejirMomento () {
            var options = {
                date: new Date(),
                mode: 'datetime'
            };
    
            datePicker.show(options, function (date) {

				var dd = date.getDate();
                var mm = date.getMonth();
                var yy = date.getFullYear();
                var hs = date.getHours();
                var minut = date.getMinutes();
				startDate = new Date(yy, mm, dd, hs, minut, 0, 0, 0);
        		endDate = new Date(yy, mm, dd + 1, hs, minut, 0, 0, 0);
                var success = function(message) { alerta(" Tu recordatorio se guardó bien."); };
 		         var error = function(message) { alerta("Error: Hubo un error de sistema, por favor vuelva a intentar");};
        		window.plugins.calendar.createEvent(title, location_, notes, startDate, endDate, success, error);
            });
        }
function alerta(txt){
var iframe = document.createElement("IFRAME");
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(txt);
iframe.parentNode.removeChild(iframe);
}