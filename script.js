// Initialize 16x16 grid of divs
const container = document.querySelector(".gridcontainer");
for (let i = 0; i < 256; i++) {
    cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
}