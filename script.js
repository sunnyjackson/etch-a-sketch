function generateGrid(size) {
    gridcontainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridcontainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        cell = document.createElement("div");
        cell.classList.add("griditem");
        gridcontainer.appendChild(cell);
    }
}

const gridcontainer = document.querySelector(".gridcontainer");
generateGrid(16);