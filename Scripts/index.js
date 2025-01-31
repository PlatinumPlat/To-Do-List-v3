var today = new Date();

let taskArray = [
    {
        name: "Follow Instructions",
        description: "Visit instructions page from the navigation bar.",
        dueDate: today,
        dueTime: "15:00",
        assignmentLink: "http://homeworklink.com",
        notes: "Read Carefully!"
    },
    {
        name: "Buy Groceries",
        description: "Milk, Eggs, Bread",
        dueDate: today,
        dueTime: "10:00",
        assignmentLink: "https://www.longos.com/",
        notes: "Don't forget the bread!"
    }
];


var taskList = document.getElementsByTagName("li");
var i;

for (i = 0; i < taskList.length; i++) {
    var span = document.createElement("span")
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    taskList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var j;

for (j = 0; j < close.length; j++) {
    close[j].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var k;

for (k = 0; k < taskList.length; k++) {
    var span = document.createElement("span")
    var txt = document.createTextNode("Edit");
    span.className = "edit";
    span.appendChild(txt);
    taskList[k].appendChild(span);
}

var edit = document.getElementsByClassName("edit");
var l;
for (var l = 0; l < edit.length; l++) {
    edit[l].onclick = function () {
        var div = this.parentElement; 
        document.getElementById("nextTask").value = div.firstChild.textContent;
        div.style.display = "none";
    }
}

var tasks = document.querySelector('ul');

tasks.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);




function newElement() {
    console.log("hi");
    var taskValue = $("#nextTask").val();
    var taskDescription = $("#nextTaskDes").val();
    var dueDate = $("#dueDate").val();
    var dueTime = $("#dueTime").val();
    var assignmentLink = $("#assignment").val();
    var notes = $("#notes").val();

    if (taskValue === '') {
        alert("You must write something!");
        return;
    } if (taskValue.length > 49) {
        alert("You have exceeded the character limit.");
        return;
    }

    let task = {
        name: taskValue,
        description: taskDescription,
        dueDate: dueDate,
        dueTime: dueTime,
        assignmentLink: assignmentLink,
        notes: notes
    }

    taskArray.push(task);
    renderTaskList();

    $("#nextTask").val("");
    $("#nextTaskDes").val("");
    $("#dueDate").val("");
    $("#dueTime").val("");
    $("#assignment").val("");
    $("#notes").val("");

}

function renderTaskList() {
    const taskListElement = document.getElementById("taskCollection");
    taskListElement.innerHTML = '';

    taskArray.forEach(function (task) {
    let li = document.createElement("li");
    let taskText = document.createTextNode(task.name + "-" + clipDescription(task.description));
    li.appendChild(taskText);

    let dueDateText = document.createElement("span");
    dueDateText.classList.add("dueDate");
    dueDateText.textContent = `Due: ${task.dueDate}`;
    li.appendChild(dueDateText);

    taskListElement.appendChild(li);
    addTaskControls(li, task);
    });
}

function addTaskControls(li, task) {
    var span = document.createElement("span")
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    var editSpan = document.createElement("span")
    var editTxt = document.createTextNode("Edit");
    editSpan.className = "edit";
    editSpan.appendChild(editTxt);
    li.appendChild(editSpan);


    span.onclick = function () {
        const index = taskArray.indexOf(task);
        if (index !== -1) {
            taskArray.splice(index, 1);
        }
        renderTaskList();
    }

    editSpan.onclick = function () {
        var div = this.parentElement;
        $("#nextTask").val(task.name);
        $("#nextTaskDes").val(task.description);
        $("#dueDate").val(task.dueDate);
        $("#dueTime").val(task.dueTime);
        $("#assignment").val(task.assignmentLink);
        $("#notes").val(task.notes);
    }

}

function clipDescription(des) {
    if (des.length > 50) {
        return des.substring(0, 50) + "...";
    }
    return des;
}

function clearElements() {
    $("#nextTask").val("");
    $("#nextTaskDes").val("");
    $("#dueDate").val("");
    $("#dueTime").val("");
    $("#assignment").val("");
    $("#notes").val("");
}

window.onload = function () {
    renderTaskList();
};