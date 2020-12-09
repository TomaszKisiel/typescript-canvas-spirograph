import { Point } from "./point";
import {Bone} from "./bone";

class App {
    private readonly canvas : HTMLCanvasElement;
    private readonly context : CanvasRenderingContext2D;
    private readonly bone: Bone;
    private positions: Point[] = []

    constructor() {
        let canvas = document.getElementById('display') as HTMLCanvasElement;
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas = canvas;

        this.context = context;
        this.context.canvas.width  = canvas.offsetWidth;
        this.context.canvas.height = canvas.offsetHeight;

        let center: Point = {
            x: this.canvas.offsetWidth / 2,
            y: this.canvas.offsetHeight / 2
        }

        this.bone = new Bone(
            13,
            4.4,
            new Bone(
                69,
                -3,
            )
        )
        this.bone.setPivot( center )

        setInterval( () => {
            this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
            this.bone.update()
            this.bone.draw( this.context )

            this.positions.push( this.bone.getLastHeadPosition() )

            let prevPosition : ( Point | null ) = null;
            this.positions.forEach( ( position : Point ) => {
                if ( prevPosition != null ) {
                    this.context.beginPath();
                    this.context.moveTo(prevPosition.x, prevPosition.y );
                    this.context.lineTo(position.x, position.y );
                    this.context.strokeStyle = 'red';
                    this.context.stroke();
                    this.context.closePath();
                }
                prevPosition = position;
            })
        }, 1000/100 )

        // a huj
        // this.bone = new Bone( this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2, 100, 1 );
        //
        // setInterval( () => {
        //     this.context.clearRect( 0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight );
        //
        //     let cline : Line = this.bone.getNextLine();
        //     this.points.push( { x: cline.end.x, y: cline.end.y } );
        //
        //     this.context.beginPath();
        //     this.context.moveTo(cline.begin.x, cline.begin.y );
        //     this.context.lineTo(cline.end.x, cline.end.y );
        //     this.context.strokeStyle = 'green';
        //     this.context.stroke();
        //     this.context.closePath();
        //
        //     let prevPoint : ( Point | null ) = null;
        //     this.points.forEach( ( point : Point ) => {
        //         if ( prevPoint != null ) {
        //             this.context.beginPath();
        //             this.context.moveTo(prevPoint.x, prevPoint.y );
        //             this.context.lineTo(point.x, point.y );
        //             this.context.strokeStyle = 'red';
        //             this.context.stroke();
        //             this.context.closePath();
        //         }
        //         prevPoint = point;
        //     })
        // }, 1000/30 )

        // this.context.beginPath();
        // this.context.moveTo(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 );
        // this.context.lineTo(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 + 50);
        // this.context.strokeStyle = 'green';
        // this.context.stroke();
        // this.context.closePath();
        //
        // this.context.beginPath();
        // this.context.arc(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2, 3, 0, 2 * Math.PI, false);
        // this.context.fillStyle = 'red';
        // this.context.fill();
        // this.context.closePath();
        //
        // this.context.beginPath();
        // this.context.moveTo(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 + 50 );
        // this.context.lineTo(this.canvas.offsetWidth / 2 + 50, this.canvas.offsetHeight / 2 + 50);
        // this.context.strokeStyle = 'green';
        // this.context.stroke();
        // this.context.closePath();
        //
        // this.context.beginPath();
        // this.context.arc(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 + 50, 3, 0, 2 * Math.PI, false);
        // this.context.fillStyle = 'red';
        // this.context.fill();
        // this.context.closePath();


        // this.redraw();
        // this.createUserEvents();
    }

