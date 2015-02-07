

$(document).ready(function() {

	
	$("#change_button").click(function(e) {
		Caman("#my_image", function () {
		  this.invert().render();
		});
	});

});


