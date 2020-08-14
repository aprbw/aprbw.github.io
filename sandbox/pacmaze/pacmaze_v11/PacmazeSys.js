var PacmazeSys = new (function PacmazeSys(){

})();
PacmazeSys.run = function(){
	console.log("random number check: "+Math.random());
	_SystemLoad(this);
	_WelcomeScreen(this);
	_LoadingScreen(this);
	_PacmazeGame(this);
	_GameOver(this);
}
function _SystemLoad(_){
	console.log("_SystemLoad(): begin");
	_.canvas=document.getElementById("canvasPM");
	_.cnv=document.getElementById("canvasPM");
	console.log("_SystemLoad(): end");
}
function _WelcomeScreen(_){
	console.log("_WelcomeScreen(): begin");
	console.log("_WelcomeScreen(): end");
}
function _LoadingScreen(_){
	console.log("_LoadingScreen(): begin");
	console.log("_LoadingScreen(): end");
}
function _PacmazeGame(_){
	console.log("_PacmazeGame(): begin");
	console.log("_PacmazeGame(): end");
}
function _GameOver(_){
	console.log("_GameOver(): begin");
	console.log("_GameOver(): end");
}