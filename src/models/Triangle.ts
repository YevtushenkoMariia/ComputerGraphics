import Point from "./Point";
import { DrawCircleApex,  drawMySquare} from "../utils/DrawShapes";

interface Shape{
  Draw(c: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, STEP: number): void;
  IsPointInCanvas(point: Point, canvasWidth: number, canvasHeight: number, STEP: number, canvas: HTMLCanvasElement): boolean;
  DrawApex(c: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, STEP: number, canvas: HTMLCanvasElement): void;
  WriteApexNames(c: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, STEP: number): void;
}

export default class Triangle implements Shape{

    pointA: Point;
    pointB: Point;
    pointC1: Point | null;
    pointC2: Point | null;
    borderColor: string;
    fillColor: string;
    apex: string;
    IsC1: boolean;

    constructor(
        pointA: Point, 
        pointB: Point, 
        borderColor: string, 
        fillColor: string, 
        apex: string){
      this.pointA=pointA;
      this.pointB=pointB;
      this.pointC1 = null;
      this.pointC2=null;
      this.borderColor = borderColor;
      this.fillColor = fillColor;
      this.apex = apex;
      this.IsC1 = false;
    }

    isC1(): boolean{
      return this.IsC1;
    }

    setIsC1(isC1: boolean){
      this.IsC1 = isC1;
    }
  
    FindThirdApex(){

      if(!this.pointA && !this.pointB){
        return;
      }

      var mX = (this.pointA.x + this.pointB.x) / 2;
      var mY = (this.pointA.y + this.pointB.y) / 2;
  
      console.log("POINT A = " + this.pointA.x + " " + this.pointA.y);
      console.log("POINT B = " + this.pointB.x + " " + this.pointB.y);
  
      var sideLenght = Math.sqrt(Math.pow(this.pointA.x - this.pointB.x, 2) + Math.pow(this.pointA.y - this.pointB.y, 2));
      var triangleHeight = sideLenght * (Math.sqrt(3) / 2); // довжина висоти
  
      // координати вектора АВ
      var vecX_AB = this.pointB.x - this.pointA.x;
      var vecY_AB = this.pointB.y - this.pointA.y;
      console.log("Vec AB = " + vecX_AB + " " + vecY_AB);
      
      // координати вектора N що перпендикулярний до АВ
      var vecX_N = -vecY_AB;
      var vecY_N = vecX_AB;
      console.log("Vec N = " + vecX_N + " " + vecY_N);
  
      var lenghtVecN = Math.sqrt(Math.pow(vecX_N, 2) + Math.pow(vecY_N, 2));
      console.log("LENGTH = "+ lenghtVecN);
      console.log("H = "+ triangleHeight);
  
  
      var paramT = triangleHeight / lenghtVecN; // параметр
      console.log("T = "+ paramT);
  
      // координати 2-х можливих точок для 3 вершини
      var cX1 = mX + vecX_N * paramT;
      var cY1 = mY + vecY_N * paramT;
      this.pointC1 = new Point(cX1, cY1, "C1");
      console.log("POINT C1 = " + cX1.toFixed(2) +" " + cY1.toFixed(2));
  
      var cX2 = mX - vecX_N * paramT;
      var cY2 = mY - vecY_N * paramT;
      this.pointC2 = new Point(cX2, cY2, "C2");
      console.log("POINT C2 = " + cX2.toFixed(2) + " " + cY2.toFixed(2));
    }
  
    Draw(c: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, STEP: number): void{

      const CENTER_X = canvasWidth / 2;
      const CENTER_Y = canvasHeight / 2;

      console.log("Малювання трикутника Class");
      c.beginPath();
      c.moveTo(CENTER_X + this.pointA.x * STEP, CENTER_Y - this.pointA.y * STEP);
      c.lineTo(CENTER_X + this.pointB.x * STEP, CENTER_Y - this.pointB.y * STEP);
  
      console.log(" IS C1??? = " + this.IsC1);
  
      if(this.IsC1 == true){
        c.lineTo(CENTER_X + this.pointC1!.x * STEP, CENTER_Y - this.pointC1!.y * STEP);
        console.log("draw C1 ----");
      }else{
        c.lineTo(CENTER_X + this.pointC2!.x * STEP, CENTER_Y - this.pointC2!.y * STEP);
        console.log("draw C2 ----");
      }
     
      c.closePath();
      c.globalAlpha = 0.5; // прозорість кольору
      c.fillStyle = this.fillColor;
      c.fill();
      c.globalAlpha = 1.0;
      c.strokeStyle = this.borderColor;
      c.lineWidth = 1;
      c.stroke();
    }
  
