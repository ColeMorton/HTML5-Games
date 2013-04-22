var Events = {};

Events.UntangleGame = UntangleGame;
Events.Graphics = Graphics;
Events.Logic = Logic;

$(function () {
    "use strict";
    
    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#layers").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        Events.UntangleGame.targetCircle = Events.Logic.FindTargetCircle(Events.UntangleGame.circles, mouseX, mouseY);
    });

    // we move the target dragging circle when the mouse is moving
    $("#layers").mousemove(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;
        Events.UntangleGame.MoveCircle(mouseX, mouseY);
    });

    // We clear the dragging circle data when mouse is up
    $("#layers").mouseup(function () {
        Events.UntangleGame.UnselectCircle();
    });
});