var _keycodeSpam = -1;

function onFrameInputSpam(){
	switch(_keycodeSpam){
		case 37: //left arrow
		case 65: //a
			_paku.goLeft();
			break;
		case 39:  //right arrow
		case 68: //d
			_paku.goRight();
			break;
		case 38: //up
		case 87: //w
			_paku.goUp();
			break;
		case 40: //down
		case 83: //s
			_paku.goDown();
			break;
		default:
	}
}

function onKeyUp_keyboard(e){
	switch(e.keyCode){
		case 37: //left arrow
		case 65: //a
		case 39:  //right arrow
		case 68: //d
		case 38: //up
		case 87: //w
		case 40: //down
		case 83: //s
		if(e.keyCode==_keycodeSpam){_keycodeSpam=-1;}
		break;
	}
}
function onKeyDown_keyboard(e){
	keyUncaught = false;
	switch(e.keyCode){
		//directionals:
		case 37: //left arrow
		case 65: //a
		case 39:  //right arrow
		case 68: //d
		case 38: //up
		case 87: //w
		case 40: //down
		case 83: //s
			_keycodeSpam=e.keyCode;
			break;
		case 189: //-
			if(_SCALE>600/1400){_SCALE/=1.3;}
			break;
		case 187: //+
			if(_SCALE<80/14){_SCALE*=1.3;}
			break;
		case 73: //i
			_OFFSET_Y+=_UNIT;
			break;
		case 74: //j
			_OFFSET_X+=_UNIT;
			break;
		case 75: //k
			_OFFSET_Y-=_UNIT;
			break;
		case 76: //l
			_OFFSET_X-=_UNIT;
			break;
		case 77: //m
			_FORCE_CAMERA_FOLLOW = (_FORCE_CAMERA_FOLLOW) ? false : true;
			break;
		case 80: //p
			_isNotPaused = (_isNotPaused)? 0 : 1;
			break;
		case 32: //space bar
			//console.log();
			break;
		default:
			console.log("onKeyDown_keyboard(e.keyCode): "+e.keyCode);
			keyUncaught=true;
	}
	if(!keyUncaught){
		e.preventDefault();
	}
}