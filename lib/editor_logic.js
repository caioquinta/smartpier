const MENU_WIDTH = 50;
const WIDTH = 500 ;
const HEIGHT = 500;
const METER_SCALE = 40;
const BUTTON_HEIGHT = 40;

var  piers=[];
var canvas;
var stage;
var state = false;

//MENU BUTTONS
drawRect = function (meters) {
  var rect = new createjs.Shape();
  rect.graphics.beginStroke("#828282").beginFill("#ABABAB").drawRect(0, 0, metersToPixel(meters), 100);
  rect.x = 100;
  rect.y = 100;
  rect.on("dblclick", function() { rotateRect(rect); });
  rect.on("pressmove", function(evt) { moveRect(evt); });
  stage.addChild(rect);
  stage.update();
  piers.push(rect);
}

var listener = [];
toogleDelete = function (evt) {
  toogleState();

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
  evt.target.x = Math.ceil(evt.stageX/5)*5;
  evt.target.y = Math.ceil(evt.stageY/5)*5;
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
  rect.graphics.beginStroke("#FFF").beginFill("#A3A3A3").drawRect(500, 0, MENU_WIDTH,500);
  rect.alpha = 0.5;
  stage.addChild(rect);
  addButton('drawRect', 1.5,'blue', 5);
  addButton('drawRect', 1, 'green', BUTTON_HEIGHT + 10);
  addButton('toogleDelete', state, 'red', 2*(BUTTON_HEIGHT) + 15 );
  stage.update();
}


addButton = function  (action_name,args,icon, posy) {
  var action = window[action_name];
  var rect = new createjs.Shape();
  rect.graphics.beginStroke("#FFF").beginFill(icon).drawRect(505, posy, BUTTON_HEIGHT, BUTTON_HEIGHT);
  rect.on("click", function() { action(args); });
  stage.addChild(rect);
}

drawGridColumn = function(posx) {
  var stroke = new createjs.Shape();
  stroke.graphics.beginFill("#B0B0B0").drawRect(posx,0, 0.5,HEIGHT);
  stage.addChild(stroke);
  stage.update();
}

drawGridLine = function(posy) {
  var stroke = new createjs.Shape();
  stroke.graphics.beginFill("#B0B0B0").drawRect(0, posy, WIDTH, 0.5);
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
  var scale = new createjs.Shape();
  scale.graphics.beginFill("#000").drawRect(25, 25, METER_SCALE, 1);
  stage.addChild(scale);
  scale.graphics.beginFill("#000").drawRect(25, 25 - METER_SCALE/4, 1 , METER_SCALE/4);
  stage.addChild(scale);
  scale.graphics.beginFill("#000").drawRect(24 + METER_SCALE , 25 - METER_SCALE/4, 1 , METER_SCALE/4);
  stage.addChild(scale);
  stage.update();
}

//UTILS
metersToPixel = function (meter) {
  return meter*METER_SCALE
}

toogleState = function() {
  state = !state;
}

//NOT WORKING
function tick(event) {
  for ( var i = 0; i < parts.length; i++ ) {
    target = parts[i];
    for ( var j = 0; j < parts.length; j++ ) {
      var pt = parts[j].localToLocal(parts[j].x, parts[j].y, target);
      if (target.hitTest(pt.x, pt.y)) { 
        target.alpha = 0.2; console.log('HIT'); }
    };
  };
  stage.update(event);
}
