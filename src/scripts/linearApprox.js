import { SceneMediator } from "./sceneMediator"

export class LinearApprox{

    static NORMALIZATION_VALUE = 100

    static #_computeLinearApprox(points){
        let sumOfProductsXY = 0
        let sumOfProductsXX = 0
        let sumX = 0 
        let sumY = 0 
        let a = 0
        let b = 0
        let isNan = false
        let isInfinity = false
        let x = null
        
        for (let i = 0; i < points.length; i++){
            sumOfProductsXY += points[i].value[0] * points[i].value[1]
            sumX += points[i].value[0]
            sumY += points[i].value[1]
            sumOfProductsXX += points[i].value[0] * points[i].value[0]
        }
        a = ((points.length * sumOfProductsXY - sumX * sumY ) / (points.length * sumOfProductsXX - sumX * sumX))
        b = ((sumY - a * sumX) / points.length)

        if (isNaN(a)) {
            isNan = true
            x = points[0].value[0]
        }
        else if (a == Infinity) {
            isInfinity = true
            x = points[0].value[0]
        }

        return {
            isNan: isNan,
            isInfinity: isInfinity,
            a: a, 
            b: b,
            x: x
        }
    }

    static createLinearApprox(points) {
        
        let normalizedPoints = []
        points.forEach(element => {
            normalizedPoints.push({ value: [element.value[0], element.value[1] / this.NORMALIZATION_VALUE] })
        });
        
        const linearEquation = this.#_computeLinearApprox(normalizedPoints)

        return SceneMediator.SceneObjects.createLine({ linearEquation: linearEquation })
    }

    static updateLinearApprox(points, oldLine) {
        let normalizedPoints = []
        points.forEach(element => {
            normalizedPoints.push({ value: [element.value[0], element.value[1] / this.NORMALIZATION_VALUE] })
        });
        const linearEquation = this.#_computeLinearApprox(normalizedPoints)

        return SceneMediator.SceneObjects.updateLine(oldLine, linearEquation)
    }
}
