(function(){

	var backgroundClockCanvas=document.getElementById("background-clock-canvas"); //背景画布
	var handWatchClockCanvas=document.getElementById("hand-watch-clock-canvas"); //指针画布

	/*
	var clockCanvasWidth=parseInt(getComputedStyleObj(backgroundClockCanvas).width);
	var clockCanvasHeight=parseInt(getComputedStyleObj(backgroundClockCanvas).height);
	*/
	var clockCanvasWidth=backgroundClockCanvas.width;
	var clockCanvasHeight=backgroundClockCanvas.height;

	var clockRadius=clockCanvasWidth<clockCanvasHeight?clockCanvasWidth/2*0.8:clockCanvasHeight/2*0.8;

	if(backgroundClockCanvas.getContext){

		var backgroundClock2dContext=backgroundClockCanvas.getContext("2d");
		
		backgroundClock2dContext.beginPath();

		backgroundClock2dContext.translate(clockCanvasWidth/2,clockCanvasHeight/2); //将canvas的中心点置为原点(0,0)
		
		/*
			绘制表盘边框
		*/
		backgroundClock2dContext.strokeStyle="#818181";
		backgroundClock2dContext.lineWidth=clockRadius*0.1;
		backgroundClock2dContext.arc(0,0,clockRadius*0.9,0,2*Math.PI,false);
		backgroundClock2dContext.stroke(); //描边路径

		backgroundClock2dContext.save(); //旋转之前保存当前设置，因为旋转一般都会涉及到PI，会产生误差；旋转之后恢复
		//到旋转前的设置

		/*
			绘制粗刻度线
		*/
		backgroundClock2dContext.lineWidth=8;
		for(var radian=0;radian<=2*Math.PI;radian+=Math.PI/6){
			backgroundClock2dContext.rotate(Math.PI/6);
			backgroundClock2dContext.moveTo(0,-clockRadius*0.9+15);
			backgroundClock2dContext.lineTo(0,-clockRadius*0.9+40);
		}
		backgroundClock2dContext.stroke(); //不同样式的路径，要进行不同的绘制（描边/填充）
		
		/*
			绘制细刻度线
		*/
		backgroundClock2dContext.lineWidth=3;
		for(var radian=0;radian<=2*Math.PI;radian+=Math.PI/30){
			backgroundClock2dContext.rotate(Math.PI/30);
			backgroundClock2dContext.moveTo(0,-clockRadius*0.9+15);
			backgroundClock2dContext.lineTo(0,-clockRadius*0.9+35);
		}
		backgroundClock2dContext.stroke();

		backgroundClock2dContext.restore();//恢复之前保存的最近一次的设置
		
		/*
			绘制刻度的数值
		*/
		backgroundClock2dContext.font="bold 22px Arial";
		backgroundClock2dContext.textAlign="center";
		backgroundClock2dContext.textBaseline = "middle";
		for(var radian=Math.PI/6,num=1;num<=12;radian+=Math.PI/6,num++){
			var x=Math.cos(radian-Math.PI/2)*(clockRadius*0.9-55);
			var y=Math.sin(radian-Math.PI/2)*(clockRadius*0.9-55);
			backgroundClock2dContext.fillText(num.toString(),x,y);
		}

		//表针的动态绘制
		if(handWatchClockCanvas.getContext){
			var handWatchClock2dContext=handWatchClockCanvas.getContext("2d");
			handWatchClock2dContext.translate(clockCanvasWidth/2,clockCanvasHeight/2);
			setClockTime(handWatchClock2dContext); //初始化表针位置
			setInterval(function(){ //每隔一秒更新一次时间
				setClockTime(handWatchClock2dContext);
			},1000);
		}
		
	}

	/*
	function getComputedStyleObj(obj){ //得到对象的计算样式对象
		return obj.currentStyle?obj.currentStyle:document.defaultView.getComputedStyle(obj,null);
	}
	*/

	function getNowTime(){ //得到当前的时、分、秒
		var now={};
		var time=new Date();
		now.hour=time.getHours();
		now.minute=time.getMinutes();
		now.second=time.getSeconds();
		return now;
	}

	function setClockTime(context){ 
		
		context.clearRect(-clockCanvasWidth/2,-clockCanvasHeight/2,clockCanvasWidth,clockCanvasHeight);

		context.beginPath(); //调用函数相当于进入了另一个作用域，要重新开启一段路径

		var now=getNowTime();

		context.save();
		context.strokeStyle="#818181";
		context.lineWidth=8;
		var hourRadian=(now.hour+now.minute/60+now.second/3600)/24*4*Math.PI;
		context.rotate(hourRadian);
		context.moveTo(0,10);
		context.lineTo(0,-clockRadius*0.35);
		context.stroke();
		context.restore();

		context.save();
		context.strokeStyle="#818181";
		context.lineWidth=5;
		var minuteRadian=(now.minute+now.second/60)/60*2*Math.PI;
		context.rotate(minuteRadian);
		context.moveTo(0,20);
		context.lineTo(0,-clockRadius*0.55);
		context.stroke();
		context.restore();

		context.save();
		context.strokeStyle="#818181";
		context.lineWidth=3;
		var secondRadian=now.second/60*2*Math.PI;
		context.rotate(secondRadian);
		context.moveTo(0,30);
		context.lineTo(0,-clockRadius*0.7);
		context.stroke();
		context.restore();
	}


})();