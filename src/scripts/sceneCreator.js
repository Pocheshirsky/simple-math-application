import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class SceneCreator {
  static #_scene = null;
  // static #_controls = null
  // static #_renderer = null
  static #_camera = null

  static #_lastZ = 0

  static #_onMouseWheelListener = null

  static get scene() {
    return this.#_scene;
  }

  static initScene(canvasContainer) {
    // Инициализация сцены
    const leftPanelWidth = document.getElementById("leftPanel").offsetWidth;
    const width = window.innerWidth - leftPanelWidth;
    const height = canvasContainer.offsetHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.0001,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("threeCanvas"),
      antialias: true,
    });
    renderer.setSize(width, height);

    // Создание белого фона
    scene.background = new THREE.Color(0xffffff);

    // Подписи осей координат

    // Стартовая позиция камеры
    camera.position.z = 2;
    this.#_lastZ = 2

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.zoomToCursor = true;
    controls.enableRotate = false;
    controls.update();

    // this.#_controls = controls;
    // this.#_renderer = renderer;
    this.#_camera = camera;

    // Основной цикл анимации
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    this.onZoom()

    this.#_scene = scene;
    this.createGrids()
  }

  static isNearZero(n) {
    return n <= 0.001 && n >= -0.001
  }

  static createGrids() {

    // Создание серой сетки
    const grayGridMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
    const grayGridGeometry = new THREE.BufferGeometry();
    const grayGridVertices = [];

    const gridSize = 10;
    const gridSpacing = 0.1;
    for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
      
      grayGridVertices.push(-gridSize, i, 0);
      grayGridVertices.push(gridSize, i, 0);
      grayGridVertices.push(i, -gridSize, 0);
      grayGridVertices.push(i, gridSize, 0);
      
    }
    grayGridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(grayGridVertices, 3)
    );
    const grayGrid = new THREE.LineSegments(grayGridGeometry, grayGridMaterial);
    grayGrid.name = grayGrid.uuid
    this.#_scene.add(grayGrid);
    
    // Создание оранжевой сетки с клетками большего размера
    const orangeGridMaterial = new THREE.LineBasicMaterial({ color: 0xffa500 });
    const orangeGridGeometry = new THREE.BufferGeometry();
    const orangeGridVertices = [];

    const orangeGridSize = 10; // 5 раз больше, чем серая сетка
    const orangeGridSpacing = 0.5; // 5 раз больше, чем серая сетка
    for (let i = -orangeGridSize; i <= orangeGridSize; i += orangeGridSpacing) {
      
      orangeGridVertices.push(-orangeGridSize, i, 0);
      orangeGridVertices.push(orangeGridSize, i, 0);
      orangeGridVertices.push(i, -orangeGridSize, 0);
      orangeGridVertices.push(i, orangeGridSize, 0);
      
    }
    orangeGridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(orangeGridVertices, 3)
    );
    const orangeGrid = new THREE.LineSegments( orangeGridGeometry, orangeGridMaterial );
    orangeGrid.name = orangeGrid.uuid
    this.#_scene.add(orangeGrid);

    // Создание черных осей координат
    const blackAxisMaterial = new THREE.LineBasicMaterial({ color: 0x707070 });
    const blackAxisGeometry = new THREE.BufferGeometry();
    const blackAxisVertices = [];

    blackAxisVertices.push(-10, 0, 0)
    blackAxisVertices.push(10, 0, 0)
    blackAxisVertices.push(0, -10, 0)
    blackAxisVertices.push(0, 10, 0)

    blackAxisGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(blackAxisVertices, 3)
    );

    const blackAxis = new THREE.LineSegments(blackAxisGeometry, blackAxisMaterial);
    blackAxis.name = blackAxis.uuid
    this.#_scene.add(blackAxis);
  }

  static onZoom() {
    document.addEventListener("wheel", this.#_onMouseWheelListener = (wheel) => {
      let z = this.#_camera.position.z
      console.log(z)
      if (this.#_lastZ == z) return
      this.#_lastZ = z

      // console.log(z)
      // console.log(wheel)

      // Вперед -deltaY
      // Назад +deltaY

      // let wheelCount = 0
      // if (wheel.deltaY < 0) { wheelCount-- }
      // else {  wheelCount++ }
      
      // if (wheelCount == 4) {
      //   // Перерисуй сцену с увеличенным масштабом
      //   wheelCount = 0
      // }
      // if (wheelCount == -4) {
      //   // Перерисуй сцену с уменьшенным масштабом
      //   wheelCount = 0
      // }
    })
  }

  static offZoom() {
    document.removeEventListener("wheel", this.#_onMouseWheelListener)
  }
}
