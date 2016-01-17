// JavaScript Document
function checkConnection() {
var state = navigator.connection.type;
if (state == window.Connection.NONE)
{
    // doesn't have internet, notify
	return false;
}
else
{
    // has internet, continue work accessing internet
	return true;
}
	/*return true;// Prueba interna */
    //alert('Connection type: ' + states[networkState]);
}

function checkConnectionControl() {
var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}