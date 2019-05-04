var rect = function(x, y, width, height, color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}
rect.prototype.draw = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

var title = function (src, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
	this.sx = sx;
	this.sy = sy;
	this.swidth = sWidth;
	this.sheight = sHeight;

	this.dx = dx;
	this.sy = dy;
	this.dwidth = dWidth;
	this.dHeight = dHeight;

	this.image = new Image();
	this.image.src = src;
}
title.prototype.draw = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

var sprite = function (src, x, y) {
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = src;
}
sprite.prototype.draw = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.drawImage(this.image, this.x, this.y);
};

clear = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 512, 512);
};

var text = function(canvas, text, x, y, color, font) {
	ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.font = font || "8px Consolas";
	ctx.fillText(text, x, y);
}

var colis = function(mouse, object) { // mouse = {x, y} object = {x, y, w, h}
	return (mouse.x>=object.x && mouse.y>=object.y && mouse.x<=object.w+object.x && mouse.y<=object.h+object.y);
}

doc = document;
getId = "getElementById";