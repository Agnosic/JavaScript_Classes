

class Student{
    constructor(name){
        this.name = name;
        this.subjects = [];
    }
}

class Subject{
    constructor(name, grade){
        this.name = name;
        this.grade = grade;
    }
}


var students = [];
var subjectsNames = [];


function save(){
    var text = document.forms[0].elements[0].value;
    var textSplit = text.split(", ");

    if(textSplit.length < 3){
        window.alert("Bad input. Example of input Jan Kowalski, Angielski, 4");
        return;
    }
    addStudent(textSplit[0]);
    addSubject(textSplit[1]);
    addGrade(textSplit[0], textSplit[1], textSplit[2]);
    return;
}


function addStudent(name){
    var select = document.getElementById("studentsList")
    for(var i = 0; i < students.length; i++){
        if(students[i].name == name){
            return;
        }
    }
    students.push(new Student(name));
    var element = document.createElement("option");
    element.textContent = name;
    element.value = name;
    select.appendChild(element);
}

function addSubject(name){
    var select = document.getElementById("subjectsList")
    for(var i = 0; i < students.length; i++){
        var student = students[i];
        for(var j = 0; j < student.subjects.length; j++){
            if(student.subjects[j].name == name){
                return;
            }
        }
    }
    for(var i = 0; i < subjectsNames.length; i++){
        if(subjectsNames[i] == name){
            return;
        }
    }
    subjectsNames.push(name);
    var element = document.createElement("option");
    element.textContent = name;
    element.value = name;
    select.appendChild(element);
}

function addGrade(student, subject, grade){
    for(var i =0; i < students.length; i++){
        if(students[i].name == student){
            students[i].subjects.push(new Subject(subject, grade));
        }
    }
}
function deleteStudent(){
    var name = document.forms[1].elements[0].value;
    var select = document.getElementById("studentsList");
    for(var i = 0; i < students.length; i++){
        if(students[i].name == name){
            students.splice(i, i+1);
        }
    }
    for(var i = 0; i < select.length; i++){
        if(select[i].value == name){
            select.remove(i);
            return 1;
        }
    }
    return 0;
}

function deleteSubject(){
    var name = document.forms[2].elements[0].value;
    var select = document.getElementById("subjectsList");
    for(var i = 0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == name){
                students[i].subjects.splice(j, j+1);
            }
        }
    }
    for(var i = 0; i < select.length; i++){
        if(select[i].value == name){
            select.remove(i);
            return 1;
        }
    }

    return 0;
}

function deleteGrade(){
    var text = document.forms[3].elements[0].value;
    var textSplit = text.split(", ");
    for(var i = 0; i < students.length; i++){
        if(students[i].name == textSplit[0]){
            for(var j = 0; j < students[i].subjects.length; j++){
                if(students[i].subjects[j].name == textSplit[1] && students[i].subjects[j].grade == textSplit[2] ){
                    students[i].subjects.splice(j, j+1);
                    return 1;
                }
            }
        }
    }
    return 0;
}

function changeStudentName(){
    var text = document.forms[4].elements[0].value;
    var textSplit = text.split(", ");
    if(textSplit.length < 2){
        window.alert("Bad input. Example of input Jan Kowalski, Angielski, 4");
        return;
    }
    var select = document.getElementById("studentsList");
    for(var i = 0; i < students.length; i++){
        if(students[i].name == textSplit[0]){
            students[i].name = textSplit[1];
        }
    }
    for(var i = 0; i < select.length; i++){
        if(select[i].value == textSplit[0]){
            select[i].value = textSplit[1];
            select[i].textContent = textSplit[1];
            return 1;
        }
    }
    return 0;
}

function changeSubjectName(){
    var text = document.forms[5].elements[0].value;
    var textSplit = text.split(", ");
    var select = document.getElementById("subjectsList");
    for(var i = 0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == textSplit[0]){
                students[i].subjects[j].name = textSplit[1];
            }
        }
    }
    for(var i = 0; i < select.length; i++){
        if(select[i].value == textSplit[0]){
            select[i].value = textSplit[1];
            select[i].textContent = textSplit[1];
            return 1;
        }
    }

    return 0;
}

function meanStudent(){
    var student = document.forms[6].elements[0].value;
    console.log(student);
    var sum = 0;
    for(var i =0; i < students.length; i++){
        if(students[i].name == student){
            for(var j = 0; j < students[i].subjects.length; j++){
                sum += parseInt(students[i].subjects[j].grade);
            }
            mean = sum / students[i].subjects.length;
            var canvas = document.getElementById('mscanvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.font = '50px serif';
            ctx.fillText(mean, 10, 40);
            return mean;
        }
    }
    var canvas = document.getElementById('mscanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = '50px serif';
    ctx.fillText("error", 10, 40);
    
}

function meanSubject(){
    var subject = document.forms[7].elements[0].value;
    var sum = 0;
    var len = 0;
    for(var i =0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == subject){
                sum += parseInt(students[i].subjects[j].grade);
                len++;
            }
        }
    }
    var mean = (sum / len);
    var canvas = document.getElementById('mscanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = '50px serif';
    ctx.fillText(mean, 10, 40);
    return mean;
}


/*---------------------------------------------*/

function studentChart(t){
    for(var i = 0; i < students.length; i++){
        if(students[i].name == t.value){
            var grades = [];
            for(var j =0; j < students[i].subjects.length; j++){
                grades.push(parseInt(students[i].subjects[j].grade));
            }
            drawChart(grades);
        }
    }
}

function subjectChart(t){
    var grades = [];
    for(var i = 0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == t.value){
                for(var j =0; j < students[i].subjects.length; j++){
                    grades.push(parseInt(students[i].subjects[j].grade));
                }
            }
        }

    }
    drawChart(grades);
}


function drawPart(ctx, centX, centY, r, start, stop, color){


    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(centX, centY);
    ctx.arc(centX, centY, r, start, stop);
    ctx.stroke();
    ctx.fill();

}

function drawChart(values){
    
    var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    len = values.length;
    values.sort();
    console.log(values);
    var start = 0;
    for(var i = 0; i < values.length; i++){
        var stop = start + 2 * Math.PI / len;
        var r = Math.min(canvas.width/2, canvas.height/2);
        drawPart(ctx, canvas.width/2, r, r, start, stop, colors[values[i]%40]);

        start = stop;
    }
    var canva = document.getElementById('legend');
    var ct = canva.getContext('2d');
    var h = 25;
    ct.clearRect(0,0, canva.width, canva.height);
    ct.fillStyle = "#000000";
    ct.fillText("liczba ocen " + len , 10, 10);
    var sum = 0;
    for(var i = 0; i < values.length; i++){
        sum++;
        if(values[i] !== values[i+1]){
            ct.beginPath();
            ct.fillStyle = colors[values[i]%40];
            ct.moveTo(10, h);
            ct.rect(10, h, 10, 10);
            ct.stroke();
            ct.fill();
            ct.fillStyle = "#000000";
            ct.fillText("ocena " + values[i] + " ilosc " +  sum, 25, h+8);
            h +=15;
            sum = 0;
        }
    }
}

/*dane we z formularza -DOM 0
program przechowuje:
- studenci
- ich oceny
- przedmioty
operacje:
- dodawania/modyfikowania
- usuniecia
- obliczania sredniej z przedmiotu. Uwzglednic oceny wszystkich przedmiotow
- obliczanie sredniej dla okreslonego studenta*/
/*domowe
Wykre
ilosc ocen z przedmiotow
dla studenta:
wykres sredniej dla wszystkich jego przedmiotow
wykresy */