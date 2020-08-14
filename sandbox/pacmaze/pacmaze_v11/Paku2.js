var _paku = new Character("_paku");
_paku.rr = _PAKU_COLOR[0];
_paku.gg = _PAKU_COLOR[1];
_paku.bb = _PAKU_COLOR[2];
_paku.size = 2*_PAKU_RAIDUS;
_paku.mouthStep = 1;
_paku.mouthStepMAX =_PAKU_MOUTH_STEP_MIN ;
_paku.life = _LIFE_MAX;
_paku.alpha = 1;

_paku.renderCharacter=function(){
	cx=_scaler(this.px+_PAKU_RAIDUS,_OFFSET_X);
	cy=_scaler(this.py+_PAKU_RAIDUS,_OFFSET_Y);
	_canvasCtx.beginPath();
	_canvasCtx.fillStyle="rgba("+this.rr+","+this.gg+","+this.bb+","+this.alpha+")";
	_canvasCtx.moveTo(cx,cy);
	ms = _PAKU_MOUTHSIZE_CLOSED+(_PAKU_MOUTHSIZE_OPEN-_PAKU_MOUTHSIZE_CLOSED)*Math.abs(this.mouthStep)/_paku.mouthStepMAX;
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
	if(!this.isStop){
		if(this.mouthStep>0){
			if(this.mouthStep>=_paku.mouthStepMAX){
				this.mouthStep=-_paku.mouthStepMAX;
			}
		}
		this.mouthStep++;
		//console.log(this.mouthStep);
	}
	//life mechanic
	gx=this.px/_UNIT;
	gy=this.py/_UNIT;
	if( gx%1==0 && gy%1==0 && PacdotFactory.container[gx][gy]){
		PacdotFactory.removeThis(PacdotFactory.container[gx][gy]);
		this.life+=_PACDOT_LIFE;
		this.life = (this.life>_LIFE_MAX)?_LIFE_MAX:this.life;
	}
	this.life+=_LIFE_RATE;
	if(this.life<=0){_isNotPaused=-1;}
	liferatio = _paku.life/_LIFE_MAX;
	_paku.mouthStepMAX=_PAKU_MOUTH_STEP_MAX-Math.ceil((_PAKU_MOUTH_STEP_MAX-_PAKU_MOUTH_STEP_MIN)*liferatio);
	_paku.alpha = _PAKU_OPAQ_MIN+((1-_PAKU_OPAQ_MIN)*liferatio);
	//GhostHitTest
	CharacterContainer.forEach(function(cc){
		function ht(px,py){
    		return (px>_paku.px&&px<_paku.px+_paku.size&&py>_paku.py&&py<_paku.py+_paku.size);
		}
		if(ht(cc.px,cc.py)||ht(cc.px+cc.size,cc.py)||ht(cc.px,cc.py+cc.size)||ht(cc.px+cc.size,cc.py+cc.size)||ht(cc.px+cc.size/2,cc.py+cc.size/2)){
			_paku.life-=100;
			console.log("hit");
		}
	});
	//inherited
	this.kinematics();
	this.renderCharacter();
}

