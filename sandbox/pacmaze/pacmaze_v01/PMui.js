function onKeyDown_keyboard(e){
	keyUncaught = false;
	switch(e.keyCode){
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
			console.log("onKeyDown_keyboard(e.keyCode): "+e.keyCode);
			keyUncaught=true;
	}
	if(!keyUncaught){
		event.preventDefault();
	}
}