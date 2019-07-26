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

const cursor = new Cube(1.0, 0.0, 0.0, 1.0, 1.0);
cursor.setPosition(2.0 * 0.22, 2.0 * 0.22, 2.0 * 0.22);
ai6.addObject(cursor);

const wall = [];
for (let x = 0; x < 5; ++x) {
  for (let y = 0; y < 5; ++y) {
    for (let z = 0; z < 5; ++z) {
      if (x == 0 || x == 4 ||
        y == 0 || y == 4 ||
        z == 0) {
        const w = new Cube(Math.random(), Math.random(), Math.random(), 1.0, 3.0);
        w.setPosition(x * 3-5 , y * 3-5 , z * 3 -10);
        ai6.addObject(w);
        wall.push(w);
      }
    }
  }
}

let ballSpeedX = 0.03;
let ballSpeedY = 0.02;
let ballSpeedZ = 0.01;
const ball = new Cube(0.0, 1.0, 0.0, 1.0, 1.0);
ai6.addObject(ball);

const light1 = [0.0, 0.0, 0.0];
// const light2 = [0.0, 0.0, 0.0];
// const light3 = [0.0, 0.0, 0.0];
// const light4 = [0.0, 0.0, 0.0];
// const light5 = [0.0, 0.0, 0.0];
const eye = [0.0, 0.0, 7.0];
const target = [0.0, 0.0, 0.0];
const up = [0.0, 1.0, 0.0];

ai6.addLight(light1);
// ai6.addLight(light2);
// ai6.addLight(light3);
// ai6.addLight(light4);
// ai6.addLight(light5);
ai6.setCamera(eye, target, up);

ai6.fetchShader(ai6.GL, mainLoop);

this.time = 0.0;
function mainLoop() {
  this.time += 0.1;
  // light1[0] = Math.cos(this.time*0.1) * 100;
  // light1[1] = 130.0;
  // light1[2] = Math.sin(this.time*0.1) * 100;
  if (touchFlag) {
      cursor.x -= (divX-moveX) / 1000;
      cursor.y += (divY-moveY) / 1000;
  }
  if (ball.x > 5 || ball.x <   -5) { ballSpeedX *= -1; }
  if (ball.y > 5 || ball.y <   -5) { ballSpeedY *= -1; }
  if (ball.z >  0 || ball.z < -10) { ballSpeedZ *= -1; }
  ball.x += ballSpeedX;
  ball.y += ballSpeedY;
  ball.z -= ballSpeedZ;
  light1[0] = ball.x;
  light1[1] = ball.y;
  light1[2] = ball.z;
  
  ai6.draw(ai6.GL);
  requestAnimationFrame( mainLoop );
  for (const w of wall) {
    w.update();
  }
  ball.update();
  cursor.update();
}
