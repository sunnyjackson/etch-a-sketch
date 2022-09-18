DEFAULT_GRID_SIZE = 16;

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
        cell.onmouseenter = () => cell.classList.add("hover");
        cell.onmouseleave = () => cell.classList.remove("hover");
        cell.onmousedown = () => cell.classList.add("painted");
        gridcontainer.appendChild(cell);
    }
}

// Establish grid
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