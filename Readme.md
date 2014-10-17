Carousel 文档
====================
插件说明：
-
支持 `<移动端> ` 、`<PC端> `，引入 `<Zepto.js> `或`<jQuery.js> `即可。
DOM结构
-
	<div class="wrapper" id="wrapper">
		<div class="wrapper-sub" >
			<div class="slide">
				<img src="images/1.jpg" alt="">
			</div>
			<div class="slide">
				<img src="images/2.jpg" alt="">
			</div>
			<div class="slide">
				<img src="images/3.jpg" alt="">
			</div>
			<div class="slide">
				<img src="images/2.jpg" alt="">
			</div>
		</div>
	</div>

JS调用
-
	$('#wrapper').carousel({
		auto: true,
		speed: 3000,
		arrow:true,
		callback: function(index,elem) {}
	});
参数配置
-
    auto: false,   //是否播放true或者false;
	speed: 3000,   //播放速度;
	arrow:false,   //是否添加左右箭头
	callback: ''   //回调函数;


该插件仅供学习，还需不断完善。
如有问题请联系 `<262281610@qq.com> `
