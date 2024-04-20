import { SceneCreator } from './sceneCreator'
import { SceneObjects } from './sceneObjects'

export class SceneMediator {

    static get scene() {
        return SceneCreator.scene
    }

    static get SceneCreator() {
        return SceneCreator
    }

    static get SceneObjects() {
        return SceneObjects
    }
}