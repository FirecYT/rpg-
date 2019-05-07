'use strict';

var map = [ // Создаём массив с картами
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
var idMap = [ // Массив с idMap объектов на карте
	{type: "floor", img: new title("title.png",0,0,16,16)}, // Пол
	{type: "player", img: new title("title.png",16,0,16,16)}, // Игрок
	{type: "box", img: new title("title.png",0,16,16,16)}, // Ящик
	{type: "npc", img: new title("title.png",16,0,16,16)}, // NPC
	{type: "fixed floor", img: new title("title.png",0,0,16,16)} // Пол, который вечен
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
	//[room, trigger, posNPC, idMap]
	[2, {x:3,y:1,w:2,h:1}, {x:4,y:1,w:0,h:0}, 0]
]



let tick = function(e) { // Тик или как это ещё можно обозвать?
	let cX = e.layerX; // Я не индус, буду делать... А-а-а!!!
	let cY = e.layerY;

	move(cX, cY); // Сразу же лвигаем персонажа

	for(let i in triggers){ // Перебераем триггеры локаций
		if( collision({x: searchPlayer()[0], y: searchPlayer()[1]}, triggers[i][0]) && room==triggers[i][1] && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, triggers[i][0])){
			room=triggers[i][2]; // Устанавливаем нужную локацию
			break;
		}
	}
	for(let i in npc){ // Перебераем NPC
		if( room==npc[i][0] && collision({x: searchPlayer()[0], y: searchPlayer()[1]}, npc[i][1]) && collision({x: Math.floor(cX/size), y: Math.floor(cY/size)}, npc[i][2])){
			bot(npc[i][3]); // Вызываем функцию
			break;
		}
	}

	drawMap(); // Рисуем карту
}

var startGame = function(){ // Функция запуска игры
	mouse_cnv.removeEventListener("mouseup", mouseup); // Удаляем все слушатели
	mouse_cnv.removeEventListener("mousemove", mousemove);
	mouse_cnv.addEventListener("mouseup", tick); // Добавляем новый

	for(let n in map) { // Ну и тут случайно генерируются бочки
		for(let y in map[n]) {
			for(let x in map[n][y]){
				if (map[n][y][x]==0) {
					if (randomInt(100)<=15) map[n][y][x]=2; // Случайное число берём [0, 100] и если оно меньше 15, то будет бочка
				}
				if (map[n][y][x]==4) { // А там, где был пол
					map[n][y][x]=0; // Делаем пол
				}
			}
		}
	}

	drawMap(); // И рисуем в который раз карту...
}



let bot = function(id) { // Обработка ботов. Тут без комментариев
	switch(id){
		case 0:
			alert("Ещё слишком рано... Приходи, когда будет обновление с ботами!");
			break;
	}
}



// Далее идут какие-то функции. Я бы сказал вспомогательные, но с ними возишься дольше.
let canGo = function(x, y) { // Особенно с этой
	if(map[room][y][x]!=0){return false;} // Не переместиться в стенку
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
}

let searchPlayer = function() { // Поиск персонажа.
	for(let y in map[room]) { // Перебераем карту
		for(let x in map[room][y]){
			if(map[room][y][x]==1){ // И если нашли элемент равный 1
				return [x, y]; // То возвращаем координаты
			}
		}
	}
}

let move = function(cX, cY) { // Ну а это движение (неожиданно, да?)
	for(let y in map[room]) { // Перебираем карту
		for(let x in map[room][y]){
			if( collision({x: cX, y: cY}, {x:x*size,y:y*size,w:size,h:size}) ){ // Если мышька пересикается с одной из клеток
				if(canGo(x, y)){ // И если может двигаться
					let pos = searchPlayer(); // То получаем координаты
					// И двигаем
					map[room][pos[1]][pos[0]]=0;
					map[room][y][x]=1;
				}
			}
		}
	}
}