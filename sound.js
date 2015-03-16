var context;

window.addEventListener('load', init, false);

function init () {
	try{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext() 
	}catch(e){
		alert('Web audio does not work with your browser');
	}

	oscillator = context.createOscillator();

	oscillator.connect(context.destination);

	oscillator.noteOn(0);
}
