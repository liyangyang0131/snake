window.onload = function(){
	var H = document.documentElement.clientHeight;
	var sence = document.getElementById('sence');
	var isWin = document.getElementById('isWin'),
		button1 = document.getElementById('button1'),
		button2 = document.getElementById("button2"),
		btn1 = document.getElementById("btn1"),
		btn2 = document.getElementById("btn2"),
		main = document.getElementById("main"),
		start = document.getElementById("start"),
		body = document.getElementsByTagName("body")[0];
	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var row = 15;
	var els;
	var LEFT = 37,RIGHT = 39,TOP = 38,DOWN = 40;
	var direction = RIGHT;
	var timer;
	//var kaiguan = true;

	var deal = function(){
		clearInterval(timer);
		$(food.x+'_'+food.y).setAttribute("class","kuai chongzi2");
		isWin.style.display = 'block';
		button1.onclick = function(){
			isWin.style.display = 'none';
			location.reload();
		}
		button2.onclick = function(){
			body.style.marginTop="0px";
			setTimeout(function(){
				location.reload();
			},2000)
		}
		button1.onmousedown = function(e){
			e.preventDefault();
		};
		button2.onmousedown = function(e){
			e.preventDefault();
		};
		return null;
	}

	start.style.height=H+"px";
	main.style.height=H+"px";

	
	var $ = function(id){
		return document.getElementById(id);
	}


	for(var i=0;i<row;i++){
		for(var j = 0;j<row;j++){
			els = document.createElement('div');
			els.setAttribute('class','kuai');
			els.setAttribute('id',i+'_'+j);
			els.style.width = (sence.offsetWidth-row-1)/row+'px';
			els.style.height = (sence.offsetHeight-row-1)/row+'px';
			sence.appendChild(els);
		}
	}

	var isSnake = function(a,b){
		for(i = 0;i<snake.length;i++){
			if( snake[i].x == a && snake[i].y == b ){
				return true;
			}
		}
		return false;
	}

	var dropFood = function(){
		var xx = Math.floor( Math.random()*row),
			yy = Math.floor( Math.random()*row);
		while( isSnake(xx,yy) ){
			xx = Math.floor( Math.random()*row);
			yy = Math.floor( Math.random()*row);
		}
		for(i = 0;i<row;i++){
			$(xx+'_'+yy).setAttribute("class","kuai chongzi");
		}
		return {x:xx,y:yy};
	};
	var food = dropFood();

	for(i = 0;i<snake.length;i++){
		if(i == snake.length-1){
			$(snake[i].x+'_'+snake[i].y).setAttribute("class","kuai head");
		}else{
			$(snake[i].x+'_'+snake[i].y).setAttribute("class","kuai body");
		}
	}
	
	var zou = function(){
		var last = snake.length - 1;
		var newHead;
		if(direction == RIGHT){
			newHead = {x:snake[last].x,y:snake[last].y+1};
			$(newHead.x+'_'+newHead.y).style.transform="180deg";
		}
		if(direction == LEFT){
			newHead = {x:snake[last].x,y:snake[last].y-1};
		}
		if(direction == TOP){
			newHead = {x:snake[last].x-1,y:snake[last].y};
		}
		if(direction == DOWN){
			newHead = {x:snake[last].x+1,y:snake[last].y};
		}
		if(newHead.x<0 || newHead.x>row-1 || newHead.y<0 || newHead.y>row-1){
			deal();
		}
		if( isSnake(newHead.x,newHead.y) ){
			deal();
		}
		if(newHead.x == food.x && newHead.y == food.y){

			$(newHead.x+'_'+newHead.y).setAttribute("class","kuai head");
			$(snake[snake.length-1].x+'_'+snake[snake.length-1].y).setAttribute("class","kuai body");
			snake.push(newHead);
			food = dropFood();
			return null;
		}
		snake.push(newHead);
		$(newHead.x+'_'+newHead.y).setAttribute("class","kuai head");
		$(snake[snake.length-2].x+'_'+snake[snake.length-2].y).setAttribute("class","kuai body");
		var weiba = snake.shift();
		$(weiba.x+'_'+weiba.y).setAttribute("class","kuai");

	}


	window.onkeydown = function(e){
		e.preventDefault();
		var el = e.keyCode;
		if(el==LEFT || el == RIGHT || el==TOP || el == DOWN || el == 32){
			if(Math.abs(direction - el) !== 2){
				direction = el;
			}
		}
	};

	//点击开始游戏
	btn1.onclick = function(){
		body.style.marginTop="-678px";
		timer = setInterval(zou,500);
	}
	//点击退出
	btn2.onclick = function(){
		window.close();
	}

}