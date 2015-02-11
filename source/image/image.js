var makeItBigger = function(){
	var elements = document.getElementsByClassName("boxes");
	elements[0].style.width = "524px";
	Caman("#filter_box_image", function () {
  this.resize({
    width: 500
  });

  // You still have to call render!
  this.render();
});
	console.log ("making it bigger");
} 

var applyClassicFilter = function() {
	console.log ("applying classic filter");
	Caman("#filter_box_image", function () {
		  this.nostalgia();
		  this.render();
		});
}

var increaseContrast = function(){
	Caman("#filter_box_image", function () {
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

var widenElementById = function(id) {
	var element = document.getElementById(id);
	if (element === null) {
		return;
	}
	element.style.width = "100%";

}

