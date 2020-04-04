import { SpriteBehavior } from "./SpriteBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";
import {TiledLayer} from '../scene/tiles/TiledLayer';
import { SceneGraph } from "../scene/SceneGraph";

export class BugOneBehavior extends SpriteBehavior{
    private current_direction : string;
    private frames_until_change : number;
    private sceneGraph : SceneGraph;

    constructor(init_sceneGraph : SceneGraph) {
        super(init_sceneGraph);
        this.current_direction = BugOneBehavior.random_direction();
        this.frames_until_change = BugOneBehavior.random_frame_num();
        this.sceneGraph = init_sceneGraph;
    }

    public update() : void {
        if(this.getSprite() == null) { return; }
        if(this.getSprite().getState() == "DYING" || this.getSprite().getState() == "DEAD"){ return; }
        switch(this.current_direction) {
            case "UP": this.moveUp(); break;
            case "DOWN": this.moveDown(); break;
            case "LEFT": this.moveLeft(); break;
            case "RIGHT": this.moveRight(); break;
        }
        this.frames_until_change--;
        if(this.frames_until_change == 0){
            //TODO Make sure it doesn't leave the map
            this.current_direction = BugOneBehavior.random_direction();
            this.frames_until_change = BugOneBehavior.random_frame_num();

            //Make sure it doesn't leave the map
            let world : TiledLayer[] = this.sceneGraph.getTiledLayers();
            let worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
            let worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight();
            
            if(this.current_direction == "UP" && this.getSprite().getPosition().getY() - (this.getSprite().getSpriteType().getSpriteHeight()/2) - this.frames_until_change + this.sceneGraph.getViewport().getY() <= 0){
                this.current_direction = "DOWN";
            }else if(this.current_direction == "DOWN" && this.getSprite().getPosition().getY() + (this.getSprite().getSpriteType().getSpriteHeight()/2) + this.frames_until_change - this.sceneGraph.getViewport().getY() >= worldHeight){
                this.current_direction = "UP";
            }

            if(this.current_direction == "LEFT" && this.getSprite().getPosition().getX() - (this.getSprite().getSpriteType().getSpriteWidth()/2) - this.frames_until_change + this.sceneGraph.getViewport().getX() <= 0){
                this.current_direction = "RIGHT"; console.log("c");
            }else if(this.current_direction == "RIGHT" && this.getSprite().getPosition().getX() + (this.getSprite().getSpriteType().getSpriteWidth()/2) + this.frames_until_change - this.sceneGraph.getViewport().getX() >= worldWidth){
                this.current_direction = "LEFT";
            }
        }

    }

    static random_direction() : string {
        //return "RIGHT";
        let dur_num = Math.floor(Math.random() * 4);
        switch(dur_num) {
            case 0: return "UP";
            case 1: return "DOWN";
            case 2: return "LEFT";
            default: return "RIGHT";
        }
    }

    static random_frame_num() : number {
        return Math.floor(Math.random() * 10) + 1;
    }
}