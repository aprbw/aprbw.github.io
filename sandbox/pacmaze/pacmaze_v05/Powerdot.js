var PowerdotFactory={
	container:[],
	serialNumber:0,
	phase:0,
	phaseMax:_POWERDOT_PHASE_MAX,
	color:_POWERDOT_COLOR,
	size:_POWERDOT_SIZE
};

PowerdotFactory.makeOne = function(){
	//and scatter
	var pd = new Powerdot(this);
	this.container.push(pd);
	this.serialNumber++;
	return pd;
}
PowerdotFactory.renderPowerdots=function(){
	_canvasCtx.beginPath();
	this.container.forEach(function(pp){
		pp.renderPowerdot();
	});
	_canvasCtx.fillStyle=this.color;
	_canvasCtx.fill();
}
PowerdotFactory.onFrame=function(){
	this.phase++;
	if(this.phase>0){
		if(this.phase>=this.phaseMax){
			this.phase=-this.phaseMax;
		}
	}
	this.renderPowerdots();
}
//===== =====
function Powerdot(afac){
	this.gx;
	this.gy;
	this.factory=afac;
	this.serialNumber=afac.serialNumber;
	this.phase=afac.phase;
	this.phaseMax=afac.phaseMax;
}
Powerdot.prototype.onFrame=function(){
	this.renderPowerdot();
}
_powerdotOffset=_UNIT/2-_POWERDOT_SIZE/2;
Powerdot.prototype.renderPowerdot=function(){
	px=_scaler(this.gx*_UNIT+_powerdotOffset,_OFFSET_X);
	py=_scaler(this.gy*_UNIT+_powerdotOffset,_OFFSET_Y);
	_canvasCtx.moveTo(px,py);
// 	ps=;
	_canvasCtx.arc(px,py,_SCALE*_POWERDOT_SIZE/2,0,2*Math.PI);
	//console.log(px,py);
}
_cs=Math.ceil(_POWERDOT_SIZE/_UNIT)
Powerdot.prototype.placeRandomlyOnMap = function (){
	isLocated = false;
	cc = 0;
	outMostLoop : while (!isLocated){
		cc++;
		if(cc>1234){
			console.log(this.id+" cannot be placed after 1234 tries: "+gx+" "+gy);
			return;
		}
		gx =-1;
		gy =-1;
		while(gx<0){gx=Math.floor(Math.random()*_MAZE.width)-_cs;}
		while(gy<0){gy=Math.floor(Math.random()*_MAZE.height)-_cs;}
		for(i=gx;i<gx+_cs;i++){
			for(j=gy;j<gy+_cs;j++){
				if(_MAZE.map[i][j]==1 || PacdotFactory.container[i][j]!=0){
					//console.log("placeRandomlyOnMap(powerdot): "+i+" "+j);
					continue outMostLoop;
				}
			}
		}
		isLocated=true;
	}
	//console.log("It takes: "+cc+" tries to place a Powerdot");
	this.gx=gx; 
	this.gy=gy;
}
