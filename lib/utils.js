var acessories = ['Bancos','Grades'];
var APP = {};

window.onload = function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  // Enable touch support
  if (createjs.Touch.isSupported()) { createjs.Touch.enable(stage); }
  canvas.oncontextmenu = function (e) {
    e.preventDefault();
  };
  drawMargin();
  drawGrid();
  drawScale();
  drawMenu();
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}