Carousel �ĵ�
====================
���˵����
-
֧��`�ƶ���` ��`PC��`������ `<Zepto.js> `��`<jQuery.js> `���ɡ�
DOM�ṹ
-
	<div class="wrapper" id="wrapper">
		<div class="wrapper-sub" >
			<div class="slide">
				...
			</div>
			<div class="slide">
				...
			</div>
			<div class="slide">
				...
			</div>
			<div class="slide">
				...
			</div>
		</div>
	</div>

JS����
-
	$('#wrapper').carousel({
		auto: true,
		speed: 3000,
		focus:true,
		...
		callback: function(index,elem) {}
	});
��������
-
    auto: false,    //�Ƿ񲥷�true����false;
	speed: 3000,    //�����ٶ�;
	arrow:false,    //�Ƿ�������Ҽ�ͷ
	focus:true,     //�Ƿ����Բ�㽹��
	callback: ''    //�ص�����;


�ò������ѧϰ�����費�����ơ�
������������ϵ `262281610@qq.com`
