_MAZE["map"]= new Array();
_MAZE["color"]=_WALL_COLOR;
//_MAZE["canvas"]= document.getElementById("canvasMaze");
_MAZE["canvas"]= document.createElement('canvas');
_MAZE["canvasCtx"] = _MAZE.canvas.getContext("2d");
_MAZE.canvas.style.backgroundColor = _CANVAS_BCKGRND_CLR;
_MAZE.canvas.width = _MAZE.width*_UNIT;
_MAZE.canvas.height = _MAZE.height*_UNIT;

_MAZE.createNew = function(){
	console.log("_MAZE.createNew():begin");
	ts = _timestamp();
	this.canvas.width= _MAZE.width*_UNIT
	this.canvasCtx.strokeStyle = this.color;
	this.canvasCtx.strokeRect(0,0,this.canvas.width,this.canvas.height);
	for (i=0;i<this.width;i++) {
		this.map[i]=new Array();
		for (j=0;j<this.height;j++) {
	 		this.map[i][j]=Math.round(Math.random()-0.49);
	 		if(this.map[i][j]==1){
	 			this.canvasCtx.strokeRect(i*_UNIT,j*_UNIT,_UNIT,_UNIT);
	 		}
		}
	}
	ts = _timestamp()-ts;
	console.log("_MAZE.createNew():end after: "+ts+" ms");
}

_MAZE.renderMaze = function(){
	_canvasCtx.drawImage(this.canvas,-_OFFSET_X,-_OFFSET_Y,_CANVAS_WIDTH/_SCALE,_CANVAS_HEIGHT/_SCALE,0,0,_CANVAS_WIDTH,_CANVAS_HEIGHT);
}