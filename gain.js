function Gain () {
	var gain;

	function init (externalContext) {
		gain = externalContext.createGain();
	}
	function setGain (gainValue) {
		gain.gain.value = gainValue;
	}

	function connect (connectTo) {
		gain.connect(connectTo);
	}
	function getGain () {
		return gain;
	}

	return Object.freeze({
			init: init,
			setGain: setGain,
			getGain: getGain,
			connect: connect
	});
}