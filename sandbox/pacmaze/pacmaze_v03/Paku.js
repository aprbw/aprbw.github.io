function Paku(){
	this.vx=0;
	this.vy=0;
	this.dir="s";
}

Paku.prototype.init = function(){
	isLocated = false;
	while (!isLocated){
		this.gx=Math.floor(Math.random()*_MAZE.width);
		this.gy=Math.floor(Math.random()*_MAZE.height);
		isLocated = (_MAZE.map[this.gx][this.gy]==0) ? true:false;
	}
	this.px=_PAKU_RAIDUS+this.gx*_UNIT; 
	this.py=_PAKU_RAIDUS+this.gy*_UNIT;  
	this.cx=_scaler(this.px,_OFFSET_X);//canvasX
	this.cy=_scaler(this.py,_OFFSET_Y);//canvasY
}
Paku.prototype.onFrame=function(){
	this.kinematics();
	this.renderPaku();
}

Paku.prototype.renderPaku=function(){
	_canvasCtx.beginPath();
	_canvasCtx.fillStyle=_PAKU_COLOR;
	this.cx=_scaler(this.px,_OFFSET_X);
	this.cy=_scaler(this.py,_OFFSET_Y);
	_canvasCtx.arc(this.cx,this.cy,_PAKU_RAIDUS*_SCALE,0,2*Math.PI);
	_canvasCtx.fill();
}
Paku.prototype.kinematics=function(){
	this.px+=this.vx;
	this.py+=this.vy;
	this.gx=(this.px-_PAKU_RAIDUS)/_UNIT;
	this.gy=(this.py-_PAKU_RAIDUS)/_UNIT;
	gfx=Math.floor(this.gx);
	gfy=Math.floor(this.gy);
	gcx=Math.ceil(this.gx);
	gcy=Math.ceil(this.gy);
	this.gx=Math.round(this.gx);
	this.gy=Math.round(this.gy);
	switch(this.dir){
			case "r":
				if(gcx>=_MAZE.width||_MAZE.map[gcx][gfy]||_MAZE.map[gcx][gcy]){
					this.px=(gcx-1)*_UNIT+_PAKU_RAIDUS;
					this.stop();
				}
				break;
			case "l":
				if(gfx<0||_MAZE.map[gfx][gfy]||_MAZE.map[gfx][gcy]){
					this.px=(gfx+1)*_UNIT+_PAKU_RAIDUS;
					this.stop();
				}
				break;
			case "u":
				if(gfy<0||_MAZE.map[gfx][gfy]||_MAZE.map[gcx][gfy]){
					this.py=(gfy+1)*_UNIT+_PAKU_RAIDUS;
					this.stop();
				}
				break;
			case "d":
				if(gcy>=_MAZE.height||_MAZE.map[gfx][gcy]||_MAZE.map[gcx][gcy]){
					this.py=(gcy-1)*_UNIT+_PAKU_RAIDUS;
					this.stop();
				}
				break;
			case "s":
				//stop, thus do nothing
				break;
			default:
				console.log("game is broken _paku.dir="+this.dir);
	}
}
Paku.prototype.goLeft = function(){
	this.vx= -_PAKU_SPEED;
	this.vy=0;
	this.dir="l";
}
Paku.prototype.goRight = function(){
	this.vx= _PAKU_SPEED;
	this.vy=0;
	this.dir="r";
}
Paku.prototype.goUp = function(){
	this.vy= -_PAKU_SPEED;
	this.vx=0;
	this.dir="u";
}
Paku.prototype.goDown = function(){
	this.vy= _PAKU_SPEED;
	this.vx=0;
	this.dir="d";
}
Paku.prototype.stop = function(){
	this.vx=0;
	this.vy=0;
	this.dir="s";
}

Paku.prototype.checkLeft = function(){
	var boolHit=false;
	//Math.floor(this.getLeftBound()/7);

}







