//Tablero

var xCasilla = 1;
var yCasilla = 1;

for(var i = 0; i < 400; i++){
    document.getElementById("pantalla").innerHTML += `<div class="casilla" id=${String(xCasilla)},${String(yCasilla)}>`
    
    if (yCasilla % 2 != 0){
        if ((i + 2) % 2 == 0){
            document.getElementById(String(xCasilla) + "," + String(yCasilla)).style.backgroundColor = "#32a852";
        }else{
            document.getElementById(String(xCasilla) + "," + String(yCasilla)).style.backgroundColor = "#4ec76e";
        }
    }else{
        if ((i + 2) % 2 == 0){
            document.getElementById(String(xCasilla) + "," + String(yCasilla)).style.backgroundColor = "#4ec76e";
        }else{
            document.getElementById(String(xCasilla) + "," + String(yCasilla)).style.backgroundColor = "#32a852";
        }
    }

    if (xCasilla == 20){
        xCasilla = 1;
        yCasilla++;
    }else{
        xCasilla++;
    }

}

//Movimiento

var x = 1;
var y = 1;
var score = 0;
var posicionAnterior = "1,1";
var track = [];
var trackX = [];
var trackY = [];
var trackTrash = [];
var gameOver = [[2,8],[3,8],[4,8],[5,8],[7,8],[8,8],[9,8],[11,8],[15,8],[17,8],[18,8],[19,8],[2,9],[7,9],[9,9],[11,9],[12,9],[14,9],[15,9],[17,9],[2,10],[4,10],[5,10],[7,10],[8,10],[9,10],[11,10],[13,10],[15,10],[17,10],[18,10],[2,11],[5,11],[7,11],[9,11],[11,11],[15,11],[17,11],[2,12],[3,12],[4,12],[5,12],[7,12],[9,12],[11,12],[15,12],[17,12],[18,12],[19,12],[2,14],[3,14],[4,14],[6,14],[10,14],[12,14],[13,14],[14,14],[16,14],[17,14],[18,14],[2,15],[4,15],[6,15],[10,15],[12,15],[16,15],[19,15],[2,16],[4,16],[7,16],[9,16],[12,16],[13,16],[16,16],[17,16],[18,16],[2,17],[4,17],[7,17],[9,17],[12,17],[16,17],[18,17],[2,18],[3,18],[4,18],[8,18],[12,18],[13,18],[14,18],[16,18],[19,18]]
var perdiste = false;
var franceses = [];

document.getElementById("1,1").innerHTML = `<div id="cabeza"></div>`;
document.getElementById("n-manzanas").innerHTML = score;


function mover(){
    if (x > 20 || y > 20 || x <= 0 || y <= 0 || (cabezaChocaCola() == true) || (chocaFranceses() == true)) {
        //GAME OVER
        perdiste = true;
        clearInterval(intervaloActual);
        for (var i = 1; i <= 20; i++){
            for (var j = 1; j <= 20; j++){
                document.getElementById(i + "," + j).innerHTML = ``;
            }
        }


        for (var i = 0; i < gameOver.length; i++){
            gameOver[i][1] -= 19;
        }
        actualizarGameOver();

        var intervaloGameOver = setInterval(function () {
            for (var i = 0; i < gameOver.length; i++){
                gameOver[i][1] += 1;
            }
            actualizarGameOver();
            if (gameOver[0][1] >= 8){
                clearInterval(intervaloGameOver);
                if (score >= 10){
                    var nBandera = 0;
                    var intervaloBandera = setInterval(function (){
                    if(nBandera > 0){
                        document.getElementById("cuadrado-" + nBandera).style.opacity = "1";
                    }
                    if (nBandera == 5){
                        clearInterval(intervaloBandera);
                        setTimeout(function (){
                            document.getElementById("sol").style.opacity = "1";
                            document.getElementById("restart").style.display = "block";
                        }, 1000)    
                    }
                    nBandera++;
                    }, 1000)
                }else{
                    document.getElementById("restart").style.display = "block";
                }
            }
        }, 200)

        return;
    }else {
        document.getElementById(x + "," + y).innerHTML = `<div id="cabeza"></div>`;
        document.getElementById(posicionAnterior).innerHTML = ``;
        posicionAnterior = x + "," + y;
    }

    if (x == xManzana && y == yManzana){
        score++;
        document.getElementById("n-manzanas").innerHTML = score;
        xManzana = parseInt((Math.random() * 19) + 1);
        yManzana = parseInt((Math.random() * 19) + 1);
        while ((manzanaEnCola() == true) && (manzanaEncimaFrances() == true)){
            xManzana = parseInt((Math.random() * 19) + 1);
            yManzana = parseInt((Math.random() * 19) + 1);
        }
        
        document.getElementById(xManzana + "," + yManzana).innerHTML = `<div class="manzana"></div>`;
        if (score >= 15){
            xFrances = parseInt((Math.random() * 19) + 1);
            yFrances = parseInt((Math.random() * 19) + 1);
            while (francesEnCola() == true || (xManzana == xFrances && yManzana == yFrances)){
                xFrances = parseInt((Math.random() * 19) + 1);
                yFrances = parseInt((Math.random() * 19) + 1);
                console.log("HOLA");
            }
            document.getElementById(xFrances + "," + yFrances).innerHTML = `<div class="frances"><div class="bleu"></div><div class="blanc"></div><div class="rouge"></div></div>`;
            franceses.push(xFrances + "," + yFrances);
        }
    }
    
    for (var i = 0; i < trackTrash.length; i++){
        document.getElementById(trackTrash[i]).innerHTML = ``;
        trackTrash.splice(i);
    }

    track.push(x + "," + y);
    trackX.push(x);
    trackY.push(y);

    while(track.length > score + 1){
        trackTrash.push(track[0]);
        track.shift();
        trackX.shift();
        trackY.shift();
    }
    if(score < 10){
        for (var i = 0; i < track.length; i++){
            document.getElementById(track[i]).innerHTML = `<div class="cola"></div>`;
        }
    }else{
        document.getElementById("cabeza").style.backgroundColor = "#57aacb";
        for (var i = 0; i < track.length; i++){
            if (i % 2 == 0){
                document.getElementById(track[i]).innerHTML = `<div class="cola b"></div>`;
            }else{
                document.getElementById(track[i]).innerHTML = `<div class="cola a"></div>`;
            }
        }
    }
    if (score >= 10){
        for(var i = 0; i < document.getElementsByClassName("manzana").length; i++){
            document.getElementsByClassName("manzana")[i].style.backgroundColor = "#ebd452";
        }
    }
}


