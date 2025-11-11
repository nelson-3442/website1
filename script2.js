






var myGamePiece7384nr;
var myObstacles738ke = [];
var mySound384i;
var myMusic834nf8;
var gameOver834l4 = false;

var score456 = 0;

var myGameArea342f4 = {
    canvas: document.getElementById("gameCanvas738hd7"),
    start: function() {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea345h65, 20);
    },
    stop: function() {
     clearInterval(this.interval);
    document.getElementById("startBtn78l9").disabled = false;
    document.getElementById("pauseBtn83n64h23").disabled = true; // 🔹 disable pause when game ends
    gameOver834l4 = true;

    },
    clear: function() {
      
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function startGame567() {

document.getElementById("pauseBtn83n64h23").disabled = false;
document.getElementById("pauseBtn83n64h23").innerText = "Pause";


   
    document.getElementById("startBtn78l9").disabled = true;
    myObstacles738ke = [];
    gameOver834l4 = false;

 
    score456 = 0;

   
    myGamePiece7384nr = new component345(30, 30, "#FFC900", 10, 120);
    mySound384i = new sound("bounce.mp3");
    myMusic834nf8 = new sound("gametheme2.mp3");
    myMusic834nf8.sound.loop = true;
    myMusic834nf8.play();

    
    myGameArea342f4.start();
}


function component345(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea342f4.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > myGameArea342f4.canvas.width) {
            this.x = myGameArea342f4.canvas.width - this.width;
        }
        if (this.y + this.height > myGameArea342f4.canvas.height) {
            this.y = myGameArea342f4.canvas.height - this.height;
        }
    }    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || 
            (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}


function updateGameArea345h65() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

   
    for (i = 0; i < myObstacles738ke.length; i += 1) {
        if (myGamePiece7384nr.crashWith(myObstacles738ke[i])) {
            mySound384i.play();
            myMusic834nf8.stop();
            myGameArea342f4.stop();
            drawgameOver834l4();
            return;
        } 
    }

    myGameArea342f4.clear();
    myGameArea342f4.frameNo += 1;

    score456++;
    
    if (myGameArea342f4.frameNo == 1 || everyinterval(200)) {
        x = myGameArea342f4.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles738ke.push(new component345(10, height, "#85EF47", x, 0));
        myObstacles738ke.push(new component345(10, x - height - gap, "#85EF47", x, height + gap));
    }

   
    for (i = 0; i < myObstacles738ke.length; i += 1) {
        myObstacles738ke[i].x -= 0.8;
        myObstacles738ke[i].update();
    }

    myGamePiece7384nr.newPos();
    myGamePiece7384nr.update();
  
    drawscore456();
}



function drawscore456() {
    let ctx = myGameArea342f4.context;
    ctx.font = "500 25px 'Nunito', serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("score: " + score456, 14, 34);
}



function drawgameOver834l4() {
    let ctx = myGameArea342f4.context;
    ctx.font = "700 30px 'Nunito'";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", myGameArea342f4.canvas.width / 2, myGameArea342f4.canvas.height / 2);


    ctx.font = "500 20px 'Nunito'";
    ctx.fillText("Final score: " + score456, myGameArea342f4.canvas.width / 2, myGameArea342f4.canvas.height / 2 + 40);


}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls-7685", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){ this.sound.play(); }
    this.stop = function(){ this.sound.pause(); this.sound.currentTime = 0; }
}


function everyinterval(n) {
    return (myGameArea342f4.frameNo / n) % 1 === 0;
}


function moveup() { myGamePiece7384nr.speedY = -1.3; }
function movedown() { myGamePiece7384nr.speedY = 1.3; }
function moveleft() { myGamePiece7384nr.speedX = -1.3; }
function moveright() { myGamePiece7384nr.speedX = 1.3; }
function clearmove() { myGamePiece7384nr.speedX = 0; myGamePiece7384nr.speedY = 0; }







var isPaused34l5l3 = false;

function togglePause456() {
    if (isPaused34l5l3) {
       
        myGameArea342f4.interval = setInterval(updateGameArea345h65, 20);
        document.getElementById("pauseBtn83n64h23").innerText = "Pause";
        isPaused34l5l3 = false;
        if (myMusic834nf8) myMusic834nf8.play();
    } else {
        
        clearInterval(myGameArea342f4.interval);
        document.getElementById("pauseBtn83n64h23").innerText = "Resume";
        isPaused34l5l3 = true;
        if (myMusic834nf8) myMusic834nf8.sound.pause();
    }
}









function bindButton234(id, onPress) {
  const btn = document.getElementById(id);

  
  btn.addEventListener("mousedown", onPress);
  btn.addEventListener("touchstart", onPress);

 
  document.addEventListener("mouseup", clearmove);
  document.addEventListener("touchend", clearmove);
}

bindButton234("btnUp56l42", moveup);
bindButton234("btnDown845g83", movedown);
bindButton234("btnLeft45h67g", moveleft);
bindButton234("btnRight45n32j", moveright);







document.querySelectorAll(
  ".button8593ejy, .button537jnb, .start8493jn, .pause732jen"
).forEach(btn => {
  btn.addEventListener("dragstart", e => e.preventDefault());
});








document.querySelectorAll(".button537jnb, .button8593ejy").forEach(btn => {
 
  btn.addEventListener("contextmenu", e => e.preventDefault());

  
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    btn.classList.add("pressed");
  }, { passive: false });

 
  btn.addEventListener("touchend", e => {
    btn.classList.remove("pressed");
  });

  
  btn.addEventListener("touchcancel", e => {
    btn.classList.remove("pressed");
  });
});





