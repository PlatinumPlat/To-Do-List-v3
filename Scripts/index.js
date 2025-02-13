window.addEventListener("load", (event) => {
    new cursoreffects.bubbleCursor();
});

var today = new Date();

let taskArray = [
    {
        name: "Follow Instructions",
        description: "Visit instructions page from the navigation bar.",
        dueDate: today,
        dueTime: "23:59",
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


document.getElementById("toggleNotes").addEventListener('click', function () {
    $("#notes").toggleClass("show");
});


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
    saveTasksToLocalStorage();
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
        
        let taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");

        let taskName = document.createTextNode(task.name + " - ");
        taskDetails.appendChild(taskName);
        
        let taskDescription = document.createTextNode(clipDescription(task.description));
        taskDetails.appendChild(taskDescription);

        let dueDate = new Date(task.dueDate);
        let formattedDate = dueDate.toDateString();
        let formattedTime = task.dueTime;

        let dueDateTime = document.createElement("div");
        dueDateTime.textContent = `Due: ${formattedDate} at ${formattedTime}`;
        taskDetails.appendChild(dueDateTime);

        li.appendChild(taskDetails);
        addTaskControls(li, task);
        taskListElement.appendChild(li);
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

    var expandSpan = document.createElement("span")
    var expandTxt = document.createTextNode("Expand");
    expandSpan.className = "expand";
    expandSpan.appendChild(expandTxt);
    li.appendChild(expandSpan);


    span.onclick = function () {
        const index = taskArray.indexOf(task);
        if (index !== -1) {
            taskArray.splice(index, 1);
            saveTasksToLocalStorage();
        }
        renderTaskList();
    }

    editSpan.onclick = function () {
        $("#nextTask").val(task.name);
        $("#nextTaskDes").val(task.description);
        $("#dueDate").val(task.dueDate);
        $("#dueTime").val(task.dueTime);
        $("#assignment").val(task.assignmentLink);
        $("#notes").val(task.notes);

        const index = taskArray.indexOf(task);
        if (index !== -1) {
            taskArray.splice(index, index);
            saveTasksToLocalStorage();
        }

        renderTaskList();
    }

    expandSpan.onclick = function () {
        showTaskDetails(task);
    };

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

function showTaskDetails(task) {
    var modal = $("#taskModal");
    var modalTaskName = $("#modalTaskName");
    var modalTaskDescription = $("#modalTaskDescription");
    var modalDueDate = $("#modalDueDate");
    var modalDueTime = $("#modalDueTime");
    var modalAssignmentLink = $("#modalAssignmentLink");
    var modalNotes = $("#modalNotes");

    let dueDate = new Date(task.dueDate);
    let formattedDate = dueDate.toDateString();

    modalTaskName.text(task.name);
    modalTaskDescription.text(task.description);
    modalDueDate.text(formattedDate);
    modalDueTime.text(task.dueTime);
    modalAssignmentLink.href = task.assignmentLink;
    modalAssignmentLink.text(task.assignmentLink);
    modalNotes.text(task.notes);

    $("#taskModal").show();

    var closeModal = document.getElementsByClassName("close-modal")[0];
    closeModal.onclick = function () {
        $("#taskModal").hide();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            $("#taskModal").hide();
        }
    };
    
}


function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        taskArray = JSON.parse(tasks);
    }
}

window.onload = function () {
    loadTasksFromLocalStorage();
    renderTaskList();
};