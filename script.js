function generateGrid(size) {
    gridcontainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridcontainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("griditem");
        gridcontainer.appendChild(cell);
    }
}

// Establish grid
const gridcontainer = document.querySelector(".gridcontainer");
generateGrid(16);
for (let cell of document.getElementsByClassName("griditem")){
    cell.onmouseenter = () => cell.classList.add("hover");
    cell.onmouseleave = () => cell.classList.remove("hover");
    cell.onmousedown = () => cell.classList.add("painted");
}

// Establish slider
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}