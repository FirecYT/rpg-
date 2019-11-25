'use strict';

var _classes_pref = [
	{maxHp:100, hp: 25,mp: 0,exp: 0,lvl: 0},
	{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
	{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
	{maxHp:100, hp: 100,mp: 0,exp: 0,lvl: 0},
	{maxHp:100, hp: 9999,mp: 9999,exp: 9999,lvl: 9999},
	{maxHp:100, hp: 0,mp: 0,exp: 999,lvl: 9999}
]

var player;


var realTick = function() {
	bot();
}


var clickEvent = function(e) { // Тик или как это ещё можно обозвать?
	let cX = clickPos(e, game_cnv).x; // Я не индус, буду делать... А-а-а!!!
	let cY = clickPos(e, game_cnv).y;

	move(cX, cY); // Сразу же лвигаем персонажа
	let tmp = searchPlayer();

	for(let i in mapChangers){ // Перебераем триггеры локаций
		if( pointInObj({x: tmp[0], y: tmp[1]}, mapChangers[i][0]) && room==mapChangers[i][1] && pointInObj({x: Math.floor(cX/size), y: Math.floor(cY/size)}, mapChangers[i][0])){
			room=mapChangers[i][2]; // Устанавливаем нужную локацию
			break;
		}
	}
	for(let i in npc){ // Перебераем NPC
		if( room==npc[i][0] && pointInObj({x: tmp[0], y: tmp[1]}, npc[i][1]) && pointInObj({x: Math.floor(cX/size), y: Math.floor(cY/size)}, npc[i][2])){
			NPC(npc[i][3], tmp); // Вызываем функцию
			break;
		}
	}

	drawMap(); // Рисуем карту
}

var startGame = function(){ // Функция запуска игры
	game_cnv.addEventListener("mouseup", clickEvent); // Добавляем новый

	for(let n in map) { // Ну и тут случайно генерируются бочки
		for(let y in map[n]) {
			for(let x in map[n][y]){
				if (map[n][y][x]==0) {
					if (randomInt(100)<=15) map[n][y][x]=1; // Случайное число берём [0, 100] и если оно меньше 15, то будет бочка
				}
			}
		}
	}

	drawMap(); // И рисуем в который раз карту...
	runGui();
}



var bot = function() {
	for(let i in bots){
		if(bots[i][0]==room){
			let x = (randomInt(1)==1)?bots[i][1].x-1:bots[i][1].x+1;
			let y = (randomInt(1)==1)?bots[i][1].y-1:bots[i][1].y+1;

			let botPos = bots[i][1];
			let plyPos = searchPlayer();

			if(pointInObj({x:plyPos[0], y:plyPos[1]}, {x:botPos.x-1,y:botPos.y-1,w:2,h:2})) {
				player.hp-=25;
				return;
			}

			// Передвижение бота
			if (canGoBot(botPos, botPos.x, y) && canGoBot(botPos, x, botPos.y)) {
				(randomInt(1)==1)?bots[i][1].y=y:bots[i][1].x=x;
			} else if (canGoBot(botPos, botPos.x, y)) {
				bots[i][1].y=y;
			} else if (canGoBot(botPos, x, botPos.y)) {
				bots[i][1].x=x;
			}
		}
	}
}


var NPC = function(id, oldPos) { // Обработка ботов. Тут без комментариев
	playerPos[room]={x:oldPos[0],y:oldPos[1]};
	switch(id){
		case 0:
			alert("Ещё слишком рано... Приходи, когда будет обновление с ботами!");
			break;
	}
}

// Далее идут какие-то функции. Я бы сказал вспомогательные, но с ними возишься дольше.
var canGo = function(x, y) { // Особенно с этой
	let pos = searchPlayer(); // Находим персонажа

	if(x==pos[0] && y==pos[1]){return false;} // Не переместиться в себя
	for(let i in npc){
		if(npc[i][0]==room && x==npc[i][2].x && y==npc[i][2].y){return false;} // Не переместиться в NPC
	}
	for(let i in bots){
		if(bots[i][0]==room && x==bots[i][1].x && y==bots[i][1].y){return false;} // Не переместиться в бота
	}
	if(mapTextures[map[room][y][x]].solid){return false;} // Не переместиться в стенку

	if( Math.abs(x-pos[0]) + Math.abs(y-pos[1]) == 2) { // Если ходит по диагонали
		if(mapTextures[map[room][pos[1]][(+pos[0]+ +(x-pos[0]))]].solid && mapTextures[map[room][(+pos[1]+ +(y-pos[1]))][pos[0]]].solid){ // И ему мещают ящики
			return false; // То он не идёт никуда
		}
	}

	if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true; // А если в рядом кликнули, то пусть идёт

	return false; // Ну и если всё пошло не так, то ходить нельзя.
}
var canGoBot = function(pos, x, y) {
	if (x<0||x>7||y<0||y>7) {return false;}
	if (x==playerPos[room].x&&y==playerPos[room].y) {return false;}


	for(let i in npc){
		if(npc[i][0]==room && x==npc[i][2].x && y==npc[i][2].y){return false;} // Не переместиться в NPC
	}
	for(let i in bots){
		if(x==bots[i][1].x && y==bots[i][1].y){return false;} // Не переместиться в бота
	}

	if(mapTextures[map[room][y][x]].solid){return false;} // Не переместиться в стенку

	if( Math.abs(x-pos.x) <= 1 && Math.abs(y-pos.y) <= 1) return true; // А если рядом, то пусть идёт

	return false; // Ну и если всё пошло не так, то ходить нельзя.
}

var drawMap = function() { // Отрисовка карты
	for(let y in map[room]) {
		for(let x in map[room][y]){
			mapTextures[0].img.draw(game_cnv, x*size, y*size, size, size);
			mapTextures[map[room][y][x]].img.draw(game_cnv, x*size, y*size, size, size);
		}
	}
	
	for(let i in npc){
		if(npc[i][0]==room) enemyTextures[1].img.draw(game_cnv, npc[i][2].x*size, npc[i][2].y*size, size, size);
	}

	for(let i in bots){
		if (bots[i][0]==room) {
			enemyTextures[2].img.draw(game_cnv, bots[i][1].x*size, bots[i][1].y*size, size, size);
		}
	}
	
	enemyTextures[0].img.draw(game_cnv, playerPos[room].x*size, playerPos[room].y*size, size, size);
}

var searchPlayer = function() { // Поиск персонажа.
	return [playerPos[room].x, playerPos[room].y]
}

var move = function(cX, cY) { // Ну а это движение (неожиданно, да?)
	let pos = searchPlayer();

	if (Math.floor(cX/64)==pos[0] && Math.floor(cY/64)==pos[1]) {
		inv=!inv;
		updInvOpen();
	}

	for(let y in map[room]) { // Перебираем карту
		for(let x in map[room][y]){
			if( pointInObj({x: cX, y: cY}, {x:x*size,y:y*size,w:size,h:size}) ){ // Если мышька пересикается с одной из клеток
				if(canGo(x, y)){ // И если может двигаться
					// И двигаем
					playerPos[room]={x:x,y:y};
					realTick();
				}
			}
		}
	}
}