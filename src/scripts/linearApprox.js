import { SceneMediator } from "./sceneMediator"

const NORMALIZATION_VALUE = 100
export class LinearApprox{
    static #_computeLinearApprox(points){
        
        let sumOfProductsXY = 0
        let sumOfProductsXX = 0
        let sumX = 0 
        let sumY = 0 
        let a = 0
        let b = 0
        for (let i = 0;i < points.length;i++){
            sumOfProductsXY += points[i].value[0] * points[i].value[1]
            sumX += points[i].value[0]
            sumY += points[i].value[1]
            sumOfProductsXX += points[i].value[0] * points[i].value[0]
        }
        a = ((points.length * sumOfProductsXY - sumX * sumY ) / (points.length * sumOfProductsXX - sumX*sumX))
        b = ((sumY - a * sumX)/points.length)

        return {a: a, b: b}
    }

    static createLinearApprox(points) {
        let normalizedPoints = []
        points.forEach(element => {
            normalizedPoints.push({ value: [element.value[0], element.value[1] / NORMALIZATION_VALUE] })
        });
        const linearEquation = this.#_computeLinearApprox(normalizedPoints)

        SceneMediator.SceneObjects.createLine({ linearEquation: linearEquation })
    }
}
