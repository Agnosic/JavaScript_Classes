var intervalID;
var timeoutID; 
var requestID;


var w;
function start(){
    intervalID = window.setInterval(funInterval, 1000);
    timeoutID = window.setTimeout(funTimeout, 1000);
    requestID = window.requestAnimationFrame(funRequest);

}

function stop(){
    window.clearInterval(intervalID);
    window.clearTimeout(timeoutID);
    window.cancelAnimationFrame(requestID);
}

function funInterval(){
    t1 = performance.now();
    startWorker();
    //multiply();
    t2 = performance.now();
    console.log("time funInterval: " + (t2-t1));
}

function funTimeout(){
    t1 = performance.now();
    startWorker();
    //multiply();
    t2 = performance.now();
    console.log("time funTimeout: " + (t2-t1));
    timeoutID = window.setTimeout(funTimeout, 1000);
}
var remeiningTime = 1000
var reqSum = 0
function funRequest(){
    t1 = performance.now();
    startWorker();
    //multiply();
    t2 = performance.now();
    if(remeiningTime > 0){
      reqSum += 1
      remeiningTime -= ((t2-t1))
    }
    else{
      remeiningTime = 1
      console.log("funRequest sum " + reqSum);
      reqSum = 0
    }
    //console.log("time funRequest: " + 1000/(t2-t1));
    requestID = window.requestAnimationFrame(funRequest);
}

function multiply(){
    var liczba1 = 1;
    var liczba2 = 1.001;

    for(var i = 0; i < 10000000; i++){
        liczba1 *= liczba2;
    }
}


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  function startWorker() {
    if (typeof(Worker) !== "undefined") {
      if (typeof(w) == "undefined") {
        w = new Worker("my_task.js");
      }
      w.onmessage = function(event) {
        document.getElementById("result").innerHTML = event.data;
      };
    } else {
      document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
  }