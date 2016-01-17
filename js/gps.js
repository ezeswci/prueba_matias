// JavaScript Document
var ENV = (function() {
    
    var localStorage = window.localStorage;

    return {
        settings: {
            /**
            * state-mgmt
            */
            enabled:    localStorage.getItem('enabled')     || 'true',
            aggressive: localStorage.getItem('aggressive')  || 'true'
        },
        toggle: function(key) {
            var value       = localStorage.getItem(key)
                newValue    = ((new String(value)) == 'true') ? 'false' : 'true';

            localStorage.setItem(key, newValue);
            return newValue;
        }
    }
})()

app = {
    /**
    * @property {google.maps.Map} map
    */
    map: undefined,
    /**
    * @property {google.maps.Marker} location The current location
    */
    location: undefined,
    /**
    * @property {google.map.PolyLine} path The list of background geolocations
    */
    path: undefined,
    /**
    * @property {Boolean} aggressiveEnabled
    */
    aggressiveEnabled: true,
    /**
    * @property {Array} locations List of rendered map markers of prev locations
    */
    locations: [],
    /**
    * @private
    */

    // Application Constructor  
    initialize: function() {
        this.bindEvents();
        //google.maps.event.addDomListener(window, 'load', app.initializeMap);
    },
	stopApp: function() {
        bgGeo.stop();
        //google.maps.event.addDomListener(window, 'load', app.initializeMap);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.configureBackgroundGeoLocation();
        //app.watchPosition();
    },
    configureBackgroundGeoLocation: function() {
        var fgGeo = window.navigator.geolocation,
            bgGeo = window.plugins.backgroundGeoLocation;

        //app.onClickHome();

        /**
        * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
        */
        var yourAjaxCallback = function(response) {
            bgGeo.finish();
        };

        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location) {
			// Aca tengo que poner los parametros que envio
				jsonData={location:location,params:{auth_token:window.celCode+'-'+ window.passestado,foo:'bar2'}};
				//var http = new XMLHttpRequest();
				data=JSON.stringify(jsonData);
				enviarLocationAServer(data);
            	yourAjaxCallback.call(this);
        };

        var failureFn = function(error) {
            console.log('BackgroundGeoLocation error');
        };
        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure(callbackFn, failureFn, {
            url: window.sis_ip, // <-- Android ONLY:  your server url to send locations to
            params: {
                auth_token:  window.celCode+'-'+ window.passestado,    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
                foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
            },
            desiredAccuracy: 0,
            stationaryRadius: 30,
            distanceFilter: 30,
            notificationTitle: 'B', // <-- android only, customize the title of the notification
            notificationText: 'E', // <-- android only, customize the text of the notification
            activityType: 'AutomotiveNavigation',
            debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: true // <-- enable this to clear background location settings when the app terminates
        });
        
        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        var settings = ENV.settings;

        if (settings.enabled == 'true') {
            bgGeo.start();
        
            if (settings.aggressive == 'true') {
                bgGeo.changePace(true);
            }
        }
    },
    watchPosition: function() {
        var fgGeo = window.navigator.geolocation;
        if (app.watchId) {
            app.stopPositionWatch();
        }
        // Watch foreground location
        app.watchId = fgGeo.watchPosition(function(location) {
            app.setCurrentLocation(location.coords);
        }, function() {}, {
            enableHighAccuracy: true,
            maximumAge: 5000,
            frequency: 10000,
            timeout: 10000
        });
    },
    stopPositionWatch: function() {
        var fgGeo = window.navigator.geolocation;
        if (app.watchId) {
            fgGeo.clearWatch(app.watchId);
            app.watchId = undefined;
        }
    },
    /**
    * Cordova foreground geolocation watch has no stop/start detection or scaled distance-filtering to conserve HTTP requests based upon speed.  
    * You can't leave Cordova's GeoLocation running in background or it'll kill your battery.  This is the purpose of BackgroundGeoLocation:  to intelligently 
    * determine start/stop of device.
    */
    onPause: function() {
        app.stopPositionWatch();
    },
    /**
    * Once in foreground, re-engage foreground geolocation watch with standard Cordova GeoLocation api
    */
    onResume: function() {
        app.watchPosition();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },
};
function empezarATrasmitirGps(){
	//alert("arranca a trasmitir");
	app.initialize();
//auth_token:  device.uuid
}
function dejarDeTrasmitirGps(){
	//alert("Dejo de trasmitir backGeo");
	window.plugins.backgroundGeoLocation.stop();
	//alert("Dejo de trasmitir geo");
	//window.navigator.geolocation.stop();
}
function enviarLocationAServer(json){
	// url: window.sis_ip, // <-- Android ONLY:  your server url to send locations to
			ipSend=window.sis_ip;
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
	 	 		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    		{
					var respuesta = xmlhttp.responseText;
				}
	 	 	}
		xmlhttp.open("POST",ipSend,false);// Que no se trabe por culpa de esto
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("params="+json);
		
}