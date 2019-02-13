import Enemy from "./enemy";

export default class EnemyManager {

  constructor(game) {
    this.game = game;
    this.enemyPool = [];
    this.spawnedEnemies = [];
  }

  spawn(pos) {
    if (this.enemyPool.length === 0) {
      const enemy = new Enemy(this.game);
      enemy.enable();
      enemy.setPosition(pos);
      this.spawnedEnemies.push(enemy);
    }
  }
}