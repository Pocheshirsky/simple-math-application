import { defineStore } from "pinia";

export const useLinearApproximationStore = defineStore("linearApproximation", {
  state: () => {
    return {
      pointsArray: [ { id: 1, value: [0, 0] } ],
      currentLastId: 1
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
      this.pointsArray.push(point)
      this.currentLastId++
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
      let id = this.pointsArray[index].id
      this.pointsArray[index] = {
        id: id,
        value: value 
      }
    },
  },
});