    IsPointInCanvas(point: Point, canvasWidth: number, canvasHeight: number, STEP: number): boolean{
      console.log("Перевірка точки checkApex");
      const CENTER_X = canvasWidth / 2;
      const CENTER_Y = canvasHeight / 2;
  
      // переведення в координати канви
      var canvasX = CENTER_X + point.x * STEP;
      var canvasY = CENTER_Y - point.y * STEP;
  
      console.log(point.x );
      console.log(point.y)
      console.log("Cx = " + canvasX);
      console.log("Cy = " + canvasY);
  
    
      if (canvasX > 0 && canvasX < canvasWidth 
          && canvasY > 0 && canvasY < canvasHeight) {
        return true;
      } else {
        return false;
      }
    }
  
    DrawApex(
      c: CanvasRenderingContext2D, 
      canvasWidth: number, 
      canvasHeight: number, 
      STEP: number, 
    ){
  
      c.globalAlpha = 0.7;
      c.fillStyle = this.fillColor;
      c.strokeStyle = this.borderColor;
      c.lineWidth = 1;
  
      switch(this.apex){
        case "Circle":
          DrawCircleApex(c, canvasWidth, canvasHeight, STEP, this.pointA, 5);
          DrawCircleApex(c, canvasWidth, canvasHeight, STEP, this.pointB, 5);
          if(this.IsC1 == true){
            DrawCircleApex(c, canvasWidth, canvasHeight, STEP, this.pointC1! , 5);
          }else{
            DrawCircleApex(c, canvasWidth, canvasHeight, STEP, this.pointC2!, 5);
          }
          break;
        case "Square":
          drawMySquare(c, canvasWidth, canvasHeight, STEP, this.pointA, this.borderColor, this.fillColor, 1, 8);
          drawMySquare(c, canvasWidth, canvasHeight, STEP, this.pointB, this.borderColor, this.fillColor, 1, 8);
          if(this.IsC1 == true){
            drawMySquare(c, canvasWidth, canvasHeight, STEP, this.pointC1!, this.borderColor, this.fillColor, 1, 8);
          }else{
            drawMySquare(c, canvasWidth, canvasHeight, STEP, this.pointC2!, this.borderColor, this.fillColor, 1, 8);
          }
          break;
        case "None":
          break;
        default:
          break;
      }
  
      c.globalAlpha = 1;
    }
  
    WriteApexNames(
      c: CanvasRenderingContext2D, 
      canvasWidth: number, 
      canvasHeight: number, 
      STEP: number, 
    ){
      const CENTER_X = canvasWidth / 2;
      const CENTER_Y = canvasHeight / 2;
      c.font = "16px Arial"; 
      c.fillStyle = "black"; 
  
  
      c.fillText(this.pointA.name, CENTER_X + this.pointA.x * STEP + 10, CENTER_Y - this.pointA.y * STEP - 10);
      c.fillText(this.pointB.name, CENTER_X + this.pointB.x * STEP + 10, CENTER_Y - this.pointB.y * STEP - 10);
      if(this.IsC1 == true){
        c.fillText(this.pointC1!.name, CENTER_X + this.pointC1!.x * STEP + 10, CENTER_Y - this.pointC1!.y * STEP - 10);
      }else{
        c.fillText(this.pointC2!.name, CENTER_X + this.pointC2!.x * STEP + 10, CENTER_Y - this.pointC2!.y * STEP - 10);
      }
    }
  
    
  }