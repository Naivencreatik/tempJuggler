(function () {

	'use strict';

	$(document).ready( function() {
	    var timer;  //timer for splash screen
	    
	    $('#main').hide();
	    
	    //create splash screen animation
	    function splashRotator(){
	        var cur = $('#jSplash').children('.selected');
	        var next = $(cur).next();
	        
	        if($(next).length != 0) {
	            $(next).addClass('selected');
	        } else {
	            $('#jSplash').children('section:first-child').addClass('selected');
	            next = $('#jSplash').children('section:first-child');
	        }
	            
	        $(cur).removeClass('selected').fadeOut(800, function() {
	            $(next).fadeIn(800);
	        });
	    }

	    //calling jPreLoader
	    $('body').jpreLoader({
	        splashID: "#jSplash",
		   	loaderVPos: '0',
	        autoClose: true,

	        splashFunction: function() {
	            $('#jSplash').children('section').not('.selected').hide();
	            $('#jSplash').hide().fadeIn(800);
	            
	            timer = setInterval(function() {
	                splashRotator();
	            }, 4000);
	        }
	    }, function() { //callback function
	        clearInterval(timer);
	        $('#main').fadeIn(500);
	    });

	    $.fn.fullpage({
	        anchors: ['introduction', 'bio', 'show', 'contact']
	    });
	    
	    // for video youtube
	    // var options = { videoId: '-yHAAel9hhw', repeat: true, mute: true };
	    // $('.home').tubular(options);

	});

	$(function(){
		$('#contactForm').contactable({
			subject: 'feedback URL:'+location.href
		});
	});

})();