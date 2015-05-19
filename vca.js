function VCA () {
	var gain;
	var A;
	var D;
	var S;
	var R;
	var context;

	function init (externalContext) {
		context = externalContext;
		gain = externalContext.createGain();
	}
	function setGain (gainValue) {
		//gain.gain.value = gainValue;
		gain.gain.cancelScheduledValues(context.currentTime);
		gain.gain.setValueAtTime(gain.gain.value, context.currentTime);  


		if(gainValue > 0){
			console.log('AAAAA');
			gain.gain.linearRampToValueAtTime(gainValue, context.currentTime + 1);
		}else{
			gain.gain.linearRampToValueAtTime(gainValue, context.currentTime + 1);
			console.log('RRRRRR');
		}

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