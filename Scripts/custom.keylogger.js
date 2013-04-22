//For use in html
//<div class="row-fluid">
//    <iframe class="span12" id="iFrame" src="http://localhost/KeyLogger.htm"></iframe>
//</div>
//
//Keystroke listner
//mark down what key is down and up into an array called "pressedKeys"
//$(document).keydown(function (e) {
//    keyLogger.pressedKeys[e.which] = true;
//});

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
};

var NEWLINE = "\n";

var keylogger = {
    pressedKeys: [],
    allKeysPressed: "",
    lastKeyPressed: "",
    mousePosX: 0,
    mousePosY: 0,
    canvas: $("#canvasoutput")[0],
    context: null
};

$(function () {
    keylogger.context = keylogger.canvas.getContext("2d");
    keylogger.context.font = '18pt Calibri';
    keylogger.context.fillStyle = 'black';
    context.fillText(message, 10, 25);
});

function mousemove(e) {
    keylogger.context.mousePosX = e.clientX;
    keylogger.context.mousePosY = e.clientY;
}

function keydown(e) {
    keylogger.pressedKeys[e.which] = true;
    var pressedKeys = keylogger.pressedKeys;

    if (pressedKeys[KEY.UP]) { // up
        keylogger.lastKeyPressed = "UP";
        keylogger.allKeysPressed += keylogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.DOWN]) { // down
        keylogger.lastKeyPressed = "DOWN";
        keylogger.allKeysPressed += keylogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.W]) { // w
        keylogger.lastKeyPressed = "W";
        keylogger.allKeysPressed += keylogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.S]) { // s
        keylogger.lastKeyPressed = "S";
        keylogger.allKeysPressed += keylogger.lastKeyPressed + NEWLINE;
    }
}

function keyup(e) {
    keylogger.pressedKeys[e.which] = false;
    keylogger.lastKeyPressed = "";
}