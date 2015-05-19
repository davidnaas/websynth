var context;
var vco1;
var vco2;
var vca;
var vcf;
portamentoAmmount = 0;
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
	vco1 = VCO();
	vco1.init('sine', context);

	vco2 = VCO();
	vco2.init('sine', context);


	//create vca1
	vca1 = VCA();
	vca1.init(context);
	vca1.setGain(0);

	//create vcf
	vcf = VCF();
	vcf.init(context);
	vcf.setQ(13);
	vcf.setCutOff(20000);
	vcf.setType('lowpass');


	//connect	
	vco1.connect(vca1.getGain());
	vco2.connect(vca1.getGain());
	vca1.connect(vcf.getFilter());
	vcf.connect(context.destination);
	vco1.start(0);
	vco2.start(0);


	//events from ui
	$("#waveSelect1").change(function(event) {
		vco1.setType(event.target.value);
	});

	$("#waveSelect2").change(function(event) {
		vco2.setType(event.target.value);
	});

	
});

function detuneVCO (value, source) {
	osc = source === 'detune1' ? vco1 : vco2
	osc.detune(value);
		
}

function coarseVCO (value, source) {
	osc = source === 'coarse1' ? vco1 : vco2
	osc.setCoarse(value);
}

function cutoff (freq) {
	vcf.setCutOff(freq);
}

function Q (ammount) {
	vcf.setQ(ammount);
}

function portamento (ammount) {
	portamentoAmmount = ammount/1000;
}

function makeNote (e) {
	var freq = stringToFreq[String.fromCharCode(e.keyCode)];
	
	vco1.setFreq(freq, context, portamentoAmmount);
	vco2.setFreq(freq, context, portamentoAmmount);

	if(freq != undefined)
		vca1.setGain(.3);
	depressed_keys[e.keyCode] = true;
}

function stopNote (e) {
	delete depressed_keys[e.keyCode];

	if(isEmpty(depressed_keys)){
		vca1.setGain(0);
	}

	
}




