$(document).ready(function() {

    initializeImageLibrary();
	initializeActionLibrary();

    var controller = new MicrophoneController();

    controller.start();
});

var info = function (msg) {
    document.getElementById("status").innerHTML = msg;
};

var error = function (msg) {
    document.getElementById("result").innerHTML = msg;
};

function MicrophoneController() {

    this.start = function() {
        this.setup();
        this.startListening();
    }

    this.setup = function() {
        this.setupMicrophoneCallbacks();
    }

    this.setupMicrophoneCallbacks = function() {

        var microphone = this.microphone;

        var running = false;

        this.microphone.onready = function() {
            info("Mic is ready");
        }

        this.microphone.onerror = function (err) {
            error("Mic Error: " + err);
        };

        this.microphone.onconnecting = function () {
            info("Mic is connecting");
        };

        this.microphone.ondisconnected = function () {
            info("Mic is not connected");
        };

        this.microphone.onaudiostart = function () {
            info("Mic Recording started");

            error("");
        };

        this.microphone.onaudioend = function() {
            info("Mic Recording stopped, processing started");
        };

        this.microphone.onresult = this.onresultFunction;
    }

    this.connectMicrophones = function() {
        this.microphone.connect(this.witInstanceKey);
    }

    this.startListening = function() {
        this.connectMicrophones();
    }

    this.onresultFunction = function (intent, entities, text, confidence) {

		var action = {
			name: intent,
			text: text,
			confidence : confidence
		};

		if (intent === undefined && confidence >= 0.5) {
			this.wasUsed = true;
		}

		perform(action);
    };

    this.microphone = new Wit.Microphone(document.getElementById("microphone"));

    this.witInstanceKey = "A5MYU7PDGTWH5QDAWSAVAN44ELQQW3KH";
}



