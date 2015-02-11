$(document).ready(function() {
    var running = false;
    var mic = new Wit.Microphone();
    var info = function (msg) {
      document.getElementById("status").innerHTML = msg;
    };
    var error = function (msg) {
      document.getElementById("status").innerHTML = msg;
    };
    mic.onready = function () {
      if (!running) {
    info("Microphone is ready to record");
    console.log("Ready");
          running = true;
          window.setTimeout(function(){ mic.start();  }, 200);	
}
    };
    mic.onaudiostart = function () {
      info("Recording started");
      console.log("Recording started");
      
      window.setTimeout(function(){ mic.stop();  }, 5000);	
    
      error("");
    };
    mic.onaudioend = function () {
      info("Recording stopped, processing started");
      console.log("audioend");
running = false;
      
    };
    mic.onresult = function (intent, entities, text, confidence) {
      var r = kv("intent", intent);
var entity = undefined;

      for (var k in entities) {
        var e = entities[k];

        if (!(e instanceof Array)) {
          entity = kv(k, e.value);
    r += entity;
        } else {
          for (var i = 0; i < e.length; i++) {
            entity = kv(k, e[i].value);
            r += entity;
          }
        }
      }

      console.log(intent + ":" + entity + ":" + text.msg_body + ":" + confidence);

      document.getElementById("result").innerHTML = r+text.msg_body;
      var action = new Object();
      action.name = intent;
      perform(action);

    };
    mic.onerror = function (err) {
      error("Error: " + err);
    };
    mic.onconnecting = function () {
      info("Microphone is connecting");
    };
    mic.ondisconnected = function () {
      info("Microphone is not connected");
    };

    mic.connect("I6XF2VG44VRAS72NEAAFJDXE6ZBRJPF2");

    function kv (k, v) {
      if (toString.call(v) !== "[object String]") {
        v = JSON.stringify(v);
      }
      return k + "=" + v + "\n";
    }
}); 