import * as THREE from 'three'
import { SceneMediator } from './sceneMediator';

export class SceneObjects {

    static get #_scene() {
        return SceneMediator.scene
    }

    /**Создает точку на сцене
     * 
     * @param {Object} cfg Конфиг
     * @param {Array<Number>} cfg.position Позиция точки в формате [x, y]
     */
    static createPoint(cfg = {}) {
        const position = cfg.position ?? [0, 0]
        const color = cfg.color ?? [0x000000]

        const geometry = new THREE.CircleGeometry( 0.0003, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: color } ); 
        const circle = new THREE.Mesh( geometry, material ); 


        circle.position.x = position[0]
        circle.position.y = position[1]

        this.#_scene.add( circle );
    }

}