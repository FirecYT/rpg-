'use strict';

var rect = function(x, y, width, height, colorConst, colorActive, colorClicked){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.active = 0;
	this.colorConst = colorConst;
	this.colorActive = colorActive || colorConst;
	this.colorClicked = colorClicked || "#AFA";
}
rect.prototype.draw = function(cnv) {
	let ctx = cnv.getContext('2d');
	switch(this.active){
		case 0:
			ctx.fillStyle = this.colorConst;
			break;
		case 1:
			ctx.fillStyle = this.colorActive;
			break;
		case 2:
			ctx.fillStyle = this.colorClicked;
			break;
	}
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
	this.image.src = "./images/"+src;
}
title.prototype.draw = function(cnv) {
	let ctx = cnv.getContext('2d');
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

var sprite = function (src, x, y, colorConst, colorActive, colorClicked) {
	this.x = x;
	this.y = y;

	this.active = 0; // 0 - просто. 1 - навели курсором. 2 - нажали
	this.colorConst = colorConst || "#00000000";
	this.colorActive = colorActive || colorConst;
	this.colorClicked = colorClicked || "#AFA";

	this.image = new Image();
	this.image.src = "./images/"+src;
}
sprite.prototype.draw = function(cnv) {
	let ctx = cnv.getContext('2d');
	switch(this.active){
		case 0:
			ctx.fillStyle = this.colorConst;
			break;
		case 1:
			ctx.fillStyle = this.colorActive;
			break;
		case 2:
			ctx.fillStyle = this.colorClicked;
			break;
	}
	ctx.fillRect(this.x, this.y, this.image.width, this.image.height);
	ctx.drawImage(this.image, this.x, this.y);
};
sprite.prototype.setSRC = function(src) {
	this.image.src = "./images/"+src;
};

var clear = function(cnv) {
	let ctx = cnv.getContext('2d');
	ctx.clearRect(0, 0, 512, 512);
};

var text = function(cnv, text, x, y, color, font) {
	let ctx = cnv.getContext('2d');
	ctx.fillStyle = color;
	ctx.font = font || "8px Consolas";
	ctx.fillText(text, x, y);
}

var generateRect = function(obj) {
	return {x: obj.x, y: obj.y, w: obj.width || obj.image.width, h: obj.height || obj.image.height}
}

var colis = function(mouse, object) { // mouse = {x, y} object = {x, y, w, h}
	return (mouse.x>=object.x && mouse.y>=object.y && mouse.x<=object.w+object.x && mouse.y<=object.h+object.y);
}

var doc = document;
var getId = "getElementById";