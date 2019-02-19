import Enemy from "./enemy";

export default class EnemyManager {

  constructor() {
    this.enabled = false;
    this.enemyPool = [];
    this.spawnedEnemies = {};
    this.nextEnemyId = 0;
    this.level = 0;

    this.maxSpawnCount = 1;
    this.minSpawnTime = 5;
    this.update = this.update.bind(this);
  }
  
  start() {
    
    this.enabled = true;
    this.nextSpawnTime = game.clock.elapsedTime;
    this.level = 0;
    this.maxSpawnCount = 1;
    this.minSpawnTime = 5;
    this.update();
  }
    
  stop() {
    this.enabled = false;
    this.despawnAll();
  }

  spawn() {
    let enemy;
    const pos = new THREE.Vector3(Math.random() * 300 - 150, 1000, -Math.random() * 1000);

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

  checkLevel() {
    const time = game.clock.elapsedTime;

    if (this.level === 0 && time > 20) {
      this.level++;
      this.maxSpawnCount++;
    }
    else if (this.level === 1 && time > 50) {
      this.level++;
      this.maxSpawnCount++;
    }
    else if (this.level === 2 && time > 80) {
      this.level++;
      this.maxSpawnCount++;
    }
    else if (this.level === 3 && time > 110) {
      this.level++;
      this.minSpawnTime = 4;
    }
  }


  update() {

    requestAnimationFrame(this.update);

    if (!this.enabled) return;

    const spawnCount = Object.keys(this.spawnedEnemies).length;
    
    if (spawnCount >= this.maxSpawnCount) {
      this.nextSpawnTime = game.clock.elapsedTime + 1;
      return;
    }
    if (game.clock.elapsedTime > this.nextSpawnTime) {
      this.nextSpawnTime = game.clock.elapsedTime + this.minSpawnTime;
      this.spawn();
    }

    this.checkLevel();
  }
}