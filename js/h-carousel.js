/*
 * @authors H君(qq:262281610)
 * @date    2014-09-04 14:35:03
 * @version 1.0
 */
(function($) {
	$.fn.carousel = function(options) {
		// 默认参数
		$.fn.carousel.defaults = {
			auto: false,   //是否播放true或者false;
			speed: 3000,   //播放速度;
			arrow:false,   //是否添加左右箭头
			callback: ''   //回调函数;
		};
		var opts = $.extend({}, $.fn.carousel.defaults, options);
		return this.each(function() {
			var $Element = $(this),
				$slide = $Element.find('.slide'),
				$wrapperSub = $Element.find('.wrapper-sub'),
				cw = $(window).width(),
				counts = $slide.length,
				page = 0,
				time,
				isScrolling,
				pressX,
				pressY,
				direct;
			var init = function() {
					$wrapperSub.css('width', cw * counts);
					$slide.each(function(index, elem) {
						$(elem).css({
							'width': cw,
							'left': -(cw * index),
							'transition': '0',
							'-webkit-transition': '0',
							'-webkit-transform': 'translate(' + cw + 'px,0) translateZ(0)'
						}).attr('data-translate', +cw);
						if (index == 0) {
							$(elem).css({
								'-webkit-transform': 'translate(0) translateZ(0)'
							}).attr('data-translate', 0);
						} else if (index == counts - 1) {
							$(elem).css({
								'-webkit-transform': 'translate(-' + cw + 'px,0) translateZ(0)'
							}).attr('data-translate', -cw);
						};
					})
					if (opts.arrow) {
						$Element.append('<div class="prev"><</div><div class="next">></div>');
					};
					if (typeof opts.callback === 'function') {
						opts.callback(page,$slide[page]);
					}
				}(),
				next = function() {
					page++;
					if (page == counts) {
						page = 0;
					};
					$($slide[page]).css({
						'-webkit-transition': '.4s',
						'-webkit-transform': 'translate(0) translateZ(0)'
					}).attr('data-translate', '0').siblings().css({
						'z-index': '99',
						'-webkit-transition': '.4s',
						'-webkit-transform': 'translate(-' + cw + 'px,0) translateZ(0)'
					}).attr('data-translate', -cw);
					$($slide[page]).next().css({
						'z-index': '98',
						'-webkit-transition': '0',
						'-webkit-transform': 'translate(' + cw + 'px,0) translateZ(0)'
					})
					$($slide[page]).next().attr('data-translate', cw);
					if (page == counts - 1) {
						$($slide[0]).css({
							'z-index': '98',
							'-webkit-transition': '0',
							'-webkit-transform': 'translate(' + cw + 'px,0) translateZ(0)'
						}).attr('data-translate', +cw);
					};
					if (typeof opts.callback === 'function') {
						opts.callback(page,$slide[page]);
					}

				},
				prev = function() {
					page--;
					if (page == -1) {
						page = counts - 1;
					};
					$($slide[page]).css({
						'-webkit-transition': '.4s',
						'-webkit-transform': 'translate(0) translateZ(0)'
					}).attr('data-translate', '0').siblings().css({
						'z-index': '99',
						'-webkit-transition': '.4s',
						'-webkit-transform': 'translate(' + cw + 'px,0) translateZ(0)'
					}).attr('data-translate', cw);
					$($slide[page]).prev().css({
						'z-index': '98',
						'-webkit-transition': '0',
						'-webkit-transform': 'translate(-' + cw + 'px,0) translateZ(0)'
					})
					$($slide[page]).prev().attr('data-translate', -cw);
					if (page == 0) {
						$($slide[counts - 1]).css({
							'z-index': '98',
							'-webkit-transition': '0',
							'-webkit-transform': 'translate(-' + cw + 'px,0) translateZ(0)'
						}).attr('data-translate', -cw);

					};
					if (typeof opts.callback === 'function') {
						opts.callback(page,$slide[page]);
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
								imgX = touch.pageX - pressX,
								imgY = touch.pageY - pressY;
							if (Math.abs(imgX) > Math.abs(imgY)) {
								//水平方向
								if (imgX > 0) {
									$($slide).each(function(index, el) {
										var translate = parseInt($(el).data('translate'));
										if (index == 0) {
											$(el).css({
												'z-index': '99'
											});
										}
										$(el).css({
											'-webkit-transition': '0',
											'-webkit-transform': 'translate(' + (translate + imgX) + 'px,0) translateZ(0)'
										})
									});
									// $($slide[page]).css({
									// 	'-webkit-transition': '0',
									// 	'-webkit-transform': 'translate(' + imgX + 'px,0) translateZ(0)'
									// }).prev().css({
									// 	'-webkit-transition': '0',
									// 	'-webkit-transform': 'translate(' + (-cw + imgX)+ 'px,0) translateZ(0)'
									// });

									if (Math.abs(imgX) > cw / 3) {
										direct = "right"; //向右\

									} else if (Math.abs(imgX) > cw) {
										alert(2)
									} else {
										direct = '';
									}
								} else {

									$($slide).each(function(index, el) {
										var translate = parseInt($(el).data('translate'));
										$(el).css({
											'-webkit-transition': '0',
											'-webkit-transform': 'translate(' + (translate + imgX) + 'px,0) translateZ(0)'
										});
									});
									// $($slide[page]).css({
									// 	'-webkit-transition': '0s',
									// 	'-webkit-transform': 'translate(' + imgX + 'px,0) translateZ(0)'
									// }).next().css({
									// 	'-webkit-transition': '0',
									// 	'-webkit-transform': 'translate(' + (cw + imgX)+ 'px,0) translateZ(0)'
									// });
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
						$($slide).each(function(index, el) {
							var translate = $(el).data('translate');
							$(el).css({
								'-webkit-transition': '.4s',
								'-webkit-transform': 'translate(' + translate + 'px,0) translateZ(0)'
							})
						});
						// $($slide[page]).css({
						// 	'-webkit-transition': '0.4s',
						// 	'-webkit-transform': 'translate(0) translateZ(0)'
						// }).prev().css({
						// 	'-webkit-transition': '0.4s',
						// 	'-webkit-transform': 'translate(' + cw + 'px,0) translateZ(0)'
						// });
					}
					// 第二种写法：
					// direct=='right' ?  slide.prev() :  direct=='left' ?  slide.next() : $($slide[page]).css({
					// 		'-webkit-transform': 'translate(0) translateZ(0)'
					// });
				},
				start = function() {
					if (typeof opts.speed == 'string') {
						opts.speed=1000;
					} 
					time = setInterval(next, opts.speed);
				},
				stop = function() {
					clearInterval(time);
					time = null;
				};
			if (opts.auto) {
				start();
			};
			$('.next').on('click ', next);
			$('.prev').on('click ', prev);
			$slide.on('touchstart', touchStart);
			$slide.on('touchmove', touchMove);
			$slide.on('touchend', touchEnd);
		})

	}
})(window.jQuery || window.Zepto)
