'use strict';

var map = [
	[	[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,4,4,1,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,3,4,3,0,0,0,0]],

	[	[0,3,1,3,0,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,0,4,0,0,0,0,0],
		[0,0,4,0,0,0,0,3],
		[0,0,4,4,4,4,4,4],
		[0,0,0,0,0,0,0,3],
		[0,0,0,0,0,0,0,0]],

	[	[0,0,2,2,2,2,2,0],
		[0,0,2,4,3,4,2,0],
		[0,0,2,4,4,4,2,0],
		[0,0,2,4,4,4,2,0],
		[3,0,2,2,4,2,2,0],
		[1,4,4,4,4,0,0,0],
		[3,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0]]
]
var id = [
	{type: "floor", img: new title("title.png",0,0,16,16)},
	{type: "player", img: new title("title.png",16,0,16,16)},
	{type: "box", img: new title("title.png",0,16,16,16)},
	{type: "npc", img: new title("title.png",16,0,16,16)},
	{type: "fixed floor", img: new title("title.png",0,0,16,16)}
]

var size = 64;
var room = 0;

var triggers = [
	[{x:2,y:7,w:0,h:0}, 0, 1,'x'],
	[{x:2,y:0,w:0,h:0}, 1, 0,'x'],
	[{x:7,y:5,w:0,h:0}, 1, 2,'y'],
	[{x:0,y:5,w:0,h:0}, 2, 1,'y']
]

var npc = [
	//[room, trigger, posNPC, id]
	[2, {x:3,y:1,w:2,h:1}, {x:4,y:1,w:0,h:0}, 0]
]



let tick = function(e) {
	let cX = e.layerX; // Я не индус, буду делать... А-а-а!!!
	let cY = e.layerY;

	move(cX, cY);

	for(let i in triggers){
		if( collision({x: searchPlayer()[0], y: searchPlayer()[1]}, triggers[i][0]) && room==triggers[i][1] && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, triggers[i][0])){
			room=triggers[i][2];
			break;
		}
	}
	for(let i in npc){
		if( room==npc[i][0] && collision({x: searchPlayer()[0], y: searchPlayer()[1]}, npc[i][1]) && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, npc[i][2])){
			bot(npc[i][3]);
			break;
		}
	}

	drawMap();
}

var startGame = function(){
	mouse_cnv.removeEventListener("mouseup", mouseup);
	mouse_cnv.removeEventListener("mousemove", mousemove);
	mouse_cnv.addEventListener("mouseup", tick);

	for(let n in map) {
		for(let y in map[n]) {
			for(let x in map[n][y]){
				if (map[n][y][x]==0) {
					if (randomInt(100)<=15) map[n][y][x]=2;
				}
				if (map[n][y][x]==4) {
					map[n][y][x]=0;
				}
			}
		}
	}

	drawMap();
}



let bot = function(id) {
	switch(id){
		case 0:
			alert("Ещё слишком рано... Приходи, когда будет обновление с ботами!");
			break;
	}
}



// Далее идут какие-то функции. Я бы сказал вспомогательные, но с ними возишься дольше.
let canGo = function(x, y) { // Особенно с этой
	if(map[room][y][x]!=0){return false;} // Не переместиться в стенку
	let pos = searchPlayer();
	if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true;
	return false;
}

let drawMap = function() {
	for(let y in map[room]) {
		for(let x in map[room][y]){
			id[0].img.draw(game_cnv, x*size, y*size, size, size);
			id[map[room][y][x]].img.draw(game_cnv, x*size, y*size, size, size);
		}
	}
}

let searchPlayer = function() {
	for(let y in map[room]) {
		for(let x in map[room][y]){
			if(map[room][y][x]==1){
				return [x, y];
			}
		}
	}
}

let move = function(cX, cY) {
	for(let y in map[room]) {
		for(let x in map[room][y]){
			if( collision({x: cX, y: cY}, {x:x*size,y:y*size,w:size,h:size}) ){
				if(canGo(x, y)){
					let pos = searchPlayer();

					map[room][pos[1]][pos[0]]=0;
					map[room][y][x]=1;
				}
			}
		}
	}
}