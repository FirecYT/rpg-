'use strict';

let inv = 0;

let bg = new rect(0, 0, 512, 512, "#555"); // Задний фон
let tabs = [ // Вкладки
	new sprite("invMenuStatus.png", 0, 480, "#333")
]
let tab = 0; // Открытая вкладка

window.addEventListener("load", ()=>{
	setInterval(drawInv, 10)
	drawInv();
})

var upPanale = new rect(0, 0, 512, 32, "#333");
var invClose = new rect(480, 0, 32, 32, "#700");

var drawInv = function() {
	bg.draw(gui_cnv);

	upPanale.draw(gui_cnv);
	invClose.draw(gui_cnv);

	for(let i in tabs){
		tabs[i].draw(gui_cnv);
	}
	switch(tab){
		case 0:
			if(player.hp<=0){
				text(gui_cnv,"You die",32,32+32,"#FAA","32px Pixel Cyr, monospace");
				game_cnv.style["filter"]="grayscale(100%) blur(2px)";
				game_cnv.style["-webkit-filter"]="grayscale(100%), blur(3px)";

				game_cnv.removeEventListener("mouseup", fakeTick);
				game_cnv.removeEventListener("mouseup", openInv);
				inv=0;
					game_cnv.style.margin="-256px 0 0 -512px";
					gui_cnv.style.margin="-256px 0 0 0";
					gui_cnv.style.width="512px";
			} else {
				game_cnv.style["filter"]="grayscale("+ +(100-player.hp)/2+"%)";
				game_cnv.style["-webkit-filter"]="grayscale("+ +(100-player.hp)/2+"%)";
				
				text(gui_cnv,"HP: "+player.hp,32,32+32,"#AAA","32px Pixel Cyr, monospace");
				text(gui_cnv,"MP: "+player.mp,32,32+64,"#AAA","32px Pixel Cyr, monospace");

				text(gui_cnv,"EXP: "+player.exp,32,128+32,"#AAA","32px Pixel Cyr, monospace");
				text(gui_cnv,"LVL: "+player.lvl,32,128+64,"#AAA","32px Pixel Cyr, monospace");
			}
			text(gui_cnv,"На этом всё.",32,256+32,"#AAA","32px Pixel Cyr, monospace");
			text(gui_cnv,"Остальное будет не скоро.",32,256+64,"#AAA","32px Pixel Cyr, monospace");
			break;
	}

		if(_class==5){
			text(gui_cnv,"Ты лох",32,256+64+32,"#77F","32px Pixel Cyr, monospace");
			text(gui_cnv,"Иди от сюда",32,256+64+64,"#77F","32px Pixel Cyr, monospace");
		}
}

let updInvOpen = function() {
	if(inv){
		game_cnv.style.width="0px";
		gui_cnv.style.margin="-256px 0 0 -256px";
		gui_cnv.style.width="512px";
		console.log("A");
	} else {
		game_cnv.style.width="512px";
		gui_cnv.style.margin="-256px 0 0 256px";
		gui_cnv.style.width="0px";
		console.log("B");
	}
}

let openInv = function(e){
	let cX = e.layerX; // Я индус
	let cY = e.layerY;

	let pos = searchPlayer();

	if (Math.floor(cX/64)==pos[0] && Math.floor(cY/64)==pos[1]) {
		inv=!inv;
		updInvOpen();
	}
}

let InvEvent = function(e) {
	let cX = e.layerX; // Я индус
	let cY = e.layerY;

	if(collision({x: cX, y: cY}, generateRect(invClose))){
		inv=!inv;
		updInvOpen();
	}
}

game_cnv.addEventListener("mouseup", openInv);
gui_cnv.addEventListener("mouseup", InvEvent);