(function(){
	function requestFrame(callback){ //跨浏览器支持requestAnimationFrame方法
		if(window.requestAnimationFrame){ 
			window.requestAnimationFrame(callback);
		}else if(window.webkitRequestAnimationFrame){ 
			window.webkitRequestAnimationFrame(callback);
		}else if(window.mozRequestAnimationFrame){
			window.mozRequestAnimationFrame(callback);
		}
	}

	var wrapper=document.getElementById("wrapper");
	var ball=document.getElementById("ball");
	var floor=document.getElementById("floor");
	var startBtn=document.getElementById("start");
	var resetBtn=document.getElementById("reset");

	var ball_pos=0; //小球实时的top值

	var wrapperHeight=0;
	var ballHeight=0;
	var floorHeight=0;

	if(document.defaultView.getComputedStyle){
		ballHeight=parseInt(document.defaultView.getComputedStyle(ball,null).height);
		floorHeight=parseInt(document.defaultView.getComputedStyle(floor,null).height);
		wrapperHeight=parseInt(document.defaultView.getComputedStyle(wrapper,null).height);
	}else{
		ballHeight=parseInt(ball.currentStyle.height);
		floorHeight=parseInt(floor.currentStyle.height);
		wrapperHeight=parseInt(wrapper.currentStyle.height);
	}

	//upTargetPos和downTargetPos是上升和下降终点的小球的top样式值
	var upTargetPos=0; //上升的终点，初始时设为0，弹跳的过程中不断变大，即上升的高度越来越低
	var downTargetPos=wrapperHeight-floorHeight-ballHeight; //下降的终点，始终是个固定值

	var down=true; //是否处在下落的阶段
	var speed=(downTargetPos-upTargetPos)/10; 

	function bounce(){
		if(down){
			ball_pos+=speed;
			ball.style.top=ball_pos+"px";
			if(ball_pos===downTargetPos){
				down=false;
				upTargetPos+=10;
				speed=(downTargetPos-upTargetPos)/10;
			}
		}else{
			ball_pos-=speed;
			ball.style.top=ball_pos+"px";
			if(ball_pos===upTargetPos){
				down=true;
			}
		}
		if(downTargetPos!=upTargetPos){
			requestFrame(bounce);
		}else{ //一次弹跳结束
			resetBtn.removeAttribute("disabled");
			resetBtn.className="btn btn-default";

			startBtn.setAttribute("disabled","disabled");
			startBtn.className="btn btn-disabled";
		}
	}

	startBtn.addEventListener("click",function(){
		requestFrame(bounce);

		startBtn.setAttribute("disabled","disabled");
		startBtn.className="btn btn-disabled";
	});

	resetBtn.addEventListener("click",function(){
		
		ball_pos=0;
		ball.style.top="0px";

		upTargetPos=0;

		down=true; //是否处在下落的阶段
	    speed=(downTargetPos-upTargetPos)/10;

		startBtn.removeAttribute("disabled");
		startBtn.className="btn btn-default";

		resetBtn.setAttribute("disabled","disabled");
		resetBtn.className="btn btn-disabled";
		
	});
})();