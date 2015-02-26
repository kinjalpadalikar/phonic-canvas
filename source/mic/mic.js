$(document).ready(function() {

    initializeImageLibrary();

    var controller = new MicrophoneController();

    controller.start();
  
	$('#slide1_controls').on('click', 'button', function() {
		$("#slide1_images").css("transform","translateX(" + $(this).index() * -900+"px)");
		$("#slide1_controls button").removeClass("selected");
		$(this).addClass("selected");
	});
});

var info1 = function (msg) {
    document.getElementById("status1").innerHTML = msg;
};

var error1 = function (msg) {
    document.getElementById("result1").innerHTML = msg;
};

var info2 = function (msg) {
    document.getElementById("status2").innerHTML = msg;
};

var error2 = function (msg) {
    document.getElementById("result2").innerHTML = msg;
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

        var firstMicrophone = this.firstMicrophone;
        var secondMicrophone = this.secondMicrophone;

        var epoch = this.epoch;

        var running = false;

        this.firstMicrophone.onready = function() {

            if (!running) {
                running = true;

                window.setTimeout(function() {
                    firstMicrophone.start();
                }, 1);

                window.setTimeout(function() {
                    secondMicrophone.start();
                }, epoch / 2);
            }
        }

        this.secondMicrophone.onready = function() {

        }

        this.firstMicrophone.onerror = function (err) {
            error1("Primary Mic Error: " + err);
        };

        this.secondMicrophone.onerror = function (err) {
            error2("Secondary Mic Error: " + err);
        };

        this.firstMicrophone.onconnecting = function () {
            info1("Primary Mic is connecting");
        };

        this.secondMicrophone.onconnecting = function () {
            info2("Secondary Mic is connecting");
        };

        this.firstMicrophone.ondisconnected = function () {
            info1("Primary Mic is not connected");
        };

        this.secondMicrophone.ondisconnected = function () {
            info2("Secondary Mic is not connected");
        };

        this.firstMicrophone.onaudiostart = function () {
            info1("Primary Mic Recording started");

            window.setTimeout(function(){ firstMicrophone.stop(); }, epoch);

            error1("");
        };

        this.secondMicrophone.onaudiostart = function () {
            info2("Secondary Mic Recording started");

            window.setTimeout(function(){ secondMicrophone.stop(); }, epoch);

            error2("");
        };

        this.firstMicrophone.onaudioend = function() {
            info1("Primary Mic Recording stopped, processing started");
            running = false;
        };

        this.secondMicrophone.onaudioend = function() {
            info2("Secondary Mic Recording stopped, processing started");
        };

        this.firstMicrophone.onresult = this.onresultFunction;
        this.secondMicrophone.onresult = this.onresultFunction;
    }

    this.connectMicrophones = function() {
        this.firstMicrophone.connect( this.witInstanceKey);
        this.secondMicrophone.connect(this.witInstanceKey);
    }

    this.startListening = function() {
        this.connectMicrophones();
    }

    this.wasUsed = false;

    this.onresultFunction = function (intent, entities, text, confidence) {

        if (!this.wasUsed) {

            var action = {
                name: intent,
                text: text,
                confidence : confidence
            };

            if (intent === undefined && confidence >= 0.5) {
                this.wasUsed = true;
            }

            perform(action);
        }
        else {
            this.wasUsed = false;
        }
    };

    this.firstMicrophone  = new Wit.Microphone();
    this.secondMicrophone = new Wit.Microphone();

    this.witInstanceKey = "XDEY2WTA22AGXVBU6XO4QHSAO37ICSBU";

    this.epoch = 3000;
}



