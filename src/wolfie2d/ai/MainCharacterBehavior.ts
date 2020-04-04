import { SpriteBehavior } from "./SpriteBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";
import { SceneGraph } from "../scene/SceneGraph";

export class MainCharacterBehavior extends SpriteBehavior{

    constructor(init_sceneGraph : SceneGraph) {
        super(init_sceneGraph);
    }

    public update() : void {

    }
}