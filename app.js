$(document).ready(function(){
	console.log("document ready")
  var currentPosition = 0;
  var slideWidth = $(".max_width_wrapper").width();
  var slides = $('.slide');
  var numberOfSlides = slides.length;
  var autoscroll = true;
  var autoscrollnum = 0;
  
  // Wrap all .slides with #slideInner div
  slides
  .wrapAll('<div id="slideInner"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
    'width' : slideWidth
  });
  
  // Set #slideInner width equal to total width of all slides
	$(window).bind("load", function() {
		slideWidth = $(".max_width_wrapper").width();
	  $('#slideInner').css('width', slideWidth * numberOfSlides);
	  $('.slide').css('width', slideWidth);
	});  
  
  // Insert left and right arrow controls in the DOM
  $('#slideshow')
    .prepend('<span class="control" id="leftControl">Move left</span>')
    .append('<span class="control" id="rightControl">Move right</span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  function scrollDiv(controller){
  // Determine new position
  console.log(controller);
    currentPosition = ($(controller).attr('id')=='rightControl') 
  ? currentPosition+1 : currentPosition-1;

    // Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });  	
  }
 
  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    	autoscroll=false;
    	scrollDiv(this);
    });

  window.setInterval(function(){
  	if (autoscroll===true){
	  	if (autoscrollnum < numberOfSlides-1){
	  		autoscrollnum = autoscrollnum + 1;
	  		scrollDiv($('.control#rightControl'));
	  	}
	  	else{
	  		while(autoscrollnum > 0){
	  			autoscrollnum = autoscrollnum - 1;
	  			scrollDiv($('.control#leftControl'));
	  		} 		
	  	}
	  }
	}, 5000);
  
  // manageControls: Hides and shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
    if(position==0){ $('#leftControl').hide() }
    else{ $('#leftControl').show() }
    // Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControl').hide() } 
    else{ $('#rightControl').show() }
    } 

  	$(function(){
	  $('header').data('size','big');
	  $('header').addClass('big');
	});

  //dropdown menu
	$("header").on("click", ".hamburger_menu", function(event){
		$("#dropdown_menu").slideToggle();
	});

	//only scale view if view is a phone
	var scaler = "<meta name='viewport' content='initial-scale = 1.0,maximum-scale = 1.0'>";
	if ($(window).width() <= 568 || screen.width < 568){
		$("head").append(scaler);
		console.log($("head").html());
	}

  //switching headers
	$(window).scroll(function(){
	  if($(document).scrollTop() > 95 && ($(window).width() >= 568 && screen.width >= 568)){
		   if($('header').data('size') == 'big')
		    {
		        $('header').data('size','small');
		        $('header').removeClass('big').addClass('small');
		        $('header').stop().animate({
		            height:'60px'
		        },500);
		        $('header #social_media').fadeOut(200);
		        $('header h1 img').stop().animate({
		        	width: '100px'
		        }, 500);
		        setTimeout(function(){
		        	$('header #lowernav ul').addClass('small');
		        },200);	        
		    }
		}
		else
		  {
		    if($('header').data('size') == 'small')
		      {
		        $('header').data('size','big');
		        $('header').removeClass('small').addClass('big');
		        $('header').stop().animate({
		            height:'95px'
		        },500);
		        $('header #social_media').fadeIn(200);
		       	$('header h1 img').stop().animate({
		        	width: '180px'
		        }, 500);
		        $('header #lowernav ul').removeClass('small');	        
		      }  
		  }
	});
});