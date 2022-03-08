var PLAY;
var END;
var gamestate = PLAY;
var groupC;
var groupN;
var score = 0;
var nuvem,nuvemimage;
var chaoinvisivel;
var trex, trexRunning;
var edges;
var chao,chaoimage;
var cacto1, cacto2 ,cacto3, cacto4, cacto5, cacto6;

function preload() {
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
chaoimage=loadImage("ground2.png");
nuvemimage=loadImage("cloud.png");
cacto1 = loadImage ("obstacle1.png");
cacto2 = loadImage ("obstacle2.png");
cacto3 = loadImage ("obstacle3.png");
cacto4 = loadImage ("obstacle4.png");
cacto5 = loadImage ("obstacle5.png");
cacto6 = loadImage ("obstacle6.png");
}

//Configuração
function setup() {
  createCanvas(600, 200);
  
  chaoinvisivel = createSprite(200,190,400,10);
  chaoinvisivel.visible = false;

  groupC = new Group();
  groupN = new Group();

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trexRunning);
  trex.scale = 0.5;

  chao=createSprite(200,180,400,20);
  chao.addImage("solo",chaoimage);

  edges = createEdgeSprites();
 // var text = Math.round(random(1,100));
 // console.log(text);
}


function draw() {
  background("white");
  
  text("score: "+score,500,50);

  if(gamestate===PLAY){
  score = score+ Math.round(frameCount/60);
  chao.velocityX=-4;

  if (chao.x<0){
    chao.x=chao.width/2;
    }

if (keyDown("space")&& trex.y>=150) {
  trex.velocityY = -10;
}

trex.velocityY = trex.velocityY + 0.5;

criarnuvens();
criarcacto();

if(groupC.isTouching(trex)){
  gamestate = END;
}

else if(gamestate === END){
  chao.velocityX = 0;
groupC.setVelocityXEach(0);
groupN.setVelocityXEach(0);
}

  trex.collide(chaoinvisivel);
  drawSprites();
  }

  function criarcacto(){

    if(frameCount%60===0){

      var cacto =createSprite(610,165,10,40);
      cacto.velocityX = -3;
var aleatorio = Math.round(random(1,6));
switch(aleatorio){
  case 1: cacto.addImage(cacto1);
  break;
  case 2: cacto.addImage(cacto2);
  break;
  case 3: cacto.addImage(cacto3);
  break;
  case 4: cacto.addImage(cacto4);
  break;
  case 5: cacto.addImage(cacto5);
  break;
  case 6: cacto.addImage(cacto6);
  break;

default:break;
}
cacto.scale = 0.5;
cacto.lifetime =220;
groupC.add(cacto);
    }
  }
  function criarnuvens(){
    if(frameCount%60===0){
  nuvem = createSprite (610,100,10,10);
  nuvem.y = Math.round(random(50,100));
  nuvem.velocityX = -3;
  nuvem.addImage("nuvem",nuvemimage);
  nuvem.scale = 0.5;
  nuvem.depth =trex.depth;
  trex.depth = trex.depth + 1;
  nuvem.lifetime = 220;
  groupN.add(nuvem);
  }
  }


  