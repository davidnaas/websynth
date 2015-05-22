function VCF () {
	var filter;

	function init (externalContext) {
		filter = externalContext.createBiquadFilter();
	}
	function setType (type) {
		filter.type = type;
	}
	
	function setCutOff (freq) {
		filter.frequency.value = freq;
	}

	function setQ (value) {
		filter.Q.value = value;	
	}

	function getFilter () {
		return filter;
	}

	function connect (connectTo) {
		filter.connect(connectTo);
	}

	return Object.freeze({
			init: init,
			setType: setType,
			setCutOff: setCutOff,
			setQ: setQ,
			getFilter: getFilter,
			connect: connect
	});
}