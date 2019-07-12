/********
 *作者：杨金涛
 *项目名：jQuery轮播图
 *备注：null
 */

//构造函数，首字母大写
function SliderFn( _obj ){
	// console.log( _obj );


	//动态添加
	for(var i in _obj){
		this[i] = _obj[i];
	}
    
    //引入计数器
    this.inx = 0;

    //启动方法入口
	this.init();
	// console.log( this );
}

SliderFn.prototype = {
	constructor : SliderFn,

	//启动方法
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

        //$('<li />')，这样写表示创建一个DOM节点
        //.appendTo(xx), 表示向xx这个dom节点当中，添加dom节点
        //$('<li />').attr({'class' : 'li_' + i})  新建dom节点li，同时给li节点，添加class
        //.html(i+1)  向dom节点当中，添加文字内容
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

		//设置小白点父容器的宽度
		// _self.pointerDivId.css("width",(_data.length * 40) );
		//设置小白点居中
		// _self.pointerDivId.css("marginLeft",-(_data.length * 40)/2 );

		_self.pointerDivId.css({
			"width": _data.length * 40,
			"marginLeft": -(_data.length * 40)/2
		})

		for(var i=0;i<_data.length;i++){

        	$('<li />').appendTo(_self.pointerDivId);
        }
         

        //切记:
        //children(),它找到的是一个jQuery对象的结合，它不能直接使用原生js的数组的方法
        
        // console.log(_self.pointerDivId.children()); //打印结果 id=‘pointerDivId’里的 li
        var _lis = _self.pointerDivId.children();

        //.eq(),用来获得jQuery集合当中的某个元素，从0开始计数
        //.addClass('pointer_focus'),添加class
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

			//修改小白点的class
			//.siblings(),它是在一组子节点当中，进行反选，
			//也就是说，你操作某个子节点，其实是返回了除子节点之外的,所有同级子节点
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

			//$(this),是把原生js当中的this,使用$()方法给包围起来
			//作用就是，可以直接使用jQuery的方法
			//$(this)，它指向某个jQuery对象

			//.index()，返回一组子节点中的某一个的索引
			//就是这个子节点排序第n，就返回 n+1 这个数，从0开始计算
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