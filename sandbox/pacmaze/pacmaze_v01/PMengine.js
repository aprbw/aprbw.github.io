
//global variables
_isNotPaused=1;
_currentFrame_timestamp=_timestamp();
_lastFrame_timestamp=_currentFrame_timestamp;
_frameCount=0;
_actualFPS=-1;

_iloop = 1000;

var _PM_Gameloop = function(){
    while(_iloop>0){
        _iloop--
        if(_isNotPaused<0){
            requestAnimationFrame(_PM_Gameloop);
    //         return;
        }
        _currentFrame_timestamp=_timestamp();
        var deltaTime = _timestamp()-_lastFrame_timestamp;
        if(deltaTime<_TIMESTEP){
    //         _PM_Gameloop();
    //         return;
            continue;
        }
        console.log("d")
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
        _paku.onFrame();



        $("#display").text(Math.round(_actualFPS)+" "+_frameCount);
    }
    return;
}
