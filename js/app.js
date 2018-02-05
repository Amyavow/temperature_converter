window.$on = function(target, type, cb) {
	target.addEventListener(type, cb, false);
}

define(["./js/core.js", "./js/celsiusMod.js", "./js/farenheitMod.js"], function (CORE, celsiusMod, farenheitMod) {
	CORE.addModule(celsiusMod.id, celsiusMod);
	CORE.addModule(farenheitMod.id, farenheitMod);

	celsiusMod.init();
	farenheitMod.init();
})