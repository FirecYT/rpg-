'use strict';

var inv = {
	open: false,
	background: new rect(0, 0, 512, 512, "#555"),
	now_tab: 1,
	up_panel: new rect(0, 0, 512, 32, "#333"),
	close_btn: new rect(480, 0, 32, 32, "#700"),
	tabs: [
		{
			icon: new sprite("guiInfo.png", 32, 480, "#333"),
			use_panel: []
		},
		{
			icon: new sprite("guiInv.png", 32, 480, "#333"),
			use_panel: []
		},
		{
			icon: new sprite("guiInteraction.png", 32, 480, "#333"),
			use_panel: [
				new rect(32, 64+8, 32, 32, "#7A7", "#A77")
			]
		},
		{
			icon: new sprite("guiSettings.png", 32, 480, "#333"),
			use_panel: [
				new rect(32, 64+8, 32, 32, "#7A7", "#A77")
			]
		}
	],
	tabs_arrows: [
		new sprite("leftArrow.png", 0, 480, "#333"),
		new sprite("rightArrow.png", 480, 480, "#333"),
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

			new rect(0,480,512,32,"#333").draw(gui_cnv);
			for(let i in inv.tabs_arrows){
				inv.tabs_arrows[i].draw(gui_cnv);
			}
			inv.tabs[inv.now_tab].icon.draw(gui_cnv);

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
//
// ====================================================================================================
//
				case 2:
					let tmp = searchPlayer();
					inv.tabs[inv.now_tab].use_panel[0].active = 1;
					for(let i in mapChangers){
						if(player.room==mapChangers[i][1]){
							if( pointInObj({x: tmp[0], y: tmp[1]}, mapChangers[i][0])){
								inv.tabs[inv.now_tab].use_panel[0].active = 0;
								inv.tabs[inv.now_tab].use_panel[0].next_loc = mapChangers[i][2];
								break;
							}
						}
					}



					for(let i in inv.tabs[inv.now_tab].use_panel){
						inv.tabs[inv.now_tab].use_panel[i].draw(gui_cnv);
					}
					text(gui_cnv,"Сменить локацию",32,64,"#AAA","32px Pixel Cyr, monospace");
				break;
//
// ====================================================================================================
//
				case 3:
					inv.tabs[inv.now_tab].use_panel[0].active = game_settings.dev;

					for(let i in inv.tabs[inv.now_tab].use_panel){
						inv.tabs[inv.now_tab].use_panel[i].draw(gui_cnv);
					}
					text(gui_cnv,"Режим разработчика",32,64,"#AAA","32px Pixel Cyr, monospace");
				break;
//
// ====================================================================================================
//
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

		for(let i in inv.tabs_arrows){
			if(pointInObj(cOPos, tmpRect(inv.tabs_arrows[i]))){
				switch(+i){
					case 0:
						inv.now_tab = inv.now_tab==0?(inv.tabs.length-1):(+inv.now_tab-1);
					break;
					case 1:
						inv.now_tab = inv.now_tab==(inv.tabs.length-1)?0:(+inv.now_tab+1);
					break;
				}
			}
		}

		switch(inv.now_tab){
			case 2:
				for(let i in inv.tabs[inv.now_tab].use_panel){
					if(pointInObj(cOPos, tmpRect(inv.tabs[inv.now_tab].use_panel[i]))){
						if(i==0 && inv.tabs[inv.now_tab].use_panel[i].active==0){
							player.room=inv.tabs[inv.now_tab].use_panel[i].next_loc; // Устанавливаем нужную локацию
							game.draw_map();
						}
					}
				}
			break;
			case 3:
				for(let i in inv.tabs[inv.now_tab].use_panel){
					if(pointInObj(cOPos, tmpRect(inv.tabs[inv.now_tab].use_panel[i]))){
						game_settings.dev = !game_settings.dev;
					}
				}
			break;
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