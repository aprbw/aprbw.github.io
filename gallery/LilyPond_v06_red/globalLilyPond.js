function _timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function probabilisticRounding(an){
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