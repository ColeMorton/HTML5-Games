var UntangleGame = {};

var checkResourcesLoaded = null;
var gameloop = null;

UntangleGame.Levels = Levels;
UntangleGame.Graphics = Graphics;
UntangleGame.Logic = Logic;
UntangleGame.circles = [];
UntangleGame.lines = [];
UntangleGame.currentLevel = 0;
UntangleGame.progressPercentage = 0;

$(function () {
    "use strict";

    // ensure resources are loaded before beginning
    checkResourcesLoaded = setInterval(checkResourcesLoaded, 1);
});

checkResourcesLoaded = function () {
    "use strict";
    
    // check if all resources are loaded
    if (UntangleGame.Graphics.imagesLoaded === true) {
        
        //  stop resource loaded check and setup game
        clearInterval(checkResourcesLoaded);
        setupGame();
    }
};

setupGame = function () {
    "use strict";
    
    UntangleGame.SetupCurrentLevel();
    
    //setup an interval to loop the game loop
    gameloop = setInterval(UntangleGame.GameLoop, 30);
};

UntangleGame.SetupCurrentLevel = function() {
    "use strict";

    UntangleGame.circles = [];
    var level = UntangleGame.Levels[UntangleGame.currentLevel];

    $.each(level.circles, function (index, circle) {
        UntangleGame.circles.push(new UntangleGame.Graphics.Circle(circle.x, circle.y, 10));
    });

    // setup line data after setup the circles.
    UntangleGame.ConnectCircles();
    
    UntangleGame.Logic.UpdateLineIntersection(UntangleGame.lines);
};

UntangleGame.GameLoop = function () {
    "use strict";

    UntangleGame.Graphics.drawLayerBackground();
    UntangleGame.Graphics.drawLayerGame(UntangleGame.lines, UntangleGame.circles);
    UntangleGame.Graphics.drawLayerUi(UntangleGame.progressPercentage);

    if (UntangleGame.currentLevel == 0) {       
        UntangleGame.Graphics.drawAnimations();
    }
    
    // fade out the guideline after level 0
    if (UntangleGame.currentLevel == 1) {
        $("#guide").addClass('fadeout');
        UntangleGame.Graphics.stopAnimations();
    }
};

UntangleGame.ConnectCircles = function() {
    "use strict";

    // setup all lines based on the circles relationship
    var level = UntangleGame.Levels[UntangleGame.currentLevel];
    UntangleGame.lines.length = 0;

    $.each(level.relationships, function (i) {
        var connectedPoints = level.relationships[i].connectedPoints;
        var startPoint = UntangleGame.circles[i];

        $.each(connectedPoints, function (j) {
            var endPoint = UntangleGame.circles[connectedPoints[j]];
            UntangleGame.lines.push(new UntangleGame.Graphics.Line(startPoint, endPoint));
        });
    });
};

UntangleGame.UpdateLevelProgress = function() {
    "use strict";

    // check the untangle progress of the level
    var progress = 0;
    $.each(UntangleGame.lines, function (index, line) {
        if (line.thickness === UntangleGame.Graphics.thinLineThickness) {
            progress++;
        }
    });

    UntangleGame.progressPercentage = Math.floor(progress / UntangleGame.lines.length * 100);
    $("#progress").html(UntangleGame.progressPercentage);
    $('#progressBar').css('width', UntangleGame.progressPercentage + '%');

    // display the current level
    $("#level").html(UntangleGame.currentLevel);
};

UntangleGame.CheckLevelCompleteness = function() {
    "use strict";

    if (UntangleGame.progressPercentage === 100) {
        if (UntangleGame.currentLevel + 1 < UntangleGame.Levels.length) {
            UntangleGame.currentLevel++;
        }
        UntangleGame.SetupCurrentLevel();
    }
};

UntangleGame.MoveCircle = function (mouseX, mouseY) {
    "use strict";
    
    if (Events.UntangleGame.targetCircle !== undefined) {
        UntangleGame.circles[UntangleGame.targetCircle] = new UntangleGame.Graphics.Circle(mouseX, mouseY, UntangleGame.Graphics.circleRadius);
    }
    UntangleGame.ConnectCircles();
    UntangleGame.Logic.UpdateLineIntersection(Events.UntangleGame.lines);
    UntangleGame.UpdateLevelProgress();
};

UntangleGame.UnselectCircle = function() {
    "use strict";
    
    Events.UntangleGame.targetCircle = undefined;
    Events.UntangleGame.CheckLevelCompleteness();
};