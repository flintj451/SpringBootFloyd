var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var radPaddle = 13;
var rad1 = 12;
var rad2 = 12;
var rad3 = 17;
//var radF = 7;
var rad = [13, 12, 12, 17, 7];

var xy1 = [canvas.width - 40, canvas.height - 40];
var xy2 = [20, 20];
var xy3 = [20, 350];

//var xyF=[200, 400];

var d1 = [-2, 2];
var d2 = [1, -3];
var d3 = [1, -2];
//var dF=[1,-2];

var v1 = [0, 0];
var v2 = [0, 0];
var v3 = [0, 0];
//var vF=[0,1];

var paddle = [(canvas.width - 20) / 2, (canvas.width - 30) / 2];


var l;
var isAlert = false;
var score = 0;
//var snitchScore=0;
var t = 1;


var c = 10;

document.addEventListener("mousemove", mouseMoveHandler, false);


function myAlert() {
    if (isAlert == false) {
        isAlert = true;
        alert("GAME OVER" + '\n' + " Your Score: " + score);
    }
    toZero();
}

function toZero() {
    radPaddle = 13;
    xy1 = [canvas.width - 40, canvas.height - 40];
    xy2 = [20, 20];
    xy3 = [20, 350];

    //   xyF[0]=200;
    // xyF[1]= 400;

    d1 = [-2, 2];
    d2 = [1, -3];
    d3 = [1, -2];

    v1 = [2, -2];
    v2 = [0, 0];
    v3 = [0, 0];

    paddle = [(canvas.width - 20) / 2, (canvas.width - 30) / 2];
    isAlert = false;
    score = 0;
    // snitchScore=0;
    t = 1;
    c = 10;
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX + 5 - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle[0] = relativeX - radPaddle / 2;
    }
    var relativeY = e.clientY - 110;
    if (relativeY > 0 && relativeY < canvas.height) {
        paddle[1] = relativeY + radPaddle / 2;
    }
}


