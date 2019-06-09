
function multiply(){
  var liczba1 = 1;
  var liczba2 = 1.001;

  for(var i = 0; i < 10000000; i++){
      liczba1 *= liczba2;
  }
  postMessage(liczba1);
}

multiply();