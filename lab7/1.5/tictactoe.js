function getCell(x, y){
    return $("#board").find("tr:eq(" + x + ")").find("td:eq(" + y + ")");
}

function AIturn(){
    if(checkGameEnd() == true) return;
    while(true){
        let x = Math.floor(Math.random()*3);
        let y = Math.floor(Math.random()*3);
        if(getCell(x,y).text() == ""){
            getCell(x,y).text("X");
            break;
        }
    }


    if(checkGameEnd() == true) return;

}

function checkGameEnd(){
    let sum = 0;
    for(let x = 0; x < 3; x++){
        sum = 0;
        for(let y = 0; y < 3; y++){
            if(getCell(x,y).text() == "O") sum++;
        }
        if(sum == 3) userWon();
    }
    for(let x = 0; x < 3; x++){
        sum = 0;
        for(let y = 0; y < 3; y++){
            if(getCell(y,x).text() == "O") sum++;
        }
        if(sum == 3) userWon();
    }
    sum = 0;
    for(let x = 0; x < 3; x++){
        if(getCell(x,x).text() == "O") sum++;
    }
    if(sum == 3) userWon();
    sum = 0;
    for(let x = 0; x < 3; x++){
        if(getCell(x,2-x).text() == "O") sum++;
    }
    if(sum == 3) userWon();
    for(let x = 0; x < 3; x++){
        sum = 0;
        for(let y = 0; y < 3; y++){
            if(getCell(x,y).text() == "X") sum++;
        }
        if(sum == 3) AIWon();
    }
    for(let x = 0; x < 3; x++){
        sum = 0;
        for(let y = 0; y < 3; y++){
            if(getCell(y,x).text() == "X") sum++;
        }
        if(sum == 3) AIWon();
    }
    sum = 0;
    for(let x = 0; x < 3; x++){
        if(getCell(x,x).text() == "X") sum++;
    }
    if(sum == 3) AIWon();
    sum = 0;
    for(let x = 0; x < 3; x++){
        if(getCell(x,2-x).text() == "X") sum++;
    }
    if(sum == 3) AIWon();
    
    
    
    
    
    let pred = false;
    for(let x = 0; x < 3; x++){
        for(let y = 0; y < 3; y++){
            if(getCell(x,y).text() == "") pred = true;
        }
    }
    if(!pred){
        nobodyWon();
        return true;
    }
}

function reset(){
    for(let x = 0; x < 3; x++){
        for(let y = 0; y < 3; y++){
            getCell(x, y).text("");
        }
    }
    $("#result").text("");

}

function userWon(){
    let userScore = parseInt($("#score").find("tr:eq(1)").find("td:eq(0)").text());
    $("#score").find("tr:eq(1)").find("td:eq(0)").text(++userScore);
    $("#result").text("You won :)");
    setTimeout(reset, 3000);
}

function AIWon(){
    let AIScore = parseInt($("#score").find("tr:eq(1)").find("td:eq(1)").text());
    $("#score").find("tr:eq(1)").find("td:eq(1)").text(++AIScore);
    $("#result").text("AI won :(");
    setTimeout(reset, 3000);
}

function nobodyWon(){
    $("#result").text("Nobody won :/");
    setTimeout(reset, 3000);
}