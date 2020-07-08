//--------------------------- ROBOT ARM ------------------------//
//Instrucciones: 
// 1. Ubicarse a por lo menos dos metros de la camara, enfocando al menos sobre las rodillas.
// 2. La mano derecha controlará el brazo del robot, El movimineto vertical y el horizontal. <Controles invertidos>
// 3. La mano derecha controlará el moviemiento de la cámara.

// El código utiliza PoseNet, mediante la libreria de de ml5.js  ---> https://ml5js.org/
// Además usa WEBGL para la renderización del brazo róbotico   ---> https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5 
// El diseño del brazo fue realizado por Coretech ---> https://www.dropbox.com/s/sr4gk1y5mlxrrid/demoRobot.zip?dl=1

let video;
let poseNet;

let r_Wrist = new p5.Vector();
let l_Wrist = new p5.Vector();
let l_Eye = new p5.Vector();
let r_Eye = new p5.Vector();

let base;
let shoulder;
let upArm;
let loArm;
let end;

let angle = 0;


function preload() {
  base = loadModel('data/r1.obj');
  shoulder = loadModel('data/r2.obj');
  upArm = loadModel('data/r3.obj');
  loArm = loadModel('data/r4.obj');
  end = loadModel('data/r5.obj');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  video = createCapture(VIDEO);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function modelReady() {
  console.log('model ready');
}

// Detecta los puntos claves de PoseNet 
function gotPoses(poses) {

  if (poses.length > 0) {
    let wX = poses[0].pose.keypoints[10].position.x;
    let wY = poses[0].pose.keypoints[10].position.y;
    let lwX = poses[0].pose.keypoints[9].position.x;
    let lwY = poses[0].pose.keypoints[9].position.y;
    let leftEyeX = poses[0].pose.keypoints[1].position.x;
    let leftEyeY = poses[0].pose.keypoints[1].position.y;
    let rightEyeX = poses[0].pose.keypoints[2].position.x;
    let rightEyeY = poses[0].pose.keypoints[2].position.y;

    l_Eye.x = lerp(l_Eye.x, leftEyeX, 0.4); 
    l_Eye.y = lerp(l_Eye.y, leftEyeY, 0.4);
    r_Eye.x = lerp(r_Eye.x, rightEyeX, 0.4); 
    r_Eye.y = lerp(r_Eye.y, rightEyeY, 0.4); 
    r_Wrist.x = lerp(r_Wrist.x, wX, 0.2);
    r_Wrist.y = lerp(r_Wrist.y, wY, 0.2);
    l_Wrist.x = lerp(l_Wrist.x, lwX, 0.1);
    l_Wrist.y = lerp(l_Wrist.y, lwY, 0.1);
  }
}




function draw() {
  
  // Luces que le dan el aspecto al speculaMetrial. 
  background(42);
  directionalLight(103, 103, 103, 0, 0, 1);
  directionalLight(62, 56, 0, -1, 0, 0);
  ambientLight(113, 113, 113);
  noStroke();
  // Distancia entre los ojos para el zoom 
  let zoom = dist(l_Eye.x, l_Eye.y, r_Eye.x, r_Eye.y);

  // Mapeo de los valores para hacerlos mas precisos
  let x2 = map(r_Wrist.x, 0, width, 0, 10, true);
  let y2 = map(r_Wrist.y, 0, height, 7, 18, true);
  let x3 = map(l_Wrist.x, 0, width, 15, 25, true);
  let x4 = map( zoom, 15, 100, -250, 500, true );
  let prueba = map( mouseX, 0, width, -1000, 1000, true);
  
  translate(0, 0, x4);
  rotateY(x3);
  
  push();
  translate(0, 175);
  fill(12, 191, 10);
  rotateX(HALF_PI);
  plane(1000, 1000);
  pop();


  rotate(PI);
  scale(3);
  
  //Base Fija 
  push();
  translate(0, -33, 0);
  specularMaterial(250, 0, 0);
  fill('#AAAAAA');
  model(end);
  pop();

  // Base movible 
  fill('#FFE308');
  translate(0, -30, 0);
  push();
  specularMaterial(250, 255, 0);
  fill('#FFF700');
  rotateY(x2);
  model(base);

  //Brazo 
  translate(0, 25, 0);
  rotateX(y2);
  specularMaterial(250, 255, 0);
  fill('#FFF700');
  model(shoulder);

  //Antebrazo 
  translate(0, 0, 50);
  rotateX(degrees(30));
  rotateX(y2);
  specularMaterial(250, 255, 0);
  fill('#FFF700');
  model(upArm);

  //Mano 
  translate(0, 0, -50);
  rotateX(degrees(130));
  specularMaterial(250, 0, 0);
  fill('#AAAAAA');
  model(loArm);
  pop();
  
  //Caja 
  push();
  translate(0,-20,40);
  normalMaterial();
  box(25);
  pop();
  
}
