var acessories = ['Bancos','Grades'];

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
