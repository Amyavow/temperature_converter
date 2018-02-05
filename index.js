window.$on = function(target, type, cb) {
	target.addEventListener(type, cb, false);
}


var CORE = (function() {
	"use strict";
	//pubsub library
	var modules= {};

	function addModule(module_id, module) {
		modules[module_id] = module;
	}


	function registerEvents(evt, module_id) {
		var theMod = modules[module_id];
		theMod.events = evt;
	}

	function triggerEvents(evt) {
		var mod;

		for(mod in modules){
			if (modules.hasOwnProperty(mod)) {
				mod = modules[mod];

				if (mod.events && mod.events[evt.type]) {
					mod.events[evt.type](evt.data)
				}
			}
		}
	}

	return {
		addModule : addModule,
		registerEvents: registerEvents,
		triggerEvents: triggerEvents
	}
})();

var sb = (function() {
	function listen(evt, module_id) {
		CORE.registerEvents(evt, module_id)
	}

	function notify(evt) {
		CORE.triggerEvents(evt)
	}

	return {
		listen:listen,
		notify: notify
	}
})();


var celsiusMod =(function () {
	var id, celsius, conversion, const32

	id = "celsius";
	conversion = 5/9;
	const32 = 32;

	function init() {
		celsius = document.getElementById("celsius");
		$on(celsius, "change", carryCelValue);
		sb.listen({"change-celsius": toFarenheit}, id)
	}

	function carryCelValue(e) {
		e.preventDefault();
		celsiusValue = celsius.value;

		sb.notify({type:"change-farenheit", data: celsiusValue});
	}

	function toFarenheit(valueComing) {
		celsius.value = (valueComing - const32) * conversion;
	}
	
	return{
		id: id,
		init: init,
		carryCelValue: carryCelValue
	}
})();

var farenheitMod = (function() {
	var id, farenheit, conversion, const32

	id = "farenheit";
	conversion = 9/5;
	conversionRate = conversion;
	const32 = 32;


	function init() {
		farenheit = document.getElementById("farenheit");

		sb.listen({"change-farenheit": toCelsius}, id);
		$on(farenheit, "change", carryFarVal);
		
	}

	function carryFarVal(e) {
		e.preventDefault();
		farenheitValue = farenheit.value;

		sb.notify({type:"change-celsius", data: farenheitValue});
	}

	function toCelsius(valueComing) {
		farenheit = document.getElementById("farenheit");
		farenheit.value = valueComing * conversion + const32;
	}


	return {
		id: id,
		init: init,
		toCelsius: toCelsius
	}
})();

CORE.addModule(celsiusMod.id, celsiusMod);
CORE.addModule(farenheitMod.id, farenheitMod);

celsiusMod.init();
farenheitMod.init();