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
        this.removeSceneObj(point)

        let newPoint = this.createPoint({ position: position, color: 0x993333 })
        return newPoint
    }

    static removeSceneObj(object) {
        let obj = this.#_scene.getObjectByName(object.uuid)
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
        const isNan = cfg.linearEquation.isNan
        const isInfinity = cfg.linearEquation.isInfinity
        const x = cfg.linearEquation.x

        let x1 = 0
        let x2 = 0
        let y1 = 0
        let y2 = 0

        if (isNan || isInfinity) {
            x1 = x
            x2 = x
            y1 = 0
            y2 = 1
        }
        else {
            x1 = 0
            x2 = 1
            y1 = a * x1 + b
            y2 = a * x2 + b
        }

        const posA = new THREE.Vector2(x1, y1)
        const posB = new THREE.Vector2(x2, y2)

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([posA, posB]);
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

        const line = new THREE.Line( lineGeometry, material );
        
        SceneCreator.scene.add( line );
        line.name = line.uuid

        return line
    }

    static updateLine(line, linearEquation) {
        this.removeSceneObj(line)

        let newLine = this.createLine({ linearEquation: linearEquation })
        return newLine
    }
}