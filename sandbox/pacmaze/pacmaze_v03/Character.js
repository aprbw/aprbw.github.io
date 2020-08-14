//all hit test assumes that Character.v (default speed) <= _UNIT

function Character (aID){
	this.id = aID;
	this.size = _UNIT; //size refer to the length of the side of the bounding box in pixel (which is always a square)
	this.color = "WhiteSmoke";
	//coordinate of the top left of the bounding box
	this.px;
	this.py;
	this.v=0;
	this.vx=0;
	this.vy=0;
	this.direction="left"; // left right up down stop
	//character has no grid (discrete) coordinate value
	//the canvas coordinate is calculated only before render
}
Character.prototype.placeRandomlyOnMap = function (){
	isLocated = false;
	gx =-1;
	gy =-1;
	cc = 0;
	outMostLoop : while (!isLocated){
		cc++;
		if(cc>10000){
			console.log(this.id+" cannot be placed after 10000 tries");
			return;
		}
		cs=Math.ceil(this.size/_UNIT)
		gx=Math.floor(Math.random()*_MAZE.width)-cs;
		gy=Math.floor(Math.random()*_MAZE.height)-cs;
		for(i=gx;i<gx+cs;i++){
			for(j=gy;j<gy+cs;j++){
				//console.log("placeRandomlyOnMap(): "+i+" "+j);
				if(_MAZE.map[i][j]==1){
					continue outMostLoop;
				}
			}
		}
		isLocated = true;
	}
	//console.log("It takes: "+cc+" tries to place "+this.id);
	this.px=gx*_UNIT; 
	this.py=gy*_UNIT;  
	this.cx=_scaler(this.px,_OFFSET_X);//canvasX
	this.cy=_scaler(this.py,_OFFSET_Y);//canvasY
}

Character.prototype.onFrame=function(){
	this.kinematics();
	this.renderCharacter();
}

Character.prototype.renderCharacter=function(){
	cs=this.size * _SCALE;
	_canvasCtx.fillStyle=this.color;
	_canvasCtx.fillRect(_scaler(this.px,_OFFSET_X),_scaler(this.py,_OFFSET_Y),cs,cs);
}
Character.prototype.kinematics=function(){
	this.px+=this.vx;
	this.py+=this.vy;
	switch(this.direction){
		case "left":
			tp=this.wallHitTestLeft();
			if(tp){
				this.px+=tp;
				this.stop();
			}
		break;
		case "right":
			tp=this.wallHitTestRight();
			if(tp){
				this.px-=tp;
				this.stop();
			}
		break;
		case "up":
			tp=this.wallHitTestTop();
			if(tp){
				this.py+=tp;
				this.stop();
			}
		break;
		case "down":
		tp=this.wallHitTestBottom();
			if(tp){
				this.py-=tp;
				this.stop();
			}
		break;
		case "stop":
		break;
		default:
			console.log("Game is broken. Unknown case: "+this.direction+" in "+this.id+".direction");
	}
}

Character.prototype.stop = function(){
	this.vx=0;
	this.vy=0;
}
Character.prototype.goLeft = function(){
	if(this.px%_UNIT==0){
		this.px-=this.v;
		wht = this.wallHitTestLeft();
		this.px+=this.v;
		if(wht!=0){return false;}
	}
	this.vx= -this.v;
	this.vy=0;
	this.direction="left";
	return true;	
}
Character.prototype.goRight = function(){
	if((this.px+this.size)%_UNIT==0){
		this.px+=this.v;
		wht = this.wallHitTestRight();
		this.px-=this.v;
		if(wht!=0){return false;}
	}
	this.vx= this.v;
	this.vy=0;
	this.direction="right";
	return true;
}
	
Character.prototype.goUp = function(){
	if(this.py%_UNIT==0){
		this.py-=this.v;
		wht = this.wallHitTestTop();
		this.py+=this.v;
		if(wht!=0){return false;}
	}
	this.vy= -this.v;
	this.vx=0;
	this.direction="up";
	return true;
}	
	
Character.prototype.goDown = function(){
	if((this.py+this.size)%_UNIT==0){
		this.py+=this.v;
		wht = this.wallHitTestBottom();
		this.py-=this.v;
		if(wht!=0){return false;}
	}
	this.vy= this.v;
	this.vx=0;
	this.direction="down";
	return true;
}
	
Character.prototype.wallHitTestLeft = function(){
	gx=this.px/_UNIT;
	gy=this.py/_UNIT;
	gs=this.size/_UNIT;
	gfx=Math.floor(gx);
	gfy=Math.floor(gy);
	gcx=Math.ceil(gx+gs-1);
	gcy=Math.ceil(gy+gs-1);

	if(gfx<0){return -this.px}

	for(j=gfy;j<=gcy;j++){
		if(_MAZE.map[gfx][j]){
			//console.log("wallHitTestLeft: "+gfx+" "+j);
			return (gfx+1)*_UNIT-this.px; //distance to wall surface in pixel
		}
	}
	return 0;

}
Character.prototype.wallHitTestRight = function(){
	gx=this.px/_UNIT;
	gy=this.py/_UNIT;
	gs=this.size/_UNIT;
	gfx=Math.floor(gx);
	gfy=Math.floor(gy);
	gcx=Math.ceil(gx+gs-1);
	gcy=Math.ceil(gy+gs-1);

	if(gcx>=_MAZE.width){return this.px+this.size-_MAZE.width*_UNIT}

	for(j=gfy;j<=gcy;j++){
		if(_MAZE.map[gcx][j]){
			//console.log("wallHitTestRight: "+gcx+" "+j);
			return this.px+this.size-(gcx)*_UNIT; //distance to wall surface in pixel
		}
	}
	return 0;

}
Character.prototype.wallHitTestTop = function(){
	gx=this.px/_UNIT;
	gy=this.py/_UNIT;
	gs=this.size/_UNIT;
	gfx=Math.floor(gx);
	gfy=Math.floor(gy);
	gcx=Math.ceil(gx+gs-1);
	gcy=Math.ceil(gy+gs-1);

	if(gfy<0){return -this.py}

	for(i=gfx;i<=gcx;i++){
		if(_MAZE.map[i][gfy]){
			//console.log("wallHitTestTop: "+i+" "+gfy);
			return (gfy+1)*_UNIT-this.py; //distance to wall surface in pixel
		}
	}
	return 0;

}
Character.prototype.wallHitTestBottom = function(){
	gx=this.px/_UNIT;
	gy=this.py/_UNIT;
	gs=this.size/_UNIT;	
	gfx=Math.floor(gx);
	gfy=Math.floor(gy);
	gcx=Math.ceil(gx+gs-1);
	gcy=Math.ceil(gy+gs-1);

	if(gcy>=_MAZE.height){return this.py+this.size-_MAZE.height*_UNIT}

	for(i=gfx;i<=gcx;i++){
		if(_MAZE.map[i][gcy]){
			//console.log("wallHitTestBottom: "+i+" "+gcy);
			return this.py+this.size-(gcy)*_UNIT; //distance to wall surface in pixel
		}
	}
	return 0;

}