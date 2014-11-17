var gameOver = false;
var intervalId;
var size = {};
var pos = {};
var tabId = [];
var level = "medium";
var moveStep = 2;

function timer(){
		$("#time").text((parseFloat($("#time").text()) - 0.1).toPrecision(3));		
		
		if(parseFloat($("#time").text()) == 0){
			window.clearInterval(intervalId);
			window.clearInterval(moveId);
			gameOver = true;
		}
		
		if(gameOver){
			for (i in tabId){
				$("#"+i).remove();
			}
			$("#polegry").append("<p>GAME OVER!</p><h2>your score is: <br />"+$("#score").text()+"</h2>").css({"fontWeight" : "bold", "fontSize" : "40px"});
		}
}

function move(){

	for (i in tabId){
	
		if(tabId[i]["x"] == "right"){
			$("#"+i).css("left", parseInt($("#"+i).css("left")) + moveStep);
			
			if(parseInt($("#"+i).css("left")) + tabId[i]["w"] > 400 - moveStep ){
				tabId[i]["x"] = "left";
			}
			
			
		}
		else{
			$("#"+i).css("left", parseInt($("#"+i).css("left")) - moveStep);
			
			if(parseInt($("#"+i).css("left")) < moveStep ){
				tabId[i]["x"] = "right";
			}
			
		}
		
		if(tabId[i]["y"] == "top"){
			$("#"+i).css("top", parseInt($("#"+i).css("top")) - moveStep);
			
			if(parseInt($("#"+i).css("top")) < moveStep ){
				tabId[i]["y"] = "bottom";
			}
			
		}
		else{
			$("#"+i).css("top", parseInt($("#"+i).css("top")) + moveStep);
			
			if(parseInt($("#"+i).css("top")) + tabId[i]["h"] > 400 - moveStep ){
				tabId[i]["y"] = "top";
			}
			
		}
		
		
	}
}

$(document).ready(function(){
	$("#buteasy").click(function(){
		level = "easy";
		$("#choose").text("you've chosen level easy");
	});
	$("#butmedium").click(function(){
		level = "medium";
		$("#choose").text("you've chosen level medium");
	});
	$("#buthard").click(function(){
		level = "hard";
		$("#choose").text("you've chosen level hard");
	});
	$("#butsuphard").click(function(){
		level = "superhard";
		$("#choose").text("you've chosen level superhard");
	});
	$("#but").click(function(){
		$(this).remove();
		$("#boxes").remove();
		$("#choose").remove();
		$("#buteasy").remove();
		$("#butmedium").remove();
		$("#buthard").remove();
		$("#butsuphard").remove();
		createBox(5);
		intervalId = window.setInterval("timer()",100);
		
		if( level == "medium"){
			moveId = window.setInterval("move()", 20);
		}
		else if( level == "easy"){
			moveId = window.setInterval("move()", 50);
		}
		else if(level == "hard"){
			moveId = window.setInterval("move()", 8);
		}
		else moveId = window.setInterval("move()", 5);
	});
	
}
);

function createBox(x){

	for(i=0;i<x;i++){
		var box = $("<div></div>");
		$(box).appendTo("#polegry");
		size = randSize(box);
		$(box).css("position", "absolute");
		pos = randPos(box);
		var id = randId(box);
		tabId[id] = [];
		tabId[id]["w"] = size.w;
		tabId[id]["h"] = size.h;
		
		if(Math.random() < 0.5){
			tabId[id]["x"] = "right";
		}
		else{
			tabId[id]["x"] = "left";
		}
		if(Math.random() < 0.5){
			tabId[id]["y"] = "top";
		}
		else{
			tabId[id]["y"] = "bottom";
		}
		
		randColor(box);
		box.click(function(){
			
			if(!gameOver){
				$(this).remove();
				$("#score").text(parseInt($("#score").text()) + 1);
				createBox(1);
				
			}
		});
		
	}
	
}

function randId(object){
	var d = new Date();
	var id = parseInt(d.getTime().toString()+(Math.floor(Math.random()*500)).toString());
	object.attr("id", id);
	return id;
}


function randSize(object){ //set width i height
	var w, h;
	w = Math.floor(Math.random() * 20) +40;
	h = Math.floor(Math.random() * 20) +40;
	object.css({"width" : w, "height" : h});
	return {"w" : w, "h" : h};
}

function randPos(object){
	var l, t;
	l = Math.floor(Math.random() * (400 - parseInt(object.css("width"))) ) +1;
	t = Math.floor(Math.random() * (400 - parseInt(object.css("height"))) ) +1;
	object.css({"left" : l, "top" : t});
	return {"l" : l, "t" : t};
}

function randColor(object){
	var back = ["green", "red", "blue", "orange", "black"];
	var c = Math.floor(Math.random() * back.length );
	object.css("background-color", back[c]);
}