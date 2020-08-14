function Paku(){
	this.cx=Math.round(Math.random()*_CANVAS_WIDTH); //canvasX
	this.cy=Math.round(Math.random()*_CANVAS_HEIGHT); //canvasY
	this.vx=-_PAKU_SPEED;
	this.vy=0;
}

Paku.prototype.onFrame=function(){
	this.kinematics();
	this.renderPaku();
}

Paku.prototype.renderPaku=function(){
	_canvasCtx.beginPath();
	_canvasCtx.fillStyle=_PAKU_COLOR;
	_canvasCtx.arc(this.cx,this.cy,_PAKU_RAIDUS*_SCALE,0,2*Math.PI);
	_canvasCtx.fill();
}
Paku.prototype.kinematics=function(){
	this.cx+=this.vx;
	this.cy+=this.vy;
}
Paku.prototype.goLeft = function(){
	this.vx= -_PAKU_SPEED;
	this.vy=0;
}
Paku.prototype.goRight = function(){
	this.vx= _PAKU_SPEED;
	this.vy=0;
}
Paku.prototype.goUp = function(){
	this.vy= -_PAKU_SPEED;
	this.vx=0;
}
Paku.prototype.goDown = function(){
	this.vy= _PAKU_SPEED;
	this.vx=0;
}
Paku.prototype.hitWall = function(){
	this.vx=0;
	this.vy=0;
}