var oxygen2Factory = new DynamicParticleFactory("oxygen2Factory");
oxygen2Factory.renderDynamicParticles=function(){
	//console.log("d");
    _canvasContext.beginPath();
    _canvasContext.strokeStyle=_O2_COLOR;
    this.container.forEach(function(adp){
        adp.renderDynamicParticle();
    });
    _canvasContext.stroke();
}
Oxygen2.prototype = new DynamicParticle(oxygen2Factory);
Oxygen2.prototype.constructor = Oxygen2;
function Oxygen2 (aFactory){
    DynamicParticle.apply(this,arguments);
}

oxygen2Factory.productClass = Oxygen2;