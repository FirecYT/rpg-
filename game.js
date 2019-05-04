start_cnv = doc[getId]("start");
game_cnv = doc[getId]("game");
gui_cnv = doc[getId]("gui");

// Курсор для красоты
cursor = new rect(0, 0, 4, 4, "#FFFFFF66");

// Старт игры. Точнее выбор класса.
start = [new rect(0, 0, 512, 512, "#666"),new rect(0, 0, 512, 32, "#333")]
classes = [
	new rect(32, 64, 128, 128, "#777"), new rect(192, 64, 128, 128, "#777"), new rect(352, 64, 128, 128, "#777"),
	new rect(32, 224, 128, 128, "#777"), new rect(192, 224, 128, 128, "#777"), new rect(352, 224, 128, 128, "#777"),
										 new sprite("./lock.png", 192+32, 224+32),   new sprite("./lock.png", 352+32, 224+32),
]
classesColors = {
	const: [
		"#007","#007","#007",
		"#007","#700","#700",
			   "#777"
	],
	active: [
		"#00B","#00B","#00B",
		"#00B","#700","#700",
			   "#555"
	]
}
enter = new rect(192, 416, 128, 64, "#777")

for(i in start) start[i].draw(start_cnv);
for(i in classes) classes[i].draw(start_cnv);
enter.draw(start_cnv);

text(start_cnv, "ВЫБИРИТЕ КЛАСС", 8, 22, "#AAA", "16px Consolas");

gui_cnv.addEventListener("mouseup", (e)=>{
	console.log(e);
})
gui_cnv.addEventListener("mousemove", (e)=>{
	cX = e.layerX;
	cY = e.layerY;

	clear(gui_cnv); // Отображение курсора
	cursor.x=cX-cursor.width/2;
	cursor.y=cY-cursor.height/2;
	cursor.draw(gui_cnv);

	for(i in classes){ // Пересечение с объектами
		if ( colis({x: cX, y: cY}, {x: classes[i].x, y: classes[i].y, w: classes[i].width, h: classes[i].height}) ) {
			classes[i].color=classesColors.active[i];
		} else {
			classes[i].color=classesColors.const[i];
		}
		classes[i].draw(start_cnv);
	}
	if( colis({x: cX, y: cY}, {x: enter.x, y: enter.y, w: enter.width, h: enter.height}) ){
		enter.color=classesColors.active[6];
	} else {
		enter.color=classesColors.const[6];
	}
	enter.draw(start_cnv);


})