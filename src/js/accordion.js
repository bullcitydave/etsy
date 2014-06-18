

$('li').click(function(){
  $(this).css('color', 'red');
  $(this).siblings().css('color', 'blue');
  $(this).children("p").css('visibility', 'visible');
});
