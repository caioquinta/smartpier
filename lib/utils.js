var acessories = { 'banco':'Banco', 'grade': 'Grade', 'guarda-corpo':'Guarda-corpo', 'escada': 'Escada em inox',
                   'cunho':'Cunho de Amarração 6pol', 'suporte': 'Suporte em aço', 'modulo': 'Módulo para Estaca', 'estaca-peq': 'Estava de aço 3m', 'estaca-gd': 'Estaca de aço 6m' };
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