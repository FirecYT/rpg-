start_cnv = doc[getId]("start");
game_cnv = doc[getId]("game");
gui_cnv = doc[getId]("gui");

// Курсор для красоты
cursor = new rect(0, 0, 4, 4, "#FFFFFF66");

// Старт игры. Точнее выбор класса.
start = [new rect(0, 0, 512, 512, "#666"),new rect(0, 0, 512, 32, "#333")] // Фон и полоска сверху
classes = [ // Классы
	new rect(32, 64, 128, 128, "#777", "#555"), new rect(192, 64, 128, 128, "#777", "#555"), new rect(352, 64, 128, 128, "#777", "#555"),
	new rect(32, 224, 128, 128, "#777", "#555"), new sprite("./lock.png", 192, 224, "#700"), new sprite("./lock.png", 352, 224, "#700")
]
enter = new rect(192, 416, 128, 64, "#777", "#555") // Подтверждение выбора

gui_cnv.addEventListener("mouseup", (e)=>{ // Кнопка мыши была поднята (вроде бы и ПКМ и ЛКМ)
	console.log(colis({x: e.layerX, y: e.layerY}, {x: enter.x, y: enter.y, w: enter.width, h: enter.height})); // DEBUG
})
gui_cnv.addEventListener("mousemove", (e)=>{ // Движение курсора
	cX = e.layerX; // Я не индус, буду дулать код короче
	cY = e.layerY;

	clear(gui_cnv); // Очищаю слой для курсора
	cursor.x=cX-cursor.width/2; // Выравниваю по центру
	cursor.y=cY-cursor.height/2;
	cursor.draw(gui_cnv); // Рисую курсор

	for(i in classes){ // Отслеживание пересечение курсора с каким нибудь классом
		if ( colis({x: cX, y: cY}, {x: classes[i].x, y: classes[i].y, w: classes[i].width, h: classes[i].height}) ) {
			classes[i].active=1; // Если пересёкся, то делаем его активным
		} else { // Иначе делаем не активным (нам же нужно вернуть цвет)
			classes[i].active=0;
		}
		classes[i].draw(start_cnv); // Ну и рисуем, чтобы увидеть результат
	}
	if( colis({x: cX, y: cY}, {x: enter.x, y: enter.y, w: enter.width, h: enter.height}) ){ // То же самое с enter'ом
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