import { defineStore } from "pinia";

export const useLinearApproximationStore = defineStore("linearApproximation", {
  state: () => {
    return {
      pointsArray: [ [0, 0] ],
    };
  },

  actions: {

    /**Добавляет точку в массив точек линейной аппроксимации
     * @param {Object} point 
     * @param {Array<Number>} point.value Позиция точки в формате [x, y]
     * @param {Number} point.index Индекс точки в массиве
     */
    addPoint(point) {
      this.pointsArray.push(point)
    },

    /**
     * Удаляет последний элемент массива
     */
    deleteLastPoint() {
      this.pointsArray.pop()
    },

    /**Удаляет элемент из массива по его индексу
     * @param {Number} index 
     */
    deletePointByIndex(index) {
      this.pointsArray.splice(index, 1)
    },

    /**Задает значение точки по ее индексу
     * 
     * @param {Number} index Индекс точки в массиве
     * @param {Array<Number>} value Позиция точки в формате [x, y]
     */
    setPointByIndex(index, value) {
      this.pointsArray[index] = value
    },
  },
});
