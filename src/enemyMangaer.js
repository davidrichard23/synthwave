import Enemy from "./enemy";

export default class EnemyManager {

  constructor(game) {
    this.game = game;
    this.enemyPool = [];
    this.spawnedEnemies = [];
  }

  spawn(pos) {
    let enemy;

    if (this.enemyPool.length === 0) {
      enemy = new Enemy(this.game);
    }
    else {
      enemy = this.enemyPool.pop();
    }

    enemy.enable();
    enemy.setPosition(pos);
    this.spawnedEnemies.push(enemy);
  }

  despawnAll() {
    this.spawnedEnemies.forEach(enemy => {
      enemy.disable();
      this.enemyPool.push(this.spawnedEnemies.shift());
    });
  }
}