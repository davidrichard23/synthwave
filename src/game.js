import Player from './player';
import Environment from './environment';
import Enemy from './enemy';


export default class Game {

  constructor() {
    this.clock = new THREE.Clock();
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(canvas);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.lookAt(0, -1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    
    bloomPass.renderToScreen = true;
    bloomPass.threshold = 0;
    bloomPass.strength = 1.3;
    bloomPass.radius = 1;
    
    this.composer = new THREE.EffectComposer(renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);
    

    window.player = new Player(scene, canvas, camera);
    const enemy = new Enemy(scene, canvas);
    const environment = new Environment(scene);
    

    this.update = this.update.bind(this);
    this.update();
  }


  update() {
    requestAnimationFrame(this.update);

    stats.begin();

    this.composer.render(this.clock.getDelta());

    stats.end();
  }
}