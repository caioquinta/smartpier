var acessories = { 'banco':'Banco', 'grade': 'Grade', 'guarda-corpo':'Guarda-corpo', 'escada': 'Escada em inox',
                   'cunho':'Cunho de Amarração 6pol', 'suporte': 'Suporte em aço', 'modulo': 'Módulo para Estaca', 'estaca-peq': 'Estaca de aço 3m', 'estaca-gd': 'Estaca de aço 6m' };
var APP = {};
var queue;

window.onload = function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  // Enable touch support
  if (createjs.Touch.isSupported()) { createjs.Touch.enable(stage); }
  canvas.oncontextmenu = function (e) {
    e.preventDefault();
  };

  queue = new createjs.LoadQueue(true);
  queue.loadFile({id:"pier_gd", src:"img/pier_gd.jpg"});
  queue.loadFile({id:"pier_pq", src:"img/pier_pq.jpg"});
  queue.loadFile({id:"pier_gd_piece", src:"img/pier_gd_piece.jpg"});
  queue.loadFile({id:"pier_pq_piece", src:"img/pier_pq_piece.jpg"});
  queue.loadFile({id:"suporte_estaca_piece", src:"img/suporte_estaca_piece.png"});
  queue.loadFile({id:"suporte_estaca", src:"img/suporte_estaca.jpg"});
  queue.loadFile({id:"apoio", src:"img/apoio.jpg"});
  queue.loadFile({id:"apoio_piece", src:"img/apoio_piece.png"});
  queue.loadFile({id:"trash_can", src:"img/trash_can.png"});

  drawMargin();
  drawGrid();
  drawScale();
  queue.on("complete", drawMenu, this);
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}