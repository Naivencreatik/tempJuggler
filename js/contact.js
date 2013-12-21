/*
 * contactable 1.2.1 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.js 2010-01-18 $
 *
 */
(function($){

	//define the new for the plugin ans how to call it	
	$.fn.contactable = function(options) {
		//set default options  
		var defaults = {
			url: 'http://dev2/php/mail.php',
			name: 'Nom',
			email: 'Email',
			message : 'Message',
			subject : 'Votre message',
			submit : 'Envoyer',
			recievedMsg : 'Merci pour votre message',
			notRecievedMsg : 'DÃ©solÃ© mais votre message n a pas pu etre envoyÃ©, veuyez rÃ©essayer plus tard',
			disclaimer: 'N hÃ©sitez pas Ã  nous contacter, nous apprÃ©cierons vos commentaires',
			hideOnSubmit: false

		};

		//call in the default otions
		var options = $.extend(defaults, options);
		//act upon the element that is passed into the design    
		return this.each(function() {
			//construct the form
			var this_id_prefix = '#'+this.id+' ';
			$(this).html(
				'<div id="loading"></div>'
				+'<div id="callback"></div>'
				+'<div class="holder">'
				+'<div class="contactLeft"><p><label for="name">'+options.name+'<span class="red"> * </span></label>'
				+'<br /><input type="text" id="name" class="contact " name="name"/></p>'
				+'<p><label for="email">'+options.email+' <span class="red"> * </span></label>'
				+'<br /><input type="text" id="email" class="contact" name="email" /></p></div>'
				+'<div class="contactRight"><p><label for="message">'+options.message+' <span class="red"> * </span></label>'
				+'<br /><textarea id="message" name="message" class="message" rows="4" cols="30" ></textarea></p></div><p>'
				+'<input class="submit" type="submit" value="'+options.submit+'"/></p>'
				+'<p class="disclaimer">'+options.disclaimer+'</p></div>');
			
			//validate the form 
			$(this_id_prefix+"#contactForm").validate({
				//set the rules for the fild names
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true
					}
				},
				//set messages to appear inline
					messages: {
						name: "",
						email: "",
						message: ""
					},			

				submitHandler: function() {
					$(this_id_prefix+'.holder').hide();
					$(this_id_prefix+'#loading').show();
					$.ajax({
					  type: 'POST',
					  url: options.url,
					  data: {subject:options.subject, name:$(this_id_prefix+'#name').val(), email:$(this_id_prefix+'#email').val(), message:$(this_id_prefix+'#message').val()},
					  success: function(data){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						if( data == 'success') {
							$(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit == true) {
								//hide the tab after successful submition if requested
								$(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								$(this_id_prefix+'div#contactable_inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								$(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								$(this_id_prefix+'.holder').show();
								$(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
					error:function(){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
                    }
					});		
				}
			});
		});
	};
 
})(jQuery);