var paddle2 =10,paddle1=10;
 var paddle1X = 10,paddle1Height = 110; 
 var paddle2Y = 685,paddle2Height = 70;
 var score1 = 0, score2 =0; 
 var paddle1Y; 
 var playerscore =0; 
 var pcscore =0;
 var ball = { x:350/2, y:480/2, r:20, dx:3, dy:3 }
rightWristY=0;
rightWristX=0;
scoreRightWrist=0;
game_status="";

function preload() {
     ball_touch_paddel = loadSound("ball_touch_paddel.wav");
      missed = loadSound("missed.wav");
     }

     function setup() {
        canvas=createCanvas(1240,336);
        canvas.parent('canvas');
    
        instializeInSetup(mario);
    
        video = createCapture(VIDEO);
    video.size(800,400);
    video.parent('game_console');
    
    poseNet = ml5.poseNet(video,modelloded);
    poseNet.on('pose',gotPoses);
    }

    function modelloded(){
        console.log("model has loded!");
    }

    function gotPoses(results){
        if(results.length>0)
        {
            console.log(results);
            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
            console.log(scorRightWrist);
            scoreRightWrist = results[0].pose.keypoints[10].score;
        }
    }

    function startGame(){
        game_status = "start";
        document.getElementById("status").innerHTML="Game Is Loading";
    }
    
function draw(){
    if(game_status == "start"){
        background(0);
        image(video,0,0,700,600);
        fill("black");
        stroke("black");
        rect(680,0,20,700);

        fill("black");
        stroke("black");
        rect(0,0,20,700);
     if (scoreRightWrist > 0.2){
        fill("red");
        stroke("red");
        circle(rightWristX,rightWristY,30);
     }
     paddleInCanvas();
     fill(250,0,0);
        stroke(0,0,250);
        strokeWeight(0.5);
        paddle1Y=rightWristY;
        rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
        midline();
        drawScore();
        models();
        move();
    }
    
}

function reset(){
    ball.x = width/2+100,
    ball.y = height/2+100;
    ball.dx=3;
    ball.dy =3;
}

function midline(){
    for(i=0;i=480;i+=10){
        var y = 0;
        fill("white");
        stroke(0);
        rect(width/2,y+i,1,480);
    }
}

function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:",100,50)
    test(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscare,555,50)
}

function move(){
    fill(50,350,0);
    stroke(255,0,0);
    strokeWeight(0.5);
    ellipse(ball.x,ball.y,ball.r,20)
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
    if(ball.x+ball.r>width-ball.r/2){
        ball.dx=ball.dx-0.5;
    }
    if(ball.x-2.5*ball.r/2<0){
        if (ball.y >= paddle1y&& ball.y<= paddle1Y + paddle1Height){
            ball.dx = -ball.dx+0.5;
        }
        else{
            pcscore++;
            reset();
            navigation.vibrate(100);
        }
    }
    if(pcscore ==4){
        fill("#FFA500");
        stroke(0)
        rect(0,0,width,height-1);
        fill("white");
        teextSize(25);
        text("game over!",width/2,height/2);
        text("press restart button to play again!",width/2,height/2+30)
        noLoop();
        pcscore = 0;
    }
    if(ball.y+balll.r>height||ball.y-ball.r<0){
        ball.dy =-ball.dy;
    }
}

function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:" +abs(ball.dx),50,15);
    text("Height:"+height,235,15)
}

function paddleInCanvas(){
    if(mouceY+paddleHeight>height){
        mouseY=height-paddleHeight;
    }
    if(mouseY<0){
        mouseY=0;
    }
}

function restart(){
    loop();
    pcscore = 0;
    playerscore = 0;
}