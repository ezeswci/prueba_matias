// JavaScript Document
//Primer pregunta sis_ip, sis_tabs
//Fijo sis_vers_act, sis_ult_ver
//Segunda pregunta
window.regId="0";
window.simulacion=false;
if(!window.simulacion){
document.addEventListener("deviceready", onDeviceReadyUdid, false);
function onDeviceReadyUdid() {
    window.udid=device.uuid;
}
}else{
		window.udid='123456';
	}
function registrarClubHouse(){// Envio el codigo a esa direccion para 
	//var ipSend=window.sis_ip;
	mostrarSincronizando();
	var codigo=document.getElementById("codigo").value;
	window.cel_code=codigo;
	var udid=window.udid;//"123456";
	//var udid="123456";
	var regId=window.regId;
	//alert(regId+"-"+codigo+"-"+udid);
	var xmlhttp;
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
			//alert(xmlhttp.readyState+"ready-status"+xmlhttp.status);
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			respuesta=xmlhttp.responseText;
			//alert(respuesta);
			if(respuesta!="0"){
				devolucion=respuesta.split("-")
    			window.sis_ip=devolucion[0];
				window.usu_id=parseInt(devolucion[1]);// El lote usuario ya que es lo que usa para verificar
				registrarEnBase();
			}else{
				// Avisar que hubo un error en el codigo ingresado
				mostrarAviso();
				}
	    }
	 	 }
		 //http://swci.com.ar/cc/api/
		xmlhttp.open("POST","http://45.79.140.250/deviceTrackBackOffice/api/sincronizar_usuario.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo+"&udid="+udid+"&regId="+regId);
}
function mostrarSincronizando(){
	document.getElementById("cartel2").style.visibility="visible";
	document.getElementById("fondo_negro2").style.visibility="visible";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function mostrarAviso(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}