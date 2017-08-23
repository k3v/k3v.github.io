var open;
var vanish;
function getSection() {
    let url = new URL(window.location.href);
    return url.pathname.split("/")[1];
}

function toggle(next, curr) {
    clearInterval(open);
    clearInterval(vanish);

    let delay = 1000;
    if (curr != "") {
        let currEl = document.getElementById(curr);
        currEl.classList.add("inactive");

        let currBtn = document.getElementById(curr + "-button");
        currBtn.classList.remove("active");

        vanish = setTimeout(function () {
            currEl.classList.add("off");
        }, delay);
    } else {
        delay = 0;
    } 

    if (next != "") {
        let nextBtn = document.getElementById(next + "-button");
        nextBtn.classList.add("active");

        open = setTimeout(function () {
            let nextEl = document.getElementById(next);
            nextEl.classList.remove("inactive");
            nextEl.classList.remove("off");
        }, delay);
    }

    window.history.replaceState(null, null, next == "" ? "/" : "/" + next + "/");
}

function generateHandler(section) {
    return function () {
        if (getSection() == section) {
            toggle("", section);
        } else {
            toggle(section, getSection());
        }
    };
}

function fetchThoughts() {
    if (getSection() != "thoughts") {
        return;
    }

    let request = new XMLHttpRequest();
    request.addEventListener("load", populateThoughts);
    request.open("GET", "/thoughts/thoughts.json");
    request.send(); 
}

function populateThoughts() {
    let thoughts = JSON.parse(this.responseText);
    let container = document.getElementById("thoughts");

/*
    container.innerHTML = "";

    for (let thought of thoughts) {
        let tEl = document.createElement("div");
        tEl.classList.add("thought");

        let title = document.createElement("div");
        title.classList.add("title");
        let ttext = document.createElement("p");
        ttext.innerText = thought.title;
        title.appendChild(ttext);
        tEl.appendChild(title);

        

        container.appendChild(tEl);
    }
*/
}

window.addEventListener("load", function () {
    let sections = ["greet", "thoughts", "notes", "projects"];
    for (let section of sections) {
        document.getElementById(section + "-button").addEventListener("click", generateHandler(section));
    }

    document.getElementById("thoughts-button").addEventListener("click", fetchThoughts);
});
