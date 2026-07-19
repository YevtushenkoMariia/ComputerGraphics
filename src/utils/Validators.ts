import Point from "../models/Point";

export function ValidateCoordinate(
  fieldKey: string,
  value: string, 
  step: number, 
  canvasWidth: number, 
  canvasHeight: number): {isValid: boolean, errors: string[]} {
    var minValue =0.01;
    var maxValue = (canvasWidth/2)/step;
  
    var errors: string[]=[];
    var isValid=true;
  
    if(!value.trim()){
      errors.push(`Введіть координату точки ${fieldKey} !`);
    }else{
      var numValue = parseFloat(value.trim());
      
      if(Math.abs(numValue) <minValue && numValue!=0){
        errors.push(`Значення координати ${fieldKey} замале! Введіть більше значення`);
      }
      
      if( Math.abs(numValue) > maxValue){
        errors.push(`Значення координати ${fieldKey} має бути за модулем меншим за ${maxValue}`);
      }
    }
  
    if (errors.length > 0) {
  
      isValid=false; // Встановлюємо ToolTip
    } else {
        isValid=true;
    }
  
    return {isValid, errors};
  }
  
export function ValidatePoints(pointA: Point, pointB: Point){
  
    var errors: string[]=[];
    var isValid = true;
  
    if(pointA.x==pointB.x && pointA.y == pointB.y){
      errors.push("Точки не можуть бути однаковими!");
    }else if(Math.sqrt(  Math.pow((pointA.x-pointB.x),2) + Math.pow((pointA.y-pointB.y),2) )  < 0.2){
      errors.push("Точки розташовані занадто близько!");
    }
  
    if(errors.length !=0){
      isValid=false;
    }else{
      isValid=true;
    }
  
    return {isValid, errors};
  }


  export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }