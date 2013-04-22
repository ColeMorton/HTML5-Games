var Graphics = {};

var layers = new Array();
var checkImagesLoaded = null;
var background = new Image();
var guideAnimation = null;
var guideSprite = new Image();

Graphics.circleRadius = 10;
Graphics.thinLineThickness = 1;
Graphics.boldLineThickness = 5;
Graphics.lineStrokeStyle = "#cfc";
Graphics.imagesLoaded = false;

$(function () {
    "use strict";

    loadImages();
    checkImagesLoaded = setInterval(checkImagesLoaded, 1);

    // prepare layers
    layers[0] = $("#bg")[0].getContext("2d");
    layers[1] = $("#guide")[0].getContext("2d");
    layers[2] = $("#game")[0].getContext("2d");
    layers[3] = $("#ui")[0].getContext("2d");
});

loadImages = function () {
    guideSprite = imageLoader.load("Images/guide_sprite.png");
    background = imageLoader.load("Images/board.png");
};

checkImagesLoaded = function () {
    if (imageLoader.loaded === true) {
        clearInterval(checkImagesLoaded);
        Graphics.imagesLoaded = true;
        imagesLoaded();
    }
};

imagesLoaded = function () {
    guideAnimation = new Animation(guideSprite, 80, 0);
    guideAnimation.setFirstFrame(1);
    guideAnimation.setLastFrame(5);
    guideAnimation.setSpeed(400);
    guideAnimation.start();
};

clear = function (context) {
    "use strict";

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

Graphics.Circle = function (x, y) {
    "use strict";
    
    this.x = x;
    this.y = y;
};

Graphics.Line = function (startPoint, endPoint, thickness) {
    "use strict";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : Graphics.thinLineThickness;
};

Graphics.drawLayerBackground = function () {
    "use strict";

    var context = layers[0];
    clear(context);

    // draw background
    Graphics.drawBackgroundGradient();

    // draw the loading text
    Graphics.drawLoadingBackgroundText();

    // load the background image
    Graphics.drawBackgroundImage();
};

Graphics.drawAnimations = function () {
    "use strict";

    var context = layers[1];
    clear(context);

    context.drawImage(
        guideAnimation.getImage(),
        guideAnimation.getFrameX(),
        guideAnimation.getFrameY(),
        80, 130, 325, 130, 80, 130);
};

Graphics.stopAnimations = function() {
    guideAnimation.stop();
};

Graphics.drawLayerGame = function (lines, circles) {
    "use strict";

    var context = layers[2];
    clear(context);

    // draw all remembered line
    $.each(lines, function (index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        Graphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(circles, function (index, circle) {
        Graphics.drawCircle(circle.x, circle.y);
    });
};

Graphics.drawLayerUi = function (progressPercentage) {
    "use strict";

    var context = layers[3];
    clear(context);

    // draw text
    Graphics.drawText(progressPercentage);
};

Graphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    
    var context = layers[0];
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = thickness;
    context.strokeStyle = Graphics.lineStrokeStyle;
    context.stroke();
};

Graphics.drawCircle = function (x, y) {
    "use strict";
    
    var context = layers[0];

    // prepare the radial gradients fill style
    var circleGradient = context.createRadialGradient(x - 3, y - 3, 1, x, y, Graphics.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    context.fillStyle = circleGradient;

    // draw path
    context.beginPath();
    context.arc(x, y, Graphics.circleRadius, 0, Math.PI * 2, true);
    context.closePath();

    // actually fill the circle
    context.fill();
};

Graphics.drawText = function (progressPercentage) {
    "use strict";
    
    var context = layers[0];

    // draw the title text
    context.font = "26px 'WellFleet'";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";

    // draw the level progress text
    context.textAlign = "left";
    context.textBaseline = "bottom";
    context.fillText("Puzzle " + progressPercentage + "%", 60, context.canvas.height - 100);
};

Graphics.drawBackgroundGradient = function () {
    "use strict";
    
    var context = layers[0];

    // draw gradients background
    var bgGradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

Graphics.drawLoadingBackgroundText = function () {
    "use strict";
    
    var context = layers[0];

    // draw the loading text
    context.font = "34px 'Rock Salt'";
    context.textAlign = "center";
    context.fillStyle = "#333333";
    context.fillText("loading...", context.canvas.width / 2, context.canvas.height / 2);
};

Graphics.drawBackgroundImage = function () {
    "use strict";

    var context = layers[0];
    clear(context);
    context.drawImage(background, 0, 0);
};

Graphics.lineIsBold = function (line) {
    "use strict";

    line.thickness = Graphics.boldLineThickness;
};