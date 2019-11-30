﻿'use strict';



var game = {
	classes_prefabs: [
		{maxHp:100, hp: 25,mp: 0,exp: 0,lvl: 0},
		{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
		{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
		{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
		{maxHp:100, hp: 9999,mp: 9999,exp: 9999,lvl: 9999},
		{maxHp:100, hp: 0,mp: 0,exp: 999,lvl: 9999}
	],
	map_generator: (randomize_num) => {
		for(let n in map) { // Тут случайно генерируются бочки
			for(let y in map[n]) {
				for(let x in map[n][y]){
					if (map[n][y][x]==0) {
						if (randomInt(100)<=randomize_num) map[n][y][x]=1; // Случайное число берём [0, 100] и если оно меньше randomize_num, то будет бочка
					}
				}
			}
		}
	},
	tick: () => {
		ai();
	},
	draw_map: () => {
		for(let y in map[room]) {
			for(let x in map[room][y]){
				mapTextures[0].img.draw(game_cnv, x*size, y*size, size, size);
				mapTextures[map[room][y][x]].img.draw(game_cnv, x*size, y*size, size, size);
			}
		}
		
		for(let i in npc){
			if(npc[i][0]==room) enemyTextures[1].img.draw(game_cnv, npc[i][2].x*size, npc[i][2].y*size, size, size);
		}

		for(let i in angryBots){
			if (angryBots[i].room==room) {
				enemyTextures[2].img.draw(game_cnv, angryBots[i].pos.x*size, angryBots[i].pos.y*size, size, size);
			}
		}

		let oldPosSize = 16;

		for(let i in player.old_positions){
			new rect(player.old_positions[i].x*size+oldPosSize*1.5,player.old_positions[i].y*size+oldPosSize*1.5,oldPosSize,oldPosSize,"rgba(0,127,0,"+(0.4-(0.1*i))+")").draw(game_cnv);
		}

		enemyTextures[0].img.draw(game_cnv, playerPos[room].x*size, playerPos[room].y*size, size, size);
	},
	NPC: (id) => {
		switch(id){
			case 0:
				alert("Ещё слишком рано... Приходи, когда будет обновление с ботами!");
				break;
		}
	},

	mouseup_event: (e) => {
		let cPos = clickPos(e, game_cnv); // Я не индус, буду делать... А-а-а!!!

		player.move(cPos.x, cPos.y); // Сразу же лвигаем персонажа
		let tmp = searchPlayer();

		for(let i in mapChangers){ // Перебераем триггеры локаций
			if( pointInObj({x: tmp[0], y: tmp[1]}, mapChangers[i][0]) && room==mapChangers[i][1] && pointInObj({x: Math.floor(cPos.x/size), y: Math.floor(cPos.y/size)}, mapChangers[i][0])){
				room=mapChangers[i][2]; // Устанавливаем нужную локацию
				break;
			}
		}
		for(let i in npc){ // Перебераем NPC
			if( room==npc[i][0] && pointInObj({x: tmp[0], y: tmp[1]}, npc[i][1]) && pointInObj({x: Math.floor(cPos.x/size), y: Math.floor(cPos.y/size)}, npc[i][2])){
				game.NPC(npc[i][3], tmp); // Вызываем функцию
				break;
			}
		}

		game.draw_map(); // Рисуем карту
	},
	keyup_event: (e) => {
		let tmpKey = searchPlayer();
		switch(e.keyCode){
			case 37: // Arrow left
			case 65: // A
				game.mouseup_event({layerX: tmpKey[0]*size+size/2-size,			layerY: tmpKey[1]*size+size/2})
			break;
			case 38: // Arrow up
			case 87: // W
				game.mouseup_event({layerX: tmpKey[0]*size+size/2,				layerY: tmpKey[1]*size+size/2-size})
			break;
			case 39: // Arrow right
			case 68: // D
				game.mouseup_event({layerX: tmpKey[0]*size+size/2+size,			layerY: tmpKey[1]*size+size/2})
			break;
			case 40: // Arrow down
			case 83: // S
				game.mouseup_event({layerX: tmpKey[0]*size+size/2,				layerY: tmpKey[1]*size+size/2+size})
			break;
		}
	},

	start: () => {
		game_cnv.addEventListener("mouseup", game.mouseup_event); // Добавляем новый
		document.addEventListener("keyup", game.keyup_event); // Добавляем новый

		game.map_generator(15); // Генерируем карту

		player.params = game.classes_prefabs[player.game_class]; // Установка класса
		game.draw_map(); // И рисуем карту
		inv.init();
	}
}

var player = {
	params: {},
	old_positions: [],
	room: 0,
	game_class: -1,
	can_go: (x, y) => {
			let pos = searchPlayer(); // Находим персонажа

			if(x==pos[0] && y==pos[1]){return false;} // Не переместиться в себя
			for(let i in npc){
				if(npc[i][0]==room && x==npc[i][2].x && y==npc[i][2].y){return false;} // Не переместиться в NPC
			}
			for(let i in angryBots){
				if(angryBots[i][0]==room && x==angryBots[i][1].x && y==angryBots[i][1].y){return false;} // Не переместиться в бота
			}
			if(mapTextures[map[room][y][x]].solid){return false;} // Не переместиться в стенку

			if( Math.abs(x-pos[0]) + Math.abs(y-pos[1]) == 2) { // Если ходит по диагонали
				if(mapTextures[map[room][pos[1]][(+pos[0]+ +(x-pos[0]))]].solid && mapTextures[map[room][(+pos[1]+ +(y-pos[1]))][pos[0]]].solid){ // И ему мещают ящики
					return false; // То он не идёт никуда
				}
			}

			if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true; // Если рядом и всё прошлое - ок, то пусть идёт

			return false; // Ну и если всё пошло не так, то ходить нельзя.
	},
	move: (goX, goY) => { // Ну а это движение гг (неожиданно, да?)
		let pos = searchPlayer();

		if (Math.floor(goX/64)==pos[0] && Math.floor(goY/64)==pos[1]) {
			inv.open=!inv.open;
			inv.upd();
		}

		for(let y in map[room]) { // Перебираем карту
			for(let x in map[room][y]){
				if( pointInObj({x: goX, y: goY}, {x:x*size,y:y*size,w:size,h:size}) ){ // Если мышька пересикается с одной из клеток
					if(player.can_go(x, y)){ // И если может двигаться
						// И двигаем
						player.old_positions.unshift({x: pos[0], y: pos[1]});
						if(player.old_positions.length>4)
							player.old_positions.pop();
						playerPos[room]={x:x,y:y};
						game.tick();
					}
				}
			}
		}
	}
}