    // private createUserEvents() {
    //     let canvas = this.canvas;
    //
    //     window.addEventListener("resize", this.resizeEventHandler );
    //
    //     canvas.addEventListener("mousedown", this.pressEventHandler);
    //     canvas.addEventListener("mousemove", this.dragEventHandler);
    //     canvas.addEventListener("mouseup", this.releaseEventHandler);
    //     canvas.addEventListener("mouseout", this.cancelEventHandler);
    //
    //     canvas.addEventListener("touchstart", this.pressEventHandler);
    //     canvas.addEventListener("touchmove", this.dragEventHandler);
    //     canvas.addEventListener("touchend", this.releaseEventHandler);
    //     canvas.addEventListener("touchcancel", this.cancelEventHandler);
    //
    //     document.getElementById('clear')?.addEventListener("click", this.clearEventHandler);
    // }
    //
    // private redraw() {
    //     let clickX = this.clickX;
    //     let context = this.context;
    //     let clickDrag = this.clickDrag;
    //     let clickY = this.clickY;
    //     for (let i = 0; i < clickX.length; ++i) {
    //         context.beginPath();
    //         if (clickDrag[i] && i) {
    //             context.moveTo(clickX[i - 1], clickY[i - 1]);
    //         } else {
    //             context.moveTo(clickX[i] - 1, clickY[i]);
    //         }
    //
    //         context.lineTo(clickX[i], clickY[i]);
    //         context.stroke();
    //     }
    //     context.closePath();
    // }
    //
    // private addClick(x: number, y: number, dragging: boolean) {
    //     this.clickX.push(x);
    //     this.clickY.push(y);
    //     this.clickDrag.push(dragging);
    // }
    //
    // private clearCanvas() {
    //     this.context
    //         .clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.clickX = [];
    //     this.clickY = [];
    //     this.clickDrag = [];
    // }
    //
    // private clearEventHandler = () => {
    //     this.clearCanvas();
    // }
    //
    // private releaseEventHandler = () => {
    //     this.paint = false;
    //     this.redraw();
    // }
    //
    // private cancelEventHandler = () => {
    //     this.paint = false;
    // }
    //
    //
    // private resizeEventHandler = () => {
    //     let canvas = this.canvas
    //
    //     this.context.canvas.width  = canvas.offsetWidth;
    //     this.context.canvas.height = canvas.offsetHeight;
    //
    //     this.redraw();
    // }
    //
    // private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    //     let mouseX = (e as TouchEvent).changedTouches ?
    //         (e as TouchEvent).changedTouches[0].pageX :
    //         (e as MouseEvent).pageX;
    //     let mouseY = (e as TouchEvent).changedTouches ?
    //         (e as TouchEvent).changedTouches[0].pageY :
    //         (e as MouseEvent).pageY;
    //     mouseX -= this.canvas.offsetLeft;
    //     mouseY -= this.canvas.offsetTop;
    //
    //     this.paint = true;
    //     this.addClick(mouseX, mouseY, false);
    //     this.redraw();
    // }
    //
    // private dragEventHandler = (e: MouseEvent | TouchEvent) => {
    //     let mouseX = (e as TouchEvent).changedTouches ?
    //         (e as TouchEvent).changedTouches[0].pageX :
    //         (e as MouseEvent).pageX;
    //     let mouseY = (e as TouchEvent).changedTouches ?
    //         (e as TouchEvent).changedTouches[0].pageY :
    //         (e as MouseEvent).pageY;
    //     mouseX -= this.canvas.offsetLeft;
    //     mouseY -= this.canvas.offsetTop;
    //
    //     if (this.paint) {
    //         this.addClick(mouseX, mouseY, true);
    //         this.redraw();
    //     }
    //
    //     e.preventDefault();
    // }
}

new App();

// sad
// if ( app != null ) {
//     const display = app.querySelector("#display");
//     // const
// }

// interface Point {
//     x: number;
//     y: number;
// }
//
// interface Line {
//     begin: Point;
//     end: Point;
// }

// class Bone {
//     private readonly x: number;
//     private readonly y: number;
//     private readonly length: number;
//     private readonly velocity: number;
//     private angle: number = 0;
//
//     constructor( x: number, y: number, length: number, velocity: number ) {
//         this.x = x;
//         this.y = y;
//         this.length = length;
//         this.velocity = velocity;
//     }
//
//     public getNextLine = () : Line => {
//
//         let rad = this.velocity * Math.PI / 180;
//         this.angle += rad;
//
//         let dx = Math.sin( this.angle ) * this.length;
//         let dy = Math.cos( this.angle ) * this.length;
//
//         return {
//             begin: { x: this.x, y: this.y },
//             end: { x: this.x + dx, y: this.y + dy }
//         }
//     }
// }