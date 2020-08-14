function Ghost (aID){
	Character.call(this,aID);
	//random color;
	r = Math.round(Math.random()*255);
	g = Math.round(Math.random()*255);
	b = Math.round(Math.random()*255);
	this.color = "rgb("+r+","+g+","+b+")";
	CharacterContainer.addThis(this);
}
Ghost.prototype = Object.create(Character.prototype);
Ghost.prototype.onFrame=function(){
	this.randomWalker();
	//character
	this.kinematics();
	this.renderCharacter();
}
Ghost.prototype.randomWalker = function(){
	//call me before kinematics
	rr = Math.random();
	if(this.isStop||rr<0.01){
		rr = Math.random();
		if(rr<0.25){
			this.goLeft();
		}else if(rr<0.5){
			this.goRight();
		}else if(rr<0.75){
			this.goUp();
		}else{
			this.goDown();
		}
	}
}