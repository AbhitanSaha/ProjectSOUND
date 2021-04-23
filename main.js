song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scorel="";
scorer="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,moselelLoaded);
    poseNet.on("pose",gotPoses);
}
function moselelLoaded(){
    console.log("Re:Zero");
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#000000");
    if (scorer>0.2) {
        circle(rightWristX,rightWristY,20);
        if (rightWristY>0 && rightWristY<=100) {
            document.getElementById("speed").innerHTML="Speed=0.5x";
            song.rate(0.5);
        }
        if (rightWristY>100 && rightWristY<=200) {
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1);
        }
        if (rightWristY>200 && rightWristY<=300) {
            document.getElementById("speed").innerHTML="Speed=1.5x";
            song.rate(1.5);
        }
        if (rightWristY>300 && rightWristY<=400) {
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2);
        }
        if (rightWristY>400 && rightWristY<=499) {
            document.getElementById("speed").innerHTML="Speed=2.5x";
            song.rate(2.5);
        }
        if (rightWristY==500) {
            document.getElementById("speed").innerHTML="Speed=Wait what?. It is 9000";
            song.rate(9000);
        }
    }
    
    if(scorel>0.2){
        circle(leftWristX,leftWristY,20);
        NoY1=Number(leftWristY);
        rd=floor(NoY1);
        vol=rd/500;
        document.getElementById("volume").innerHTML="Volume"+vol;
        song.setVolume(vol);
    }
}
function preload(){
    song=loadSound("music.mp3");
}
function gotPoses(results){
    if (results.length>0) {
        console.log(results);
        scorel=results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist="+scorel);
        scorer=results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist="+scorer);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristY="+leftWristY+"leftWristX="+leftWristX);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}
function oi(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}