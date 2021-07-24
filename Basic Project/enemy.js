class Scene {
    enemyCreate(x, y, id) {
      const enemy = this.add.sprite(x, y, 'enemy');
      Object.assign(enemy, { baseSpeed: 4, addedSpeed: 1, name: 'enemy', id: id });
      return enemy;
    }
  
    create() {
      const numerOfEnemies = 50
      let enemies = []
      for(let i=0;i<numerOfEnemies;i++){
          const enemy = this.enemyCreate(0, 0, i);
          enemies.push(enemy)
      }
    }
  }