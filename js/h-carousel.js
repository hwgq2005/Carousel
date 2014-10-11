/*
 * @authors H君(262281610@qq.com)
 * @date    2014-09-04 14:35:03
 * @version 1.0
 */
var slide = function() {
	var _contaniner = $('.container'),
		_wrapper = $('.wrapper'),
		_slide = $('.slide'),
		_c_w = $(window).width(),
		counts = _slide.length,
		page = 0,
		time;
	var isScrolling,
		pressX,
		pressY,
		direct;
	slide.init = function() {
		_wrapper.css('width', _c_w * counts);
		_slide.each(function(index, elem) {
			$(elem).css({
				'width': _c_w,
				'left': -(_c_w * index),
				'transition': '0',
				'-webkit-transition': '0',
				'-webkit-transform': 'translate(' + _c_w + 'px,0) translateZ(0)'
			}).attr('data-translate', +_c_w);
			if (index == 0) {
				$(elem).css({
					'-webkit-transform': 'translate(0) translateZ(0)'
				}).attr('data-translate', 0);
			} else if (index == counts - 1) {
				$(elem).css({
					'-webkit-transform': 'translate(-' + _c_w + 'px,0) translateZ(0)'
				}).attr('data-translate', -_c_w);
			};
		})
	}(),
	slide.next = function() {
		page++;
		if (page == counts) {
			page = 0;
		};
		$(_slide[page]).css({
			'-webkit-transition': '.4s',
			'-webkit-transform': 'translate(0) translateZ(0)'
		}).attr('data-translate', '0').siblings().css({
			'z-index':'99',
			'-webkit-transition': '.4s',
			'-webkit-transform': 'translate(-' + _c_w + 'px,0) translateZ(0)'
		}).attr('data-translate', -_c_w);
		$(_slide[page]).next().css({
			'z-index':'98',
			'-webkit-transition': '0',
			'-webkit-transform': 'translate(' + _c_w + 'px,0) translateZ(0)'
		})
		$(_slide[page]).next().attr('data-translate', _c_w);
		if (page == counts - 1) {
			$(_slide[0]).css({
				'z-index':'98',
				'-webkit-transition': '0',
				'-webkit-transform': 'translate(' + _c_w + 'px,0) translateZ(0)'
			}).attr('data-translate', +_c_w);
		};
	},
	slide.prev = function() {
		page--;
		if (page == -1) {
			page = counts - 1;
		};
		$(_slide[page]).css({
			'-webkit-transition': '.4s',
			'-webkit-transform': 'translate(0) translateZ(0)'
		}).attr('data-translate', '0').siblings().css({
			'z-index':'99',
			'-webkit-transition': '.4s',
			'-webkit-transform': 'translate(' + _c_w + 'px,0) translateZ(0)'
		}).attr('data-translate', _c_w);
		$(_slide[page]).prev().css({
			'z-index':'98',
			'-webkit-transition': '0',
			'-webkit-transform': 'translate(-' + _c_w + 'px,0) translateZ(0)'
		})
		$(_slide[page]).prev().attr('data-translate', -_c_w);
		if (page == 0) {
			$(_slide[counts - 1]).css({
				'z-index':'98',
				'-webkit-transition': '0',
				'-webkit-transform': 'translate(-' + _c_w + 'px,0) translateZ(0)'
			}).attr('data-translate', -_c_w);

		};
	},
	slide.touchStart = function(event) {
		if (event.touches.length == 1) {
			var touch = event.touches[0];
			pressX = touch.pageX;
			pressY = touch.pageY;
			isScrolling = undefined;
		};
	},
	slide.touchMove = function(event) {
		event.preventDefault();
		if (event.touches.length == 1) {
			if (!isScrolling) {
				var touch = event.touches[0],
					imgX = touch.pageX - pressX,
					imgY = touch.pageY - pressY;
				if (Math.abs(imgX) > Math.abs(imgY)) {
					//水平方向
					if (imgX > 0) {
						$(_slide).each(function(index, el) {
							var translate = parseInt($(el).data('translate'));
							if(index==0){
								$(el).css({
									'z-index': '99'
								});
							}
							$(el).css({
								'-webkit-transition': '0',
								'-webkit-transform': 'translate(' + (translate + imgX) + 'px,0) translateZ(0)'
							})
						});
						// $(_slide[page]).css({
						// 	'-webkit-transition': '0',
						// 	'-webkit-transform': 'translate(' + imgX + 'px,0) translateZ(0)'
						// }).prev().css({
						// 	'-webkit-transition': '0',
						// 	'-webkit-transform': 'translate(' + (-_c_w + imgX)+ 'px,0) translateZ(0)'
						// });

						if (Math.abs(imgX) > _c_w / 3) {
							direct = "right"; //向右\

						} else if (Math.abs(imgX) > _c_w) {
							alert(2)
						} else {
							direct = '';
						}
					} else {

						$(_slide).each(function(index, el) {
							var translate = parseInt($(el).data('translate'));
							$(el).css({
								'-webkit-transition': '0',
								'-webkit-transform': 'translate(' + (translate + imgX) + 'px,0) translateZ(0)'
							});
						});
						// $(_slide[page]).css({
						// 	'-webkit-transition': '0s',
						// 	'-webkit-transform': 'translate(' + imgX + 'px,0) translateZ(0)'
						// }).next().css({
						// 	'-webkit-transition': '0',
						// 	'-webkit-transform': 'translate(' + (_c_w + imgX)+ 'px,0) translateZ(0)'
						// });
						if (Math.abs(imgX) > _c_w / 3) {
							direct = "left"; //向左
						} else if (Math.abs(imgX) > _c_w) {

						} else {
							direct = '';
						}
					}
				} else {
					//垂直方向 暂时没用
					if (imgY > 0) {
						direct = "down"; //向下
						//do down function
					} else {
						direct = "up"; //向上
						//do up function
					}
				}
			}
		};
	},
	slide.touchEnd = function(event) {
		// 第一种写法：
		if (direct == 'right') {
			slide.prev();
		} else if (direct == 'left') {
			slide.next();
		} else {
			$(_slide).each(function(index, el) {
				var translate = $(el).data('translate');
				$(el).css({
					'-webkit-transition': '.4s',
					'-webkit-transform': 'translate(' + translate + 'px,0) translateZ(0)'
				})
			});
			// $(_slide[page]).css({
			// 	'-webkit-transition': '0.4s',
			// 	'-webkit-transform': 'translate(0) translateZ(0)'
			// }).prev().css({
			// 	'-webkit-transition': '0.4s',
			// 	'-webkit-transform': 'translate(' + _c_w + 'px,0) translateZ(0)'
			// });
		}
		// 第二种写法：
		// direct=='right' ?  slide.prev() :  direct=='left' ?  slide.next() : $(_slide[page]).css({
		// 		'-webkit-transform': 'translate(0) translateZ(0)'
		// });
	},
	slide.start = function() {
		time = setInterval(slide.next, 3000);
	},
	slide.stop = function() {
		clearInterval(time);
		time = null;
	}
	$('.next').on('click ', slide.next);
	$('.prev').on('click ', slide.prev);
	$('.slide').on('touchstart', slide.touchStart);
	$('.slide').on('touchmove', slide.touchMove);
	$('.slide').on('touchend', slide.touchEnd);
}
$(function() {
	slide();
})