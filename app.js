var express = require('express');
var app = express();

// 设置静态目录
app.use( express.static('public') );

// 解决跨域
app.all('*', function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
 	res.header("X-Powered-By", ' 3.2.1 ');
 	res.header("Content-Type", "application/json;charset=utf-8");
 	next();
 });


app.get('/getData', function( req, res ){

	var _obj = {a:'轮播图实例'};
	// console.log( _obj );
	res.send( _obj );
});

//返回轮播图的图片
app.get('/slider_num', function( req, res ){

	var _obj = {
		arrs:[
			'https://hbimg.huabanimg.com/2459e7ac4bb21fdbfbef8103b0cee849538df8a6e95ab-os7bIs_fw658',
			'https://hbimg.huabanimg.com/15acfb9580e72f028ab5561b6113fa891cf67ec7c9109-6CU5Vx_fw658',
			'https://hbimg.huabanimg.com/2ab2c07fc4064e66c08ae13dbf7b0b0692d67aff8e158-en54MW_fw658',
			'https://hbimg.huabanimg.com/73d771327d5d314061a0b3970b003fcbb39fd7e6f715a-2TqyCF_fw658'
		]
	};
	res.send( _obj );
});

app.listen(9988, function(){
	console.log('9988,中间件,已经启动');
});
