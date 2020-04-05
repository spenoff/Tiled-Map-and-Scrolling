import {SceneGraph} from '../scene/SceneGraph'
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import { MainCharacterBehavior } from '../ai/MainCharacterBehavior';

export class GamePhysics {
    constructor() {

    }

    update(sceneGraph : SceneGraph) : void {
        // UPDATE ALL OBJECT POSITIONS ACCORDING TO THEIR VELOCITIES
        // BUT MAKE SURE TO PERFORM COLLISION DETECTION AS WELL
        // NOTE, FOR THIS YOU SHOULD MAKE SURE EACH SCENE OBJECT
        // HAS A BOUNDING VOLUME LIKE EITHER AN AABB OR A CIRCLE

        //Collision detection
        let main_character : AnimatedSprite = sceneGraph.getMainCharacter();
        let main_character_radius = Math.pow(Math.pow(main_character.getSpriteType().getSpriteWidth()/3, 2) + Math.pow(main_character.getSpriteType().getSpriteHeight()/3, 2), 0.5);
        for(let sprite of <Array<AnimatedSprite>>sceneGraph.scope()) {
            if(main_character != null && sprite.getTypeName() != "MAIN_BUG"){
                //distance = ((x2-x1)^2 + (y2-y1)^2)^0.5
                let distance = Math.sqrt((Math.pow(((main_character.getPosition().getX() + sceneGraph.getViewport().getX()) - (sprite.getPosition().getX() + sceneGraph.getViewport().getX())), 2)
                 + Math.pow(((main_character.getPosition().getY() + sceneGraph.getViewport().getY()) - (sprite.getPosition().getY() + sceneGraph.getViewport().getY())), 2)));
                let sprite_radius = Math.pow(Math.pow(sprite.getSpriteType().getSpriteWidth()/9, 2) + Math.pow(sprite.getSpriteType().getSpriteHeight()/9, 2), 0.5);
                if(distance <= (main_character_radius + sprite_radius)){
                    //We have a collision
                    if(sprite.getTypeName() == "BUG_ONE" && sprite.getState() != "DYING" && sprite.getState() != "DEAD"){
                        sprite.setState("DYING");
                    } else if(sprite.getTypeName() == "BUG_TWO") {
                        // let to_the_left : boolean = false;
                        // let to_the_right : boolean = false;
                        // let above : boolean = false;
                        // let below : boolean = false;

                        if(main_character.getPosition().getX() < sprite.getPosition().getX()) {
                            main_character.getBehavior().backLeft();
                        } else if(main_character.getPosition().getX() > sprite.getPosition().getX()) {
                            main_character.getBehavior().backRight();
                        }

                        if(main_character.getPosition().getY() < sprite.getPosition().getY()) {
                            main_character.getBehavior().backUp();
                        } else if(main_character.getPosition().getY() > sprite.getPosition().getY()) {
                            main_character.getBehavior().backDown();
                        }


                    }
                }
            }
        }
    }
}