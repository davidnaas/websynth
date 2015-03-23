
function Oscillator () {
	var oscillator;

	function init (type, externalContext) {

		oscillator = externalContext.createOscillator();
		oscillator.type = type;

	};

	function connect (connectTo) {
		oscillator.connect(connectTo);
	}

	function start (state) {
		oscillator.start(state);
	}

	function setType (newType) {
		oscillator.type = newType;
	}

	
	function setFreq (newFrequency) {
		oscillator.frequency.value = newFrequency;
	}

	function getOsc () {
		return oscillator;
	}

	function detune (cents) {
		oscillator.detune.value = cents;
	}

	function setCoarse (value) {
		
	}

	return Object.freeze({
			init: init,
			connect: connect,
			start: start,
			getOsc: getOsc,
			setFreq: setFreq,
			setType: setType,
			detune: detune,
			setCoarse: setCoarse 
	});

	
}
