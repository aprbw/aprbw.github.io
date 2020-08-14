var _PointerState = "rem1O2";

function onMouseDown_Canvas(e){
	mx=e.offsetX;
    my=e.offsetY;
    console.log("canvas mouse down x: "+mx+"   y: "+my+"   state: "+ _PointerState);
    switch(_PointerState){
    	case "rem1O2":
		    oxygen2Factory.container.forEach(function(aoo){
		        distanceSqr = Math.pow(aoo.x-mx,2)+Math.pow(aoo.y-my,2);
		        if(distanceSqr<=aoo.radius*aoo.radius){
		        	console.log("Beatrice just shot:" , aoo);
		            oxygen2Factory.removeDynamicParticle(aoo);
		        }
		    });
		    break;
	    case "add100O2":
	    	for(co=0;co<100;co++){
	    		oo=oxygen2Factory.makeOne();
	    		oo.x=mx;
	    		oo.y=my;
	    	}
	    	break;
	    case "addLily":
	    	ll=lilyFactory.makeOne();
    		ll.x=mx;
    		ll.y=my;
	    	break;
	    case "remLily":
	    	lilyFactory.container.forEach(function(all){
	    		distanceSqr = Math.pow(all.x-mx,2)+Math.pow(all.y-my,2);
		        if(distanceSqr<=all.radius*all.radius){
		            lilyFactory.removeDynamicParticle(all);
		        }
	    	});
	    	break;
	    case "addAL":
	    	ll=antiLilyFactory.makeOne();
    		ll.x=mx;
    		ll.y=my;
	    	break;
	    case "remAL":
	    	antiLilyFactory.container.forEach(function(all){
	    		distanceSqr = Math.pow(all.x-mx,2)+Math.pow(all.y-my,2);
		        if(distanceSqr<=all.radius*all.radius){
		            antiLilyFactory.removeDynamicParticle(all);
		        }
	    	});
	    	break;
	    default:
	    console.log("YOU BROKE MY CODE!!!");
	}
}

function updateDisplay(){
	$("#fps").text(Math.round(_actualFPS));
    $("#time").text(Math.floor((_frameCount)/1800) + ":"+ Math.floor((_frameCount%1800)/30) + ":" +_frameCount%30);
	$("#02_count").text(oxygen2Factory.container.length+" : "+_deltaO2Count_rounded+" : "+ Math.round(_deltaO2Count_unrounded*1000000)/1000000);
	lc = lilyFactory.container.length;
	lilyTotalMass = 0;
	lilyFactory.container.forEach(function(al){lilyTotalMass+=al.mass;});
	$("#lilyCount").text(lc);
	$("#lilyZ").text(Math.round(lilyTotalMass));
	$("#lilyM").text(Math.round(lilyTotalMass/lc));
	alc = antiLilyFactory.container.length;
	alilyTotalMass = 0;
	antiLilyFactory.container.forEach(function(al){alilyTotalMass+=al.mass;});
	$("#alilyCount").text(alc);
	$("#alilyZ").text(Math.round(alilyTotalMass));
	$("#alilyM").text(Math.round(alilyTotalMass/alc));

	if(_frameCount%_TRACE_VALUES_MOD==0){
	    console.log(""
	        +_frameCount+";"
		    +oxygen2Factory.container.length+";"
		    +lc+";"
		    +Math.round(lilyTotalMass)+";"
		    +alc+";"
		    +Math.round(alilyTotalMass)
	    );
	}

}

function clickAddO2(){
	_PointerState = "add100O2";
}

function clickRemO2(){
	for(co=0;co<100;co++){
		if(oxygen2Factory.container.length==0){
			return;
		}
		io=Math.floor(Math.random()*oxygen2Factory.container.length);
		oxygen2Factory.removeDynamicParticle(oxygen2Factory.container[io]);
	}
}

function clickStartPause(){
	console.log("startpause clicked");
	if(_isPaused>=0){
		_isPaused=-111;
		$("#startpause").text("START");
	}else{
		_isPaused=111;
		$("#startpause").text("PAUSE");
	}
}

function clickAddLily(){
	_PointerState = "addLily";
}

function clickRemLily(){
	_PointerState = "remLily";
	for(cl=0;cl<10;cl++){
		if(lilyFactory.container.length==0){
			return;
		}
		il=Math.floor(Math.random()*lilyFactory.container.length);
		lilyFactory.removeDynamicParticle(lilyFactory.container[il]);
	}
}

function clickAddAL(){
	_PointerState="addAL";
}

function clickRemAL(){
	_PointerState="remAL";
}