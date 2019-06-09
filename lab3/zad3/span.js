var val = 10;

var intervalID = window.setInterval(fun, 1000);

function fun(){
    var div = document.getElementById("score");
    var spans = div.getElementsByTagName("span");
    for(var i = 0; i < spans.length; i++){
        spans[i].textContent = val;
    }
    if(val == 0){
        document.forms[0].elements[0].value = "0";
    }
    if(val > 0){
        val--;
    }

}

function save(){
    val = parseInt(document.forms[0].elements[0].value);
}