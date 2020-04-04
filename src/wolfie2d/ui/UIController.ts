/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    public keyDownHandler = (event : KeyboardEvent) : void => {
        if(event.key == "w"){
            SceneGraph.setMoveUp(true);
        }
        if(event.key == "s"){
            SceneGraph.setMoveDown(true);
        }
        if(event.key == "a"){
            SceneGraph.setMoveRight(true);
        }
        if(event.key == "d"){
            SceneGraph.setMoveLeft(true);
        }
    }

    public keyUpHandler = (event : KeyboardEvent) : void => {
        if(event.key == "w"){
            SceneGraph.setMoveUp(false);
        }
        if(event.key == "s"){
            SceneGraph.setMoveDown(false);
        }
        if(event.key == "a"){
            SceneGraph.setMoveRight(false);
        }
        if(event.key == "d"){
            SceneGraph.setMoveLeft(false);
        }
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        let mousePressX : number = event.clientX;
        let mousePressY : number = event.clientY;
        let sprite : AnimatedSprite = this.scene.getSpriteAt(mousePressX, mousePressY);
        console.log("mousePressX: " + mousePressX);
        console.log("mousePressY: " + mousePressY);
        console.log("sprite: " + sprite);
        if (sprite != null) {
            // START DRAGGING IT
            this.spriteToDrag = sprite;
            this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
            this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
        }
    }
    
    public mouseMoveHandler = (event : MouseEvent) : void => {
        if (this.spriteToDrag != null) {
            this.spriteToDrag.getPosition().set(event.clientX + this.dragOffsetX, 
                                                event.clientY + this.dragOffsetY, 
                                                this.spriteToDrag.getPosition().getZ(), 
                                                this.spriteToDrag.getPosition().getW());
        }
        var main_character : AnimatedSprite;
        main_character = this.scene.getMainCharacter();
        console.log(main_character == null);
        if(main_character != null) {
             main_character.getPosition().set(event.clientX - main_character.getSpriteType().getSpriteWidth()/2 + this.scene.getViewport().getX(), 
                                              event.clientY - main_character.getSpriteType().getSpriteHeight()/2 + this.scene.getViewport().getY(), 
                                              main_character.getPosition().getZ(), 
                                              main_character.getPosition().getW());
        }
    }

    public mouseUpHandler = (event : MouseEvent) : void => {
        this.spriteToDrag = null;
    }
}