
/**
 * @authors H君
 * @date    2016-09-07 09:52:17
 * @version 1.1
 */

!function($) {
	

	var Carousel = function(element,options){

		this.options = options;
		this.$element = $(element);
		this.$wrapperSub = $(element).find('.wrapper-sub');
		this.$slide = this.$wrapperSub.find('.slide');
		this.counts = this.$slide.length;
		this.cw = $(window).width();
		this.page = 0 ;
		this.offsetX = 0 ;
		this.state = true ;
		this.delay = null ;
		this.delayT = 300 ;
		this.pressX = 0 ;
		this.pressY = 0 ;
		this.direct = null ;
		this.time = null ;
		this.isScrolling = null ;

		this.init(this.$element);
	}
	
	/*初始化*/
	Carousel.prototype.init = function($element) {
		var _self = this;
		_self.handle($element);
		if (_self.options.auto) {
			_self.autoStart();
		};
	};

	/*处理DOM*/
	Carousel.prototype.handle = function($element) {

		var _self = this;
	
		_self.$wrapperSub.css({
			'width': _self.cw * _self.counts,
			'-webkit-transform': 'translateX(0)'
		});
		_self.$slide.css({
			'width': _self.cw
		});
		if (_self.options.focus) {
			_self.point($element);
		};
		if (_self.options.arrow) {
			_self.arrow($element);
		};
		if (typeof _self.options.callback === 'function') {
			_self.options.callback(_self.page, _self.$slide[_self.page]);
		}
		_self.onEvent($element);
	}

	/*跳转下一步*/
	Carousel.prototype.next = function($element) {
		console.log($element)
		var _self = this;
		if (_self.state) {

			// if (_self.page == _self.counts) {
			// 	_self.page = 0;
			// 	_self.offsetX = 0;
			// };
			// 
			if (_self.page != _self.counts - 1) {
				_self.page++;
				// console.log(_self.page)
				_self.offsetX = -_self.page * _self.cw;
				$element.find('.focus a').eq(_self.page).addClass('active').siblings().removeClass('active');
				_self.$wrapperSub.css({
					'-webkit-transition': 'all 0.4s ease',
					'-webkit-transform': 'translateX(-' + _self.page * _self.cw + 'px) '
				})
				if (typeof _self.options.callback === 'function') {
					_self.options.callback(_self.page, _self.$slide[_self.page]);
				}
				_self.state = false;

				_self.delay = setTimeout(function() {
					_self.state = true;
					
					clearTimeout(_self.delay);
				}, _self.delayT);

			}

			if (_self.page == _self.counts - 1) {
				$element.find('.next').hide();
			}
			$element.find('.prev').show();


		};
	}

	/*跳转上一步*/
	Carousel.prototype.prev = function($element) {
		var _self = this;
		if (_self.state) {
			if (_self.page != 0) {
				_self.page--;
				_self.offsetX = -_self.page * _self.cw;
				$element.find('.focus a').eq(_self.page).addClass('active').siblings().removeClass('active');

				_self.$wrapperSub.css({
					'-webkit-transition': 'all 0.4s ease',
					'-webkit-transform': 'translateX(-' + _self.page * _self.cw + 'px) '
				})
				if (typeof _self.options.callback === 'function') {
					_self.options.callback(_self.page, _self.$slide[_self.page]);
				}
				_self.state = false;
				_self.delay = setTimeout(function() {
					_self.state = true;
					clearTimeout(_self.delay);
				}, _self.delayT);
			}

			if (_self.page == 0) {
				$element.find('.prev').hide();
			};
			$element.find('.next').show();

			// if (_self.page == -1) {
			// 	_self.page = _self.counts - 1;
			// }

		}

	}

	/*触摸开始时*/
	Carousel.prototype.touchStart = function(event) {
		var _self = this;
		if (event.touches.length == 1) {
			var touch = event.touches[0];
			_self.pressX = touch.pageX;
			_self.pressY = touch.pageY;
			_self.isScrolling = undefined;

			console.log(_self.pressX)		

		};
	}

	/*触摸移动中*/
	Carousel.prototype.touchMove = function(event) {
		var _self = this;
		event.preventDefault();
		if (event.touches.length == 1) {
			if (!_self.isScrolling) {
				var touch = event.touches[0],
					imgT = touch.pageX - _self.pressX + _self.offsetX,
					imgX = touch.pageX - _self.pressX,
					imgY = touch.pageY - _self.pressY;
					console.log(this)
				if (Math.abs(imgX) > Math.abs(imgY)) {
					//水平方向
					if (imgX > 0) {

						_self.$wrapperSub.css({
							'-webkit-transition': 'all 0s ease',
							'-webkit-transform': 'translateX(' + imgT + 'px) '
						})
						if (Math.abs(imgX) > _self.cw / 3) {
							_self.direct = "right"; //向右\

						} else if (Math.abs(imgX) > _self.cw) {

						} else {
							_self.direct = '';
						}
					} else {
						
						_self.$wrapperSub.css({
							'-webkit-transition': 'all 0s ease',
							'-webkit-transform': 'translateX(' + imgT + 'px) '
						})

						if (Math.abs(imgX) > _self.cw / 3) {
							_self.direct = "left"; //向左
						} else if (Math.abs(imgX) > _self.cw) {

						} else {
							_self.direct = '';
						}
					}
				} else {
					//垂直方向 暂时没用
					if (imgY > 0) {
						_self.direct = "down"; //向下
						//do down function
					} else {
						_self.direct = "up"; //向上
						//do up function
					}
				}
			}
		};
	}

	/*触摸移开后*/
	Carousel.prototype.touchEnd = function(event) {
		var _self = this;
		// 第一种写法：
		if (_self.direct == 'right') {
			// console.log(page)
			if (_self.page != 0) {
				_self.prev.call(_self,_self.$element)
			} else {
				_self.$wrapperSub.css({
					'-webkit-transition': 'all 0.4s ease',
					'-webkit-transform': 'translateX(-' + _self.page * _self.cw + 'px) '
				});
			}
		} else if (_self.direct == 'left') {
			// carousel.next();
			if (_self.page != _self.counts - 1) {
				_self.next.call(_self,_self.$element)
			} else {
				_self.$wrapperSub.css({
					'-webkit-transition': 'all 0.4s ease',
					'-webkit-transform': 'translateX(-' + _self.page * _self.cw + 'px) '
				});
			};
		} else {
			_self.$wrapperSub.css({
				'-webkit-transition': 'all 0.4s ease',
				'-webkit-transform': 'translateX(-' + _self.page * _self.cw + 'px) '
			});
		}
	}

	/*绑定轮播事件*/
	Carousel.prototype.onEvent = function($element) {
		var _self = this;
		$element.find('.next').on('click ', function(){
			_self.next.call(_self,$element)
		});
		$element.find('.prev').on('click ', function(){
			_self.prev.call(_self,$element)
		});
		_self.$slide.on('touchstart',function(event){
			_self.touchStart.call(_self,event)
		});
		_self.$slide.on('touchmove',function(event){
			_self.touchMove.call(_self,event)
		}); 
		_self.$slide.on('touchend',function(event){
			_self.touchEnd.call(_self,event)
		});  
	}

	
	/*是否自动轮播*/
	Carousel.prototype.autoStart = function() {
		var _self = this;
		if (typeof _self.options.speed == 'string') {
			_self.options.speed = 1000;
		}
		_self.time = setInterval(_self.next, _self.options.speed);
	}

	
	/*暂停轮播*/
	Carousel.prototype.stop = function() {
		clearInterval(time);
		_self.time = null;
	}

	/*是否添加箭头*/
	Carousel.prototype.arrow = function($element) {
		var _self = this;
		$element.append('<div class="prev"></div><div class="next"></div>');
		if (_self.page == 0) {
			$element.find('.prev').hide();
		}
	}

	
	/*是否添加焦点*/
	Carousel.prototype.point = function($element) {
		var _self = this;
		var _html = '<div class="focus">';
		_self.$slide.each(function(index, elem) {
			if (index == 0) {
				_html += '<a href="javascript:;" class="active"></a>';
			} else {
				_html += '<a href="javascript:;" ></a>';
			}
		})
		_html += '</div>';
		$element.append(_html);
	}


	$.fn.carousel = function(option) {

		//默认参数
		var element=this;
		var options = $.extend($.fn.carousel.defaults, option);

		return this.each(function () {
           new Carousel(this, options);
		})
		
	}

	$.fn.carousel.defaults = {
		auto: false, //是否播放true或者false;
		speed: 3000, //播放速度;
		arrow: false, //是否添加左右箭头
		focus: true, //是否添加圆点焦点
		callback: '' //回调函数;
	};

}(window.jQuery || window.Zepto)