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
	{type: "wall", img: new title("title.png",0,16,16,16)}
]

let size = 64;

let drawMap = function() {
	for(let y in map) {
		for(let x in map[y]){
			id[0].img.draw(game_cnv, x*size, y*size, size, size);
			id[map[y][x]].img.draw(game_cnv, x*size, y*size, size, size);
		}
	}
}

let tick = function() {
	drawMap();
}

let canGo = function(x, y) {
	if(map[y][x]!=0){return false;} // Не переместиться в стенку
	let pos = searchPlayer();
	if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true;
	return false;
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

var startGame = function(){
	mouse_cnv.removeEventListener("mouseup", mouseup);
	mouseup = (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
		let cX = e.layerX; // Я не индус, буду дулать код короче
		let cY = e.layerY;

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

		drawMap();
	}
	mouse_cnv.addEventListener("mouseup", mouseup);

	for(let y in map) {
		for(let x in map[y]){
			if (map[y][x]==0) {
				if (randomInt(100)<=15) map[y][x]=2;
			}
		}
	}

	drawMap();
}