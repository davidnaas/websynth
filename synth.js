var context;
var osc1;
var gain1;

var stringToFreq = {'A': 261.36, 'W': 277.2, 'S': 293.7 , 'E': 311.1, 'D': 329.6, 'F': 349.2, 'T': 370.0, 'G': 392.0, 'Y': 415.3, 'H': 440,
						'U': 466.2, 'J': 493.9, 'K': 523.3};

window.addEventListener('load', main, false);
window.addEventListener('keydown', makeNote, false);
window.addEventListener('keyup', stopNote, false);



function main () {
	try{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext() 
	}catch(e){
		alert('Web audio does not work with your browser');
	}

	//create osc1
	osc1 = Oscillator();
	osc1.init(1, context);


	//create gain1
	gain1 = Gain();
	gain1.init(context);
	gain1.setGain(0);


	//connect	
	osc1.connect(gain1.getGain());
	gain1.connect(context.destination)
	osc1.start(0);
}

function makeNote (e) {
	var freq = stringToFreq[String.fromCharCode(e.keyCode)];
	console.log(String.fromCharCode(e.keyCode));
	osc1.setFreq(freq);

	gain1.setGain(1);
}

function stopNote (e) {
	gain1.setGain(0);
}


