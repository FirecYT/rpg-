start_cnv = doc[getId]("start");
game_cnv = doc[getId]("game");
gui_cnv = doc[getId]("gui");

start = [new rect(0, 0, 512, 512, "#555"),new rect(0, 0, 512, 32, "#333")]
classes = [
	new rect(32, 64, 128, 128, "#777"), new rect(192, 64, 128, 128, "#777"), new rect(352, 64, 128, 128, "#777"),
	new rect(32, 224, 128, 128, "#777"), new rect(192, 224, 128, 128, "#777"), new rect(352, 224, 128, 128, "#777")
]
enter = new rect(192, 416, 128, 64, "#777")

for(i in start) start[i].draw(start_cnv);
for(i in classes) classes[i].draw(start_cnv);
enter.draw(start_cnv);