// JavaScript Document
function agregarDesdeLaAgenda3(){
	nombre="Adrian Campanelli";
	mails=new Array("AdrianCampanelli@realmedianetwork.com","mail2","mail3");
	telefonos=new Array("tel1","tel2","tel3");
	agregarDesdeLaAgenda2(nombre,mails,telefonos);
}
function agregarDesdeLaAgenda2(nombre,mails,telefonos){
	//alert("Entre a agregar agenda");
	var texto=" ";
	for (var b in mails) {
	   texto +='<div class="historial_item"><div class="texto"><div class="fecha">Mail</div><div class="borrar" onclick="agregarDesdeAgenda(this,\''+nombre+'\',\''+mails[b]+'\',\'Mail\')">+Agregar</div><div class="contacto"><strong>'+nombre+' </strong>'+ mails[b]+'</div></div></div>';
   }
   for (var c in telefonos) {
	   texto +='<div class="historial_item"><div class="texto"><div class="fecha">Sms</div><div class="borrar" onclick="agregarDesdeAgenda(this,\''+nombre+'\',\''+telefonos[c]+'\',\'Sms\')">+Agregar</div><div class="contacto"><strong>'+nombre+' </strong>'+ telefonos[c]+'</div></div></div>'; 
   }
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">DATOS IMPORTADOS DE AGENDA</div><div class="content"><p>Haga click en “+ Agregar” en aquellas opciones que desee agregar a su listado de alertas. En el detalle podrá ver si es que lo recibe por SMS o por Mail.</p></div><div class="content_export">'+texto+'</div><div class="botones"><div onclick="window.location=\'estadisticas.html\'" class="boton_unico">FINALIZAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}
function agregarDesdeLaAgenda(){
	navigator.contacts.pickContact(function(contact){
		result="Datos:";
		mails=new Array();
		numeros=new Array();
		 for (var i in contact) { 
      		result += "1-"+ i + " = " + contact[i] + "\n";
				for (var a in contact[i]) { 
				result += "2-"+ i+"+"+ a + " = " + contact[i] + "\n";
				for (var e in contact[i][a]) {
				if(i=="emails"&&e=="value"){mails.push(contact[i][a][e]);}
				if(i=="phoneNumbers"&&e=="value"){numeros.push(contact[i][a][e]);}
				result += "2-"+ i+"+"+ a +"+"+ e + " = " + contact[i][a][e] + "\n";
				}
				}
   			} 
   //alert(result);
   //alert("display Name"+contact.displayName) 
		//alert("Todo:"+JSON.stringify(contact));
   agregarDesdeLaAgenda2(contact.displayName,mails,numeros);
    },function(err){
        alert('Error: ' + err);
    });
}
function agregarDesdeAgenda (element,nombre,dato,tipo){
	//alert("entre");
	crearAviso(3);
	window.adtipo=tipo;
	window.adnombre=nombre;
	window.addestino=dato;
	element=element.parentNode;
	element.parentNode.style.display="none";
	window.db.transaction(insertContactoManualAgenda, errorCB, successCBSF);
}
function insertContactoManualAgenda(tx){
	 //alert("claves"+verdadera+"-fal-"+falsa);CONTACT (con_id unique, con_tipo, con_nombre, con_destino)
	 var query = 'INSERT INTO CONTACT (con_tipo, con_nombre, con_destino) VALUES (?,?,?)';
     tx.executeSql(query, [window.adtipo, window.adnombre, window.addestino]);
	 
}
function successCBSF(){
	//No hace nada per es necesaria
}
function validarPass(){
	valor=parseInt(document.getElementById("passing").value);
	real=window.passreal;
	falso=window.passfalsa;
	if(valor==real || valor==falso){
			document.getElementById("passing").value=null;
			cerrarTodo();
	}else{
		document.getElementById("passing").value=null;
		crearAviso(4);
	}
}