
function ImageManager() {

	this.currentImage = 0;
	this.allImages = [];

	this.nextImage = function() {
		this.currentImage = (this.currentImage + 1) % this.allImages.length;
	};

	this.loadImages = function() {

	};
	
	this.loadImageFromFile = function(file) {
		this.currentImage = this.allImages.length;
		this.allImages[this.allImages.length] = file;
	}; 

	this.getCurrentImage = function() {

		if (this.allImages.length === 0) {
			return null;
		}

		return this.allImages[this.currentImage];
	}
	
}


