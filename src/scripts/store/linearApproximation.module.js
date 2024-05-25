import { defineStore } from "pinia";
import { SceneObjects } from "../sceneObjects";
import { LinearApprox } from "../linearApprox";

export const useLinearApproximationStore = defineStore("linearApproximation", {
  state: () => {
    return {
      points: [{ id: 1, value: [0, 0], mesh: null }],
      currentLastId: 1,
      lineMesh: null
    };
  },

  actions: {

    /**Добавляет точку в массив точек линейной аппроксимации
     * @param {Object} point 
     * @param {Array<Number>} point.value Позиция точки в формате [x, y]
     * @param {Number} point.id Идентификатор точки в массиве. Если не указан, создает id на 1 больше последнего
     */
    addPoint(point) {
      point.id = this.currentLastId + 1
      point.mesh = SceneObjects.createPoint({ position: [0, 0], color: 0x993333 })
      this.points.push(point)
      this.currentLastId++

      if (this.points.length == 2 && this.lineMesh == null) {
        this.lineMesh = LinearApprox.createLinearApprox(this.points)
      }
    },

    /**Удаляет элемент из массива по его индексу
     * @param {Number} index
     */
    deletePointByIndex(index) {
      SceneObjects.removeSceneObj(this.points[index].mesh)
      this.points.splice(index, 1)

      if (this.points.length < 2 && this.lineMesh != null) {
        SceneObjects.removeSceneObj(this.lineMesh)
        this.lineMesh = null
      }
      else if (this.lineMesh != null) {
        this.lineMesh = LinearApprox.updateLinearApprox(this.points, this.lineMesh)
      }
    },

    /**Задает значение точки по ее индексу
     * 
     * @param {Number} index Индекс точки в массиве
     * @param {Array<Number>} value Позиция точки в формате [x, y]
     */
    setPointByIndex(index, value) {
      let id = this.points[index].id
      let mesh = this.points[index].mesh
      let normedValue = [value[0], value[1] / LinearApprox.NORMALIZATION_VALUE]
      
      if (Number.isFinite(value[0]) && Number.isFinite(value[1])) {
        mesh = SceneObjects.updatePoint(mesh, normedValue)
      }

      this.points[index] = {
        id: id,
        value: value,
        mesh: mesh
      }

      if (this.points.length >= 2 && this.lineMesh != null) {
        this.lineMesh = LinearApprox.updateLinearApprox(this.points, this.lineMesh)
      }
    },
  },
});
