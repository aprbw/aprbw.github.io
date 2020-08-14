var _paku = new Character("_paku");
_paku.color = _PAKU_COLOR;
_paku.size = 2*_PAKU_RAIDUS;
_paku.v=_PAKU_SPEED;
_paku.mouthStep = 1;
_paku.renderCharacter=function(){
	cx=_scaler(this.px+_PAKU_RAIDUS,_OFFSET_X);
	cy=_scaler(this.py+_PAKU_RAIDUS,_OFFSET_Y);
	_canvasCtx.beginPath();
	_canvasCtx.moveTo(cx,cy);
	_canvasCtx.fillStyle=this.color;
	ms = _PAKU_MOUTHSIZE_CLOSED+(_PAKU_MOUTHSIZE_OPEN-_PAKU_MOUTHSIZE_CLOSED)*Math.abs(this.mouthStep)/_PAKU_MOUTH_STEP;
	switch(this.direction){
		case "left":
			ab=Math.PI+ms/2;
			ae=3*Math.PI-ms/2;
			break;
		case "right":
			ab=ms/2;
			ae=2*Math.PI-ms/2;
			break;
		case "up":
			ae=Math.PI+(Math.PI-ms)/2;
			ab=Math.PI+(Math.PI+ms)/2;
			break;
		case "down":
			ae=(Math.PI-ms)/2;
			ab=(Math.PI+ms)/2;
			break;
		default:
			console.log("Game is broken. Unknown case: "+this.direction+" in "+this.id+".direction");
	}
	_canvasCtx.arc(cx,cy,_PAKU_RAIDUS*_SCALE,ab,ae);
	_canvasCtx.fill();
}
_paku.onFrame=function(){
	//mouth mechanic
	if(this.vx+this.vy!=0){
		if(this.mouthStep>0){
			if(this.mouthStep==_PAKU_MOUTH_STEP){
				this.mouthStep=-_PAKU_MOUTH_STEP;
			}
		}
		console.log(this.mouthStep++);
	}
	this.kinematics();
	this.renderCharacter();
}