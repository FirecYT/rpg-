'use strict';

var inv = false;
var updInvOpen;

var runGui = function() {
	var bg = new rect(0, 0, 512, 512, "#555"); // Задний фон
	var tabs = [ // Вкладки
		new sprite("guiInfo.png", 0, 480, "#333"),
		new sprite("guiInv.png", 84, 480, "#333")
	]
	var tab = 0; // Открытая вкладка

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

					game_cnv.removeEventListener("mouseup", clickEvent);
					inv=0;
						showInv();
				} else {
					game_cnv.style["filter"]="grayscale("+ +( (player.maxHp || 100)-player.hp)/2+"%)";
					game_cnv.style["-webkit-filter"]="grayscale("+ +(100-player.hp)/2+"%)";
					
					text(gui_cnv,"HP: "+player.hp,32,32+32,"#AAA","32px Pixel Cyr, monospace");
					text(gui_cnv,"MP: "+player.mp,32,32+64,"#AAA","32px Pixel Cyr, monospace");

					text(gui_cnv,"EXP: "+player.exp,32,128+32,"#AAA","32px Pixel Cyr, monospace");
					text(gui_cnv,"LVL: "+player.lvl,32,128+64,"#AAA","32px Pixel Cyr, monospace");
				}
				break;
		}

			if(_class==5){
				text(gui_cnv,"Ты лох",32,256+64+32,"#77F","32px Pixel Cyr, monospace");
				text(gui_cnv,"Иди от сюда",32,256+64+64,"#77F","32px Pixel Cyr, monospace");
			}
	}

	updInvOpen = function() {
		if(inv){
			showInv();
		} else {
			hideInv();
		}
	}

	var InvEvent = function(e) {
		let cX = e.layerX; // Я индус
		let cY = e.layerY;

		if(pointInObj({x: cX, y: cY}, tmpRect(invClose))){
			inv=!inv;
			updInvOpen();
		}
	}

	gui_cnv.addEventListener("mouseup", InvEvent);

	var showInv = function() {
		game_cnv.style.width="0px";
		gui_cnv.style.margin="-256px 0 0 -256px";
		gui_cnv.style.width="512px";
	}

	var hideInv = function() {
		game_cnv.style.width="512px";
		gui_cnv.style.margin="-256px 0 0 256px";
		gui_cnv.style.width="0px";
	}

	setInterval(drawInv, 10);
	drawInv();
	hideInv();
}