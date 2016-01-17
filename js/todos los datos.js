// JavaScript Document
	navigator.contacts.pickContact(function(contact){
		//alert("numero:"+contact.phoneNumbers);
		//alert("numero ar:"+contact.phoneNumbers[0]);
		//alert("emails:"+contact.emails);
		//alert("emails ar:"+contact.emails[0]);
		//alert("nombre:"+contact.displayName);
		result="Datos:";
		 for (var i in contact) { 
      		result += "1-"+ i + " = " + contact[i] + "\n";
				for (var a in contact[i]) { 
				result += "2-"+ i+"+"+ a + " = " + contact[i][a] + "\n";
				}
   			} 
   alert(result); 
		//alert("Todo:"+JSON.stringify(contact));
    },function(err){
        alert('Error: ' + err);
    });