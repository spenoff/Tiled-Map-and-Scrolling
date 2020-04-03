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

    public moveUp() : void {
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() + 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveDown() : void {
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() - 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveLeft() : void {
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX() - 1, 
                                                     this.getSprite().getPosition().getY(),
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public moveRight() : void {
        this.getSprite().getPosition().set(this.getSprite().getPosition().getX() + 1, 
                                                     this.getSprite().getPosition().getY(),
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
    }

    public abstract update() : void;
}