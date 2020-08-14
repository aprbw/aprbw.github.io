var PacdotFactory = {
	container:new Array(),
	//pacdotPlacer : new Character("pacdotPlacer"),
}

_pacdotOffset = _UNIT/2-_PACDOT_SIZE/2;

PacdotFactory.onFrame=function(){
	this.renderPacdots();
}
PacdotFactory.renderPacdots = function(){
	_canvasCtx.beginPath();

	temp=Math.floor(-_OFFSET_X/_UNIT);
	imin=(temp<0)?0:temp;

	temp+=Math.ceil(_CANVAS_WIDTH/_SCALE/_UNIT);
	imax=(temp>=this.container.length)?this.container.length-1:temp;

	temp=Math.floor(-_OFFSET_Y/_UNIT);
	jmin=(temp<0)?0:temp;

	temp+=Math.ceil(_CANVAS_HEIGHT/_SCALE/_UNIT);
	jmax=(temp>=this.container[0].length)?this.container[0].length-1:temp;

	while(imin<=imax){
		j=jmin;
		while(j<=jmax){
			if(this.container[imin][j]){this.container[imin][j].renderPacdot();}
			j++;
		}
		imin++;
	}

	_canvasCtx.fillStyle=_PACDOT_COLOR;
	_canvasCtx.fill();
}
PacdotFactory.makeOne = function(ax,ay){
	this.container[ax][ay]=new Pacdot(ax,ay);
}
PacdotFactory.removeThis = function (aPD){
	this.container[aPD.gx][aPD.gy]=0;
	adp=null;
}
PacdotFactory.populate = function(){
	percent =0.1;
	for (i=0;i<_MAZE.width;i++) {
		this.container[i]=new Array();
		for (j=0;j<_MAZE.height;j++) {
			if( _probabilisticRounding(1-percent) || _MAZE.map[i][j]){
				this.container[i][j]=0;
			}else{
				this.makeOne(i,j);
			}			
		}
	}
}

//===== =====

function Pacdot(ax,ay){
	this.gx=ax;
	this.gy=ay;
}

Pacdot.prototype.renderPacdot = function(){
	sc = _PACDOT_SIZE*_SCALE;
	px=_scaler(this.gx*_UNIT+_pacdotOffset,_OFFSET_X);
	py=_scaler(this.gy*_UNIT+_pacdotOffset,_OFFSET_Y);
	if(px>0 && px<_CANVAS_WIDTH && py>0 && py<_CANVAS_HEIGHT ){_canvasCtx.rect(px,py,sc,sc);}
}