DEFAULT_GRID_SIZE = 16;
isPainting = false;

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
    if (isPainting) {
        this.classList.add("painted");
    }
}

function clearGrid() {
    for(let cell of gridcontainer.childNodes) {
        cell.removeAttribute('class');
        cell.classList.add('griditem');
    }
}

// Establish grid
document.body.onmouseup = () => isPainting = false;
document.body.addEventListener("mousedown", () => isPainting = true, {capture: true}); // capture this event, so that isPainting is set to True before trying to paint the first cell

const gridcontainer = document.querySelector(".gridcontainer");
generateGrid(DEFAULT_GRID_SIZE);

// Establish slider
let slider = document.getElementById("myRange");
let slider_value = document.getElementById("slider-value");
slider_value.innerHTML = slider.value;
slider.oninput = function() {
    gridsize = this.value;
    generateGrid(gridsize);
    slider_value.innerHTML = gridsize;
}

// Establish clear button
let clear_button = document.getElementById("clear-button");
clear_button.onclick = clearGrid;