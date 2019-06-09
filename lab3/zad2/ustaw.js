function ustaw(){
    var cl = document.getElementsByTagName("header");
    cl[0].classList.add("azure");
    
    cl = document.getElementsByTagName("nav");
    cl[0].classList.add("azure");
    cl[0].classList.remove("empty");
    cl = document.getElementsByTagName("h1");
    cl[2].classList.add("example");
    
    cl = document.getElementsByTagName("aside");
    cl[0].classList.add("azure");
    cl[0].classList.remove("empty");
    cl = document.getElementsByTagName("main");
    cl[0].classList.add("azure");
    cl = document.getElementsByTagName("footer");
    cl[0].classList.add("azure");
}

function skasuj(){
    var cl = document.getElementsByTagName("header");
    cl[0].classList.remove("azure");
    
    cl = document.getElementsByTagName("nav");
    cl[0].classList.remove("azure");
    cl[0].classList.add("empty");
    cl = document.getElementsByTagName("h1");
    cl[2].classList.remove("example");
    
    cl = document.getElementsByTagName("aside");
    cl[0].classList.remove("azure");
    cl[0].classList.add("empty");
    cl = document.getElementsByTagName("main");
    cl[0].classList.remove("azure");
    cl = document.getElementsByTagName("footer");
    cl[0].classList.remove("azure");
}