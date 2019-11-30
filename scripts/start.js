'use strict'; // Милорд, нам нужно больше локальности



// +=======================+
// |                       |
// | Текстуры и квадратики |
// |                       |
// +=======================+

	let start = [new rect(0, 0, 512, 512, "#666"), new sprite("titleStart.png", 0, 0, "#333")] // Фон и полоска сверху
	let classes = [ // Иконки классов
		new sprite("Mag.png", 32, 64, "#777", "#575", "#7A7"),
		new sprite("lock.png", 192, 64, "#700"),
		new sprite("lock.png", 352, 64, "#700"),
		new sprite("lock.png", 32, 224, "#700"),
		new sprite("lock.png", 192, 224, "#700"),
		new sprite("lock.png", 352, 224, "#700")
	]
	let enter = new sprite("nextButton.png", 192, 416, "#777", "#555") // Подтверждение выбора
	let secrets = {
		loli: new sprite("Loliv0.png", 192, 224, "#777", "#575", "#7A7"), // Просто подгрузка, я не буду это использовать
		dev: new sprite("Loliv0.png", 352, 224, "#777", "#557", "#77A") // Просто подгрузка, я не буду это использовать
	}



// +============+
// |            |
// | Переменные |
// |            |
// +============+

	let drawAll = function() { // Функция для рисования всего
		for(let i in start) start[i].draw(start_cnv);
		for(let i in classes) classes[i].draw(start_cnv);
		enter.draw(start_cnv);
	}



// +================================+
// |                                |
// | Функции для слушателей событий |
// |                                |
// +================================+

	let mouseup_event = (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
		let cX = clickPos(e, start_cnv).x; // Я не индус, буду делать код короче
		let cY = clickPos(e, start_cnv).y;

		for(let i in classes){ // Перебераем массив с классами
			if ( pointInObj({x: cX, y: cY}, tmpRect(classes[i])) ) { // Если курсор пересекается (см. engine.js)
				if( classes[i].image ) { // Если это спрайт
					if ( classes[i].image.src.split("/")[classes[i].image.src.split("/").length-1]=="lock.png") break; // Если класса нет, то делать нам тут нечего
				}
				for(let j in classes) classes[j].active = 0; // Делаем у всех классов 0 active
				classes[i].active = 2; // А нажатый будет с active 2
			}
		}

		if( pointInObj({x: cX, y: cY}, tmpRect(classes[4])) ) classes[4] = secrets.loli; // Лоли 2.0
		if( pointInObj({x: cX, y: cY}, tmpRect(classes[5])) ) classes[5] = secrets.dev; // Лоли 2.0

		if( pointInObj({x: cX, y: cY}, tmpRect(enter)) ) { // Если нажали на "Далее"
			player.game_class = -1; // Выбранный класс. Позже будет влиять на игру, но пока что не нужно
			for(let i in classes){ // Перебераем классы
				if (classes[i].active==2) { // Если он выбран
					if (player.game_class==-1) { // И класс всё ещё равер -1
						player.game_class=i; // То теперь класс будет выбран
					} else { // Однако если какого то хрена класс уже не -1
						alert("Магию выключай и давай нормально."); // То просим вырубить магию
						player.game_class=-1 // Ну и сбрасываем переменную
					}
				}
			}
			if (player.game_class<=-1) { // Если класс не выбран (хз как будет что то меньше -1, но вдруг)
				alert("Выбери себе класс, мать твою!"); // Говорим выбрать класс
			} else { // Ну а если класс уже выбран
				start_cnv.remove(); // То убираем с глаз долой выбор классов
				game.start(); // И запускаем игру (см. game.js)
			}
		}

		drawAll(); // Ну и обновим экран
	}
	let mousemove_event = (e)=>{ // Движение курсора
		let cX = clickPos(e, start_cnv).x; // Я не индус, буду делать код коро... Сука!
		let cY = clickPos(e, start_cnv).y;

		for(let i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
			if ( classes[i].active==2 ) {
				// Нам нечего делать с "зелёным" классом
			} else if ( pointInObj({x: cX, y: cY}, tmpRect(classes[i])) ) { // А вот если обычный
				classes[i].active=1; // То делаем его активным
			} else { // Иначе
				classes[i].active=0; // Делаем не активным (нам же нужно вернуть серый цвет)
			}
		}
		if( pointInObj({x: cX, y: cY}, tmpRect(enter)) ){ // Отслеживание пересечение курсора с "Далее"
			enter.active=1; // И красим в тёмный
		} else {
			enter.active=0; // Или светлый
		}

		drawAll(); // Рисуем всё
	}



// +==============================+
// |                              |
// | Установка слушателей событий |
// |                              |
// +==============================+

	start_cnv.addEventListener("mouseup", mouseup_event);
	start_cnv.addEventListener("mousemove", mousemove_event);
	window.addEventListener("load", drawAll);

// Дуров, верни стену!