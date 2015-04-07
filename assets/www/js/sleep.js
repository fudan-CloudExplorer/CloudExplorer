(function($)
{
	var _sleeptimer;
	$.sleep = function( time2sleep, callback )
	{
		$.sleep._sleeptimer = time2sleep;
		$.sleep._cback = callback;
		$.sleep.timer = setInterval('$.sleep.count()', 1000);
	}
	$.extend ($.sleep, {
		current_i : 1,
		_sleeptimer : 0,
		_cback : null,
		timer : null,
		count : function()
		{
			if ( $.sleep.current_i === $.sleep._sleeptimer )
			{
				clearInterval($.sleep.timer);
				$.sleep._cback.call(this);
			}
			$.sleep.current_i++;
		}
	});
})(jQuery);