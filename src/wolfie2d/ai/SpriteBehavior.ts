import { AnimatedSprite } from "../scene/sprite/AnimatedSprite"
import { SceneGraph } from "../scene/SceneGraph";
import { TiledLayer } from '../scene/tiles/TiledLayer'



export abstract class SpriteBehavior {
    private sprite : AnimatedSprite;
    private sg : SceneGraph;
    private back_up = false;
    private back_down = false;
    private back_left = false;
    private back_right = false;

    public constructor(init_sceneGraph : SceneGraph) {
        this.sprite = null;
        this.sg = init_sceneGraph;
    }

    public getSprite() : AnimatedSprite {
        return this.sprite;
    }

    public setSprite(newSprite : AnimatedSprite) : void {
        this.sprite = newSprite;
    }

    public moveUp() : void {
        if(this.getSprite().getPosition().getY() - 1 < 0){ return; }
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() - 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveDown() : void {

        let world : TiledLayer[] = this.sg.getTiledLayers();
        let worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight();
        if(this.getSprite().getPosition().getY() + 1 > worldHeight){ return; }
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() + 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveLeft() : void {
        if(this.getSprite().getPosition().getX() - 1 < 0){ return; }
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX() - 1, 
                                                     this.getSprite().getPosition().getY(),
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveRight() : void {
        let world : TiledLayer[] = this.sg.getTiledLayers();
        let worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
        if(this.getSprite().getPosition().getX() + 1 > worldWidth){ return; }
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX() + 1, 
                                                     this.getSprite().getPosition().getY(),
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public backUp() {
        this.back_up = true;
    }

    public backDown() {
        this.back_down = true;
    }

    public backLeft() {
        this.back_left = true;
    }

    public backRight() {
        this.back_right = true;
    }

    public stopBackUp() {
        this.back_up = false;
    }

    public stopBackDown() {
        this.back_down = false;
    }

    public stopBackLeft() {
        this.back_left = false;
    }

    public stopBackRight() {
        this.back_right = false;
    }

    public getBackUp() : boolean {
        return this.back_up;
    }

    public getBackDown() : boolean {
        return this.back_down;
    }

    public getBackLeft() : boolean {
        return this.back_left;
    }

    public getBackRight() : boolean {
        return this.back_right;
    }

    public isBacking() : boolean {
        return this.back_up || this.back_down || this.back_left || this.back_right;
    }

    public abstract update() : void;
}