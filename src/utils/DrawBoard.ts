export function CleanBoard(c: CanvasRenderingContext2D, canvasW: number, canvasH: number, step: number) {
    c.clearRect(0, 0, canvasW, canvasH);
    drawCoordinateBoard(c, canvasW, canvasH, step);
}

export function drawCoordinateBoard(
  c: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  step: number,
) {
  console.log("Координатна дошка" + new Date().toISOString());


  const CENTER_X = canvasW / 2;
  const CENTER_Y = canvasH / 2;

  //горизонтальні та вертикальні лінії для клітинок
  c.strokeStyle = "#ddd";
  c.lineWidth = 1;
  for (var x = 0; x < canvasW; x += step) {
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, canvasH);
    c.stroke();
  }
  for (var y = 0; y < canvasH; y += step) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(canvasW, y);
    c.stroke();
  }

  //Осі X та Y
  c.strokeStyle = "black";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(0, CENTER_Y);
  c.lineTo(canvasW, CENTER_Y);
  c.moveTo(CENTER_X, 0);
  c.lineTo(CENTER_X, canvasH);
  c.stroke();

  //Стрілки на осі X Y
  c.beginPath();
  c.moveTo(canvasW - 10, CENTER_Y - 5);
  c.lineTo(canvasW, CENTER_Y);
  c.lineTo(canvasW - 10, CENTER_Y + 5);
  c.stroke();

  c.beginPath();
  c.moveTo(CENTER_X - 5, 10);
  c.lineTo(CENTER_X, 0);
  c.lineTo(CENTER_X + 5, 10);
  c.stroke();

  //Надписи на осях X Y
  c.font = "8px Arial";
  c.fillStyle = "black";
  c.fillText("X", canvasW - 15, CENTER_Y - 10);
  c.fillText("Y", CENTER_X + 15, 15);

  //Текст для поділок
  c.font = "8px Arial";
  c.lineWidth = 1;
  c.textAlign = "center";
  c.textBaseline = "middle";

  // малювання поділок по x
  for (var i = -CENTER_X; i < CENTER_X; i += step) {
    if (i !== 0) {
      c.beginPath();
      c.moveTo(CENTER_X + i, CENTER_Y - 5);
      c.lineTo(CENTER_X + i, CENTER_Y + 5);
      c.stroke();
      c.fillText((i / step).toString(), CENTER_X + i, CENTER_Y + 15);
    }
  }

  // малювання поділок по y
  for (var j = -CENTER_Y; j < CENTER_Y; j += step) {
    if (j !== 0 && CENTER_Y - j < canvasH) {
      c.beginPath();
      c.moveTo(CENTER_X - 5, CENTER_Y + j);
      c.lineTo(CENTER_X + 5, CENTER_Y + j);
      c.stroke();
      c.fillText((-j / step).toString(), CENTER_X - 15, CENTER_Y + j);
    }
  }

  // Позначення 0
  c.fillText("0", CENTER_X - 10, CENTER_Y + 10);
}
