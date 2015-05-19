
function VCO () {
	var oscillator;
	var multiplier = 1;

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

	
	function setFreq (newFrequency, externalContext, portamentoAmmount) {
		//This resets and aligns the scheduellng point we want 
		oscillator.frequency.cancelScheduledValues(externalContext.currentTime);
		oscillator.frequency.setValueAtTime(oscillator.frequency.value, externalContext.currentTime );  

		oscillator.frequency.linearRampToValueAtTime(newFrequency * multiplier, externalContext.currentTime + portamentoAmmount);

	}

	//provate func
	function getFreQ () {
		return oscillator.frequency;
	}

	function getOsc () {
		return oscillator;
	}

	function detune (cents) {
		oscillator.detune.value = cents;
	}

	function setCoarse (value) {
		if(value == 1){
			multiplier = 1/4;
		}else if(value == 2){
			multiplier = 1/2;
		}else if(value == 4){
			multiplier = 2;
		}else if(value == 5){
			multiplier = 4;
		}else{
			multiplier = 1;
		}
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
