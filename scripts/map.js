'use strict';

var map = [ // Создаём массив с картами (пробелы нужны на будущие, так как мне кажется, что текстур будет больше, чем 10 [0-9] )
	[	[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 4, 6,13, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 3,10, 3, 0, 0, 0, 0]],

	[	[0, 3,10, 3, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 0],
		[0, 0,10, 0, 0, 0, 0, 3],
		[0, 0, 8, 6, 6, 6, 6, 6],
		[0, 0, 0, 0, 0, 0, 0, 3],
		[0, 0, 0, 0, 0, 0, 0, 0]],

	[	[0, 0, 1, 1, 1, 1, 1, 0],
		[0, 0, 1, 2, 2, 2, 1, 0],
		[0, 0, 1, 2, 2, 2, 1, 0],
		[0, 0, 1, 2, 2, 2, 1, 0],
		[3, 0, 1, 1, 2, 1, 1, 0],
		[6, 6, 6, 6, 5, 0, 0, 0],
		[3, 0, 0, 0,10, 0, 0, 0],
		[0, 0, 0, 0,10, 0, 0, 0]]
]
var mapTextures = [ // Массив с mapTextures объектов на карте
/*  0. 0,0 */					{solid: 0, img: new title("title.png",0*16,0*16)},
/*  1. 1,0 */					{solid: 1, img: new title("title.png",1*16,0*16)},
/*  2. 2,0 */					{solid: 0, img: new title("title.png",2*16,0*16)},
/*  3. 3,0 */					{solid: 0, img: new title("title.png",3*16,0*16)},
/*  4. 0,1 */					{solid: 0, img: new title("title.png",0*16,1*16)},
/*  5. 1,1 */					{solid: 0, img: new title("title.png",1*16,1*16)},
/*  6. 2,1 */					{solid: 0, img: new title("title.png",2*16,1*16)},
/*  7. 3,1 */					{solid: 0, img: new title("title.png",3*16,1*16)},
/*  8. 0,2 */					{solid: 0, img: new title("title.png",0*16,2*16)},
/*  9. 1,2 */					{solid: 0, img: new title("title.png",1*16,2*16)},
/* 10. 2,2 */					{solid: 0, img: new title("title.png",2*16,2*16)},
/* 11. 3,2 */					{solid: 0, img: new title("title.png",3*16,2*16)},
/* 12. 0,3 */					{solid: 0, img: new title("title.png",0*16,3*16)},
/* 13. 1,3 */					{solid: 0, img: new title("title.png",1*16,3*16)},
/* 14. 2,3 */					{solid: 0, img: new title("title.png",2*16,3*16)},
/* 15. 3,3 */					{solid: 0, img: new title("title.png",3*16,3*16)},
]

var enemyTextures = [
/*  0. 0,0 */					{solid: 0, img: new title("title_enemyTextures.png",0*16,0*16)},
/*  0. 1,0 */					{solid: 0, img: new title("title_enemyTextures.png",1*16,0*16)},
/*  0. 2,0 */					{solid: 0, img: new title("title_enemyTextures.png",2*16,0*16)},
]

var size = 64; // Размер спрайтов.
var room = 0; // Текущая локация

var mapChangers = [ // Массив переходов
	[{x:2,y:7,w:0,h:0}, 0, 1,'x'], // С нулевой локации на первую
	[{x:2,y:0,w:0,h:0}, 1, 0,'x'], // С первой на нулевую
	[{x:7,y:5,w:0,h:0}, 1, 2,'y'], // С первой на вторую
	[{x:0,y:5,w:0,h:0}, 2, 1,'y'] // Со второй на первую
]

var npc = [ // Массив NPC
	//[room, trigger, posNPC, id]
	[2, {x:3,y:1,w:2,h:1}, {x:4,y:1,w:0,h:0}, 0]
]

var bots = [ // Массив ботов
	//[room, posBOT]
	[0, {x:2,y:3}],
	[1, {x:2,y:5}],
	[2, {x:4,y:5}]
]

var playerPos = [ // Позиции играка для каждой локации.
	{x:4,y:3},
	{x:2,y:0},
	{x:0,y:5}
]