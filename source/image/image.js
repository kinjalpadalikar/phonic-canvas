var makeItBigger = function(name){
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = "524px";
	Caman(name, function () {
  this.resize({
    width: 500
  });

  // You still have to call render!
  this.render();
});
	console.log ("making it bigger");
} 
var initializeImageLibrary = function (){
	Caman.Filter.register("sharpen", function () {
	 	this.processKernel("sharpen", [
		    0, -1, 0,
		    -1, 5, -1,
		    0, -1, 0
		  ]);
	});
	Caman.Filter.register("blur", function () {
	 	this.processKernel("blur", [
		    1, 1, 1,
		    1, 1, 1,
		    1, 1, 1
		  ]);
	});
	drawImages();
}


var applyClassicFilter = function(name) {
	console.log ("applying classic filter");
	Caman(name, function () {
		  this.nostalgia();
		  this.render();
		});
}

var increaseContrast = function(name){
	Caman(name, function () {
  this.contrast(15).render();
});
	console.log ("increasing contrast");
}
var reformat_page = function() {
	removeElementById("box2");
	removeElementById("box3");
	removeElementById("box4");

	widenElementById("box1");
	centerElementById("filter_box1");
	removeTextFromElementById("original_name");
}

var removeElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.parentNode.removeChild(element);


}
var centerElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.style.margin = "auto";
	element.style.display = "block";
}

var removeTextFromElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.innerHTML = "";
}

var widenElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.style.width = "100%";

}

var applyDefaultEffects = function() {
	applyRetroFilter("#filter_box_image2");
	applyLomoFilter("#filter_box_image3");
	applyHdrFilter("#filter_box_image4");
}

var applyRetroFilter = function(name) {
	console.log ("applying retro filter");
	Caman(name, function () {
		  this.oldBoot();
		  this.render();
		});
}

var applyLomoFilter = function(name) {
	console.log ("applying lomo filter");
	Caman(name, function () {
		  this.lomo();
		  this.render();
		});
}

var applyHdrFilter = function(name) {
	console.log ("applying Hdr filter");
	Caman(name, function () {
			this.saturation(20);
        	this.contrast(5);
        	this.exposure(15);
        	this.vignette(300, 60);
		  	this.render();
		});
}
 
 var drawImages = function() {
 	 applyDefaultEffects();
 }

 var applyBlackAndWhiteFilter = function(name) {
	console.log ("applying black and white filter");
	Caman(name, function () {
		  this.pinhole();
		  this.render();
		});
}

var applySepiaFilter = function(name) {
	console.log ("applying sepia filter");
	Caman(name, function () {
		  this.orangePeel();
		  this.render();
		});
}

var makeItSmaller = function(name){
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = "224px";
	Caman(name, function () {
  this.resize({
    width: 200
  });

  // You still have to call render!
  this.render();
});
	console.log ("making it smaller");
} 

var increaseExposure = function(name){
	Caman(name, function () {
  this.exposure(15).render();
});
	console.log ("increasing exposure");
}

var increaseBrightness = function(name){
	Caman(name, function () {
  this.brightness(15).render();
});
	console.log ("increasing brightness");
}

var resetImage = function(name){
	Caman(name, function () {
  	this.reset();
  	this.render();
});
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = "324px";
	console.log ("resetting image");
}

var sharpenImage = function(name){
	Caman(name, function () {
	  this.sharpen();
	  this.render();
	});
	console.log ("sharpening image");
}

var blurImage = function(name){
	Caman(name, function () {
  	this.blur();
  	this.render();
});
	console.log ("blurring image");
}