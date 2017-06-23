window.onload = function () {

    var navbar = document.getElementById("navbar");
    document.getElementById("greet-button").onclick = function () {
        let greetEl = document.getElementById("greet");
        let state = window.history.state;

        if (state && state.content == "greet") {
            window.history.replaceState({content: "home"}, null, "/");
            greetEl.style.width = 0;
            greetEl.style.visibility = "hidden";
        } else {
            window.history.replaceState({content: "greet"}, null, "greet/");
            greetEl.style.width = 500; 
            greetEl.style.visibility = "visible";
        }
    };
};
