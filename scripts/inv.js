'use strict';

var inv = {
	open: false,
	background: new rect(0, 0, 512, 512, "#555"),
	now_tab: 2,
	up_panel: new rect(0, 0, 512, 32, "#333"),
	close_btn: new rect(480, 0, 32, 32, "#700"),
	tabs_icon: [
		new sprite("guiInfo.png", 0, 480, "#333"),
		new sprite("guiInv.png", 84, 480, "#333"),
		new sprite("guiInteraction.png", 145, 480, "#333"),
	],
	interaction_panel: [
		new rect(32, 64+8, 32, 32, "#7A7", "#A77")
	],

	draw: () => {
		if(player.params.hp<=0){
			game_cnv.style["filter"]="grayscale(100%) blur(2px)";
			game_cnv.style["-webkit-filter"]="grayscale(100%), blur(3px)";

			game_cnv.removeEventListener("mouseup", clickEvent);
			inv.open=0;
			inv.show();
		} else {
			game_cnv.style["filter"]="grayscale("+ +( (player.params.maxHp || 100)-player.params.hp)/2+"%)";
			game_cnv.style["-webkit-filter"]="grayscale("+ +(100-player.hp)/2+"%)";
		}

		if(inv.open){
			inv.background.draw(gui_cnv);

			inv.up_panel.draw(gui_cnv);
			inv.close_btn.draw(gui_cnv);

			for(let i in inv.tabs_icon){
				inv.tabs_icon[i].draw(gui_cnv);
			}
			switch(inv.now_tab){
				case 0:
					if(player.params.hp<=0){
						text(gui_cnv,"You die",32,32+32,"#FAA","32px Pixel Cyr, monospace");
					} else {
						text(gui_cnv,"HP: "+player.params.hp,32,32+32,"#AAA","32px Pixel Cyr, monospace");
						text(gui_cnv,"MP: "+player.params.mp,32,32+64,"#AAA","32px Pixel Cyr, monospace");

						text(gui_cnv,"EXP: "+player.params.exp,32,128+32,"#AAA","32px Pixel Cyr, monospace");
						text(gui_cnv,"LVL: "+player.params.lvl,32,128+64,"#AAA","32px Pixel Cyr, monospace");
					}
				break;
				case 2:
					let tmp = searchPlayer();
					inv.interaction_panel[0].active = 1;
					for(let i in mapChangers){
						if(player.room==mapChangers[i][1]){
							if( pointInObj({x: tmp[0], y: tmp[1]}, mapChangers[i][0])){
								inv.interaction_panel[0].active = 0;
								inv.interaction_panel[0].next_loc = mapChangers[i][2];
								break;
							}
						}
					}



					for(let i in inv.interaction_panel){
						inv.interaction_panel[i].draw(gui_cnv);
					}
					text(gui_cnv,"Сменить локацию",32,64,"#AAA","32px Pixel Cyr, monospace");
				break;
			}

			if(player.game_class==5){
				text(gui_cnv,"Ты лох",32,256+64+32,"#77F","32px Pixel Cyr, monospace");
				text(gui_cnv,"Иди от сюда",32,256+64+64,"#77F","32px Pixel Cyr, monospace");
			}
		}
	},
	show: () => {
		let canWidth = window.matchMedia("(min-width: 512px)").matches;
		let canHeight = window.matchMedia("(min-height: 512px)").matches;

		if (canWidth && canHeight){
			gui_cnv.style.margin="-256px 0 0 -256px";
			gui_cnv.style.width="512px";
			game_cnv.style.width="0px";
		} else if (!canWidth && canHeight) {
			gui_cnv.style.width="100%";
			game_cnv.style.width="0px";
		} else if (canWidth && !canHeight) {
			gui_cnv.style.height="100%";
			game_cnv.style.height="0px";
		}
	},
	hide: () => {
		let canWidth = window.matchMedia("(min-width: 512px)").matches;
		let canHeight = window.matchMedia("(min-height: 512px)").matches;

		if (canWidth && canHeight){
			gui_cnv.style.margin="-256px 0 0 256px";
			gui_cnv.style.width="0px";
			game_cnv.style.width="512px";
		} else if (!canWidth && canHeight) {
			gui_cnv.style.width="0px";
			game_cnv.style.width="100%";
		} else if (canWidth && !canHeight) {
			gui_cnv.style.height="0px";
			game_cnv.style.height="100%";
		}
	},
	upd: () => {
		if(inv.open){
			inv.show();
		} else {
			inv.hide();
		}
	},
	mouseup_event: e => {
		let cPos = clickPos(e, gui_cnv);
		let cOPos = {x: cPos.x, y: cPos.y};

		if(pointInObj(cOPos, tmpRect(inv.close_btn))){
			inv.open=!inv.open;
			inv.upd();
			return;
		}

		for(let i in inv.tabs_icon){
			if(pointInObj(cOPos, tmpRect(inv.tabs_icon[i]))){
				inv.now_tab = +i;
			}
		}

		if(inv.now_tab==2){
			for(let i in inv.interaction_panel){
				if(pointInObj(cOPos, tmpRect(inv.interaction_panel[i]))){
					if(i==0 && inv.interaction_panel[i].active==0){
						player.room=inv.interaction_panel[i].next_loc; // Устанавливаем нужную локацию
						game.draw_map();
					}
				}
			}
		}
	},
	keyup_event: e => {
		if(e.keyCode==32){
			inv.open=!inv.open;
			inv.upd();
		}
	},
	init: () => {
		gui_cnv.addEventListener("mouseup", inv.mouseup_event);
		document.addEventListener("keyup", inv.keyup_event);
		setInterval(inv.draw, 10);
		inv.draw();
		inv.hide();
	},
}