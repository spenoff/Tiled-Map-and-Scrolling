import { SpriteBehavior } from "./SpriteBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";
import { SceneGraph } from "../scene/SceneGraph";

export class MainCharacterBehavior extends SpriteBehavior{
    private backing_up = false;
    private backing_down = false;
    private backing_left = false;
    private backing_right = false;
    private runaway_time = 10;

    constructor(init_sceneGraph : SceneGraph) {
        super(init_sceneGraph);
    }

    public update() : void {
        if(this.getBackUp() && !this.backing_up){
            this.backing_up = true;
            let upTime = setInterval(() => this.moveUp(), this.runaway_time);
            //stop after 2 seconds
            setTimeout(() => { clearInterval(upTime); this.backing_up = false; this.stopBackUp();}, 2000);
        }
        if(this.getBackDown() && !this.backing_down){
            this.backing_down = true;
            let downTime = setInterval(() => this.moveDown(), this.runaway_time);
            //stop after 2 seconds
            setTimeout(() => { clearInterval(downTime); this.backing_down = false; this.stopBackDown();}, 2000);
        }
        if(this.getBackLeft() && !this.backing_left){
            this.backing_left = true;
            let leftTime = setInterval(() => this.moveLeft(), this.runaway_time);
            //stop after 2 seconds
            setTimeout(() => { clearInterval(leftTime); this.backing_left = false; this.stopBackLeft();}, 2000);
        }
        if(this.getBackRight() && !this.backing_right){
            this.backing_right = true;
            let rightTime = setInterval(() => this.moveRight(), this.runaway_time);
            //stop after 2 seconds
            setTimeout(() => { clearInterval(rightTime); this.backing_right = false; this.stopBackRight();}, 2000);
        }
    }
}