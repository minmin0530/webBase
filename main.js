var touchFlag = false;
var btn1Flag = false;
var btn2Flag = false;
var btn3Flag = false;
var btn4Flag = false;
var supportTouch = 'ontouchend' in document;
 
// イベント名
 
var EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
var EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
var EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup'; 

var el_hitarea = document.getElementById('canvas');
var el_eventname = document.getElementById('eventname');
var el_x = document.getElementById('x');
var el_y = document.getElementById('y');
 /*
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
btn1.style.top = (screen.height / 2) + 'px';
btn1.style.left = (screen.width / 2 - 150) + 'px';
btn2.style.top = (screen.height / 2) + 'px';
btn2.style.left = (screen.width / 2 + 150) + 'px';
btn3.style.top = (screen.height / 2 - 150) + 'px';
btn3.style.left = (screen.width / 2 ) + 'px';
btn4.style.top = (screen.height / 2 + 150) + 'px';
btn4.style.left = (screen.width / 2) + 'px';
*/
// 表示をアップデートする関数群
 
var updateXY = function(event) {
el_x.innerHTML = event.pageX;
el_y.innerHTML = event.pageY;
//  el_x.innerHTML = event.changedTouches[0].pageX;
//  el_y.innerHTML = event.changedTouches[0].pageY;
};
var updateEventname = function(eventname) {
  el_eventname.innerHTML = eventname;
};
 
// イベント設定
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

/*
btn1.addEventListener(EVENTNAME_TOUCHSTART, function(event) { btn1Flag = true; }, false);  
btn1.addEventListener(EVENTNAME_TOUCHEND, function(event) { btn1Flag = false; }, false);
btn2.addEventListener(EVENTNAME_TOUCHSTART, function(event) { btn2Flag = true; }, false);  
btn2.addEventListener(EVENTNAME_TOUCHEND, function(event) { btn2Flag = false; }, false);
btn3.addEventListener(EVENTNAME_TOUCHSTART, function(event) { btn3Flag = true; }, false);  
btn3.addEventListener(EVENTNAME_TOUCHEND, function(event) { btn3Flag = false; }, false);
btn4.addEventListener(EVENTNAME_TOUCHSTART, function(event) { btn4Flag = true; }, false);  
btn4.addEventListener(EVENTNAME_TOUCHEND, function(event) { btn4Flag = false; }, false);
*/

const ai6 = new AI6GL();

// const cubeArray = [];
// const cube = new BigCube(ai6);
// const object1 = new Grass();
// const object2 = new Cube();
// const object3 = new BevelCube();
// const object4 = new Octahedron2();

const cubeArray = [];
const CUBE_NUM = 8;
const CUBE_NUM_3 = 2;
let i = 0;
for (let j = 0; j < CUBE_NUM_3; ++j) {
for (let k = 0; k < CUBE_NUM_3; ++k) {
for (let l = 0; l < CUBE_NUM_3; ++l) {
    if (j == 0 || j == CUBE_NUM_3 - 1 ||
        k == 0 || k == CUBE_NUM_3 - 1 ||
        l == 0 || l == CUBE_NUM_3 - 1 
        ) {
  cubeArray.push(new BigCube(j*2, k*2, l*2, ai6));
//  cubeArray[i].setPosition((j-2.0) * 0.22, (k+1.0) * 0.22, (l-2.0) * 0.22);
  ++i;
    }
}
}
}
const light1 = [0.0, 0.0, 0.0];
const light2 = [110.0, 110.0, 0.0];
const light3 = [0.0, 110.0, 110.0];
const light4 = [-110.0, 110.0, 0.0];
const light5 = [-110.0, 110.0, -110.0];
const eye = [0.0, 5.0, -5.0];
const target = [0.0, 0.0, 0.0];
const up = [0.0, 1.0, 0.0];

// object1.setPosition( 3.0, 0.0, 0.0);
// object2.setPosition(-3.0, 0.0, 0.0);
//      object4.setPosition( 3.5, 0.0, 0.0);
// ai6.addObject( object1 );
// ai6.addObject( object2 );
// ai6.addObject( object3 );
// ai6.addObject( object4 );
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
//   eye[0] = Math.cos(this.time*-0.1) * 5;
//   eye[1] = 5.0;
  if (touchFlag) {
      eye[0] += (divX-moveX) / 1000;
      eye[2] += (divY-moveY) / 1000;
  }
  // // light[0] = 0.0;
  ai6.draw(ai6.GL);
  requestAnimationFrame( mainLoop );
  for (const cube of cubeArray) {
      cube.update();
  }

  // object1.update();
  // object2.update();
  // object3.update();
  // object4.update();
}
