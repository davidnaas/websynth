var context;
var osc1;
var osc2;
var gain1;
var depressed_keys = {};

var isEmpty = 	function(obj) {
					return Object.keys(obj).length === 0;
				};

var stringToFreq = {'A': 261.36, 'W': 277.2, 'S': 293.7 , 'E': 311.1, 'D': 329.6, 'F': 349.2, 'T': 370.0, 'G': 392.0, 'Y': 415.3, 'H': 440,
						'U': 466.2, 'J': 493.9, 'K': 523.3};

window.addEventListener('keydown', makeNote, false);
window.addEventListener('keyup', stopNote, false);



$(document).ready(function  () {
	try{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext() 
	}catch(e){
		alert('Web audio does not work with your browser');
	}

	//create oscs
	osc1 = Oscillator();
	osc1.init('sine', context);

	osc2 = Oscillator();
	osc2.init('sine', context);


	//create gain1
	gain1 = Gain();
	gain1.init(context);
	gain1.setGain(0);


	//connect	
	osc1.connect(gain1.getGain());
	osc2.connect(gain1.getGain());
	gain1.connect(context.destination)
	osc1.start(0);
	osc2.start(0);


	//events from ui
	$("#waveSelect1").change(function(event) {
		osc1.setType(event.target.value);
	});

	$("#waveSelect2").change(function(event) {
		osc2.setType(event.target.value);
	});

	
});

function detuneVCO (value, source) {
	osc = source === 'detune1' ? osc1 : osc2
	osc.detune(value);
		
}

function makeNote (e) {
	var freq = stringToFreq[String.fromCharCode(e.keyCode)];
	
	osc1.setFreq(freq);
	osc2.setFreq(freq);

	if(freq != undefined)
		gain1.setGain(1);
	depressed_keys[e.keyCode] = true;
}

function stopNote (e) {
	delete depressed_keys[e.keyCode];

	if(isEmpty(depressed_keys)){
		gain1.setGain(0);
	}

	
}




