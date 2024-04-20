import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class SceneCreator {

    static #_scene = null

    static initScene(canvasContainer) {

        // Инициализация сцены
        const leftPanelWidth = document.getElementById('leftPanel').offsetWidth
        const width = window.innerWidth - leftPanelWidth
        const height = canvasContainer.offsetHeight
  
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera( 75, width / height, 0.001, 1000 );
        console.log(document.getElementById('threeCanvas'))
        const renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('threeCanvas'),
          antialias: true
        });
        renderer.setSize( width, height );
  
        // Создание белого фона
        scene.background = new THREE.Color(0xffffff);
  
        // Создание серой сетки
        const grayGridMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
        const grayGridGeometry = new THREE.BufferGeometry();
        const grayGridVertices = [];
  
        const gridSize = 10;
        const gridSpacing = 0.001;
        for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
          grayGridVertices.push(-gridSize, i, 0);
          grayGridVertices.push(gridSize, i, 0);
          grayGridVertices.push(i, -gridSize, 0);
          grayGridVertices.push(i, gridSize, 0);
        }
        grayGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grayGridVertices, 3));
        const grayGrid = new THREE.LineSegments(grayGridGeometry, grayGridMaterial);
        scene.add(grayGrid);
  
        // Создание оранжевой сетки с клетками большего размера
        const orangeGridMaterial = new THREE.LineBasicMaterial({ color: 0xffa500 });
        const orangeGridGeometry = new THREE.BufferGeometry();
        const orangeGridVertices = [];
  
        const orangeGridSize = 10; // 5 раз больше, чем серая сетка
        const orangeGridSpacing = 0.005; // 5 раз больше, чем серая сетка
        for (let i = -orangeGridSize; i <= orangeGridSize; i += orangeGridSpacing) {
          orangeGridVertices.push(-orangeGridSize, i, 0);
          orangeGridVertices.push(orangeGridSize, i, 0);
          orangeGridVertices.push(i, -orangeGridSize, 0);
          orangeGridVertices.push(i, orangeGridSize, 0);
        }
        orangeGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orangeGridVertices, 3));
        const orangeGrid = new THREE.LineSegments(orangeGridGeometry, orangeGridMaterial);
        scene.add(orangeGrid);
  
        // Стартовая позиция камеры
        camera.position.z = 0.05;
        
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.zoomToCursor = true
        controls.enableRotate = false;
        controls.update();

        // Основной цикл анимации
        function animate() {
          requestAnimationFrame( animate );
          controls.update();
          renderer.render( scene, camera );
        }
  
        animate();

        this.#_scene = scene
    }

    static get scene() {
        return this.#_scene
    }
}