define([], function () {
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
})