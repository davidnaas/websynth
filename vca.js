function VCA () {
	var gain;
	var A;
	var R;
	var context;

	function init (externalContext) {
		context = externalContext;
		gain = externalContext.createGain();
		A = 0.0;
		R = 0.0;
	}
	function setGain (gainValue) {
		//gain.gain.value = gainValue;
		gain.gain.cancelScheduledValues(context.currentTime);
		gain.gain.setValueAtTime(gain.gain.value, context.currentTime);  

		if(gainValue > 0){
			gain.gain.linearRampToValueAtTime(gainValue, context.currentTime + A);
		}else{
			gain.gain.linearRampToValueAtTime(gainValue, context.currentTime + R);
		}

	}
	function setAttack (value) {
		A = value;
	}

	function setRelease (value) {
		R = value;
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
			connect: connect,
			setAttack: setAttack,
			setRelease: setRelease
	});
}