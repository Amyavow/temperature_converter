define(["./sb.js"], function (sb) {
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
})