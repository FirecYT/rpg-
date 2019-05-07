'use strict';

var map = [	[0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],]
var id = [
	{type: "floor", img: new title("title.png",0,0,16,16)},
	{type: "player", img: new title("title.png",16,0,16,16)},
	{type: "box", img: new title("title.png",0,16,16,16)}
]

var size = 64;



let tick = function(e) {
	let cX = e.layerX; // Я не индус, буду дулать... А-а-а!!!
	let cY = e.layerY;

	move(cX, cY);

	drawMap();
}

var startGame = function(){
	mouse_cnv.removeEventListener("mouseup", mouseup);
	mouse_cnv.addEventListener("mouseup", tick);

	for(let y in map) {
		for(let x in map[y]){
			if (map[y][x]==0) {
				if (randomInt(100)<=15) map[y][x]=2;
			}
		}
	}

	drawMap();
}



// Далее идут какие-то функции. Я бы сказал вспомогательные, но с ними возишься дольше.
let canGo = function(x, y) { // Особенно с этой
	if(map[y][x]!=0){return false;} // Не переместиться в стенку
	let pos = searchPlayer();
	if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true;
	return false;
}

let drawMap = function() {
	for(let y in map) {
		for(let x in map[y]){
			id[0].img.draw(game_cnv, x*size, y*size, size, size);
			id[map[y][x]].img.draw(game_cnv, x*size, y*size, size, size);
		}
	}
}

let searchPlayer = function() {
	for(let y in map) {
		for(let x in map[y]){
			if(map[y][x]==1){
				return [x, y];
			}
		}
	}
}

let move = function(cX, cY) {
	for(let y in map) {
		for(let x in map[y]){
			if( collision({x: cX, y: cY}, {x:x*size,y:y*size,w:size,h:size}) ){
				if(canGo(x, y)){
					let pos = searchPlayer();

					map[pos[1]][pos[0]]=0;
					map[y][x]=1;
				}
			}
		}
	}
}