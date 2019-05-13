'use strict'; // Милорд, нам нужно больше локальности

let start = [new rect(0, 0, 512, 512, "#666"), new sprite("titleStart.png", 0, 0, "#333")] // Фон и полоска сверху
let classes = [ // Классы
	new rect(32, 64, 128, 128, "#777", "#555"),
	new rect(192, 64, 128, 128, "#777", "#555"),
	new rect(352, 64, 128, 128, "#777", "#555"),
	new rect(32, 224, 128, 128, "#777", "#555"),
	new sprite("lock.png", 192, 224, "#700"),
	new sprite("lock.png", 352, 224, "#700")
]
let enter = new sprite("nextButton.png", 192, 416, "#777", "#555") // Подтверждение выбора

let secrets = {
	loli: new sprite("Loliv0.png", 192, 224, "#777", "#555"), // Просто подгрузка, я не буду это использовать
	dev: new sprite("Loliv0.png", 352, 224, "#77F", "#557", "#335") // Просто подгрузка, я не буду это использовать
}

// Всё выше это только оюъекты для отрисовки. Они ничего не могут.

var _class;

let mouseup = (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
	let cX = e.layerX; // Я не индус, буду делать код короче
	let cY = e.layerY;

	for(let i in classes){ // Перебераем массив с классами
		if ( collision({x: cX, y: cY}, generateRect(classes[i])) ) { // Если курсор пересекается (см. engine.js)
			if( classes[i].image ) { // Если это спрайт
				if ( classes[i].image.src.split("/")[classes[i].image.src.split("/").length-1]=="lock.png") break; // Если класса нет, то делать нам тут нечего
			}
			for(let j in classes) classes[j].active = 0; // Делаем у всех классов 0 active
			classes[i].active = 2; // А нажатый будет с active 2
		}
	}

	if( collision({x: e.layerX, y: e.layerY}, generateRect(classes[4])) ) classes[4] = secrets.loli; // Лоли 2.0
	if( collision({x: e.layerX, y: e.layerY}, generateRect(classes[5])) ) classes[5] = secrets.dev; // Лоли 2.0

	if( collision({x: e.layerX, y: e.layerY}, generateRect(enter)) ) { // Если нажали на "Далее"
		_class = -1; // Выбранный класс. Позже будет влиять на игру, но пока что не нужно
		for(let i in classes){ // Перебераем классы
			if (classes[i].active==2) { // Если он выбран
				if (_class==-1) { // И класс всё ещё равер -1
					_class=i; // То теперь класс будет выбран
				} else { // Однако если какого то хрена класс уже не -1
					alert("Магию выключай и давай нормально."); // То просим вырубить магию
					_class=-1 // Ну и сбрасываем переменную
				}
			}
		}
		if (_class<=-1) { // Если класс не выбран (хз как будет что то меньше -1, но вдруг)
			alert("Выбери себе класс, мать твою!"); // Говорим выбрать класс
		} else { // Ну а если класс уже выбран
			start_cnv.style.display = "none"; // То убираем с глаз долой выбор классов
			startGame(); // И запускаем игру (см. game.js)
		}
	}

	drawAll(); // Ну и обновим экран
}
let mousemove = (e)=>{ // Движение курсора
	let cX = e.layerX; // Я не индус, буду делать код коро... Сука!
	let cY = e.layerY;

	for(let i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( classes[i].active==2 ) {
			// Нам нечего делать с "зелёным" классом
		} else if ( collision({x: cX, y: cY}, generateRect(classes[i])) ) { // А вот если обычный
			classes[i].active=1; // То делаем его активным
		} else { // Иначе
			classes[i].active=0; // Делаем не активным (нам же нужно вернуть серый цвет)
		}
	}
	if( collision({x: cX, y: cY}, generateRect(enter)) ){ // Отслеживание пересечение курсора с "Далее"
		enter.active=1; // И красим в тёмный
	} else {
		enter.active=0; // Или светлый
	}

	drawAll(); // Рисуем всё
}



start_cnv.addEventListener("mouseup", mouseup); // Вешаем слушатели событий
start_cnv.addEventListener("mousemove", mousemove);



let drawAll = function() { // Функция для рисования всего
	for(let i in start) start[i].draw(start_cnv);
	for(let i in classes) classes[i].draw(start_cnv);
	enter.draw(start_cnv);
}

window.addEventListener("load", ()=>{ // Что бы всё прогрузилось. Это тебе не рашка, перед релизом фильм не посмотришь.
	drawAll();
});
// Дуров, верни стену!