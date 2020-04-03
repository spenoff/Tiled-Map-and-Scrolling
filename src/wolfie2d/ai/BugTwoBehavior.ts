import { SpriteBehavior } from "./SpriteBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";
import { SceneGraph } from "../scene/SceneGraph";

export class BugTwoBehavior extends SpriteBehavior{
    private current_direction : string;
    private frames_until_change : number;
    private main_sprite : AnimatedSprite;
    private sceneGraph : SceneGraph;

    constructor(init_main_sprite : AnimatedSprite, init_scene_graph : SceneGraph) {
        super();
        this.current_direction = "UP";
        this.frames_until_change = 50;
        this.main_sprite = init_main_sprite;
        this.sceneGraph = init_scene_graph;
    }

    public update() : void {
        if(this.getSprite() == null) { return; }
        if(this.getSprite().getState() == "DYING" || this.getSprite().getState() == "DEAD"){ return; }

        //Check if the main character is nearby
        //distance = ((x2-x1)^2 + (y2-y1)^2)^0.5
        let distance = Math.sqrt((Math.pow(((this.main_sprite.getPosition().getX() - this.sceneGraph.getViewport().getX()) - (this.getSprite().getPosition().getX() - this.sceneGraph.getViewport().getX())), 2)
        + Math.pow(((this.main_sprite.getPosition().getY() - this.sceneGraph.getViewport().getY()) - (this.getSprite().getPosition().getY() - this.sceneGraph.getViewport().getY())), 2)));
        let main_character_radius = Math.pow(Math.pow(this.main_sprite.getSpriteType().getSpriteWidth()/2, 2) + Math.pow(this.main_sprite.getSpriteType().getSpriteHeight()/2, 2), 0.5);
        let bug_radius = Math.pow(Math.pow(this.getSprite().getSpriteType().getSpriteWidth()/4, 2) + Math.pow(this.getSprite().getSpriteType().getSpriteHeight()/4, 2), 0.5);
        if(distance <= 50 + main_character_radius + bug_radius) {
            if(this.main_sprite.getPosition().getX() < this.getSprite().getPosition().getX()) {
                this.moveRight();
            }else if(this.main_sprite.getPosition().getX() > this.getSprite().getPosition().getX()) {
                this.moveLeft();
            }

            if(this.main_sprite.getPosition().getY() < this.getSprite().getPosition().getY()) {
                this.moveUp();
            }else if(this.main_sprite.getPosition().getY() > this.getSprite().getPosition().getY()) {
                this.moveDown();
            }
            return;
        }

        switch(this.current_direction) {
            case "UP": this.moveUp(); break;
            case "DOWN": this.moveDown(); break;
            case "LEFT": this.moveLeft(); break;
            case "RIGHT": this.moveRight(); break;
        }
        this.frames_until_change--;
        if(this.frames_until_change == 0) {
            //TODO Make sure it doesn't leave the map
            this.current_direction = this.current_direction=="UP"?"DOWN":"UP";
            this.frames_until_change = 50;
        }

    }
}