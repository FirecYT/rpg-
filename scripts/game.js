start_cnv = doc[getId]("start");
game_cnv = doc[getId]("game");
gui_cnv = doc[getId]("gui");

// Старт игры. Точнее выбор класса.
start = [new rect(0, 0, 512, 512, "#666"),new rect(0, 0, 512, 32, "#333")] // Фон и полоска сверху
classes = [ // Классы
	new rect(32, 64, 128, 128, "#777", "#555"), new rect(192, 64, 128, 128, "#777", "#555"), new rect(352, 64, 128, 128, "#777", "#555"),
	new rect(32, 224, 128, 128, "#777", "#555"), new sprite("lock.png", 192, 224, "#700"), new sprite("lock.png", 352, 224, "#700")
]
enter = new rect(192, 416, 128, 64, "#777", "#555") // Подтверждение выбора

secrets = {
	loli: new sprite("loliv0.png", 192, 224, "#777", "#555") // Просто подгрузка, я не буду это использовать
}

gui_cnv.addEventListener("mouseup", (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
	cX = e.layerX; // Я не индус, буду дулать код короче
	cY = e.layerY;

	for(i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( colis({x: cX, y: cY}, generateRect(classes[i])) ) {
			if( classes[i].image ) {
				if ( classes[i].image.src.split("/")[10]=="lock.png")
					break; 
			}
			for(j in classes){
				classes[j].active = 0;
			}
			classes[i].active = 2;
		}
		classes[i].draw(start_cnv); // Ну и рисуем, чтобы увидеть результат
	}

	if( colis({x: e.layerX, y: e.layerY}, generateRect(classes[4])) ) { // Лоли 2.0
		classes[4] = secrets.loli;
		classes[4].draw(start_cnv);
	}
})
gui_cnv.addEventListener("mousemove", (e)=>{ // Движение курсора
	cX = e.layerX; // Я не индус, буду дулать код короче
	cY = e.layerY;

	for(i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( classes[i].active==2 ) {

		} else if ( colis({x: cX, y: cY}, generateRect(classes[i])) ) {
			classes[i].active=1; // Если пересёкся, то делаем его активным
		} else { // Иначе делаем не активным (нам же нужно вернуть цвет)
			classes[i].active=0;
		}
		classes[i].draw(start_cnv); // Ну и рисуем, чтобы увидеть результат
	}
	if( colis({x: cX, y: cY}, generateRect(enter)) ){ // То же самое с enter'ом
		enter.active=1;
	} else {
		enter.active=0;
	}
	enter.draw(start_cnv);
})

window.onload = function() { // Ну а это просто для красотоы. Вообще я устал комментировать код, так что дальше сам
	for(i in start) start[i].draw(start_cnv);
	for(i in classes) classes[i].draw(start_cnv);
	enter.draw(start_cnv);

	text(start_cnv, "ВЫБИРИТЕ КЛАСС", 8, 22, "#AAA", "16px Consolas");
}