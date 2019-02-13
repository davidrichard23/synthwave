import Enemy from "./enemy";

export default class EnemyManager {

  constructor(game) {
    this.game = game;
    this.enemyPool = [];
    this.spawnedEnemies = {};
    this.nextEnemyId = 0;
  }

  spawn(pos) {
    let enemy;

    if (this.enemyPool.length === 0) {
      enemy = new Enemy(this.game);
      enemy.id = this.nextEnemyId;
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