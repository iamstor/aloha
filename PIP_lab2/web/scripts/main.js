let xField = document.forms["inputForm"]["X"];
let yField = document.forms["inputForm"]["Y"];
let rField = document.forms["inputForm"]["R"];
let offsetField = document.forms["inputForm"]["offset"];


let coolX = false;
let coolY = false;
let coolR = false;


let warn_r = document.getElementsByClassName("warn-checkbox")[0];
let warn_x_int = document.getElementsByClassName("warn-checkbox")[1];
let warn_y_nan = document.getElementsByClassName("warn-checkbox")[2];
let warn_y_int = document.getElementsByClassName("warn-checkbox")[3];
let warn_y_ovf = document.getElementsByClassName("warn-checkbox")[4];
let warn_y_emp = document.getElementsByClassName("warn-checkbox")[5];
let warn_r_int = document.getElementsByClassName("warn-checkbox")[6];


let submitButton = document.getElementsByClassName("submit-button")[0];
let clearButton = document.getElementsByClassName("submit-button")[1];
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');


offsetField.value = new Date().getTimezoneOffset();

//add listeners to buttons and fields
for (let button of document.getElementsByClassName("x-button")) {
    button.addEventListener("click", xButtonsOnClick)
}

for (let checkbox of document.getElementsByClassName("checkbox")) {
    checkbox.addEventListener("change", doR);
}


function doR(evt) {


    document.querySelector('#inputForm');
    if (evt.target.classList.contains('checkbox') && evt.target.checked) {
        [].slice.call(document.querySelectorAll('.checkbox')).forEach(c => c.checked = false)
        evt.target.checked = true

    }
    rField.value = '' + evt.target.value;
    checkR(evt);

}


submitButton.addEventListener("click", check);
clearButton.addEventListener("click", clear);
yField.addEventListener("change", checkY);
canvas.addEventListener("click", handleCanvasClick);


let i = canvas.width / 10 - 2;
blockButton();

drawBorderRectangle();
drawAxis();

function xButtonsOnClick(event) {

    for (let button of document.getElementsByClassName("x-button")) {
        button.classList.remove("pressed");
        button.style.background = "-webkit-gradient(linear, 0 0, 0 100%, from(#8b688a), to(#836582))";
    }
    event.target.classList.add("pressed");
    event.target.style.background = "-webkit-gradient(linear, 0 0, 0 100%, from(#8b688a), to(#ffffff)";
    xField.value = '' + event.target.value;
    checkX(event);
}


function clear() {
    xField.value = "";
    yField.value = "";
    rField.value = "";


    for (let button of document.getElementsByClassName("x-button")) {
        button.style.background = "#8b688a;";
        button.classList.remove("pressed");
    }

    yField.classList.remove("warn-text");
    xField.classList.remove("warn-text");
    rField.classList.remove("warn-text");


    coolX = false;
    coolY = false;
    coolR = false;

    warn_r.hidden = true;
    warn_r.hidden = true;
    warn_x_int.hidden = true;
    warn_y_nan.hidden = true;
    warn_y_int.hidden = true;
    warn_y_ovf.hidden = true;
    warn_y_emp.hidden = true;
    warn_r_int.hidden = true;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawBorderRectangle();
    drawAxis();
}

function checkY(event) {
    yField.value = yField.value.replace(",", ".");
    if (yField.value == '') {
        event.preventDefault();
        yField.classList.add("warn-text");
        coolY = false;
        warn_y_emp.hidden = false;
        warn_y_nan.hidden = true;
        warn_y_int.hidden = true;
    } else if (!isFinite(Number(yField.value)) || !(/0*/).test(yField.value) && Number(yField.value) === 0 || (/^ *$/).test(yField.value)) {
        event.preventDefault();
        yField.classList.add("warn-text");
        coolY = false;
        warn_y_nan.hidden = false;
        warn_y_emp.hidden = true;
        warn_y_int.hidden = true;
    } else if (Number(yField.value) < -3 || Number(yField.value) > 3) {
        event.preventDefault();
        yField.classList.add("warn-text");
        coolY = false;
        warn_y_int.hidden = false;
        warn_y_emp.hidden = true;
        warn_y_nan.hidden = true;
    } else {
        yField.classList.remove("warn-text");
        coolY = true;
        warn_y_emp.hidden = true;
        warn_y_nan.hidden = true;
        warn_y_int.hidden = true;
    }
    blockButton();
}

function checkX(event) {
    if (!(xField.value === "-3" || xField.value === "-2" || xField.value === "-1" || xField.value === "0" || xField.value === "1" || xField.value === "2" || xField.value === "3" || xField.value === "4" || xField.value === "5")) {
        coolX = false;
        warn_x_int.hidden = false;
        event.preventDefault();
    } else {
        coolX = true;
        warn_x_int.hidden = true;
    }
    blockButton();
}

function checkR(event) {
    if (!(rField.value === "1" || rField.value === "2" || rField.value === "3" || rField.value === "4" || rField.value === "5")) {
        coolR = false;
        warn_r.hidden = false;
        event.preventDefault();
    } else {
        coolR = true;
        warn_r.hidden = true;
    }
    blockButton();
}

function check(event) {
    checkR(event);
    checkY(event);
    checkY(event);
    event.preventDefault();
    doAjax(xField.value, yField.value, rField.value, true);
    submitButton.setAttribute("disabled", "disable");
}

function handleCanvasClick(event) {

    checkR(event);
    if (coolR) {
        let obj = event.target;
        let x = Number(((event.pageX - window.pageXOffset - obj.getBoundingClientRect().x - obj.width / 2) / i).toFixed(2));
        let y = Number((-(event.pageY - window.pageYOffset - obj.getBoundingClientRect().y - obj.height / 2) / i).toFixed(2));
        if (x >= -3 && x <= 5 && y >= -3 && y <= 3) {
            doAjax(x, y, rField.value, true);
        }
    }
}

function blockButton() {
    if (!(coolX && coolY && coolR)) {
        submitButton.setAttribute("disabled", "disable");
    } else {
        submitButton.removeAttribute("disabled")
    }
}




