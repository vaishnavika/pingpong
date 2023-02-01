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
    

