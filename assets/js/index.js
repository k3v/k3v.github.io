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

window.onload = function () {
    var sections = ["greet", "thoughts", "notes", "projects"];
    for (let section of sections) {
        document.getElementById(section + "-button").onclick = generateHandler(section);
    }
};
