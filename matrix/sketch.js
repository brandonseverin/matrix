var symbol;
const symbolSize= 10;
let streamsArray = [];
const characterColor = '#f790c8';
const specialCharacterColor = '#ffe0f0'
const backgroundColor = 0;
const backgroundOpacity = 255;
const minSwitchSpeed = 1;
const maxSwitchSpeed = 50;
const minStreamSpeed = 1;
const maxStreamSpeed = 5;
const minCharacters = 8;
const maxCharacters = 20;


function setup() {
	// put setup code here
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	var x = 0;
	var y = 0;
	for (let i = 0; i <=width / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x,random(-height*2,0));
		streamsArray.push(stream);
		x += symbolSize
	}
	textSize(symbolSize);
}

function draw() {
	// put drawing code here
	background(backgroundColor, backgroundOpacity);
	streamsArray.forEach(function(stream) {
		stream.render();
	})
}


function Character(x,y, speed, first) {
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(minSwitchSpeed,maxSwitchSpeed));
	this.first = first;


	this.setToRandomSymbol = function() {
		// change symbol every switch interval
		if (frameCount % this.switchInterval == 0) {
			// get katakana characters randomly
			this.value = String.fromCharCode(
				0x30A0 + floor(random(0,96))
			);

		}
	}

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}

	this.render = function() {
		fill(characterColor);
		text(this.value, this.x, this.y);
		this.rain();		
		this.setToRandomSymbol();
	}
}

function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(minCharacters, maxCharacters));
	this.speed = random(minStreamSpeed, maxStreamSpeed);
	
	this.generateSymbols = function(x,y) {
		let first = floor(random(0,5)) == 0;
		for (let i=0; i<= this.totalSymbols; i++) {
			symbol = new Character(x,y,this.speed, first);
			symbol.setToRandomSymbol;
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}
	}

	this.render = function() {
		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(specialCharacterColor);
			} else {
				fill(characterColor);
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.setToRandomSymbol();
			symbol.rain();
		})
	}
}


