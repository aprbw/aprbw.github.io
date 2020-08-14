var antiLilyFactory = new DynamicParticleFactory("antiLilyFactory");
antiLilyFactory.biologicalMechanic=function(){
    this.container.forEach(function(adp){
        adp.biologicalMechanic();
    });
}
antiLilyFactory.renderDynamicParticles=function(){
    _canvasContext.beginPath();
    _canvasContext.fillStyle=_AL_COLOR;
    this.container.forEach(function(adp){
        adp.renderDynamicParticle();
    });
    _canvasContext.fill();
}
AntiLily.prototype = new Lily(antiLilyFactory);
AntiLily.prototype.constructor = AntiLily;
function AntiLily (aFactory){
    DynamicParticle.apply(this,arguments);
    this.setMass(_AL_MAXLIFE);
}
AntiLily.prototype.biologicalMechanic=function(){
    this.setMass(this.mass+_AL_DELTA_LIFE);
    if(this.mass<=1){
        this.factory.removeDynamicParticle(this);
    }
    if(this.mass>=2*_AL_MAXLIFE){
        this.reproduce();
    }
}
antiLilyFactory.productClass = AntiLily;