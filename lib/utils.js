const ACESSORIES_DISPLAY_NAMES = { 'banco':'Banco Easy Pier', 'guarda-cp-peq': 'Guarda-corpo 1,30 m', 'guarda-cp-gd':'Guarda-corpo 2,30 m', 'escada': 'Escada em inox c/ 4 degraus',
                   'cunho':'Cunho de Amarração 6pol', 'suporte': 'Suporte em aço para poita', 'estaca-peq': 'Estaca de aço com ponta helicoidal 3m', 
                   'estaca-gd': 'Estaca de aço com ponta helicoidal 6m' };

const PIERS_DISPLAY_NAMES = { 'pier_gd': 'Pier Largura 1.5m', 'pier_pq': 'Pier Largura 1m', 
                              'apoio': 'Pier Triangular', 'suporte_estaca': 'Suporte Para Estaca'}
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

  // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
  stage.enableMouseOver();

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

  drawBackground();
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

function itensByOcurrency(arr){
  var obj = { };
  for (var i = 0, j = arr.length; i < j; i++) {
     if (obj[arr[i].type]) {
        obj[arr[i].type]++;
     }
     else {
        obj[arr[i].type] = 1;
     } 
  }
  return obj;
}