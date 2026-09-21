var STORAGE_KEY = "seminarPlannerSchedules";
var SESSION_KEY = "seminarPlannerTopics";

function getSchedules() {
    var data = localStorage.getItem(STORAGE_KEY);

    if (data == null) {
        return [];
    }

    return JSON.parse(data);
}

function getTopics() {
    var data = sessionStorage.getItem(SESSION_KEY);

    if (data == null) {
        return [];
    }

    return JSON.parse(data);
}

function addSchedule() {
    var day = document.getElementById("day").value.trim();
    var begin = document.getElementById("begin").value.trim();
    var end = document.getElementById("end").value.trim();
    var topic = document.getElementById("topic").value.trim();

    if (day == "" || begin == "" || end == "" || topic == "") {
        alert("Please fill all fields.");
        return;
    }

    var schedules = getSchedules();
    var topics = getTopics();

    schedules.push({
        day: day,
        begin: begin,
        end: end
    });

    topics.push({
        topic: topic,
        description: ""
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(topics));

    document.getElementById("day").value = "";
    document.getElementById("begin").value = "";
    document.getElementById("end").value = "";
    document.getElementById("topic").value = "";

    var description = prompt("Enter description for this topic:");

    if (description == null) {
        description = "";
    }

    topics[topics.length - 1].description = description;

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(topics));

    displayTable();
}

function displayTable() {
    var schedules = getSchedules();
    var topics = getTopics();

    var table = document.getElementById("scheduleTable");

    table.innerHTML = "";

    for (var i = 0; i < schedules.length; i++) {
        var row = document.createElement("tr");

        var day = document.createElement("td");
        day.innerText = schedules[i].day;

        var begin = document.createElement("td");
        begin.innerText = schedules[i].begin;

        var end = document.createElement("td");
        end.innerText = schedules[i].end;

        var topic = document.createElement("td");

        if (topics[i] && topics[i].topic != "") {
            topic.innerText = topics[i].topic;
            topic.className = "topic";

            topic.onclick = function(index) {
                return function() {
                    showDescription(index);
                };
            }(i);
        } else {
            topic.className = "empty-topic";

            var edit = document.createElement("button");
            edit.innerText = "Edit Topic";
            edit.className = "edit-btn";

            edit.onclick = function(index) {
                return function() {
                    editTopic(index);
                };
            }(i);

            topic.appendChild(edit);
        }

        row.appendChild(day);
        row.appendChild(begin);
        row.appendChild(end);
        row.appendChild(topic);

        table.appendChild(row);
    }
}

function showDescription(index) {
    var topics = getTopics();

    if (topics[index]) {
        alert(
            "Topic: " + topics[index].topic +
            "\n\nDescription: " + topics[index].description
        );
    }
}

function editTopic(index) {
    var topics = getTopics();

    while (topics.length <= index) {
        topics.push({
            topic: "",
            description: ""
        });
    }

    var topic = prompt("Enter Topic:");

    if (topic == null || topic.trim() == "") {
        return;
    }

    var description = prompt("Enter Description:");

    if (description == null) {
        description = "";
    }

    topics[index].topic = topic;
    topics[index].description = description;

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(topics));

    displayTable();
}

displayTable();