import Enemy from "./enemy";

export default class EnemyManager {

  constructor() {
    this.enemyPool = [];
    this.spawnedEnemies = {};
    this.nextEnemyId = 0;
  }
  
  start() {

    const pos = new THREE.Vector3(Math.random() * 300 - 150, 25, -Math.random() * 1000);
    this.spawn(pos);
    
    this.timer = setInterval(() => {
      const pos = new THREE.Vector3(Math.random() * 300 - 150, 25, -Math.random() * 1000);
      this.spawn(pos);
    }, 5000);
  }
  
  stop() {
    clearInterval(this.timer);
    this.despawnAll();
  }

  spawn(pos) {
    let enemy;

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
}