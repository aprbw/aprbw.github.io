<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>
<body>
<script>

//_CONSTANT
var _CANVAS_WIDTH = 480;
var _CANVAS_HEIGHT = 320;
var _FPS = 30;
var _TIMESTEP = 1000/_FPS;


//_global variables
var _frameCount =0;
var _lastFrameTimestamp=timestamp();
var _actualFPS=12345;
var _canvasElement = $("<canvas width='" + _CANVAS_WIDTH + 
                      "' height='" + _CANVAS_HEIGHT + "' style='border:1px solid #d3d3d3;'></canvas>");
var _canvasContext = _canvasElement.get(0).getContext("2d");


//global functions
function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
var _t05_mainGameLoop = function(){
	requestAnimationFrame(_t05_mainGameLoop);
	_currentFrameTimestamp=timestamp();
	var deltaTime = timestamp()-_lastFrameTimestamp;
	if(deltaTime<_TIMESTEP){
		//console.log("deltaTime: "+deltaTime );
		return;
	}
	_lastFrameTimestamp=timestamp();
	_actualFPS=1000/deltaTime;
	console.log("_actualFPS: "+_actualFPS+" deltaTime: "+deltaTime);

	masukanSemua();
	gerakSemua();
	gambarSemua();
}
function masukanSemua(){};
function gerakSemua(){};
function gambarSemua(){
};


//initalization

_canvasElement.appendTo('body');

//game start
console.log("game start "+_TIMESTEP);
_t05_mainGameLoop();
console.log("game end");

</script> 
</body>

</html>
