//COSNTANT
var _CANVAS_WIDTH = 800;
var _CANVAS_HEIGHT = 600;
var _FPS = 30;
var _O2_NORMAL_COUNT = 700;
var _O2_REFPLENISHMENT_RATE = 0.0001;
var _O2_MASS=107;
var _O2_SIZE_FACTOR=0.1;
var _O2_COLOR="darkseagreen";
var _LILY_AIR_FRICTION_COEF =0.01;
var _LILY_COLOR = "green";
var _LILY_MAXLIFE = 100;
var _LILY_DELTA_LIFE = -0.1;
var _AL_COLOR= "brown";
var _AL_MAXLIFE = 100;
var _AL_DELTA_LIFE = -0.1;
var _LLvLL_GRAVITY_RANGE = 4;
var _LLvLL_GRAVITY_COEF=4;
var _ALvLL_GRAVITY_RANGE = 4;
var _ALvLL_GRAVITY_COEF=4;
var _TRACE_VALUES_MOD = 30;

var _TIMESTEP = 1000/_FPS;

//global variable
var _isPaused=10;
var _frameCount =0;
var _lastFrame_timestamp=_timestamp();
var _actualFPS=12345;
var _canvasElement = $("#canvasLilyPond");
var _canvasContext = _canvasElement.get(0).getContext("2d");
var _deltaO2Count_rounded=-1;
var _deltaO2Count_unrounded=-1.1;




function gameMechanic(){

// ===== O2 replenishment =====
_deltaO2Count_unrounded=_O2_REFPLENISHMENT_RATE*(_O2_NORMAL_COUNT-oxygen2Factory.container.length);
_deltaO2Count_rounded = probabilisticRounding (_deltaO2Count_unrounded);
if(_deltaO2Count_rounded>0){
    for(o2=0;o2<_deltaO2Count_rounded;o2++){oxygen2Factory.makeOne();}
}else if(_deltaO2Count_rounded<0){
    for(co=0;co>_deltaO2Count_rounded;co--){
        io=Math.floor(Math.random()*oxygen2Factory.container.length);
        oxygen2Factory.removeDynamicParticle(oxygen2Factory.container[io]);
    }
}

// ===== HIT TEST ===== lily vs lily
for(cl1=0;cl1<lilyFactory.container.length;cl1++){
    ll1=lilyFactory.container[cl1];
    for(cl2=cl1+1;cl2<lilyFactory.container.length;cl2++){
        ll2=lilyFactory.container[cl2];
        distSqr = (ll1.x-ll2.x)*(ll1.x-ll2.x) + (ll1.y-ll2.y)*(ll1.y-ll2.y);
        radius_sum = ll1.radius+ll2.radius;
        if(distSqr<=radius_sum*radius_sum*_LLvLL_GRAVITY_RANGE){
        radius_sum*=_LLvLL_GRAVITY_COEF/distSqr;
        ll1.force[0]+=radius_sum*(ll1.x-ll2.x);
        ll1.force[1]+=radius_sum*(ll1.y-ll2.y);
        ll2.force[0]+=radius_sum*(ll2.x-ll1.x);
        ll2.force[1]+=radius_sum*(ll2.y-ll1.y);
        }

    }
}

// ===== HIT TEST ===== antilily vs antilily
for(cl1=0;cl1<antiLilyFactory.container.length;cl1++){
    ll1=antiLilyFactory.container[cl1];
    for(cl2=cl1+1;cl2<antiLilyFactory.container.length;cl2++){
        ll2=antiLilyFactory.container[cl2];
        distSqr = (ll1.x-ll2.x)*(ll1.x-ll2.x) + (ll1.y-ll2.y)*(ll1.y-ll2.y);
        radius_sum = ll1.radius+ll2.radius;
        if(distSqr<=radius_sum*radius_sum*_ALvLL_GRAVITY_RANGE){
        radius_sum*=_ALvLL_GRAVITY_COEF/distSqr;
        ll1.force[0]+=radius_sum*(ll1.x-ll2.x);
        ll1.force[1]+=radius_sum*(ll1.y-ll2.y);
        ll2.force[0]+=radius_sum*(ll2.x-ll1.x);
        ll2.force[1]+=radius_sum*(ll2.y-ll1.y);
        }

    }
}

// ===== HIT TEST ===== lily vs 02
lilyFactory.container.forEach(function(al){
    oxygen2Factory.container.forEach(function(ao){
        distSqr = (al.x-ao.x)*(al.x-ao.x) + (al.y-ao.y)*(al.y-ao.y);
        if(distSqr<=(al.radius+ao.radius)*(al.radius+ao.radius)){
            al.inhale(ao);
            ao.factory.removeDynamicParticle(ao);
        }
    });
});

// ===== HIT TEST ===== lily vs antilily
antiLilyFactory.container.forEach(function(al){
    lilyFactory.container.forEach(function(ao){
        distSqr = (al.x-ao.x)*(al.x-ao.x) + (al.y-ao.y)*(al.y-ao.y);
        if(distSqr<=(al.radius+ao.radius)*(al.radius+ao.radius)){
            al.inhale(ao);
            ao.factory.removeDynamicParticle(ao);
        }
    });
});


// ===== Lily =====
lilyFactory.biologicalMechanic();
antiLilyFactory.biologicalMechanic();

}


var _lilypond_mainGameLoop = function(){
    requestAnimationFrame(_lilypond_mainGameLoop);
    if(_isPaused<0){
        return;
    }
    _currentFrame_timestamp=_timestamp();
    var deltaTime = _timestamp()-_lastFrame_timestamp;
    if(deltaTime<_TIMESTEP){
        //console.log("deltaTime: "+deltaTime );
        return;
    }
    _frameCount++;
    _lastFrame_timestamp=_timestamp();
    _actualFPS=1000/deltaTime;
    //console.log("_actualFPS: "+_actualFPS+" deltaTime: "+deltaTime);

    masukanSemua();
    gameMechanic();
    gerakSemua();
    gambarSemua();
    updateDisplay()
}
function masukanSemua(){};
function gerakSemua(){
    oxygen2Factory.kinetics();
    oxygen2Factory.kinematics();
    lilyFactory.kinetics();
    lilyFactory.kinematics();
    antiLilyFactory.kinetics();
    antiLilyFactory.kinematics();
};
function gambarSemua(){
    _canvasContext.clearRect(0,0,_CANVAS_WIDTH,_CANVAS_HEIGHT);
    oxygen2Factory.renderDynamicParticles();
    lilyFactory.renderDynamicParticles();
    antiLilyFactory.renderDynamicParticles();
};