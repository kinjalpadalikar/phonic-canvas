var get_user_wave_form = function(callBack){
	navigator.getUserMedia = ( navigator.getUserMedia ||
						   navigator.webkitGetUserMedia ||
						   navigator.mozGetUserMedia ||
						   navigator.msGetUserMedia);

	if (navigator.getUserMedia) {
		console.log("getUserMedia is supported");
	}
	else {
		console.log("getUserMedia not supported");
	}

	window.AudioContext = (function(){
		return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
	})();

	$(document).ready(function() {
		var audioContext = null;
		try {
			audioContext = new AudioContext();
		} catch(e) {
			alert('Web Audio API is not supported in this browser');
		}

		startListening(audioContext , callBack);

	});

}
var startListening = function (audioContext , callBack) {
	var setupAudioNodesWrapper = function (stream); {
			setupAudioNodes (audioContext , callBack , stream);
	}
	try {
		navigator.getUserMedia(
		  { video: false,
			audio: true},
		  setupAudioNodesWrapper,
		  onError);
	} catch (e) {
		alert('webkitGetUserMedia threw exception :' + e);
	}	
}
var setupAudioNodes = function (audioContext , callBack , stream) {
	var sourceNode = audioContext.createMediaStreamSource(stream);
	var audioStream = stream;

	var analyserNode   = audioContext.createAnalyser();
	var javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
	var waveForm = new Deque ();
	// setup the event handler that is triggered every time enough samples have been collected
	// trigger the audio analysis and draw one column in the display based on the results
	javascriptNode.onaudioprocess = function () {

		var amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
		analyserNode.getByteTimeDomainData(amplitudeArray);
		saveSamplesAndPossiblyTriggerCallBack (callBack , waveForm , amplitudeArray);

	}

	// Now connect the nodes together
	// Do not connect source node to destination - to avoid feedback
	sourceNode.connect(analyserNode);
	analyserNode.connect(javascriptNode);
	javascriptNode.connect(audioContext.destination);
}
var saveSamplesAndPossiblyTriggerCallBack = function (callBack , waveForm , amplitudeArray) {
	waveForm.push(amplitudeArray);
	if (waveForm.size()>500){
	callBack (waveForm);
	waveForm.shift ();
}
	
}