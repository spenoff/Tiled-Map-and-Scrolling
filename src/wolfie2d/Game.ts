/*
 * Game is the focal point of the application, it has 4 subsystems,
 * the resource manager, the scene graph, the rendering system, and
 * the UI controller. In addition it serves as the game loop, providing
 * both an update and draw function that is called on a schedule.
 */
import {GameLoopTemplate} from './loop/GameLoopTemplate'
import {WebGLGameRenderingSystem} from './rendering/WebGLGameRenderingSystem'
import {SceneGraph} from './scene/SceneGraph'
import {AnimatedSprite} from './scene/sprite/AnimatedSprite'
import {TiledLayer} from './scene/tiles/TiledLayer'
import {ResourceManager} from './files/ResourceManager'
import {UIController} from './ui/UIController'
import {Viewport} from './scene/Viewport'
import {GamePhysics} from './physics/GamePhysics'
import {TextToRender, TextRenderer} from '../wolfie2d/rendering/TextRenderer'

export class Game extends GameLoopTemplate {
    private resourceManager : ResourceManager;
    private sceneGraph : SceneGraph;
    private renderingSystem : WebGLGameRenderingSystem;
    private uiController : UIController;
    private gamePhysics : GamePhysics;
    

    public constructor(gameCanvasId : string, textCanvasId : string) {
        super();
        this.resourceManager= new ResourceManager();
        this.sceneGraph= new SceneGraph();
        this.renderingSystem= new WebGLGameRenderingSystem(gameCanvasId, textCanvasId);
        this.uiController = new UIController(gameCanvasId, this.sceneGraph);
        this.gamePhysics = new GamePhysics();

        // MAKE SURE THE SCENE GRAPH' S VIEWPORT IS PROPERLY SETUP
        let viewportWidth : number = (<HTMLCanvasElement>document.getElementById(gameCanvasId)).width;
        let viewportHeight : number = (<HTMLCanvasElement>document.getElementById(gameCanvasId)).height;
        let viewport : Viewport = new Viewport(viewportWidth, viewportHeight);
        this.sceneGraph.setViewport(viewport);
    }

    public getRenderingSystem() : WebGLGameRenderingSystem {
        return this.renderingSystem;
    }

    public getResourceManager() : ResourceManager {
        return this.resourceManager;
    }

    public getSceneGraph() : SceneGraph {
        return this.sceneGraph;
    }

    public begin() : void {
    }

    /*
     * This draws the game. Note that we are not currently using the 
     * interpolation value, but could once physics is involved.
     */
    public draw(interpolationPercentage : number) : void {
        // GET THE TILED LAYERS TO RENDER FROM THE SCENE GRAPH
        let visibleLayers : Array<TiledLayer>;
        visibleLayers = this.sceneGraph.getTiledLayers();

        // GET THE VISIBLE SET FROM THE SCENE GRAPH
        let visibleSprites : Array<AnimatedSprite>;
        visibleSprites = <Array<AnimatedSprite>>this.sceneGraph.scope();

        let viewport : Viewport = this.sceneGraph.getViewport();

        // RENDER THE VISIBLE SET, WHICH SHOULD ALL BE RENDERABLE
        this.renderingSystem.render(viewport, visibleLayers, visibleSprites);
    }

    /**
     * Updates the scene.
     */
    public update(delta : number) : void {
        this.sceneGraph.update(delta);
        this.gamePhysics.update(this.sceneGraph);
        let enemy_sprites : Array<AnimatedSprite> = [];
        for(let sprite of this.sceneGraph.getAnimatedSprites()) {
            if(sprite.getTypeName() == "BUG_ONE") {
                enemy_sprites.push(sprite);
            }
        }
        if(Game.is_won(enemy_sprites)) {
            let textRenderer = this.getRenderingSystem().getTextRenderer();
            let win_text : TextToRender = new TextToRender("Win Message", "", 494, 349, function() {
                win_text.text = "You Win!!!!";
            });
            win_text.fontSize = 9000;
            console.log("win");
            textRenderer.addTextToRender(win_text);
            this.getRenderingSystem().getTextRenderer().render();
        }
    }
    
    /**
     * Updates the FPS counter.
     */
    public end(fps : number, panic : boolean) : void {
        if (panic) {
            var discardedTime = Math.round(this.resetFrameDelta());
            console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
        }
    }

    static is_won(enemy_sprites : Array<AnimatedSprite>) : boolean {
        for(let sprite of enemy_sprites) {
            if(sprite.getState() != "DEAD") {
                return false;
            }
        }
        return true;
    }
}