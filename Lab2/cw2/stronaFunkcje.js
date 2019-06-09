"use strict";
var sum = 0;

function show(){
    var napis = window.prompt("Wprowadz napis", "");
    if(napis == null){
        window.alert("suma " + sum);
    } 
    var sumCyfry = cyfry(napis);
    var sumLitery = litery(napis);
    suma(napis);
    console.log(sumCyfry + " " + sumLitery + " " + sum + "  <-  " + napis);
    console.log("<br>");
    show();
}


function cyfry(napis){
    var sum = 0;
    
    for(var i=0; i < napis.length; i++){
        if(!isNaN(napis.charAt(i))){
            sum++;
        }
    }
    return sum;
}
 
function litery(napis){
    var sum = 0;

    for(var i=0; i < napis.length; i++){
        if(isNaN(napis.charAt(i))){
            sum++;
        }
    }

    return sum;
}


function suma(napis){
    if(isNaN(napis.charAt(0)) || napis.length == 0){
        return sum;
    }
    else{
        sum += parseInt(napis);
    }

    return sum;


}