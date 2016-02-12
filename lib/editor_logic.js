const MENU_WIDTH = 50;
const WIDTH = 500 ;
const HEIGHT = 500;
const METER_SCALE = 20;
const BUTTON_HEIGHT = 40;
const TYPES = {'pier_gd': 1.5, 'pier_pq': 1, 'apoio': 1 }

var  piers=[];
var canvas;
var stage;
var state = false;

drawRect = function (meters) {
  var rect = new createjs.Shape();
  rect.graphics.setStrokeStyle(0.75).beginStroke("#000000").beginFill("#ABABAB").drawRect(0, 0, metersToPixel(meters), metersToPixel(2.5));
  rect.x = 100;
  rect.y = 100;
  rect.on("dblclick", function() { rotateRect(rect); });
  rect.on("pressmove", function(evt) { moveRect(evt); });
  stage.addChild(rect);
  stage.update();
  piers.push(rect);
}

drawTriangle = function(meters) {
  var triang = new createjs.Shape();
  triang.graphics.setStrokeStyle(0.75).beginStroke('#000000').beginFill("#ABABAB");
  triang.x = 100;
  triang.y = 100;
  triang.graphics.lineTo(100,100 + metersToPixel(meters)).lineTo(100 + metersToPixel(meters),100 + metersToPixel(meters)).lineTo(100,100).closePath(); 
  triang.on("dblclick", function() { rotateRect(triang); });
  triang.on("pressmove", function(evt) { moveRect(evt); });
  stage.addChild(triang);
  stage.update();
  piers.push(triang);

}
 
var listener = [];
toogleDelete = function (evt, bmp) {
  toogleState(bmp);
  if (state) {
    $.each(piers,function( key, value ) {
    listener[key] = value.on("dblclick", function() { deleteRect(value); });
    });
  }
  else {
    $.each(piers,function( key, value ) {
    value.off("dblclick",  listener[key] );
    });
    listener = [];  
  }
}

//Actions
rotateRect = function (rect) {
  rect.rotation = rect.rotation + 90;
  stage.update();
}

moveRect = function(evt) {
  evt.target.x = Math.ceil(evt.stageX/10)*10;
  evt.target.y = Math.ceil(evt.stageY/10)*10;
  stage.update();

}

deleteRect = function(rect) {
  stage.removeChild(rect);
  stage.update();
}

//HUB ITENS
drawMargin = function () {
  var rect = new createjs.Shape();
  rect.graphics.beginFill("#F2C563").drawRect(0, HEIGHT - HEIGHT/10, WIDTH + MENU_WIDTH,HEIGHT/10);
  stage.addChild(rect);
  stage.update();
}


drawMenu = function () {
  var rect = new createjs.Shape();
  var container = new createjs.Container();
  rect.graphics.beginStroke("#FFF").beginFill("#A3A3A3").drawRect(500, 0, MENU_WIDTH,500);
  rect.alpha = 0.5;
  container.addChild(rect);
  addButton('drawRect', TYPES['pier_gd'], 'pier_gd', 5, container);
  addButton('drawRect', TYPES['pier_pq'], 'pier_pq', BUTTON_HEIGHT + 10, container);
  addButton('drawTriangle', TYPES['apoio'], 'apoio', 2*BUTTON_HEIGHT + 15, container);
  addButton('drawRect', TYPES['pier_pq'], 'suporte_estaca', 3*BUTTON_HEIGHT + 20, container);  
  addButton('toogleDelete', state, 'trash_can', 6*(BUTTON_HEIGHT) + 35, container);
  stage.addChild(container);
  stage.update();
}

addButton = function  (action_name,args,icon, posy, container) {
  var btn_container = new createjs.Container();
  var rect = new createjs.Shape();
  rect.graphics.beginStroke("#000").drawRect(505, posy, BUTTON_HEIGHT, BUTTON_HEIGHT);
  var action = window[action_name];
  var bmp = new createjs.Bitmap(queue.getResult(icon));
  bmp.x = 505;
  bmp.y = posy;
  bmp.on("click", function() { action(args, bmp);});
  btn_container.addChild(bmp);
  btn_container.addChild(rect);
  container.addChild(btn_container);
}

drawGridColumn = function(posx) {
  var stroke = new createjs.Shape();
  stroke.graphics.beginFill("#808080").drawRect(posx,0, 0.5,HEIGHT);
  stage.addChild(stroke);
  stage.update();
}

drawGridLine = function(posy) {
  var stroke = new createjs.Shape();
  stroke.graphics.beginFill("#808080").drawRect(0, posy, WIDTH, 0.5);
  stage.addChild(stroke);
  stage.update();
}

drawGrid = function() {
  for(var i=0;i<HEIGHT + MENU_WIDTH;i=i+5){
    drawGridLine(i);
  }
  for(var i=0;i<WIDTH+ MENU_WIDTH;i=i+5){
    drawGridColumn(i);
  }
}

drawScale = function() {
  var container = new createjs.Container();
  var scale = new createjs.Shape();
  scale.graphics.beginFill("#000").drawRect(30, 30, METER_SCALE, 1);
  container.addChild(scale);
  scale.graphics.beginFill("#000").drawRect(30, 30 - METER_SCALE/4, 1 , METER_SCALE/4);
  container.addChild(scale);
  scale.graphics.beginFill("#000").drawRect(29 + METER_SCALE , 30 - METER_SCALE/4, 1 , METER_SCALE/4);
  container.addChild(scale);
  var text = new createjs.Text("0", "10px Arial", "#000000");
  text.x = 29;
  text.y = 30 - METER_SCALE/4;
  text.textBaseline = "alphabetic";
  container.addChild(text);
  var text = new createjs.Text("1m", "10px Arial", "#000000");
  text.x = 29 + METER_SCALE;
  text.y = 30 - METER_SCALE/4;
  text.textBaseline = "alphabetic";
  container.addChild(text);
  stage.addChild(container);
  stage.update();
}

metersToPixel = function (meters) {
  return meters*METER_SCALE
}

toogleState = function(bmp) {
  state = !state;
  if (state == true) {
    bmp.alpha = 1;
    }  
  else{
    bmp.alpha = 0.5;
  }
  stage.update();
}

rectType = function(meters) {
  if (meters == 1.5)
    return 'pier_gd'
  else
    return 'pier_pq'
}