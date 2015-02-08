$(document).ready(function() {
  $('#slide1_controls').on('click', 'button', function(){
    $("#slide1_images").css("transform","translateX("+$(this).index() * -450+"px)");
    $("#slide1_controls button").removeClass("selected");
    $(this).addClass("selected");
  });
});
