window.onload = function(){
	var sence = document.getElementById('sence');
	var isWin = document.getElementById('isWin'),
		button = document.getElementById('button');
	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var row = 20;
	var els;
	var LEFT = 37,RIGHT = 39,TOP = 38,DOWN = 40;
	var direction = RIGHT;
	
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
			$(xx+'_'+yy).style.background = 'rgb(224, 63, 5)';
		}
		return {x:xx,y:yy};
	};
	var food = dropFood();
	console.log(food);
	
	for(i = 0;i<snake.length;i++){
		$(snake[i].x+'_'+snake[i].y).style.background = 'rgb(8, 17, 126)';
	}


	zou = function(){
		var last = snake.length - 1;
		var newHead;
		if(direction == RIGHT){
			newHead = {x:snake[last].x,y:snake[last].y+1};
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
			clearInterval(timer);
			isWin.style.display = 'block';
			button.onclick = function(){
				location.reload();
			}
			button.onmousedown = function(e){
				e.preventDefault();
			};
			return null;
		}
		if( isSnake(newHead.x,newHead.y) ){
			clearInterval(timer);
			isWin.style.display = 'block';
			button.onclick = function(){
				location.reload();
			};
			button.onmousedown = function(e){
				e.preventDefault();
			};
			return null;
		}
		if(newHead.x == food.x && newHead.y == food.y){
			$(newHead.x+'_'+newHead.y).style.background = 'rgb(8, 17, 126)';
			snake.push(newHead);
			food = dropFood();
			return null;
		}
		snake.push(newHead);
		$(newHead.x +'_'+newHead.y).style.background = 'rgb(8, 17, 126)';
		var weiba = snake.shift();
		$(weiba.x+'_'+weiba.y).style.background = '#DFDFDF';
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
	var timer = setInterval(zou,500);
}