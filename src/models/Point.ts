

class Point{
    x: number;
    y: number;
    name: string;

    constructor(
        x: number, 
        y: number, 
        name: string){
      this.x=x;
      this.y=y;
      this.name=name;
    }
  
    getString(): string{
        const xString = this.x.toFixed(2).toString();
        const yString = this.y.toFixed(2).toString();

      return `( ${xString} ; ${yString} )`;
    }
  }
  

export default Point;