var ai = function() {
	// Angry bots
	for(let i in angryBots){
		let botPos = angryBots[i].pos;
		let botRoom = angryBots[i].room;
		let plyPos = searchPlayer();

		if(angryBots[i].points){ // Если у бота есть путь
			let nowPointPos = pathChanger(i); // Позиция текущей точки точка

			let nextX = 0;
			let nextY = 0;

			if(botRoom==room && pointInObj({x:plyPos[0], y:plyPos[1]}, {x:botPos.x-1,y:botPos.y-1,w:2,h:2})) {
				console.log(1);
				return;
			}

			let needGoX = (nowPointPos.x<botPos.x)?-1:1;
			let needGoY = (nowPointPos.y<botPos.y)?-1:1;
			nextX = (nowPointPos.x==botPos.x)?0:needGoX;
			nextY = (nowPointPos.y==botPos.y)?0:needGoY;

			if(plyPos[0]==angryBots[i].pos.x+nextX && plyPos[1]==angryBots[i].pos.y+nextY && botRoom==room){
				console.log(1);
			} else {
				angryBots[i].lastPos = JSON.stringify(botPos);
				angryBots[i].pos.x += nextX*canGoBot(botPos, botPos.x+nextX, botPos.y, botRoom);
				angryBots[i].pos.y += nextY*canGoBot(botPos, botPos.x, botPos.y+nextY, botRoom);
			}
		} else { // Если у бота нет пути
			let x = (randomInt(1)==1)?botPos.x-1:botPos.x+1;
			let y = (randomInt(1)==1)?botPos.y-1:botPos.y+1;

			if(botRoom==room && pointInObj({x:plyPos[0], y:plyPos[1]}, {x:botPos.x-1,y:botPos.y-1,w:2,h:2})) {
				console.log(1);
				return;
			}

			// Передвижение бота
			if (canGoBot(botPos, botPos.x, y, botRoom) && canGoBot(botPos, x, botPos.y, botRoom)) {
				(randomInt(1)==1)?botPos.y=y:botPos.x=x;
			} else if (canGoBot(botPos, botPos.x, y, botRoom)) {
				botPos.y=y;
			} else if (canGoBot(botPos, x, botPos.y, botRoom)) {
				botPos.x=x;
			}
		}
	}
}

var pathChanger = function(botID) {
	let nowPointPos = angryBots[botID].points[angryBots[botID].nowPoint];
	let botPos = angryBots[botID].pos;

	if (JSON.stringify(nowPointPos)==JSON.stringify(botPos) || angryBots[botID].lastPos==JSON.stringify(angryBots[botID].pos)) { // Если он уже одной из точек
		angryBots[botID].nowPoint++;
		if (angryBots[botID].nowPoint>angryBots[botID].points.length-1) { // Меняем точку на следующую, но...
			angryBots[botID].nowPoint=0; // ...если она уже конечная, то возвращаемся к первой.
		}
	}

	return angryBots[botID].points[angryBots[botID].nowPoint];
	
}

var canGoBot = function(pos, x, y, botRoom) {
	if (x<0||x>7||y<0||y>7) {return false;}
	if (x==playerPos[botRoom].x&&y==playerPos[botRoom].y) {return false;}

	for(let i in npc){
		if(npc[i][0]==botRoom && x==npc[i][2].x && y==npc[i][2].y){return false;} // Не переместиться в NPC
	}
	for(let i in angryBots){
		if(x==angryBots[i].pos.x && y==angryBots[i].pos.y){return false;} // Не переместиться в бота
	}

	if(mapTextures[map[botRoom][y][x]].solid){return false;} // Не переместиться в стенку

	if( Math.abs(x-pos.x) <= 1 && Math.abs(y-pos.y) <= 1) return true; // Если рядом и всё прошлое - ок, то пусть идёт

	return false; // Ну и если всё пошло не так, то ходить нельзя.
}