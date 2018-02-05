define(["./sb.js"], function (sb) {
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
})