"use strict";
var expect = chai.expect;
 

var sum = 0;


function cyfry(napis){
    var sum = 0;

    for(var i=0; i < napis.length; i++){
        if(!isNaN(napis.charAt(i))){
            sum += napis.charAt(i);
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


describe("Testy do funkcji cyfry() litery() suma()", function(){
    it("Same cyfry:", function(){
        expect(cyfry("323")).to.equal(8);
        expect(litery("412")).to.equal(0);
        expect(suma("321")).to.equal(321);
        sum = 0;
    });

    it("Same litery:", function(){
        expect(cyfry("dsa")).to.equal(0);
        expect(litery("dsadas")).to.equal(6);
        expect(suma("dasda")).to.equal(0);
        sum = 0;
    });

    it("Litery, a po nich cyfry:", function(){
        expect(cyfry("abc1231")).to.equal(7);
        expect(litery("as31231")).to.equal(2);
        expect(suma("dsadadsad1231")).to.equal(0);
        sum = 0;
    });

    it("Cyfry, a po nich litery:", function(){
        expect(cyfry("323abc")).to.equal(8);
        expect(litery("412a")).to.equal(1);
        expect(suma("321dsada")).to.equal(321);
        sum = 0;
    });

    it("Pusty napis:", function(){
        expect(cyfry("")).to.equal(0);
        expect(litery("")).to.equal(0);
        expect(suma("")).to.equal(0);
        sum = 0;
    });
});
