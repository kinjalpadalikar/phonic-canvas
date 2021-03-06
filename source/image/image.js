
var smallWidth = "20%";
var normalWidth = "50%";
var defaultWidth  = "80%";
var largeWidth  = "70%";

var setBoxSize = function(name) {
    var imageElement = document.getElementById(name);
    imageElement.style.width  = "100%";
    imageElement.style.height = "";
}

var makeItBigger = function(name){
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = largeWidth;

	Caman(name, function () {
		this.resize({
			width: 1200
	 	});

		// You still have to call render!
		this.render(function() {
            setBoxSize(name.slice(1));
		});
	});

	console.log ("making it bigger");
}

var makeItNormalSize = function(name, applyEffects) {
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = normalWidth;

	Caman(name, function () {
		this.resize({
			width: 900
	 	});

		// You still have to call render!
		this.render(function() {
            setBoxSize(name.slice(1));

			if (applyEffects) {
				applyEffects();
			}
		});
	});

	console.log ("making it normal size");
}

var makeItDefaultSize = function(name, applyEffects) {
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = defaultWidth;

	Caman(name, function () {
		this.resize({
			width: 900
	 	});

		// You still have to call render!
		this.render(function() {
            setBoxSize(name.slice(1));

			if (applyEffects) {
				applyEffects();
			}
		});
	});

	console.log ("making it default size");
}

var makeItSmaller = function(name){
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = smallWidth;

	Caman(name, function () {
		this.resize({
		  width: 500
		});

		// You still have to call render!
		this.render(function() {
            setBoxSize(name.slice(1));
		});
	});

	console.log ("making it smaller");
}

var resetImage = function(name){

	Caman(name, function () {
		this.reset();
		this.render(function() {
			var imageElement = document.getElementById(name.slice(1));
			imageElement.style.width  = "100%";
			imageElement.style.height = "";
		});
	});

	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = normalWidth;
	console.log ("resetting image");
}

var imageManager = null;

var loadImage = function() {
	for (var i = 0; i < this.files.length; ++i) {
		imageManager.loadImageFromFile(this.files[i]);
	}

	if (this.files.length > 0) {
		showAllCurrentImages();
	}
}

var initializeImageLibrary = function () {
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

	imageManager = new ImageManager();

	$("#upload_button").change(loadImage);

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
	resetImage("#filter_box_image");
}

var removeElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.parentNode.removeChild(element);
}

var replaceElementById = function(id, newElement) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}

	var parentNode = element.parentNode;

	parentNode.insertBefore(newElement, element);
	parentNode.removeChild(element);
}

var centerElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.style.margin = "auto";
	element.style.display = "block";
}

var widenElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.style.width = "50%";
}

var removeTextFromElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.innerHTML = "";
}

var applyDefaultEffects = function() {
	makeItDefaultSize("#filter_box_image");
	applyRetroFilter("#filter_box_image2");
	applyLomoFilter("#filter_box_image3");
	applyHdrFilter("#filter_box_image4");
}

var applyRetroFilter = function(name) {
	console.log ("applying retro filter");
	Caman(name, function () {
        this.oldBoot();
        this.render(function() {
            setBoxSize(name.slice(1));
        });
    });
}

var applyLomoFilter = function(name) {
	console.log ("applying lomo filter");
	Caman(name, function () {
        this.lomo();
        this.render(function() {
            setBoxSize(name.slice(1));
        });
    });
}

var applyHdrFilter = function(name) {
	console.log ("applying Hdr filter");
	Caman(name, function () {
			this.saturation(20);
        	this.contrast(5);
        	this.exposure(15);
        	this.vignette(300, 60);
            this.render(function() {
                setBoxSize(name.slice(1));
            });
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

var showAllCurrentImages = function() {

	showCurrentImage('#filter_box_image',  function() {  });
	showCurrentImage('#filter_box_image2', function() { applyRetroFilter("#filter_box_image2"); });
	showCurrentImage('#filter_box_image3', function() { applyLomoFilter("#filter_box_image3");  });
	showCurrentImage('#filter_box_image4', function() { applyHdrFilter("#filter_box_image4");   });
}

var showCurrentImage = function(name, effects) {

	if (!document.getElementById(name.slice(1))) {
		return;
	}

	var currentImage = imageManager.getCurrentImage();

	var reader = new FileReader();

	$(reader).load(function(e) {

		var image = new Image();

		image.src = e.target.result;
		image.id  = name.slice(1);

		replaceElementById(name.slice(1), image);

		makeItDefaultSize(name, effects);
	});

	reader.readAsDataURL(currentImage);

}

var loadMyImages = function(name) {

	imageManager.loadImages();

	showCurrentImage(name);
}

var previousImage = function(name) {
	imageManager.previousImage();

	showCurrentImage(name);
}

var nextImage = function(name) {
	imageManager.nextImage();

	showCurrentImage(name);
}

var saveImage = function(name) {
	Caman(name, function() {
		this.save();
	});
}


