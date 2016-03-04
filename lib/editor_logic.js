const MENU_WIDTH = 50;
const WIDTH = 700 ;
const HEIGHT = 700;
const METER_SCALE = 30;
const BUTTON_HEIGHT = 40;
const MENU_BTN_POS = 705;

var  piers = [];
var connectors = [];
var buttons = [];
var canvas;
var stage;
var state = false;

drawPiece = function(pier_name) {
  var pier = {};
  var piece_click; 
  var container = new createjs.Container();
  var bmp = new createjs.Bitmap(queue.getResult(pier_name + '_piece'));
  bmp.name = 'image';
  container.addChild(bmp);
  bmp.x = 120;
  bmp.y = 120;
  piece_click = container.on("dblclick", function() { rotate(container, pier_name); });
  container.on("pressmove", function(evt) { move(evt); });
  stage.addChild(container);
  stage.update();
  pier = {'type': pier_name, 'container': container, 'piece_click': piece_click};
  piers.push(pier);
}

toogleDelete = function() {
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
rotate = function (container, pier_name) {
  container.getChildByName('image').rotation = container.getChildByName('image').rotation + 90;
  stage.update();
}

move = function(evt) {
  evt.target.x = Math.ceil(evt.stageX/15)*15;
  evt.target.y = Math.ceil(evt.stageY/15)*15;
  stage.update();
}

deletePier = function(pier) {
  stage.removeChild(pier.container);
  piers.splice($.inArray(pier, piers),1);
  stage.update();
}

//HUB ITENS
drawBackground = function () {
  var rect = new createjs.Shape();
  rect.graphics.beginFill("#0E00A8").drawRect(0, 0, WIDTH + MENU_WIDTH, HEIGHT);
  stage.addChild(rect);
  stage.update();
}

drawMargin = function () {
  var rect = new createjs.Shape();
  rect.graphics.beginFill("#F2C563").drawRect(0, HEIGHT - HEIGHT/10, WIDTH + MENU_WIDTH,HEIGHT/10);
  stage.addChild(rect);
  stage.update();
}

drawMenu = function () {
  var rect = new createjs.Shape();
  var container = new createjs.Container();
  rect.graphics.beginStroke("#FFF").beginFill("#A3A3A3").drawRect(700, 0, MENU_WIDTH, 700);
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
  rect.graphics.drawRect(MENU_BTN_POS, posy, BUTTON_HEIGHT, BUTTON_HEIGHT);
  var action = window[action_name];
  var bmp = new createjs.Bitmap(queue.getResult(pier_name));
  bmp.x = MENU_BTN_POS;
  bmp.y = posy;
  rect.name = 'border';
  btnTip(btn_container, posy, pier_name);
  btn_container.addChild(bmp);
  btn_container.addChild(rect);
  btn_container.on("mouseover", function() { toogleTip(btn_container.getChildByName('tip'), true); });
  btn_container.on("mouseout", function() { toogleTip(btn_container.getChildByName('tip'), false); }); 
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

btnTip = function(container, posy, pier_name) {
  var text = new createjs.Text(PIERS_DISPLAY_NAMES[pier_name], "12px Arial", "#FFF");
  text.x = MENU_BTN_POS - 120;
  text.y = posy + 10;
  text.alpha = 0;
  text.name = 'tip';
  text.textBaseline = "alphabetic"; 
  container.addChild(text);
}

toogleTip = function(tip, state) {
  state ? tip.alpha = 1 : tip.alpha = 0;
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
  for(var i=0;i<HEIGHT + MENU_WIDTH;i=i+METER_SCALE/2){
    drawGridLine(i);
  }
  for(var i=0;i<WIDTH+ MENU_WIDTH;i=i+METER_SCALE/2){
    drawGridColumn(i);
  }
}

drawScale = function() {
  var container = new createjs.Container();
  var scale = new createjs.Shape();
  scale.graphics.beginFill("#FFF").drawRect(30, 30, METER_SCALE, 1);
  container.addChild(scale);
  scale.graphics.beginFill("#FFF").drawRect(30, 30 - METER_SCALE/4, 1 , METER_SCALE/4);
  container.addChild(scale);
  scale.graphics.beginFill("#FFF").drawRect(29 + METER_SCALE , 30 - METER_SCALE/4, 1 , METER_SCALE/4);
  container.addChild(scale);
  var text = new createjs.Text("0", "10px Arial", "#FFF");
  text.x = 29;
  text.y = 30 - METER_SCALE/4;
  text.textBaseline = "alphabetic";
  container.addChild(text);
  var text = new createjs.Text("1m", "10px Arial", "#FFF");
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

//CALCULO DAS SAPATAS
calculateConnectors = function() {
  var connectors_qtd = 0;
  piers.map(function(pier) {
    drawConnectors(pier.container, pier.type);
  });
  connectors_qtd = checkConnectability();
  //cleanConnectors();
  return connectors_qtd;
}

cleanConnectors = function(){
  connectors.map(function(connector) {
    stage.removeChild(connector.item);
  });
  connectors = [];
  stage.update();
}

checkConnectability = function() {
  var connectors_qtd = 0;
  if (connectors.length > 0 ) {
    for(var i=0; i < connectors.length; i++) {
      for(var j=i+1; j < connectors.length; j++){
        var connector = {};
        is_connected = connectors[i].item.hitTest(connectors[j].item.x, connectors[j].item.y);
        if (is_connected) connectors_qtd++;
      }
    }
  }
  return connectors_qtd;
}

drawConnectors = function(container, type) {
  var piece = container.getChildByName('image');
       
  switch(type) {
    case 'pier_gd':
      drawPierDefaultConnectors(piece);
      break;
    case 'pier_pq':
      drawPierDefaultConnectors(piece);
      break;
    case 'apoio':
      drawPierTriangleConnectors(piece);
      break;    
    case 'suporte_estaca':
      drawPierSupportConnectors(piece);
      break;
    default:
      console.log('invalid name');
  }
  stage.update();
}

drawPierDefaultConnectors = function(piece) {
  if (Math.round(Math.sin(toRadians(piece.rotation)))== 0 && Math.round(Math.cos(toRadians(piece.rotation)))==1){
    drawPieceConnectors(piece.x + METER_SCALE/3, piece.x + piece.getBounds().width,  piece.y, true); //aresta superior
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().height, piece.x, false); //lateral esquerda
    drawPieceConnectors(piece.x + METER_SCALE/3, piece.x + piece.getBounds().width,  piece.getBounds().height + piece.y, true); //aresta inferior
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().height, piece.getBounds().width + piece.x, false); //lateral direita
  }  
  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 0 && Math.round(Math.cos(toRadians(piece.rotation)))== -1){
    drawPieceConnectors(piece.x - piece.getBounds().width + METER_SCALE/3, piece.x,  piece.y, true); //aresta superior
    drawPieceConnectors(piece.y - piece.getBounds().height + METER_SCALE/3, piece.y, piece.x, false); //lateral esquerda
    drawPieceConnectors(piece.x - piece.getBounds().width + METER_SCALE/3, piece.x,  piece.y - piece.getBounds().height, true); //aresta inferior
    drawPieceConnectors(piece.y - piece.getBounds().height + METER_SCALE/3, piece.y, piece.x - piece.getBounds().width, false); //lateral direita

  }
  else if (Math.sin(piece.rotation)== 0  && Math.cos(piece.rotation)== -1) console.log(piece.rotation);

  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 1  && Math.round(Math.cos(toRadians(piece.rotation)))== 0) {
    drawPieceConnectors(piece.x - piece.getBounds().height + METER_SCALE/3, piece.x, piece.y, true); //lateral esquerda
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().width,  piece.x, false); //aresta superior
    drawPieceConnectors(piece.x - piece.getBounds().height + METER_SCALE/3, piece.x, piece.getBounds().width + piece.y, true); //lateral direita  
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().width,  piece.x  - piece.getBounds().height, false); //aresta inferior
  }
}

