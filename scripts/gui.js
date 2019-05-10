'use strict';

let inv = 0;

let bg = new rect(0, 0, 512, 512, "#666"); // Задний фон
let tabs = [ // Вкладки
	new sprite("invMenuStatus.png", 0, 480, "#333")
]
let tab = 0; // Открытая вкладка


window.addEventListener("load", ()=>{
	drawInv();
})

let drawInv = function() {
	bg.draw(gui_cnv);

	for(let i in tabs){
		tabs[i].draw(gui_cnv);
	}
	switch(tab){
		case 0:
			text(gui_cnv,"HP: "+player.hp,32,32+32,"#333","32px monospace");
			text(gui_cnv,"MP: "+player.mp,32,32+64,"#333","32px monospace");

			text(gui_cnv,"EXP: "+player.exp,32,128+32,"#333","32px monospace");
			text(gui_cnv,"LVL: "+player.lvl,32,128+64,"#333","32px monospace");

			text(gui_cnv,"На этом всё.",32,256+32,"#333","32px monospace");
			text(gui_cnv,"Остальное будет не скоро.",32,256+64,"#333","32px monospace");
			break;
	}
}


let openInv = function(e){
	let cX = e.layerX; // Я индус
	let cY = e.layerY;

	let pos = searchPlayer();

	if (Math.floor(cX/64)==pos[0] && Math.floor(cY/64)==pos[1]) {
		inv=!inv;
		if(inv){
			game_cnv.style.margin="-256px 0 0 -512px";
			gui_cnv.style.width="512px";
		} else {
			game_cnv.style.margin="-256px 0 0 -256px";
			gui_cnv.style.width="0px";
		}
	}
}


game_cnv.addEventListener("mouseup", openInv);