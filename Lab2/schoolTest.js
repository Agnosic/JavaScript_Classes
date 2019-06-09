var expect = chai.expect;
 
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
   // var select = document.getElementById("studentsList")
    for(var i = 0; i < students.length; i++){
        if(students[i].name == name){
            return 0;
        }
    }
    students.push(new Student(name));
   // var element = document.createElement("option");
    //element.textContent = name;
    //element.value = name;
    //select.appendChild(element);
    return 1;
}

function addSubject(name){
    //var select = document.getElementById("subjectsList")
    for(var i = 0; i < students.length; i++){
        var student = students[i];
        for(var j = 0; j < student.subjects.length; j++){
            if(student.subjects[j].name == name){
                return;
            }
        }
    }
    //var element = document.createElement("option");
   // element.textContent = name;
   // element.value = name;
    //select.appendChild(element);
}

function addGrade(student, subject, grade){
    for(var i =0; i < students.length; i++){
        if(students[i].name == student){
            students[i].subjects.push(new Subject(subject, grade));
        }
    }
}
function deleteStudent(student){
    var name = student;
   //var select = document.getElementById("studentsList");
    for(var i = 0; i < students.length; i++){
        if(students[i].name == name){
            students.splice(i, i+1);
        }
    }
    //for(var i = 0; i < select.length; i++){
    //    if(select[i].value == name){
    //        select.remove(i);
    //        return 1;
    //    }
   // }
    return 0;
}

function deleteSubject(subject){
    var name = subject;
    //var select = document.getElementById("subjectsList");
    for(var i = 0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == name){
                students[i].subjects.splice(j, j+1);
            }
        }
    }
  //  for(var i = 0; i < select.length; i++){
    //    if(select[i].value == name){
    //        select.remove(i);
    //        return 1;
    //    }
    //}

    return 0;
}

function deleteGrade(t){
    var text = t;
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

function changeStudentName(name){
    var text = name;
    var textSplit = text.split(", ");
    if(textSplit.length < 2){
        window.alert("Bad input. Example of input Jan Kowalski, Angielski, 4");
        return;
    }
    //var select = document.getElementById("studentsList");
    for(var i = 0; i < students.length; i++){
        if(students[i].name == textSplit[0]){
            students[i].name = textSplit[1];
        }
    }
    //for(var i = 0; i < select.length; i++){
    //    if(select[i].value == textSplit[0]){
    //        select[i].value = textSplit[1];
    //        select[i].textContent = textSplit[1];
   //         return 1;
   //     }
   // }
    return 0;
}

function changeSubjectName(name){
    var text = name;
    var textSplit = text.split(", ");
   // var select = document.getElementById("subjectsList");
    for(var i = 0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == textSplit[0]){
                students[i].subjects[j].name = textSplit[1];
            }
        }
    }
  //  for(var i = 0; i < select.length; i++){
    //    if(select[i].value == textSplit[0]){
    //        select[i].value = textSplit[1];
   //         select[i].textContent = textSplit[1];
   //         return 1;
   //     }
   // }

    return 0;
}

function meanStudent(name){
    //console.log(student);
    var sum = 0;
    var len = 0;
    for(var i =0; i < students.length; i++){
        if(students[i].name == name){
            for(var j = 0; j < students[i].subjects.length; j++){
                sum += parseInt(students[i].subjects[j].grade);
                len++;
            }
            var mean = sum / len;
            //var canvas = document.getElementById('mscanvas');
            //var ctx = canvas.getContext('2d');
            //ctx.clearRect(0,0, canvas.width, canvas.height);
            //ctx.font = '50px serif';
            //ctx.fillText(mean, 10, 40);
            return mean;
        }
    }
    //var canvas = document.getElementById('mscanvas');
    //var ctx = canvas.getContext('2d');
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.font = '50px serif';
    //ctx.fillText("error", 10, 40);
    
}

