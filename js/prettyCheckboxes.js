/* ------------------------------------------------------------------------
	prettyCheckboxes
	
	Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
	Inspired By: All the non user friendly custom checkboxes solutions ;)
	Version: 1.1
	
	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */
	
(function($){
	var defaults = {
		checkboxWidth: 17,
		checkboxHeight: 17,
		className : 'prettyCheckbox',
		display: 'list'
	};
	
	var methods = {
		init : function(options) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data('prettyCheckboxes');

				if(!data) {
					var settings = $.extend({}, defaults, options),
						banner = $(this);

					$this.data('prettyCheckboxes', {
						'id': $this.attr('id')
					});
				
					// Find the label
					$label = $('label[for="'+$this.attr('id')+'"]');
		
					// Add the checkbox holder to the label
					$label.prepend("<span class='holderWrap'><span class='holder'></span></span>");
		
					// If the checkbox is checked, display it as checked
					if($this.is(':checked')) { $label.addClass('checked'); };
		
					// Assign the class on the label
					$label.addClass(settings.className).addClass($this.attr('type')).addClass(settings.display);
		
					// Assign the dimensions to the checkbox display
					$label.find('span.holderWrap').width(settings.checkboxWidth).height(settings.checkboxHeight);
					$label.find('span.holder').width(settings.checkboxWidth);
		
					// Hide the checkbox
					$this.addClass('hiddenCheckbox');
		
					// Associate the click event
					$label.bind('click.prettyCheckboxes',function(){
						$('input#' + $(this).attr('for')).triggerHandler('click');
						
						if($('input#' + $(this).attr('for')).is(':checkbox')){
							$(this).toggleClass('checked');
							$('input#' + $(this).attr('for')).checked = true;
							
							$(this).find('span.holder').css('top',0);
						}else{
							$toCheck = $('input#' + $(this).attr('for'));
		
							// Uncheck all radio
							$('input[name="'+$toCheck.attr('name')+'"]').each(function(){
								$('label[for="' + $(this).attr('id')+'"]').removeClass('checked');	
							});
		
							$(this).addClass('checked');
							$toCheck.checked = true;
						};
					});
					
					$('input#' + $label.attr('for')).bind('keypress.prettyCheckboxes',function(e){
						if(e.keyCode == 32){
							if($.browser.msie){
								$('label[for="'+$(this).attr('id')+'"]').toggleClass("checked");
							}else{
								$(this).trigger('click');
							}
							return false;
						};
					});
				}
			});
		},
		destroy : function( ) {		
			return this.each(function() {
				var $this = $(this);
				
				$(window).unbind('.prettyCheckboxes');
				
				$('label[for="'+$this.data('prettyCheckboxes').id +'"] .holderWrap').remove();
				$('label[for="'+$this.data('prettyCheckboxes').id +'"]').removeClass('prettyCheckbox checked checkbox radio list');
				$this.removeData('prettyCheckboxes');		
				$this.removeClass('hiddenCheckbox');
				
			});
		}
	};
	
	$.fn.prettyCheckboxes = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.prettyCheckboxes' );
		}    
	};

})(jQuery);