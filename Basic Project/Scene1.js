class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
  
	preload(){
		this.load.image("level","Assets/level.png")
		
		
		this.load.image("player", "Assets/unit.png");
		this.load.image("enemy", "Assets/EnemyBasic.png")
	}

	create() {
		this.add.text(20, 20, "Loading game...", {font: "25px Arial", fill: "yellow"});
		this.scene.start("PlayScene");
	}
  
  
  
}