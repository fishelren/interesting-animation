(function(){
	var images=document.getElementsByTagName("img");
	var container=document.getElementById("carousel-wrapper");
	var deg=0;
	for(var i=0;i<images.length;i++){
		(function(i){ //私有作用域解决循环绑定问题
			images[i].addEventListener("click",function(){
				deg-=40;
				container.style.transform="rotateY("+deg+"deg)";
			});
		})(i);
	}
})();