var GAMESPEED = 100;
var PROGRESSTIMER = 2000;
var REFRESHRATE = 60;
var NEWLINE = "\n";

var pingpong = {};
pingpong.gameSpeed = GAMESPEED;

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
};

$(function () {

    // set interval to call gameloop every x milliseconds
    pingpong.timer = setInterval(gameloop, pingpong.gameSpeed);
    pingpong.refreshRateTimer = setInterval(refreshScreen, 1000 / REFRESHRATE);
    // pingpong.progressBartimer = setInterval(function () { $('#progressBar').css('width', '1%'); }, PROGRESSTIMER);

    // mark down what key is down and up into an array called "pressedKeys"
    // $(document).keydown(function (e) {
    //     keydown(e);
    // });

    // $(document).keyup(function (e) {
    //     keyup(e);
    // });
});

function gameloop() {
    moveProgressBar();
    moveBall();
    movePaddles();
}

function refreshScreen() {
    // actually move the ball with speed and direction
    $("#ball").css({ "left": pingpong.ball.x, "top": pingpong.ball.y });
}

var counter = 0

function moveProgressBar() {
    if (counter < 100) {
        counter = counter + 1;
        $("#progressbar").progressbar({value: 47});
    }
}

function movePaddles() {
    // use our custom timer to continuously check if a key is pressed.
    // var top;
    // var pressedKeys = keyLogger.pressedKeys;

    // if (pressedKeys[KEY.UP]) { // arrow-up

    //     // move the paddle B up 5 pixels
    //     top = parseInt($("#paddleB").css("top"));
    //     $("#paddleB").css("top", top - 5);
    // }

    // if (pressedKeys[KEY.DOWN]) { // arrow-down

    //     // move the paddle B down 5 pixels
    //     top = parseInt($("#paddleB").css("top"));
    //     $("#paddleB").css("top", top + 5);
    // }

    // if (pressedKeys[KEY.W]) { // w

    //     // move the paddle A up 5 pixels
    //     top = parseInt($("#paddleA").css("top"));
    //     $("#paddleA").css("top", top - 5);
    // }

    // if (pressedKeys[KEY.S]) { // s

    //     // move the paddle A down 5 pixels
    //     top = parseInt($("#paddleA").css("top"));
    //     $("#paddleA").css("top", top + 5);
    // }
}

function moveBall() {

    // reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;
    
    // check playground boundary
    // check bottom edge
    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        ball.directionY = -1;
    }
    // check top edge
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }

    // check right edge
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
        // player B lost.
        // reset the ball;
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = -1;
    }

    // check left edge
    if (ball.x + ball.speed * ball.directionX < 0) {
        // player A lost.
        // reset the ball;
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({ "left": ball.x, "top": ball.y });
        ball.directionX = 1;
    }

    // check left paddle
    var paddleAx = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAyBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAyTop = parseInt($("#paddleA").css("top"));

    if (ball.x + ball.speed * ball.directionX < paddleAx) {
        if (ball.y + ball.speed * ball.directionY <= paddleAyBottom && ball.y + ball.speed * ball.directionY >= paddleAyTop) {
            ball.directionX = 1;
        }
    }

    // check right paddle
    var paddleBx = parseInt($("#paddleB").css("left"));
    var paddleByBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleByTop = parseInt($("#paddleB").css("top"));

    if (ball.x + 20 + ball.speed * ball.directionX >= paddleBx) {
        if (ball.y + ball.speed * ball.directionY <= paddleByBottom && ball.y + ball.speed * ball.directionY >= paddleByTop) {
            ball.directionX = -1;
        }
    }
    
    pingpong.ball.x += ball.speed * ball.directionX;
    pingpong.ball.y += ball.speed * ball.directionY;
}