//FACTORY 
function DynamicParticleFactory(aname){
    this.name=aname;
    this.productClass = DynamicParticle;
    this.intDefaultMass = 10;
    this.intDefaultSpeed = 1;
    this.intDefaultDensity=1;
    this.intSerialNumber=0;
    this.boolAnnihilatingWall = 0;
    this.container=[];
    this._linearAirFrictionCoeeficient=0;
}
DynamicParticleFactory.prototype.makeOne=function (){
    var dp=new this.productClass(this);
    dp.sn = this.intSerialNumber;
    this.intSerialNumber++;
    this.container.push(dp);
    return dp;
}

//calculate net forces and resulting acceleration
DynamicParticleFactory.prototype.kinetics=function(){
    this.container.forEach(function(adp){
        adp.kinetics();
    });
}

//calculate the resulting position and velocity from the given accelration
DynamicParticleFactory.prototype.kinematics=function(){
    this.container.forEach(function(adp){
        adp.kinematics();
    });
}

DynamicParticleFactory.prototype.renderDynamicParticles=function(){
    _canvasContext.beginPath();
    _canvasContext.strokeStyle="black";
    this.container.forEach(function(adp){
        adp.renderDynamicParticle();
    });
    _canvasContext.stroke();
}   

DynamicParticleFactory.prototype.removeDynamicParticle = function(adp){
    for(cdp=0;cdp<this.container.length;cdp++){
        if(this.container[cdp].sn==adp.sn){
            var dpTobeRemoved = this.container.splice(cdp,1);
            dpTobeRemoved = null;
            return;
        }
    }
}

//=================================
// PARTICLE
//=================================

function DynamicParticle(aFactory){
    this.sn=-1;
    this.factory=aFactory;
    this.x=Math.random()*_CANVAS_WIDTH;
    this.y=Math.random()*_CANVAS_HEIGHT;
    this.density=this.factory.intDefaultDensity;
    this.mass;
    this.area;
    this.radius;
    this.setMass(this.factory.intDefaultMass);
    this.vx=(Math.random()*2-1)*this.factory.intDefaultSpeed;
    this.vy=(Math.random()*2-1)*this.factory.intDefaultSpeed;
    this.ax=0;
    this.ay=0;
    this.force=[0,0];
}
DynamicParticle.prototype.setMass=function(aMass){
    this.mass = aMass;
    this.area = aMass/this.density;
    this.radius = Math.sqrt(this.area/Math.PI);
}
DynamicParticle.prototype.setRadius=function(ar){
    this.radius = ar;
    this.area = Math.PI*ar*ar;
    this.mass = this.area * this.density;
}
DynamicParticle.prototype.renderDynamicParticle=function (){
    _canvasContext.moveTo(this.x+this.radius,this.y);
    _canvasContext.arc(this.x,this.y,this.radius,0,2*Math.PI);
}

DynamicParticle.prototype.kinetics=function (){
    //[net force calculations here]
    ff=forceAirFriction(this);
    //console.log(ff);
    //accelration calculation
    this.ax=this.force[0]/this.mass;
    this.ay=this.force[1]/this.mass;
    this.force = [0,0];
}

DynamicParticle.prototype.kinematics=function (){
    this.vx+=this.ax;
    this.vy+=this.ay;
    this.x+=this.vx;
    this.y+=this.vy;

    var wallbump = false;
    if(this.x-this.radius<0){
        this.x=2*this.radius-this.x;
        this.vx*=-1;
        wallbump=true;
    }
    if(this.x+this.radius>_CANVAS_WIDTH){
        this.x= 2*(_CANVAS_WIDTH-this.radius) - this.x;
        this.vx*=-1;
        wallbump=true;
    }
    if(this.y-this.radius<0){
        this.y=2*this.radius-this.y;
        this.vy*=-1;
        wallbump=true;
    }
    if(this.y+this.radius>_CANVAS_HEIGHT){
        this.y= 2*(_CANVAS_HEIGHT-this.radius) - this.y;
        this.vy*=-1;
        wallbump=true;
    }

    if( DynamicParticleFactory.boolAnnihilatingWall && wallbump){
        DynamicParticle.removeDynamicParticle(this);
    }
}





//=================================
// FORCES
//=================================

function forceAirFriction(adp){
    return [adp.force[0]-adp.vx*adp.factory._linearAirFrictionCoeeficient,adp.force[1]-adp.vy*adp.factory._linearAirFrictionCoeeficient];
}