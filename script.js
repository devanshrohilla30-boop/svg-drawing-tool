const svg = document.getElementById("drawingCanvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let isDrawing = false;
let currentPath = null;
let paths = [];

svg.addEventListener("mousedown", (e) => {
  isDrawing = true;

  const point = getMousePosition(e);

  currentPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("stroke", colorPicker.value);
  currentPath.setAttribute("stroke-width", "3");
  currentPath.setAttribute(
    "d",
    `M ${point.x} ${point.y}`
  );

  svg.appendChild(currentPath);
  paths.push(currentPath);
});

svg.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const point = getMousePosition(e);
  let d = currentPath.getAttribute("d");
  d += ` L ${point.x} ${point.y}`;
  currentPath.setAttribute("d", d);
});

svg.addEventListener("mouseup", () => {
  isDrawing = false;
});

svg.addEventListener("mouseleave", () => {
  isDrawing = false;
});

undoBtn.addEventListener("click", () => {
  if (paths.length > 0) {
    let last = paths.pop();
    svg.removeChild(last);
  }
});

clearBtn.addEventListener("click", () => {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  paths = [];
});

function getMousePosition(event) {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 1000,
    y: ((event.clientY - rect.top) / rect.height) * 600,
  };
}
