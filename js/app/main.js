// Clear forms
(function($){
	'use strict';

	$.fn.clearDefault = function(){
		return this.each(function(){
			var defaultValue = $(this).val();
			$(this).focus(function(){
				if ($(this).val() === defaultValue) {
					$(this).val('');
				}
			});
			$(this).blur(function(){
				if ($(this).val() === '') {
					$(this).val(defaultValue);
				}
			});
		});
	};
})(jQuery);

(function () {
  'use strict';

  $('.clear-text').clearDefault();

})();