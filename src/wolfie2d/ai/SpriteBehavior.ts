import { AnimatedSprite } from "../scene/sprite/AnimatedSprite"

export abstract class SpriteBehavior {
    private sprite : AnimatedSprite;

    public constructor() {
        this.sprite = null;
    }

    public getSprite() : AnimatedSprite {
        return this.sprite;
    }

    public setSprite(newSprite : AnimatedSprite) : void {
        this.sprite = newSprite;
    }

    public abstract update() : void;
}