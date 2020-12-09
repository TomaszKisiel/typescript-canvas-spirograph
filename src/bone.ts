import {Point} from "./point";
import {IDrawable} from "./idrawable";

export class Bone implements IDrawable {
    private readonly length: number;
    private readonly velocity: number;
    private readonly child: (Bone | null) = null;
    private pivot: Point;
    private rotation: number = 0;

    constructor(length: number, velocity: number, child: ( Bone | null ) = null ) {
        this.length = length;
        this.velocity = velocity;
        this.child = child;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if ( this.child !== null ) {
            this.child.draw( ctx )
        }

        let headPosition = this.getHeadPosition()

        ctx.beginPath();
        ctx.moveTo(this.pivot.x, this.pivot.y );
        ctx.lineTo( headPosition.x, headPosition.y );
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc( headPosition.x, headPosition.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

    }

    update( parentVelocity: number = 0 ): void {
        this.rotation += this.velocity + parentVelocity

        if ( this.child !== null ) {
            this.child.setPivot( this.getHeadPosition() )
            this.child.update( this.velocity )
        }
    }

    setPivot( pivot : Point ) {
        this.pivot = pivot;
    }

    getHeadPosition(): Point {
        return {
            x: this.pivot.x + Math.sin( this.rotation * Math.PI / 180 ) * this.length,
            y: this.pivot.y + Math.cos( this.rotation * Math.PI / 180 ) * this.length
        }
    }

    getLastHeadPosition(): Point {
        if ( this.child !== null ) {
            return this.child.getLastHeadPosition()
        }

        return this.getHeadPosition()
    }
}
