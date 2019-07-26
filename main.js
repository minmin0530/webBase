var touchFlag = false;
var supportTouch = 'ontouchend' in document;
var EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
var EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
var EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup'; 

var el_hitarea = document.getElementById('canvas'); 
var divX = 0;
var divY = 0;
var moveX = 0;
var moveY = 0;
var div = document.createElement('div');
var move = document.createElement('div');
el_hitarea.addEventListener(EVENTNAME_TOUCHSTART, function(event) {
    div.style.position = 'absolute';
    div.style.left = (event.pageX-50) + 'px';
    div.style.top = (event.pageY-50) + 'px';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.background = 'white';
    div.style.zIndex = 3;
    document.body.appendChild(div);

    move.style.position = 'absolute';
    move.style.left = (event.pageX-25) + 'px';
    move.style.top = (event.pageY-25) + 'px';
    move.style.width = '50px';
    move.style.height = '50px';
    move.style.background = 'green';
    move.style.zIndex = 3;
    document.body.appendChild(move);

    divX = event.pageX;
    divY = event.pageY;
    moveX = event.pageX;
    moveY = event.pageY;
    touchFlag = true;
}, false); 
el_hitarea.addEventListener(EVENTNAME_TOUCHMOVE, function(event) {
    move.style.left = (event.pageX-25) + 'px';
    move.style.top = (event.pageY-25) + 'px';
    moveX = event.pageX;
    moveY = event.pageY;
}, false);
el_hitarea.addEventListener(EVENTNAME_TOUCHEND, function(event) {
    document.body.removeChild(div);
    document.body.removeChild(move);
    touchFlag = false;
    divX = 0;
    divY = 0;
    moveX = 0;
    moveY = 0;

}, false);

const ai6 = new AI6GL();

const cursor = new Cube(1.0, 1.0, 1.0, 1.0, 1.0);
cursor.setPosition(2.0 * 0.22, 2.0 * 0.22, 2.0 * 0.22);
ai6.addObject(cursor);

const cubeArray = [];
const CUBE_NUM = 8;
const CUBE_NUM_3 = 2;
let i = 0;
for (let j = 0; j < CUBE_NUM_3; ++j) {
for (let k = 0; k < CUBE_NUM_3; ++k) {
for (let l = 0; l < CUBE_NUM_3; ++l) {
    if (j == 0 || j == CUBE_NUM_3 - 1 ||
        k == 0 || k == CUBE_NUM_3 - 1 ||
        l == 0 || l == CUBE_NUM_3 - 1 )
    {
        cubeArray.push(new BigCube(j*2, k*2, l*2, ai6));
        ++i;
    }
}
}
}
const light1 = [0.0, 0.0, 0.0];
const light2 = [110.0, 110.0, 0.0];
const light3 = [0.0, 110.0, 110.0];
const light4 = [-110.0, 110.0, 0.0];
const light5 = [-110.0, 110.0, 110.0];
const eye = [0.0, 5.0, 5.0];
const target = [0.0, 0.0, 0.0];
const up = [0.0, 1.0, 0.0];

ai6.addLight(light1);
ai6.addLight(light2);
ai6.addLight(light3);
ai6.addLight(light4);
ai6.addLight(light5);
ai6.setCamera(eye, target, up);

ai6.fetchShader(ai6.GL, mainLoop);

this.time = 0.0;
function mainLoop() {
  this.time += 0.1;
  light1[0] = Math.cos(this.time*0.1) * 100;
  light1[1] = 130.0;
  light1[2] = Math.sin(this.time*0.1) * 100;
  if (touchFlag) {
      cursor.x -= (divX-moveX) / 1000;
      cursor.y += (divY-moveY) / 1000;
  }
  ai6.draw(ai6.GL);
  requestAnimationFrame( mainLoop );
  for (const cube of cubeArray) {
      cube.update();
  }
  cursor.update();
}
