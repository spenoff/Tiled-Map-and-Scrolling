import { SpriteBehavior } from "./SpriteBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";

export class BugOneBehavior extends SpriteBehavior{
    private current_direction : string;
    private frames_until_change : number;

    constructor() {
        super();
        this.current_direction = BugOneBehavior.random_direction();
        this.frames_until_change = BugOneBehavior.random_frame_num();
    }

    public update() : void {
        if(this.getSprite() == null) { return; }
        if(this.getSprite().getState() == "DYING" || this.getSprite().getState() == "DEAD"){ return; }
        switch(this.current_direction) {
            case "UP": this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() + 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
                                                     break;
            case "DOWN": this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() - 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
                                                     break;
            case "LEFT": this.getSprite().getPosition().set(this.getSprite().getPosition().getX() - 1, 
                                                     this.getSprite().getPosition().getY(),
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
                                                     break;
            case "RIGHT": this.getSprite().getPosition().set(this.getSprite().getPosition().getX(), 
                                                     this.getSprite().getPosition().getY() + 1,
                                                     this.getSprite().getPosition().getZ(),
                                                     this.getSprite().getPosition().getW());
                                                     break;
        }
        this.frames_until_change--;
        if(this.frames_until_change == 0){
            //TODO Make sure it doesn't leave the map
            this.current_direction = BugOneBehavior.random_direction();
            this.frames_until_change = BugOneBehavior.random_frame_num();
        }

    }

    static random_direction() : string {
        let dur_num = Math.floor(Math.random() * 3);
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