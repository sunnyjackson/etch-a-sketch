const Modes = {
    SingleColor: 0,
    Eraser: 1,
    Rainbow: 2
}

DEFAULT_GRID_SIZE = 16;
DEFAULT_PAINT_COLOR = 'black';
DEFAULT_MODE = Modes.SingleColor;

isPainting = false;
paintColor = DEFAULT_PAINT_COLOR;
paintMode = DEFAULT_MODE;

function generateGrid(size) {
    // Remove existing children cells
    while (gridcontainer.firstChild) {
        gridcontainer.removeChild(gridcontainer.firstChild);
    }

    // Generate cells, with callbacks attached
    gridcontainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridcontainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("griditem");
        cell.onmouseenter = applyColor;
        cell.onmousedown = applyColor;
        gridcontainer.appendChild(cell);
    }
}

function applyColor() {
    if (!isPainting) return;

    switch(paintMode) {
        case Modes.SingleColor:
            this.style.backgroundColor = paintColor;
            return;
        case Modes.Eraser:
            this.style.backgroundColor = "white";
            return;
        case Modes.Rainbow:
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            this.style.backgroundColor = `rgb(${r},${g},${b})`; // Collect all to a css color string
            return;
    }
}

function clearGrid() {
    for(let cell of gridcontainer.childNodes) {
        cell.style.backgroundColor = "white";
    }
}

function transitionBlackPenMode() {
    paintMode = Modes.SingleColor;
    paintColor = "black";
    document.getElementById("black-button").classList.add("active-button");
    document.getElementById("rainbow-button").classList.remove("active-button");
    document.getElementById("eraser-button").classList.remove("active-button");
}

function transitionRainbowPenMode() {
    paintMode = Modes.Rainbow;
    document.getElementById("black-button").classList.remove("active-button");
    document.getElementById("rainbow-button").classList.add("active-button");
    document.getElementById("eraser-button").classList.remove("active-button");
}

function transitionEraserMode() {
    paintMode = Modes.Eraser;
    document.getElementById("black-button").classList.remove("active-button");
    document.getElementById("rainbow-button").classList.remove("active-button");
    document.getElementById("eraser-button").classList.add("active-button");
}

// Establish grid
document.body.onmouseup = () => isPainting = false;
document.body.addEventListener("mousedown", () => isPainting = true, {capture: true}); // capture this event, so that isPainting is set to True before trying to paint the first cell
const gridcontainer = document.querySelector(".gridcontainer");
generateGrid(DEFAULT_GRID_SIZE);

// Establish slider
let slider = document.getElementById("myRange");
let slider_value = document.getElementById("slider-value");
slider_value.innerHTML = `Portait Size: ${slider.value} x ${slider.value}`;
slider.oninput = function() {
    gridsize = this.value;
    generateGrid(gridsize);
    slider_value.innerHTML = `Portait Size: ${gridsize} x ${gridsize}`;
    for(let cell of gridcontainer.childNodes) {
        cell.style.border = "solid 1px lightgrey";
    }
}
slider.onmouseover = function() {
    for(let cell of gridcontainer.childNodes) {
        cell.style.border = "solid 1px lightgrey";
    }
}
slider.onmouseout = function () {
    for(let cell of gridcontainer.childNodes) {
        cell.style.border = "none";
    }
}

// Establish buttons
document.getElementById("black-button").onclick = transitionBlackPenMode;
document.getElementById("rainbow-button").onclick = transitionRainbowPenMode;
document.getElementById("eraser-button").onclick = transitionEraserMode;
document.getElementById("clear-button").onclick = clearGrid;
transitionBlackPenMode()