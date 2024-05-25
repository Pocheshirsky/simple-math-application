import * as THREE from 'three'
import { SceneMediator } from './sceneMediator';
import { SceneCreator } from './sceneCreator'

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
        const color = cfg.color ?? 0x000000

        const geometry = new THREE.CircleGeometry( 0.03, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: color } ); 
        const circle = new THREE.Mesh( geometry, material ); 

        
        circle.position.x = position[0]
        circle.position.y = position[1]

        this.#_scene?.add( circle )
        circle.name = circle.uuid
        return circle
    }

    static updatePoint(point, position) {
        this.removePoint(point)

        let newPoint = this.createPoint({ position: position, color: 0x993333 })
        return newPoint
    }

    static removePoint(point) {
        let obj = this.#_scene.getObjectByName(point.uuid)
        this.#_scene.remove( obj );
    }

    /**Создает линия на сцене
     * 
     * @param {Object} cfg Конфиг
     * @param {Object} cfg.linearEquation Параметры a и b уравнения прямой y = ax + b, 
     */
    static createLine(cfg = {}) {
        const a = cfg.linearEquation.a
        const b = cfg.linearEquation.b

        const x1 = 0;
        const x2 = 1;

        const y1 = a * x1 + b
        const y2 = a * x2 + b

        const posA = new THREE.Vector2(x1, y1)
        const posB = new THREE.Vector2(x2, y2)

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([posA, posB]);
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

        const line = new THREE.Line( lineGeometry, material );
        
        SceneCreator.scene.add( line );
    }

    static removeObject3D(object3D) {
        if (!(object3D instanceof THREE.Object3D)) return false;
    
        // for better memory management and performance
        if (object3D.geometry) object3D.geometry.dispose();
    
        if (object3D.material) {
            if (object3D.material instanceof Array) {
                // for better memory management and performance
                object3D.material.forEach(material => material.dispose());
            } else {
                // for better memory management and performance
                object3D.material.dispose();
            }
        }
        object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
        return true;
    }
}