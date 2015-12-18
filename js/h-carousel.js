/*
 * @authors H君(qq:262281610)
 * @date    2014-12-10 11:27:59
 * @version 1.0
 */
;
(function($) {
	$.fn.carousel = function(options) {
		// 默认参数
		$.fn.carousel.defaults = {
			auto: false, //是否播放true或者false;
			speed: 3000, //播放速度;
			arrow: false, //是否添加左右箭头
			focus: true, //是否添加圆点焦点
			callback: '' //回调函数;
		};
		var opts = $.extend({}, $.fn.carousel.defaults, options);
		return this.each(function() {
			var $Element = $(this),
				$wrapperSub = $Element.find('.wrapper-sub'),
				$slide = $wrapperSub.find('.slide'),
				counts = $slide.length,
				cw = $(window).width(),
				isScrolling,
				page = 0,
				pressX,
				pressY,
				direct,
				time;
			var offsetX = 0;
			var state = true;
			var t;
			var config = function() {
					$wrapperSub.css({
						'width': cw * counts,
						'-webkit-transform': 'translateX(0)'
					});
					$slide.css({
						'width': cw
					});
					var focusH = '<div class="focus">';
					$slide.each(function(index, elem) {
						if (index == 0) {
							focusH += '<a href="javascript:;" class="active"></a>';
						} else {
							focusH += '<a href="javascript:;" ></a>';
						}
					})
					focusH += '</div>';
					if (opts.focus) {
						$Element.append(focusH);
					};
					if (opts.arrow) {
						$Element.append('<div class="prev"></div><div class="next"></div>');
					};
					if (typeof opts.callback === 'function') {
						opts.callback(page, $slide[page]);
					}
					onEvent();
				},
				next = function() {
					if (state) {
						page++;
						if (page == counts) {
							page = 0;
							offsetX = 0;
						};
						offsetX = -page * cw;
						$Element.find('.focus a').eq(page).addClass('active').siblings().removeClass('active');

						$wrapperSub.css({
							'-webkit-transition': '0.4s',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						})
						if (typeof opts.callback === 'function') {
							opts.callback(page, $slide[page]);
						}
						state = false;
						t = setTimeout(function() {
							state = true;
							clearTimeout(t);

						}, 500);
					};

				},
				prev = function() {

					if (state) {
						page--;
						if (page == -1) {
							page = counts - 1;
						}
						offsetX = -page * cw;
						$Element.find('.focus a').eq(page).addClass('active').siblings().removeClass('active');

						$wrapperSub.css({
							'-webkit-transition': '0.4s',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						})
						if (typeof opts.callback === 'function') {
							opts.callback(page, $slide[page]);
						}
						state = false;
						t = setTimeout(function() {
							state = true;
							clearTimeout(t);
						}, 500);
					}

				},
				touchStart = function(event) {
					if (event.touches.length == 1) {
						var touch = event.touches[0];
						pressX = touch.pageX;
						pressY = touch.pageY;
						isScrolling = undefined;
					};
				},
				touchMove = function(event) {
					event.preventDefault();
					if (event.touches.length == 1) {
						if (!isScrolling) {
							var touch = event.touches[0],
								imgT = touch.pageX - pressX + offsetX,
								imgX = touch.pageX - pressX,
								imgY = touch.pageY - pressY;
							if (Math.abs(imgX) > Math.abs(imgY)) {
								//水平方向
								if (imgX > 0) {

									$wrapperSub.css({
										'-webkit-transition': '0',
										'-webkit-transform': 'translateX(' + imgT + 'px) '
									})

									if (Math.abs(imgX) > cw / 3) {
										direct = "right"; //向右\

									} else if (Math.abs(imgX) > cw) {
										alert(2)
									} else {
										direct = '';
									}
								} else {

									$wrapperSub.css({
										'-webkit-transition': '0s',
										'-webkit-transform': 'translateX(' + imgT + 'px) '
									})

									if (Math.abs(imgX) > cw / 3) {
										direct = "left"; //向左
									} else if (Math.abs(imgX) > cw) {

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
				touchEnd = function(event) {
					// 第一种写法：
					if (direct == 'right') {
						prev();
					} else if (direct == 'left') {
						next();
					} else {
						$wrapperSub.css({
							'-webkit-transition': '.4s',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						});
					}
				},
				start = function() {
					if (typeof opts.speed == 'string') {
						opts.speed = 1000;
					}
					time = setInterval(next, opts.speed);
				},
				stop = function() {
					clearInterval(time);
					time = null;
				},
				onEvent = function() {
					$Element.find('.next').on('click ', next);
					$Element.find('.prev').on('click ', prev);
					$slide.on('touchstart', touchStart);
					$slide.on('touchmove', touchMove);
					$slide.on('touchend', touchEnd);
				},
				init = function() {
					config();
					if (opts.auto) {
						start();
					};
				};
			init();
		})
	}
})(window.jQuery || window.Zepto)