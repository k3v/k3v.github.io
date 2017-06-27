window.onload = function () {

    var open;
    function getSection() {
        let url = new URL(window.location.href);
        return url.pathname.split("/")[1];
    }

    function toggle(next, curr) {
        clearInterval(open);

        let delay = 1200;
        if (curr != "") {
            let currEl = document.getElementById(curr);
            currEl.classList.add("inactive");
        } else {
            delay = 0;
        }

        if (next != "") {
            open = setTimeout(function () {
                let nextEl = document.getElementById(next);
                nextEl.classList.remove("inactive");
            }, delay);
        }

        window.history.replaceState(null, null, next + "/");
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

    var sections = ["greet"];
    for (let section of sections) {
        document.getElementById(section + "-button").onclick = generateHandler(section);
    }

};
