'use strict';

var map = [ // Создаём массив с картами (пробелы нужны на будущие, так как мне кажется, что текстур будет больше, чем 10 [0-9] )
	[	[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 4, 4, 4, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 3, 4, 3, 0, 0, 0, 0]],

	[	[0, 3, 4, 3, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 0],
		[0, 0, 4, 0, 0, 0, 0, 3],
		[0, 0, 4, 4, 4, 4, 4, 4],
		[0, 0, 0, 0, 0, 0, 0, 3],
		[0, 0, 0, 0, 0, 0, 0, 0]],

	[	[0, 0, 2, 2, 2, 2, 2, 0],
		[0, 0, 2, 5, 5, 5, 2, 0],
		[0, 0, 2, 5, 5, 5, 2, 0],
		[0, 0, 2, 5, 5, 5, 2, 0],
		[3, 0, 2, 2, 5, 2, 2, 0],
		[4, 4, 4, 4, 4, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]]
]
var idMap = [ // Массив с idMap объектов на карте
/* 0. Пол. Скин: асфальт */		{solid: 0, img: new title("title.png",0,0)},
/* 1. Игрок */					{solid: 1, img: new title("title.png",16,0)},
/* 2. Ящик */					{solid: 1, img: new title("title.png",0,16)},
/* 3. Лже NPC */				{solid: 1, img: new title("title.png",16,0)},
/* 4. Пол. Скин: дорога. */		{solid: 0, img: new title("title.png",0,32)},
/* 5. Пол. Скин: дом */			{solid: 0, img: new title("title.png",16,16)}
]

var size = 64; // Размер спрайтов.
var room = 0; // Текущая локация

var triggers = [ // Массив триггеров
	[{x:2,y:7,w:0,h:0}, 0, 1,'x'], // С нулевой локации на первую
	[{x:2,y:0,w:0,h:0}, 1, 0,'x'], // С первой на нулевую
	[{x:7,y:5,w:0,h:0}, 1, 2,'y'], // С первой на вторую
	[{x:0,y:5,w:0,h:0}, 2, 1,'y'] // Со второй на первую
]

var npc = [ // Массив NPC
	//[room, trigger, posNPC, id]
	[2, {x:3,y:1,w:2,h:1}, {x:4,y:1,w:0,h:0}, 0]
]

let playerPos = [ // Позиции играка для каждой локации.
	{x:4,y:3},
	{x:2,y:0},
	{x:0,y:5}
]

var player = {
	hp: 100,
	mp: 100,
	exp: 10,
	lvl: 9999
}



let fakeTick = function(e) { // Тик или как это ещё можно обозвать?
	let cX = e.layerX; // Я не индус, буду делать... А-а-а!!!
	let cY = e.layerY;
	
	let tmp = searchPlayer();

	move(cX, cY); // Сразу же лвигаем персонажа

	for(let i in triggers){ // Перебераем триггеры локаций
		if( collision({x: searchPlayer()[0], y: searchPlayer()[1]}, triggers[i][0]) && room==triggers[i][1] && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, triggers[i][0])){
			room=triggers[i][2]; // Устанавливаем нужную локацию
			break;
		}
	}
	for(let i in npc){ // Перебераем NPC
		if( room==npc[i][0] && collision({x: searchPlayer()[0], y: searchPlayer()[1]}, npc[i][1]) && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, npc[i][2])){
			bot(npc[i][3], tmp); // Вызываем функцию
			break;
		}
	}

	drawMap(); // Рисуем карту
}

let realTick = function() {}

var startGame = function(){ // Функция запуска игры
	game_cnv.removeEventListener("mouseup", mouseup); // Удаляем все слушатели
	game_cnv.removeEventListener("mousemove", mousemove);
	game_cnv.addEventListener("mouseup", fakeTick); // Добавляем новый

	for(let n in map) { // Ну и тут случайно генерируются бочки
		for(let y in map[n]) {
			for(let x in map[n][y]){
				if (map[n][y][x]==0) {
					if (randomInt(100)<=15) map[n][y][x]=2; // Случайное число берём [0, 100] и если оно меньше 15, то будет бочка
				}
			}
		}
	}

	drawMap(); // И рисуем в который раз карту...
}



let bot = function(id, oldPos) { // Обработка ботов. Тут без комментариев
	playerPos[room]={x:oldPos[0],y:oldPos[1]};
	switch(id){
		case 0:
			alert("Ещё слишком рано... Приходи, когда будет обновление с ботами!");
			break;
	}
}



// Далее идут какие-то функции. Я бы сказал вспомогательные, но с ними возишься дольше.
let canGo = function(x, y) { // Особенно с этой
	if(idMap[map[room][y][x]].solid){return false;} // Не переместиться в стенку
	let pos = searchPlayer(); // Находим персонажа
	if( Math.abs(x-pos[0]) + Math.abs(y-pos[1]) == 2) { // Если ходит по диагонали
		if(map[room][pos[1]][(+pos[0]+ +(x-pos[0]))]==2 && map[room][(+pos[1]+ +(y-pos[1]))][pos[0]]==2){ // И ему мещают ящики
			return false; // То он не идёт никуда
		}
	}
	if( Math.abs(x-pos[0]) <= 1 && Math.abs(y-pos[1]) <= 1) return true; // А если в рядом кликнули, то пусть идёт
	return false; // Ну и если всё пошло не так, то ходить нельзя.
}

let drawMap = function() { // Отрисовка карты
	for(let y in map[room]) {
		for(let x in map[room][y]){
			idMap[0].img.draw(game_cnv, x*size, y*size, size, size);
			idMap[map[room][y][x]].img.draw(game_cnv, x*size, y*size, size, size);
		}
	}
	
	for(let i in npc){
		if(npc[i][0]==room) idMap[3].img.draw(game_cnv, npc[i][2].x*size, npc[i][2].y*size, size, size);
	}
	
	idMap[1].img.draw(game_cnv, playerPos[room].x*size, playerPos[room].y*size, size, size);
}

let searchPlayer = function() { // Поиск персонажа.
	return [playerPos[room].x, playerPos[room].y]
}

let move = function(cX, cY) { // Ну а это движение (неожиданно, да?)
	for(let y in map[room]) { // Перебираем карту
		for(let x in map[room][y]){
			if( collision({x: cX, y: cY}, {x:x*size,y:y*size,w:size,h:size}) ){ // Если мышька пересикается с одной из клеток
				if(canGo(x, y)){ // И если может двигаться
					let pos = searchPlayer(); // То получаем координаты
					// И двигаем
					playerPos[room]={x:x,y:y};
					realTick();
				}
			}
		}
	}
}