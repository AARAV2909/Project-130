Yummy = "";
ShapeOfYou = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
song_justin_bieber = "";
scorerightWrist = 0;
song_Shape_Of_You = "";

function setup(){
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw(){
    image(video, 0, 0, 600, 530);

    fill("#37ff00");
    stroke("#ff0000");

    song_justin_bieber = Yummy.isPlaying();
    console.log("Yummy"+song_justin_bieber);

    song_Shape_Of_You = ShapeOfYou.isPlaying();
    console.log("Shape Of You"+song_Shape_Of_You);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        ShapeOfYou.stop();
        if(song_justin_bieber == false){
            Yummy.play();
        }
        else{
            document.getElementById("").innerHTML = "Song name = Justin Bieber Yummy Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20);
        Yummy.stop();
        if(song_Shape_Of_You == false){
            ShapeOfYou.play();
        }
        else{
            document.getElementById("").innerHTML = "Song name = Shape of You by Ed Sheeran";
        }
    }
}

function preload(){
    ShapeOfYou = loadSound("mp (2).mp3");
    Yummy = loadSound("mp (1).mp3");
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist =results[0].pose.keypoints[9].score;
        console.log("leftWrist_score ="+scoreleftWrist);

        scorerightWrist =results[0].pose.keypoints[10].score;
        console.log("rightWrist_score ="+scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist_x;
        leftWrist_y = results[0].pose.leftWrist_y;
        console.log("leftWrist_x " +leftWrist_x+"leftWrist_y" +leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist_x;
        rightWrist_y = results[0].pose.rightWrist_y;
        console.log("rightWrist_x " +rightWrist_x+"rightWrist_y" +rightWrist_y);
    }
}