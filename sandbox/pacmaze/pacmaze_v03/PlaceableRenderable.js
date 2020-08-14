function PlaceableRenderable (){
	this.px;
	this.py;
	this.size=_UNIT;
	this.fillStyle = "lime";
	this.strokeStyle = "purple";
	this.isVisible=false;
	//shape is always rectangle
	this.placeRandomlyOnMap();
}

PlaceableRenderable.prototype.placeRandomlyOnMap = function (){
	px=_UNIT*Math.floor(Math.random()*_MAZE.width)-Math.floor(this.size/_UNIT);
	py=_UNIT*Math.floor(Math.random()*_MAZE.height)-Math.floor(this.size/_UNIT);
	this.placeOnMap(px,py);
}

PlaceableRenderable.prototype.placeOnMap = function(ax,ay){
	this.px=ax;
	this.py=ay;
	this.isVisible=true;
}

PlaceableRenderable.prototype.onFrame=function(){
	if(this.isVisible){this.renderPlaceableRenderable()};
}

PlaceableRenderable.prototype.renderMe=function(){
	cs=this.size * _SCALE;
	_canvasCtx.fillStyle=this.color;
	_canvasCtx.fillRect(_scaler(this.px,_OFFSET_X),_scaler(this.py,_OFFSET_Y),cs,cs);
}