function meanSubject(name){
    var sum = 0;
    var len = 0;
    for(var i =0; i < students.length; i++){
        for(var j = 0; j < students[i].subjects.length; j++){
            if(students[i].subjects[j].name == name){
                sum += parseInt(students[i].subjects[j].grade);
                len++;
            }
        }
    }
    var mean = (sum / len);
    //var canvas = document.getElementById('mscanvas');
   // var ctx = canvas.getContext('2d');
   // ctx.clearRect(0,0, canvas.width, canvas.height);
   // ctx.font = '50px serif';
   // ctx.fillText(mean, 10, 40);
    //var canvas = document.getElementById('mscanvas');
    //var ctx = canvas.getContext('2d');
   // ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.font = '50px serif';
    //ctx.fillText("error", 10, 40);
    return mean;

}
var students = [];
mocha.setup({
    globals: ['jQuery*']
  });
describe('The meanStudent(name) function', function() {
    it('Returns 3 for grades 2,4', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "2");
        addGrade("Jan", "Ang", "4");
        expect(meanStudent("Jan")).to.equal(3);
    });
    it('Returns 3 for grades 1, 3, 5', function() {
        students = [];
        addStudent("Aga");
        addSubject("Ang");
        addGrade("Aga", "Ang", "1");
        addGrade("Aga", "Ang", "3");
        addGrade("Aga", "Ang", "5");
        expect(meanStudent("Aga")).to.equal(3);
    });
});

describe('The meanSubject() function', function() {
    it('Returns 3 for grades 2,4', function() {
        students = [];
        addStudent("Aga");
        addSubject("Ang");
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "2");
        addGrade("Jan", "Ang", "4");
        expect(meanStudent("Jan")).to.equal(3);
    });
    it('Returns 3 for grades 1, 2, 4, 3, 5', function() {
        students = [];
        addStudent("Aga");
        addSubject("Ang");
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "2");
        addGrade("Jan", "Ang", "4");
        addGrade("Aga", "Ang", "1");
        addGrade("Aga", "Ang", "3");
        addGrade("Aga", "Ang", "5");
        expect(meanSubject("Ang")).to.equal(3);
    });
});
describe('The addStudent() function', function() {
    it('Array Students have Jan if addStudent(Jan)', function() {
        students = [];
        addStudent("Jan");
        expect(students[0].name).to.equal("Jan");
    });
});

describe('The addGrade() and addSubject() function', function() {
    it('Array Students have Ang if addGrade("Ang, 4")', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        expect(students[0].subjects[0].name).to.equal("Ang");
    });
    it('Array Students have 4 if addGrade("Ang, 4")', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        expect(students[0].subjects[0].grade).to.equal("4");
    });
});

describe('The deleteStudent() function', function() {
    it('Expect not do delete anything if bad argument', function() {
        students = [];
        addStudent("Jan");
        deleteStudent("Aga");
        expect(students[0].name).to.equal("Jan");
    });
    it('Delete Jan if deleteStudent("Jan")', function() {
        students = [];
        addStudent("Jan");
        deleteStudent("Jan");
        expect(students.length).to.equal(0);
    });
});

describe('The deleteSubject() function', function() {
    it('Expect not do delete anything if bad argument', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        deleteSubject("And")
        expect(students[0].subjects[0].name).to.equal("Ang");
    });
    it('Delete Ang if deleteSubject("Ang")', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        deleteSubject("Ang")
        expect(students[0].subjects.length).to.equal(0);
    });
});

describe('The deleteGrade() function', function() {
    it('Expect not do delete anything if bad argument', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        deleteGrade("Jan, Ang, 3")
        expect(students[0].subjects[0].name).to.equal("Ang");
    });
    it('Delete 4 if deleteGrade("Jan, Ang, 4")', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        deleteGrade("Jan, Ang, 4")
        expect(students[0].subjects.length).to.equal(0);
    });
});

describe('The changeStudentName() function', function() {
    it('Changes from Jan to Aga', function() {
        students = [];
        addStudent("Jan");
        changeStudentName("Jan, Aga");
        expect(students[0].name).to.equal("Aga");
    });
});

describe('The changeSubjectName() function', function() {
    it('Changes from Ang to Math', function() {
        students = [];
        addStudent("Jan");
        addSubject("Ang");
        addGrade("Jan", "Ang", "4");
        changeSubjectName("Ang, Math");
        expect(students[0].subjects[0].name).to.equal("Math");
    });
});

