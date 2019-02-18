import Enemy from "./enemy";

export default class EnemyManager {

  constructor() {
    this.enabled = false;
    this.enemyPool = [];
    this.spawnedEnemies = {};
    this.nextEnemyId = 0;

    this.maxSpawnCount = 4;
    this.minSpawnTime = 5;
    this.update = this.update.bind(this);
  }
  
  start() {
    
    this.enabled = true;
    this.nextSpawnTime = game.clock.elapsedTime;
    this.update();
    
    // this.timer = setInterval(() => {
      //   const pos = new THREE.Vector3(Math.random() * 300 - 150, 25, -Math.random() * 1000);
      //   this.spawn(pos);
      // }, 5000);
    }
    
  stop() {
      // clearInterval(this.timer);
    this.enabled = false;
    this.despawnAll();
  }

  spawn() {
    let enemy;
    const pos = new THREE.Vector3(Math.random() * 300 - 150, 25, -Math.random() * 1000);

    if (this.enemyPool.length === 0) {
      enemy = new Enemy(this.nextEnemyId);
      this.nextEnemyId += 1;
    }
    else {
      enemy = this.enemyPool.pop();
    }

    enemy.enable();
    enemy.setPosition(pos);
    this.spawnedEnemies[enemy.id] = enemy;
  }

  despawn(id) {
    const enemy = this.spawnedEnemies[id];
    enemy.disable();
    this.enemyPool.push(enemy);
    delete this.spawnedEnemies[id];
  }

  despawnAll() {
    Object.keys(this.spawnedEnemies).forEach(id => {
      this.despawn(id);
    });
  }


  update() {

    requestAnimationFrame(this.update);

    if (!this.enabled) return;

    const spawnCount = this.spawnedEnemies.length;
    if (spawnCount >= this.maxSpawnCount) return;
    
    if (game.clock.elapsedTime > this.nextSpawnTime) {
      this.nextSpawnTime = game.clock.elapsedTime + this.minSpawnTime;
      this.spawn();
    }
  }
}