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
				offsetX = 0,
				state = true,
				delay,
				delayT = 300,
				page = 0,
				pressX,
				pressY,
				direct,
				time;

			var carousel = {};

			/**
			 * 初始化
			 * @return {[type]} [description]
			 */
			carousel.init = function() {
				var _self = this;
				_self.handle();
				if (opts.auto) {
					_self.autoStart();
				};
			};

			/**
			 * 处理DOM
			 * @return {[type]} [description]
			 */
			carousel.handle = function() {
				var _self = this;
				$wrapperSub.css({
					'width': cw * counts,
					'-webkit-transform': 'translateX(0)'
				});
				$slide.css({
					'width': cw
				});
				if (opts.focus) {
					_self.point();
				};
				if (opts.arrow) {
					_self.arrow();
				};
				if (typeof opts.callback === 'function') {
					opts.callback(page, $slide[page]);
				}
				this.onEvent();
			}

			/**
			 * 跳转下一步
			 * @return {Function} [description]
			 */
			carousel.next = function() {
				if (state) {


					// if (page == counts) {
					// 	page = 0;
					// 	offsetX = 0;
					// };
					// 
					if (page != counts - 1) {
						page++;
						// console.log(page)
						offsetX = -page * cw;
						$Element.find('.focus a').eq(page).addClass('active').siblings().removeClass('active');
						$wrapperSub.css({
							'-webkit-transition': 'all 0.4s ease',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						})
						if (typeof opts.callback === 'function') {
							opts.callback(page, $slide[page]);
						}
						state = false;
						delay = setTimeout(function() {
							state = true;
							clearTimeout(delay);
						}, delayT);

					}

					if (page == counts - 1) {
						$Element.find('.next').hide();
					}
					$Element.find('.prev').show();


				};
			}

			/**
			 * 跳转上一步
			 * @return {[type]} [description]
			 */
			carousel.prev = function() {
				if (state) {
					if (page != 0) {
						page--;
						offsetX = -page * cw;
						$Element.find('.focus a').eq(page).addClass('active').siblings().removeClass('active');

						$wrapperSub.css({
							'-webkit-transition': 'all 0.4s ease',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						})
						if (typeof opts.callback === 'function') {
							opts.callback(page, $slide[page]);
						}
						state = false;
						delay = setTimeout(function() {
							state = true;
							clearTimeout(delay);
						}, delayT);
					}

					if (page == 0) {
						$Element.find('.prev').hide();
					};
					$Element.find('.next').show();

					// if (page == -1) {
					// 	page = counts - 1;
					// }

				}

			}

			/**
			 * 触摸开始时
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			carousel.touchStart = function(event) {
				if (event.touches.length == 1) {
					var touch = event.touches[0];
					pressX = touch.pageX;
					pressY = touch.pageY;
					isScrolling = undefined;
				};
			}

			/**
			 * 触摸移动中
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			carousel.touchMove = function(event) {
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
									'-webkit-transition': 'all 0s ease',
									'-webkit-transform': 'translateX(' + imgT + 'px) '
								})
								if (Math.abs(imgX) > cw / 3) {
									direct = "right"; //向右\

								} else if (Math.abs(imgX) > cw) {

								} else {
									direct = '';
								}
							} else {

								$wrapperSub.css({
									'-webkit-transition': 'all 0s ease',
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
			}

			/**
			 * 触摸移开后
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			carousel.touchEnd = function(event) {
				// 第一种写法：
				if (direct == 'right') {
					// console.log(page)
					if (page != 0) {
						carousel.prev();
					} else {
						$wrapperSub.css({
							'-webkit-transition': 'all 0.4s ease',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						});
					}
				} else if (direct == 'left') {
					// carousel.next();
					if (page != counts - 1) {
						carousel.next();
					} else {
						$wrapperSub.css({
							'-webkit-transition': 'all 0.4s ease',
							'-webkit-transform': 'translateX(-' + page * cw + 'px) '
						});
					};
				} else {
					$wrapperSub.css({
						'-webkit-transition': 'all 0.4s ease',
						'-webkit-transform': 'translateX(-' + page * cw + 'px) '
					});
				}
			}

			/**
			 * 绑定轮播事件
			 * @return {[type]} [description]
			 */
			carousel.onEvent = function() {
				var _self = this;
				$Element.find('.next').on('click ', _self.next);
				$Element.find('.prev').on('click ', _self.prev);
				$slide.on('touchstart', _self.touchStart);
				$slide.on('touchmove', _self.touchMove);
				$slide.on('touchend', _self.touchEnd);
			}

			/**
			 * 是否自动轮播
			 * @return {[type]} [description]
			 */
			carousel.autoStart = function() {
				var _self = this;
				if (typeof opts.speed == 'string') {
					opts.speed = 1000;
				}
				time = setInterval(_self.next, opts.speed);
			}

			/**
			 * 暂停轮播
			 * @return {[type]} [description]
			 */
			carousel.stop = function() {
				clearInterval(time);
				time = null;
			}

			/**
			 * 是否添加箭头
			 * @return {[type]} [description]
			 */
			carousel.arrow = function() {
				$Element.append('<div class="prev"></div><div class="next"></div>');
				if (page == 0) {
					$Element.find('.prev').hide();
				}
			}

			/**
			 * 是否添加焦点
			 * @return {[type]} [description]
			 */
			carousel.point = function() {
				var _html = '<div class="focus">';
				$slide.each(function(index, elem) {
					if (index == 0) {
						_html += '<a href="javascript:;" class="active"></a>';
					} else {
						_html += '<a href="javascript:;" ></a>';
					}
				})
				_html += '</div>';
				$Element.append(_html);
			}

			carousel.init();
		})

	}
})(window.jQuery || window.Zepto)