var ejeMovimiento;
var delayIntervalo = 175;

var intervaloActual = setInterval(() => {
    y++;
    mover();
    ejeMovimiento = "y";
}, delayIntervalo)

document.addEventListener("keydown", (e) => {
    if ((perdiste == false)&&((e.key == "ArrowDown" && ejeMovimiento == "x") || (e.key == "ArrowUp" && ejeMovimiento == "x") ||(e.key == "ArrowRight" && ejeMovimiento == "y") ||(e.key == "ArrowLeft" && ejeMovimiento == "y"))){
        clearInterval(intervaloActual);
        switch (e.key){
            case "ArrowDown":
                setTimeout(function () {ejeMovimiento = "y";}, delayIntervalo);
                intervaloActual = setInterval(() => {
                    y++;
                    mover();
                }, delayIntervalo)
            break;
            
            case "ArrowUp":
                setTimeout(function () {ejeMovimiento = "y";}, delayIntervalo);
                intervaloActual = setInterval(() => {
                    y--;
                    mover();
                }, delayIntervalo)
            break;
    
            case "ArrowRight":
                setTimeout(function () {ejeMovimiento = "x";}, delayIntervalo);
                intervaloActual = setInterval(() => {
                    x++;
                    mover();
                }, delayIntervalo)
            break;
    
            case "ArrowLeft":
                setTimeout(function () {ejeMovimiento = "x";}, delayIntervalo);
                intervaloActual = setInterval(() => {
                    x --;
                    mover();
                }, delayIntervalo)
            break;
        }
    } 
})

//Manzanas
xManzana = parseInt((Math.random() * 19) + 1);
yManzana = parseInt((Math.random() * 19) + 1);
while ((manzanaEnCola() == true) && (manzanaEncimaFrances() == true)){
    xManzana = parseInt((Math.random() * 19) + 1);
    yManzana = parseInt((Math.random() * 19) + 1);
}

document.getElementById(xManzana + "," + yManzana).innerHTML = `<div class="manzana"></div>`;



function manzanaEnCola(){
    if (xManzana == x && yManzana == y){
        return true;
    }
    for(var i = 0; i < track.length; i++){
        if (xManzana == trackX[i] && yManzana == trackY[i]){
            return true;
        }
    }
    return false;
}

var xFrances;
var yFrances;

function francesEnCola(){
    if (xFrances == x && yFrances == y){
        return true;
    }
    for(var i = 0; i < track.length; i++){
        if (xFrances == trackX[i] && xFrances == trackY[i]){
            return true;
        }
    }
    return false;
}

function cabezaChocaCola(){
    for(var i = 0; i < track.length; i++){
        if (x == trackX[i] && y == trackY[i]){
            return true;
        }
    }
    return false;
}

function actualizarGameOver(){
    for (var i = 1; i <= 20; i++){
        for (var j = 1; j <= 20; j++){
            document.getElementById(i + "," + j).innerHTML = ``;
        }
    }

    for (var i = 0; i < gameOver.length; i++){
        if (gameOver[i][1] >= 1){
            document.getElementById(String(gameOver[i][0]) + "," + String(gameOver[i][1])).innerHTML = `<div class="game-over"></div>`;
        }    
    }
}

function chocaFranceses(){
    if(score >= 15){
        for(var i = 0; i < franceses.length; i++){
            if(x + "," + y == franceses[i]){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}

function manzanaEncimaFrances(){
    if(score >= 15){
        for(var i = 0; i < franceses.length; i++){
            if(xManzana + "," + yManzana == franceses[i]){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}

document.getElementById("restart").addEventListener("click", () => {
    location.href = "index.html";
})