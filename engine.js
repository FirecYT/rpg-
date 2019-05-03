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

var imageCut = function (src, sx, sy, sWidth, sHeight) {
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.src = src;
}
imageCut.prototype.draw = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

clear = function(canvas) {
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 512, 512);
};

doc = document;
getId = "getElementById";