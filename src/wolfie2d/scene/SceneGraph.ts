import {SceneObject} from './SceneObject'
import {AnimatedSprite} from './sprite/AnimatedSprite'
import {TiledLayer} from './tiles/TiledLayer'
import {TileSet} from './tiles/TileSet'
import {Viewport} from './Viewport';

export class SceneGraph {
    // AND ALL OF THE ANIMATED SPRITES, WHICH ARE NOT STORED
    // SORTED OR IN ANY PARTICULAR ORDER. NOTE THAT ANIMATED SPRITES
    // ARE SCENE OBJECTS
    private animatedSprites : Array<AnimatedSprite>;

    // SET OF VISIBLE OBJECTS, NOTE THAT AT THE MOMENT OUR
    // SCENE GRAPH IS QUITE SIMPLE, SO THIS IS THE SAME AS
    // OUR LIST OF ANIMATED SPRITES
    private visibleSet : Array<SceneObject>;
    private mainCharacter : AnimatedSprite;

    // WE ARE ALSO USING A TILING ENGINE FOR RENDERING OUR LEVEL
    // NOTE THAT WE MANAGE THIS HERE BECAUSE WE MAY INVOLVE THE TILED
    // LAYERS IN PHYSICS AND PATHFINDING AS WELL
    private tiledLayers : Array<TiledLayer>;
    private tileSets : Array<TileSet>;

    // THE VIEWPORT IS USED TO FILTER OUT WHAT IS NOT VISIBLE
    private viewport : Viewport;

    //THESE VARIABLES WILL BE USED TO MOVE THE VIEWPORT
    static moveUp : boolean;
    static moveDown : boolean;
    static moveLeft : boolean;
    static moveRight : boolean;
    private upPos : number;
    private downPos : number;
    private leftPos : number;
    private rightPos : number;

    public constructor() {
        // DEFAULT CONSTRUCTOR INITIALIZES OUR DATA STRUCTURES
        this.clear();
    }

    public clear() : void {
        this.animatedSprites = [];
        this.visibleSet = [];
        this.tiledLayers = [];
        this.tileSets = [];
        this.upPos = 0;
        this.downPos = 0;
        this.leftPos = 0;
        this.rightPos = 0;
        //this.mainCharacter = null;
    }

    public addTileSet(tileSetToAdd : TileSet) : number {
        return this.tileSets.push(tileSetToAdd) - 1;
    }

    public getNumTileSets() : number {
        return this.tileSets.length;
    }

    public getTileSet(index : number) : TileSet {
        return this.tileSets[index];
    }

    public addLayer(layerToAdd : TiledLayer) : void {
        this.tiledLayers.push(layerToAdd);
    }

    public getNumTiledLayers() : number {
        return this.tiledLayers.length;
    }

    public getTiledLayers() : Array<TiledLayer> {
        return this.tiledLayers;
    }

    public getTiledLayer(layerIndex : number) : TiledLayer {
        return this.tiledLayers[layerIndex];
    }

    public getNumSprites() : number {
        return this.animatedSprites.length;
    }

    public setViewport(initViewport : Viewport) : void {
        this.viewport = initViewport;
    }

    public getViewport() : Viewport { 
        return this.viewport;
    }

    public addAnimatedSprite(sprite : AnimatedSprite) : void {
        this.animatedSprites.push(sprite);
    }

    public getAnimatedSprites() : Array<AnimatedSprite> {
        return this.animatedSprites;
    }

    public setMainCharacter(sprite : AnimatedSprite) : void {
        this.mainCharacter = sprite;
    }

    public getMainCharacter() : AnimatedSprite {
        return this.mainCharacter;
    }

    public getSpriteAt(testX : number, testY : number) : AnimatedSprite {
        for (let sprite of this.animatedSprites) {
            if (sprite.contains(testX, testY))
                return sprite;
        }
        return null;
    }

    public static setMoveUp(b : boolean){
        this.moveUp = b;
    }

    public static setMoveDown(b : boolean){
        this.moveDown = b;
    }

    public static setMoveLeft(b : boolean){
        this.moveLeft = b;
    }

    public static setMoveRight(b : boolean){
        this.moveRight = b;
    }

    /**
     * update
     * 
     * Called once per frame, this function updates the state of all the objects
     * in the scene.
     * 
     * @param delta The time that has passed since the last time this update
     * funcation was called.
     */
    public update(delta : number) : void {
        for (let sprite of this.animatedSprites) {
            sprite.update(delta);
        }
        if(SceneGraph.moveUp){
            this.upPos += 1;
        }
        if(SceneGraph.moveDown){
            this.downPos += 1;
        }
        if(SceneGraph.moveLeft){
            this.leftPos += 1;
        }
        if(SceneGraph.moveRight){
            this.rightPos += 1;
        }
        this.viewport.setPosition((this.leftPos - this.rightPos), (this.downPos - this.upPos));
    }

    public scope() : Array<SceneObject> {
        // CLEAR OUT THE OLD
        this.visibleSet = [];

        // PUT ALL THE SCENE OBJECTS INTO THE VISIBLE SET
        for (let sprite of this.animatedSprites) {
            let spriteType = sprite.getSpriteType();
            let spriteWidth : number = spriteType.getSpriteWidth();
            let spriteHeight : number = spriteType.getSpriteHeight();
            let spriteXInPixels : number = sprite.getPosition().getX() + (spriteWidth) + this.viewport.getX();
            let spriteYInPixels : number = sprite.getPosition().getY() + (spriteHeight) + this.viewport.getY();
            if(spriteXInPixels > 0 && spriteXInPixels < (this.viewport.getWidth() + spriteWidth)
             && (spriteYInPixels > 0 && spriteYInPixels < (this.viewport.getHeight() + spriteHeight))){
                this.visibleSet.push(sprite);
            }
        }

        return this.visibleSet;
    }
}