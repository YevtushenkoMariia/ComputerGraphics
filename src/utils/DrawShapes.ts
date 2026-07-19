import Point from "../models/Point";

// КВАДРАТ ЗА ЗАДАНИМ ЙОГО ЦЕНТРОМ ( + шириною сторони)
export function drawMySquare(
    c: CanvasRenderingContext2D, 
    canvasWidth: number,
    canvasHeight: number,
    step: number,
    centerPoint: Point, 
    borderColor: string, 
    fillColor: string, 
    borderWidth: number, 
    sideLength: number){

    const CENTER_X = canvasWidth / 2;
    const CENTER_Y = canvasHeight / 2;

  var xLeftUp = CENTER_X + (centerPoint.x * step) - (sideLength/2);
  var yLeftUp = CENTER_Y - (centerPoint.y * step) - (sideLength/2);

  c.lineWidth = borderWidth;
  c.strokeStyle = borderColor;
  c.fillStyle = fillColor;

  c.beginPath();
  c.moveTo( xLeftUp,  yLeftUp);
  c.lineTo( xLeftUp + sideLength, yLeftUp );
  c.lineTo( xLeftUp +sideLength,  yLeftUp + sideLength);
  c.lineTo( xLeftUp,  yLeftUp + sideLength);
  c.closePath();
  c.fill();
  c.stroke();
}

// КОЛО ЗА ЗАДАНИМ ЙОГО ЦЕНТРОМ ( + радіусом)
export function DrawCircleApex(
  c: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  step: number,
  point: Point,
  radius: number){

  const CENTER_X = canvasWidth / 2;
  const CENTER_Y = canvasHeight / 2;

  c.beginPath();
  c.arc(CENTER_X + point.x * step, CENTER_Y - point.y * step, radius, 0, Math.PI * 2, false);
  c.fill();
  c.stroke();
}