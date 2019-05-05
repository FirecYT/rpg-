'use strict';

var map = [	[0,0,0,0],
			[0,1,0,0],
			[0,0,0,0],
			[0,0,0,0]]
var id = [
	{type: "floor", img: new title("title.png",0,0,16,16)},
	{type: "player", img: new title("title.png",16,0,16,16)}
]

let drawMap = function() {
	for(let y in map) {
		for(let x in map[y]){
			id[0].img.draw(game_cnv, x*128, y*128, 128, 128);
			id[map[y][x]].img.draw(game_cnv, x*128, y*128, 128, 128);
		}
	}
}

var startGame = function(){
	drawMap();

	mouse_cnv.removeEventListener("mouseup", mouseup);
	mouseup = (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
		let cX = e.layerX; // Я не индус, буду дулать код короче
		let cY = e.layerY;

		for(let y in map) {
			for(let x in map[y]){
				if( collision({x: cX, y: cY}, {x:x*128,y:y*128,w:128,h:128}) ){

					if(map[y][x]!=0){break;}

					for(let yP in map) {
						for(let xP in map[y]){
							if(map[yP][xP]==1){
								map[yP][xP]=0;
							}
						}
					}

					map[y][x]=1;

					id[1].img.draw(game_cnv, x*128, y*128, 128, 128)
				}
			}
		}

		drawMap();
	}
	mouse_cnv.addEventListener("mouseup", mouseup);
}