drawPierTriangleConnectors = function(piece) {
  if (Math.round(Math.sin(toRadians(piece.rotation)))== 0 && Math.round(Math.cos(toRadians(piece.rotation)))==1){
    drawPieceConnectors(piece.x + METER_SCALE/3, piece.x + piece.getBounds().width,  piece.y, true); //aresta superior
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().height, piece.x, false); //lateral esquerda
  }  
  else if (Math.sin(piece.rotation)== -1 && Math.cos(piece.rotation)==0) console.log(piece.rotation);
  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 0 && Math.round(Math.cos(toRadians(piece.rotation)))== -1){
    drawPieceConnectors(piece.x - piece.getBounds().width + METER_SCALE/3, piece.x,  piece.y, true); //aresta superior
    drawPieceConnectors(piece.y - piece.getBounds().height + METER_SCALE/3, piece.y, piece.x, false); //lateral esquerda
  }
  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 1  && Math.round(Math.cos(toRadians(piece.rotation)))== 0) {
    drawPieceConnectors(piece.x - piece.getBounds().height + METER_SCALE/3, piece.x, piece.y, true); //lateral esquerda
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().width,  piece.x, false); //aresta superior
  }
}

drawPierSupportConnectors = function(piece) {
  if (Math.sin(piece.rotation)== 0 && Math.cos(piece.rotation)==1)
    drawPieceConnectors(piece.y + METER_SCALE/3, piece.y + piece.getBounds().height, piece.getBounds().width + piece.x, false); //lateral direita
  else if (Math.sin(piece.rotation)== -1 && Math.cos(piece.rotation)==0) console.log(piece.rotation);

  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 0 && Math.round(Math.cos(toRadians(piece.rotation)))== -1)
    drawPieceConnectors(piece.y - piece.getBounds().height + METER_SCALE/3, piece.y, piece.x - piece.getBounds().width, false); //lateral direita
  else if (Math.round(Math.sin(toRadians(piece.rotation)))== 1  && Math.round(Math.cos(toRadians(piece.rotation)))== 0) 
    drawPieceConnectors(piece.x - piece.getBounds().height + METER_SCALE/3, piece.x, piece.getBounds().width + piece.y, true); //lateral direita
}

drawPieceConnectors = function(initial_pos, end_pos, fixed_pos, is_horizontal) {
  for(var i = initial_pos; i < end_pos; i= i + METER_SCALE/2 ){
    var rect = new createjs.Shape();
    var connector = {};
    if (is_horizontal){
      rect.graphics.beginFill("green").drawRect(i, fixed_pos, 2, 2);
      rect.x = i;
      rect.y = fixed_pos;
    } else {
      rect.graphics.beginFill("green").drawRect(fixed_pos,i , 2, 2);
      rect.x = fixed_pos;
      rect.y = i;
    }
    rect.name = 'connector';

    stage.addChild(rect);
    connector = {'item': rect};
    connectors.push(connector);
  }
}
 