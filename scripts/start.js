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
	loli: new sprite("Loliv0.png", 192, 224, "#777", "#555") // Просто подгрузка, я не буду это использовать
}



let mouseup = (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
	let cX = e.layerX; // Я не индус, буду делать код короче
	let cY = e.layerY;

	for(let i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( collision({x: cX, y: cY}, generateRect(classes[i])) ) {
			if( classes[i].image ) { // Если это спрайт
				if ( classes[i].image.src.split("/")[classes[i].image.src.split("/").length-1]=="lock.png") break; // Если класса не, то делать нам тут нечего
			}
			for(let j in classes) classes[j].active = 0; // Делаем у всех классов 0 active
			classes[i].active = 2; // А нажатый будет с active 2
		}
	}

	if( collision({x: e.layerX, y: e.layerY}, generateRect(classes[4])) ) classes[4] = secrets.loli; // Лоли 2.0

	if( collision({x: e.layerX, y: e.layerY}, generateRect(enter)) ) { // Ну это, если выбрали класс
		var _class = -1;
		for(let i in classes){
			if (classes[i].active==2) {
				if (_class==-1) {
					_class=i;
				} else {
					alert("Магию выключай и давай нормально.");
					_class=-1
				}
			}
		}
		if (_class<=-1) {
			alert("Выбери себе класс, мать твою!");
		} else {
			start_cnv.style.display = "none";
			startGame();
		}
	}

	drawAll();
}
let mousemove = (e)=>{ // Движение курсора
	let cX = e.layerX; // Я не индус, буду делать код коро... Сука!
	let cY = e.layerY;

	for(let i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( classes[i].active==2 ) {
			// Нам нечего делать с "зелёным" классом
		} else if ( collision({x: cX, y: cY}, generateRect(classes[i])) ) { // А вот с обычно изи
			classes[i].active=1; // Если пересёкся, то делаем его активным
		} else { // Иначе делаем не активным (нам же нужно вернуть цвет)
			classes[i].active=0;
		}
	}
	if( collision({x: cX, y: cY}, generateRect(enter)) ){ // То же самое с enter'ом
		enter.active=1;
	} else {
		enter.active=0;
	}

	drawAll();
}



mouse_cnv.addEventListener("mouseup", mouseup);
mouse_cnv.addEventListener("mousemove", mousemove);



let drawAll = function() {
	for(let i in start) start[i].draw(start_cnv);
	for(let i in classes) classes[i].draw(start_cnv);
	enter.draw(start_cnv);
}

window.onload = function() { // Что бы всё прогрузилось. Это тебе не рашка, перед релизом фильм не посмотришь.
	drawAll();
}

// Дуров, верни стену!