const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//1
function drawRectangles() {
    ctx.fillStyle = "red";
    ctx.fillRect(60, 60, 150, 100);

    ctx.fillStyle = "blue";
    ctx.fillRect(120, 100, 150, 100);

    ctx.fillStyle = "green";
    ctx.fillRect(200, 50, 150, 100);
}

drawRectangles();

//2
function fillCanvasGradient(color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRectangles();
}

//3
function drawLine(x1, y1, x2, y2, color = "white", width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

//4
function createSvgLine(x1, y1, x2, y2, color = "black", width = 2) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "500");
    svg.setAttribute("height", "150");

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", width);

    svg.appendChild(line);
    document.getElementById("svgContainer").appendChild(svg);
}

//5
function createSvgRect(w, h, fill, stroke, strokeWidth) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "500");
    svg.setAttribute("height", "150");

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", 20);
    rect.setAttribute("y", 20);
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("fill", fill);
    rect.setAttribute("stroke", stroke);
    rect.setAttribute("stroke-width", strokeWidth);

    svg.appendChild(rect);
    document.getElementById("svgContainer").appendChild(svg);
}