function drawBall(rad, color, xy) {
    ctx.beginPath();
    ctx.arc(xy[0], xy[1], rad, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.closePath();
}


function collusionPaddle(paddle, xy, d, radPaddle, rad2) {
    if (Math.abs(paddle[1] - xy[1]) < (radPaddle + rad2) * 0.8 && Math.abs(paddle[0] - xy[0]) < (radPaddle + rad2) * 0.8) {

        myAlert();


    }
    if (xy[0] + d[0] > canvas.width - radPaddle || xy[0] + d[0] < radPaddle) {
        d[0] = -0.75 * d[0];
    }

    if (xy[1] + d[1] < radPaddle || xy[1] + d[1] > canvas.height - radPaddle) {
        d[1] = -0.75 * d[1];
    }
}

function collusionBalls(xy1, xy2, d1, d2, rad1, rad2) {
    if (Math.abs(xy1[0] - xy2[0]) < (rad1 + rad2) * 0.8 && Math.abs(xy1[1] - xy2[1]) < (rad1 + rad2) * 0.8) {

        d1[0] = d2[0] + d1[0];
        d2[0] = d1[0] - d2[0];
        d1[0] = d1[0] - d2[0];


        d1[1] = d2[1] + d1[1];
        d2[1] = d1[1] - d2[1];
        d1[1] = d1[1] - d2[1];
    }
}

function collusionFood(xyF, xy1, dF, d2, radF, rad1) {
    if (xyF[0] + dF[0] + vF[0] > canvas.width - radF || xyF[0] + dF[0] + vF[0] < radF) {
        dF[0] = -0.9 * dF[0];
    }

    if (xyF[1] + dF[1] + vF[1] < radPaddle || xyF[1] + dF[1] + vF[1] > canvas.height - radPaddle) {
        dF[1] = -0.9 * dF[1];
    }

    if (Math.abs(xy1[0] - xyF[0]) < (rad1 + radF) * 0.8 && Math.abs(xy1[1] - xyF[1]) < (rad1 + radF) * 0.8) {

        d2[0] = d2[0] * 0.7;
        d2[1] = d2[1] * 0.7;

        dF[0] = 1;
        dF[1] = -2;

        //  xyF[0]= 10+Math.random()*0.9*canvas.width;
        //  xyF[1]= 10+Math.random()*0.9*canvas.height;
        c = 10;
        v1[0] = v1[0] * 0.5;
        v1[1] = v1[1] * 0.5;
        v2[0] = v2[0] * 0.5;
        v2[1] = v2[1] * 0.5;
        v3[0] = v3[0] * 0.5;
        v3[1] = v3[1] * 0.5;

        snitchScore++;
        return 1;

    }
    return 0;

}

function move(paddle, xy, d, v, c) {

    l = Math.sqrt((paddle[0] - xy[0]) * (paddle[0] - xy[0]) + (paddle[1] - xy[1]) * (paddle[1] - xy[1]));
    v[0] = (paddle[0] - xy[0]) / (l * c);
    v[1] = (paddle[1] - xy[1]) / (l * c);
    d[0] = d[0] + v[0];
    d[1] = d[1] + v[1];
    xy[0] += d[0];
    xy[1] += d[1];

}

function moveF(paddle, xy, d, v, c) {

    l = Math.sqrt((paddle[0] - xy[0]) * (paddle[0] - xy[0]) + (paddle[1] - xy[1]) * (paddle[1] - xy[1]));
    if (l < 240) {


        v[0] = -(paddle[0] - xy[0]) / ((l * c) * (l / 170) * (l / 170)) + 0.1 * (Math.random() * -10 + 5);
        v[1] = -(paddle[1] - xy[1]) / ((l * c) * (l / 170) * (l / 170)) + 0.1 * (Math.random() * -10 + 5);
        d[0] = d[0] + v[0];
        d[1] = d[1] + v[1];
        xy[0] += d[0];
        xy[1] += d[1];
    } else {
        v[0] = v[1];
        v[1] = -v[0];
        d[0] = d[0] + v[0];
        d[1] = d[1] + v[1];
        xy[0] += d[0];
        xy[1] += d[1];
    }


}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawSnitchScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "gold";
    ctx.fillText("Snitch: " + snitchScore, 88, 20);
}

function drawPaddle(radPaddle) {
    ctx.beginPath();

    ctx.arc(paddle[0], paddle[1], radPaddle, 0, Math.PI * 2, false);
    ctx.arc(paddle[0], paddle[1], radPaddle * 0.23, 0, Math.PI * 2, true);
    ctx.arc(paddle[0], paddle[1], radPaddle * 0.8, 0, Math.PI * 2, true)
    ctx.arc(paddle[0], paddle[1], radPaddle * 0.7, 0, Math.PI * 2, true)

    ctx.fillStyle = "#097CF8";
    ctx.fill();
    ctx.closePath();

}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t = t + 0.001;
    c = c - 0.005 / t;
    score = parseInt(20 * (t - 1), 10);

    drawBall(rad1, "red", xy1);
    drawBall(rad2, "red", xy2);
    drawBall(rad3, "black", xy3);
    // drawBall(radF,"gold",xyF);
    drawScore();
    // drawSnitchScore();
    drawPaddle(radPaddle);

    collusionPaddle(paddle, xy1, d1, radPaddle, rad1);
    collusionPaddle(paddle, xy2, d2, radPaddle, rad2);
    collusionPaddle(paddle, xy3, d3, radPaddle, rad3);

    collusionBalls(xy1, xy2, d1, d2, rad1, rad2);
    collusionBalls(xy1, xy3, d1, d3, rad1, rad3);
    collusionBalls(xy3, xy2, d3, d2, rad3, rad2);

    //radPaddle += collusionFood(xyF, paddle,  dF,dF , radF, rad1);


    move(paddle, xy1, d1, v1, c);
    move(paddle, xy2, d2, v2, c);
    move(paddle, xy3, d3, v3, c);
    //  moveF(paddle,xyF,dF,vF,c);

    requestAnimationFrame(draw);
}

draw();