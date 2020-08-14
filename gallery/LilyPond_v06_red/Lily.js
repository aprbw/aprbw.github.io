var lilyFactory = new DynamicParticleFactory("lilyFactory");
lilyFactory.biologicalMechanic=function(){
    this.container.forEach(function(adp){
        adp.biologicalMechanic();
    });
}
lilyFactory.renderDynamicParticles=function(){
    _canvasContext.beginPath();
    _canvasContext.fillStyle=_LILY_COLOR;
    this.container.forEach(function(adp){
        adp.renderDynamicParticle();
    });
    _canvasContext.fill();
}
Lily.prototype = new DynamicParticle(lilyFactory);
Lily.prototype.constructor = Lily;
function Lily (aFactory){
    DynamicParticle.apply(this,arguments);
    this.setMass(_LILY_MAXLIFE);
}
Lily.prototype.biologicalMechanic=function(){
    this.setMass(this.mass+_LILY_DELTA_LIFE);
    if(this.mass<=1){
        this.factory.removeDynamicParticle(this);
    }
    if(this.mass>=2*_LILY_MAXLIFE){
        this.reproduce();
    }
}
Lily.prototype.inhale=function(ao){
    //console.log(this.vx+" + "+ao.vx);
    totalMass= this.mass+ao.mass;
    this.vx=(this.mass*this.vx+ao.mass*ao.vx)/totalMass;
    this.vy=(this.mass*this.vy+ao.mass*ao.vy)/totalMass;
    this.setMass(totalMass);
}
Lily.prototype.reproduce=function(){
    var theta = Math.random()*2*Math.PI;
    //child
    var childLily = this.factory.makeOne();
    childLily.x=this.x-Math.cos(theta)*this.radius/2;
    childLily.y=this.y-Math.sin(theta)*this.radius/2;
    childLily.setMass(probabilisticRounding(this.mass/2));
    //me
    this.x+=Math.cos(theta)*this.radius/2;
    this.y+=Math.sin(theta)*this.radius/2;
    this.setMass(probabilisticRounding(this.mass/2));   
}
lilyFactory.productClass = Lily;