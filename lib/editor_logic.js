const MENU_WIDTH = 50;
const WIDTH = 500 ;
const HEIGHT = 500;
const METER_SCALE = 20;
const BUTTON_HEIGHT = 40;

var  piers = [];
var buttons = [];
var canvas;
var stage;
var state = false;

drawPiece = function (pier_name) {
  var pier = {};
  var piece_click; 
  var container = new createjs.Container();
  var bmp = new createjs.Bitmap(queue.getResult(pier_name + '_piece'));
  container.addChild(bmp);
  bmp.x = 100;
  bmp.y = 100;
  piece_click = container.on("dblclick", function() { rotate(bmp); });
  container.on("pressmove", function(evt) { move(evt); });
  stage.addChild(container);
  stage.update();
  pier = {'type': pier_name, 'container': container, 'piece_click': piece_click};
  piers.push(pier);
}
 
toogleDelete = function () {
  toogleState();
  if (state) {
    $.each(piers,function( key, value ) {
      piers[key].piece_click = value.container.on("dblclick", function() { deletePier(value); });
    });
    $.each(buttons, function( key, value ) {
      value.container.removeAllEventListeners('click');
      value.container.alpha = 0.5;
    });

  } 
  else {
    $.each(piers,function( key, value ) { 
      value.container.off("dblclick",  piers[key].piece_click );
    });
    $.each(buttons, function( key, value ){
      value.container.on("click", buttons[key].btn_click);
      value.container.alpha = 1;
    });
  }
  stage.update();
}

//Actions
rotate = function (rect) {
  rect.rotation = rect.rotation + 90;
  stage.update();
}

move = function(evt) {
  evt.target.x = Math.ceil(evt.stageX/10)*10;
  evt.target.y = Math.ceil(evt.stageY/10)*10;
  stage.update();
}

deletePier = function(pier) {
  stage.removeChild(pier.container);
  piers.splice($.inArray(pier, piers),1);
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
  addButton('drawPiece', false, 'pier_gd', 5, container);
  addButton('drawPiece', false, 'pier_pq', BUTTON_HEIGHT + 10, container);
  addButton('drawPiece', false, 'apoio', 2*BUTTON_HEIGHT + 15, container);
  addButton('drawPiece', false, 'suporte_estaca', 3*BUTTON_HEIGHT + 20, container);  
  addButton('toogleDelete', true, 'trash_can', 6*(BUTTON_HEIGHT) + 35, container);
  stage.addChild(container);
  stage.update();
}

addButton = function  (action_name, is_continuous, pier_name, posy, container) {
  var btn_container = new createjs.Container();
  var btn_event;
  var rect = new createjs.Shape();
  rect.graphics.drawRect(505, posy, BUTTON_HEIGHT, BUTTON_HEIGHT);
  var action = window[action_name];
  var bmp = new createjs.Bitmap(queue.getResult(pier_name));
  bmp.x = 505;
  bmp.y = posy;
  rect.name = 'border';
  btn_container.addChild(bmp);
  btn_container.addChild(rect);
  btn_event = btn_container.on("click", function() { btnClick(action, is_continuous, pier_name, btn_container); });
  container.addChild(btn_container);
  if (!is_continuous) {
    buttons.push({'container': btn_container, 'btn_click': btn_event });
    btn_container.getChildByName('border').graphics.append(new createjs.Graphics.Stroke("#000"));
  } else {
    btn_container.getChildByName('border').graphics.append(new createjs.Graphics.Stroke("red"));
  }

}

btnClick = function(action, is_continuous, pier_name, container) { 
  action(pier_name);
  if (state && is_continuous)  container.getChildByName('border').graphics.append(new createjs.Graphics.Stroke("green"));
  if (!state && is_continuous) container.getChildByName('border').graphics.append(new createjs.Graphics.Stroke("red"));
  stage.update();
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

toogleState = function() {
  state = !state;
  stage.update();
}
