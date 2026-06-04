"use strict";

const canvas = document.querySelector(".js-painter");
const context = canvas.getContext("2d");
const toolButtons = document.querySelectorAll(".js-tool");
const colorPicker = document.querySelector(".js-color-picker");
const pencilRange = document.querySelector(".js-pencil-range");
const pencilValue = document.querySelector(".js-pencil-value");
const lineCapSelect = document.querySelector(".js-line-cap");
const clearButton = document.querySelector(".js-clear");

function getCssToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const DEFAULT_BRUSH = {
  color: getCssToken("--color-brush"),
  width: 10,
  lineCap: "round",
  tool: "brush",
};

let currentTool = DEFAULT_BRUSH.tool;

const mouse = {
  isPressed: false,
  x: 0,
  y: 0,
};

// 브러시 색상은 JS와 CSS에서 같이 쓰기 때문에 CSS 변수도 함께 갱신하는 용도.
function applyBrushColor(color) {
  context.strokeStyle = color;
  document.documentElement.style.setProperty("--color-brush", color);
}

function applyBrushWidth(width) {
  context.lineWidth = width;
  pencilValue.textContent = `${width}px`;
}

function applyLineCap(lineCap) {
  context.lineCap = lineCap;
}

// 지우개는 캔버스에 흰색을 그리는 대신, 기존 픽셀을 지우는 모드로 처리.
function applyTool(tool) {
  currentTool = tool;
  context.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";

  toolButtons.forEach((button) => {
    const isSelected = button.dataset.tool === tool;

    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

// 처음 실행하거나 초기화할 때 브러시 값을 한 곳에서 맞춤.
function resetBrush() {
  colorPicker.value = DEFAULT_BRUSH.color;
  pencilRange.value = DEFAULT_BRUSH.width;
  lineCapSelect.value = DEFAULT_BRUSH.lineCap;

  applyBrushColor(DEFAULT_BRUSH.color);
  applyBrushWidth(DEFAULT_BRUSH.width);
  applyLineCap(DEFAULT_BRUSH.lineCap);
  applyTool(DEFAULT_BRUSH.tool);
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function saveMousePoint(event) {
  const point = getCanvasPoint(event);

  mouse.x = point.x;
  mouse.y = point.y;
}

// 마우스를 클릭한 위치부터 선을 이어 그리기 위해 현재 좌표를 저장.
function startDrawing(event) {
  mouse.isPressed = true;
  saveMousePoint(event);
}

// 마우스를 떼거나 캔버스 밖으로 나가면 그리기를 멈춤.
function stopDrawing() {
  mouse.isPressed = false;
}

function drawLine(nextX, nextY) {
  context.beginPath();
  context.moveTo(mouse.x, mouse.y);
  context.lineTo(nextX, nextY);
  context.stroke();
}

// 이전 좌표에서 현재 좌표까지 짧은 선을 계속 이어 그림.
function draw(event) {
  if (!mouse.isPressed) {
    return;
  }

  const point = getCanvasPoint(event);

  drawLine(point.x, point.y);
  saveMousePoint(event);
}

// 캔버스에 그린 내용을 모두 지움.
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

colorPicker.addEventListener("change", (event) => {
  applyBrushColor(event.target.value);
});

pencilRange.addEventListener("input", (event) => {
  applyBrushWidth(event.target.value);
});

lineCapSelect.addEventListener("change", (event) => {
  applyLineCap(event.target.value);
});

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTool(button.dataset.tool);
  });
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

clearButton.addEventListener("click", clearCanvas);

// PDF 예제처럼 우클릭으로도 초기화할 수 있게 함.
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  stopDrawing();

  if (confirm("초기화 하시겠습니까?")) {
    resetBrush();
    clearCanvas();
  }
});

resetBrush();
