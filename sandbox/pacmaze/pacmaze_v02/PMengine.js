
//global variables
_isNotPaused=1;
_currentFrame_timestamp=_timestamp();
_lastFrame_timestamp=_currentFrame_timestamp;
_frameCount=0;
_actualFPS=-1;


var _PM_Gameloop = function(){
    if(_isNotPaused<=0){
        requestAnimationFrame(_PM_Gameloop);
        return;
    }
    _currentFrame_timestamp=_timestamp();
    var deltaTime = _timestamp()-_lastFrame_timestamp;
    if(deltaTime<_TIMESTEP){
        _PM_Gameloop();
        return;
    }
    requestAnimationFrame(_PM_Gameloop);
    _canvasElmnt.width = _CANVAS_WIDTH;
    _frameCount++;
    _lastFrame_timestamp=_timestamp();
    _actualFPS=1000/deltaTime;
/*
    masukanSemua();
    gameMechanic();
    gerakSemua();
    gambarSemua();
    updateDisplay()
*/
    //on frame calls
    _MAZE.renderMaze();
    _paku.onFrame();
    forceCameraFollow();

    document.getElementById("display").text=Math.round(_actualFPS)+" "+_frameCount;
    return;
}

function forceCameraFollow(){
    if(_FORCE_CAMERA_FOLLOW){
        _OFFSET_X=_CANVAS_WIDTH/2/_SCALE-_paku.px;
        _OFFSET_Y=_CANVAS_HEIGHT/2/_SCALE-_paku.py;
    }
}