Carousel �ĵ�
====================
���˵����
-
֧�� `<�ƶ���> ` ��`<PC��> `������ `<Zepto.js> `��`<jQuery.js> `���ɡ�
DOM�ṹ
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

JS����
-
	$('#wrapper').carousel({
		auto: true,
		speed: 3000,
		arrow:true,
		callback: function(index,elem) {}
	});
��������
-
    auto: false,   //�Ƿ񲥷�true����false;
	speed: 3000,   //�����ٶ�;
	arrow:false,   //�Ƿ�������Ҽ�ͷ
	callback: ''   //�ص�����;


�ò������ѧϰ�����費�����ơ�
������������ϵ `<262281610@qq.com> `
