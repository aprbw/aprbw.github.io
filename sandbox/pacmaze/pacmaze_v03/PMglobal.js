function _timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function _probabilisticRounding(an){
	var sign = Math.abs(an)/an;
	an=Math.abs(an);
    var leadingInteger = Math.floor(an);
    var trailingDecimal = an - leadingInteger;
    if (Math.random()<trailingDecimal){
        return sign*(leadingInteger+1);
    }else{
        return sign*leadingInteger;
    }
}

function _scaler(ax,ao){
    return (ax+ao)*_SCALE;
}

function _extWallCheck(ao){
    if(ao.getRightBound()>_MAZE.canvas.width){
        return "r";
    }
    if(ao.getLeftBound()<0){
        return "l";
    }
    if(ao.getTopBound()<0){
        return "t";
    }
    if(ao.getBottomBound()>_MAZE.canvas.height){
        return "b";
    }
    return false;
}