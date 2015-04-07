(function ($) {
  var options = {};

  function init(plot) {
	  alert('init');
    var prevCursor = 'default',
      prevPageX = 0,
      prevPageY = 0,
      panTimeout = null,
      dragGap = 3000,
      dragTimeout = null,
      drawing = null; //drawing修复拖动显示紊乱的问题
    var placehoder = plot.getPlaceholder();

    function onTouchStart(e) {
		alert('haha');
      // 超过3秒的按下状态才算拖动
      dragTimeout = setTimeout(function () {
        dragTimeout = null;
      }, dragGap);
      if (e.originalEvent.touches.length == 1) {
        var c = placehoder.css('cursor');
        if (c) prevCursor = c;
        placehoder.css('cursor', plot.getOptions().pan.cursor);
        var touch = e.originalEvent.touches[0];
        prevPageX = touch.clientX;
		alert(prevPageX);
        prevPageY = touch.clientY;
      }
    }

    function onTouchMove(e) {
		alert('move....');
      e.preventDefault();
      var frameRate = plot.getOptions().pan.frameRate;
      if (panTimeout || !frameRate) return;
      if (e.originalEvent.touches.length == 1) {
        var touch = e.originalEvent.touches[0];
        panTimeout = setTimeout(function () {
          if (!drawing) {
            drawing = true;
            plot.pan({
              left: prevPageX - touch.clientX,
              top: prevPageY - touch.clientY
            });
            drawing = null;
          }
          prevPageX = touch.clientX;
          prevPageY = touch.clientY;
          panTimeout = null;
        }, 1 / frameRate * 1000);
      } else {
        onTouchEnd(e);
      }
    }

    function onTouchEnd(e) {
      if (!dragTimeout) {
        e.preventDefault();
      } else {
        clearTimeout(dragTimeout);
        panTimeout = null;
      }
      if (e.originalEvent.touches.length == 1) {
        var touch = e.originalEvent.touches[0];
        if (panTimeout) {
          clearTimeout(panTimeout);
          panTimeout = null;
        }
        placehoder.css('cursor', prevCursor);
        //                plot.pan({ left: prevPageX - touch.clientX,
        //                    top: prevPageY - touch.clientY
        //                });
        if (!drawing) {
          drawing = true;
          plot.pan({
            left: prevPageX - touch.clientX,
            top: prevPageY - touch.clientY
          });
          drawing = null;
        }
      }
    }

    function bindEvents(plot) {
		alert('bind');
      placehoder.bind("touchstart", onTouchStart);
      placehoder.bind("touchmove", onTouchMove);
      placehoder.bind("touchend", onTouchEnd);
    }

    function shutdown(plot, eventHolder) {
      placehoder.unbind('touchstart');
      placehoder.unbind('touchmove');
      placehoder.unbind('touchend');
      if (panTimeout) clearTimeout(panTimeout);
    }
    plot.hooks.bindEvents.push(bindEvents);
    plot.hooks.shutdown.push(shutdown);
  };
  $.plot.plugins.push({
    init: init,
    options: options,
    name: 'touch',
    version: '1.0'
  });
})(jQuery);