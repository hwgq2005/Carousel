Carousel 文档
====================
插件说明：
-
此插件可用于内容、图片轮播，支持`移动端` 、`PC端`，引入 `<Zepto.js> `或`<jQuery.js> `即可。
DOM结构
-
	<div class="wrapper" id="wrapper">
		<div class="wrapper-sub" >
			<div class="slide">
				content...
			</div>
			<div class="slide">
				content...
			</div>
			<div class="slide">
				content...
			</div>
			<div class="slide">
				content...
			</div>
		</div>
	</div>

JS调用
-
	$('#wrapper').carousel({
		auto: true,
		speed: 3000,
		focus:true,
		...
		callback: function(index,elem) {}
	});
参数配置
-

    auto:  false,    //是否播放true或者false;
	speed: 3000,    //播放速度;
	arrow:false,    //是否添加左右箭头
	focus:true,     //是否添加圆点焦点
	callback: ''    //回调函数;


该插件仅供学习，不断完善中。如有问题请联系 `262281610@qq.com`
