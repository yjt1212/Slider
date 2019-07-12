/********
 *作者：杨金涛
 *项目名：jQuery轮播图
 *备注：null
 */

function SliderFn( _obj ){
	// console.log( _obj );


	//动态添加
	for(var i in _obj){
		this[i] = _obj[i];
	}
    
    //计数器
    this.inx = 0;

	this.init();
	// console.log( this );
}

SliderFn.prototype = {
	constructor : SliderFn,

	init:function(){
		var _self = this;
        
        //获取数据
		_self.getData();
	},

	getData:function(){
		var _self = this;

		$.ajax({
			url : 'http://localhost:9988/getData',
			type : 'get',
			dataType : 'json',
			success : function( _d ){
				// console.log( _d );
				$('<h1/>')
					.html( _d.a )
					.appendTo( $('#h1_id') );
			}
		});

        $.ajax({
			url : 'http://localhost:9988/slider_num',
			type : 'get',
			dataType : 'json',
			success : function( _d ){
				// console.log( _d );
				//获取数据之后，创建DOM
				_self.creatDOM( _d.arrs );

				_self.creatPointer( _d.arrs );

				_self.leftBtnFn( _d.arrs );

				_self.rightBtnFn( _d.arrs );

				_self.pointerBtnFn();
			}
		});


  
	},
	creatDOM:function( _data ){
		var _self = this;


	//设置ul的宽度(图片)
        _self.ulId.css('width',(_data.length * 800) )

        for(var i=0;i<_data.length;i++){

        	$('<li />')
        	.attr({'class' : 'li_' + (i+1)})
        	.html('<img src='+ _data[i]+' />')
        	.appendTo(_self.ulId);
        }
		
	},
	//生成小白点
	creatPointer:function( _data ){
		var _self = this;
		_self.pointerDivId.css({
			"width": _data.length * 40,
			"marginLeft": -(_data.length * 40)/2
		})

		for(var i=0;i<_data.length;i++){

        	$('<li />').appendTo(_self.pointerDivId);
        }
         
        var _lis = _self.pointerDivId.children();
        _lis.eq(0).addClass('pointer_focus');
	},
    	//左按钮
	leftBtnFn:function( _img ){
		var _self = this;

		_self.leftBtnId.on('click', function() {

			if(_self.inx < _img.length - 1){
				_self.inx++;
			} else {
				_self.inx = 0;
			}
			// console.log(_self.inx);
			_self.ulId.css('left',-(_self.inx * 800));

			_self.pointerDivId
			.children()
			.eq(_self.inx)
			.addClass('pointer_focus')
			.siblings()
			.removeClass();
		});
	},
    	//右按钮
	rightBtnFn:function( _img ){
		var _self = this;

		_self.rightBtnId.on('click', function() {

			if(_self.inx > 0){
				_self.inx--;
			} else {
				_self.inx = _img.length - 1;
			}
			// console.log(_self.inx);
			_self.ulId.css('left',-(_self.inx * 800));

			_self.pointerDivId
			.children()
			.eq(_self.inx)
			.addClass('pointer_focus')
			.siblings()
			.removeClass();
		});
	},
	//小白点点击事件
	pointerBtnFn:function(){
		var _self = this;
        
        	//获取所有小白点
		var _lisJqObj = _self.pointerDivId.children();

		_lisJqObj.on('click',function(){

			// console.log($(this).index());
			_self.inx = $(this).index();
			_self.ulId.css('left',-(_self.inx * 800));

		});
	}
};

new SliderFn({
	leftBtnId : $("#leftBtnId"),
	ulId : $("#ulId"),
	rightBtnId : $("#rightBtnId"),

	pointerDivId : $("#pointerDivId")
});
