import { AnimatedSprite } from "../scene/sprite/AnimatedSprite"
import { SceneGraph } from "../scene/SceneGraph";
import { TiledLayer } from '../scene/tiles/TiledLayer'



export abstract class SpriteBehavior {
    private sprite : AnimatedSprite;
    private sg : SceneGraph;

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

    public abstract update() : void;
}