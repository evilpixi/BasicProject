class PlayScene extends Phaser.Scene{
    constructor(){
        super("PlayScene")
    }
	// create function START
	create(){
		this.level = this.add.tileSprite(0,0,config.width,config.height,"level");
		this.level.setOrigin(0,0);
    //this.add.text(20, 20, "playing the game...",{font: "25px Arial", fill: "yellow"});
		this.playerCreate()
		let enemy1 = new Enemy(this, 100, 100)
		this.cursorKeys= this.input.keyboard.createCursorKeys();

	}
	// Create function End
	

	//* Update function START
	update(){
		this.playerFunctions();

	}
	//* Update function END

	debug(){
		console.log(this.player.width)
		console.log(this.enemy.height)
		console.log(Math.cos(this.player.rotation))
		console.log(Math.sin(this.player.rotation))

	}

	//* Player functions Start
	playerFunctions(){
		this.playerVelocityManager();
		this.playerRotationManager();
		this.playerMovement();
		this.boundaries();
	}


	playerVelocityManager(){
		let shortcut = this.cursorKeys
		if  (shortcut.down.isDown)
			{ this.player.addedSpeed=0.75 }

		else if (shortcut.up.isDown)
			{ this.player.addedSpeed=1.25 }


		else if (shortcut.space.isDown){
			this.debug()
		}
		else 
			{this.player.addedSpeed=1}
		}


	playerRotationManager(){
		let shortcut = this.cursorKeys

		if (shortcut.left.isDown && shortcut.right.isDown)
			{}

		else if (shortcut.left.isDown)
			{ this.player.rotation-= 0.15 }

		else if (shortcut.right.isDown)
			{ this.player.rotation+=0.15 }
	}	

	playerMovement(){
		this.player.x = this.player.x + Math.cos(this.player.rotation) * ( this.player.baseSpeed * this.player.addedSpeed );
		this.player.y = this.player.y + Math.sin(this.player.rotation) * ( this.player.baseSpeed * this.player.addedSpeed );
	}

	
	playerCreate(){
		this.player = this.add.sprite(config.width/2 -50, config.height/2 , "player");
		//this.player.name="player" ;
		Object.assign(this.player,{
			baseSpeed:5,
			addedSpeed:1,
			name:"player",
				
		});
	}
		//* Player functions END

		//TODO learn to make boundaries() work as a public function? 
		//TODO to not have a copy of it for the player and the enemies
		boundaries(){
			let checkH = Math.max(Math.abs((this.player.width/2) * Math.cos(this.player.rotation)),this.player.height/2)
			let checkV = Math.max(Math.abs((this.player.width/2) * Math.sin(this.player.rotation)),this.player.height/2)
	
			//top left corner
			if ( this.player.y -checkV < 0 && this.player.x -checkH < 0) {
				this.player.y = 1+ checkV,
				this.player.x = 1+ checkH,
				this.player.angle= this.player.angle * -1,
				this.player.angle= -1 * this.player.angle -180
			}
			//top right corner
			else if( this.player.y -checkV < 0 && this.player.x +checkH > config.width ){
				this.player.y = 1+ checkV ,	
				this.player.x = -1+ config.width -checkH ,
				this.player.angle= this.player.angle * -1,
				this.player.angle= -1 * this.player.angle -180
			}
			//bottom left corner
			else if (this.player.y +checkV > config.height && this.player.x -checkH < 0){
				this.player.y = -1+ config.height -checkV ,
				this.player.x = 1+ checkH ,
				this.player.angle= this.player.angle * -1 ,
				this.player.angle = -1 * this.player.angle -180
			}
			//bottom right corner
			else if (this.y +checkV > config.height && this.player.x +checkH > config.width ){
				this.player.y = -1+ config.height -checkV ,
				this.player.x = -1+ config.width -checkH ,
				this.player.angle= this.player.angle * -1 ,
				this.player.angle= -1 * this.player.angle -180
			}
			//top border
			else if ( this.player.y -checkV < 0 )
				{ this.player.y = 1+ checkV ,	
				this.player.angle= this.player.angle * -1 }
			//bottom border
			else if ( this.player.y + checkV > config.height )
				{ this.player.y = -1+ config.height -checkV ,
					this.player.angle= this.player.angle * -1}
			//left border
			else if ( this.player.x -checkH < 0 )
				{ this.player.x = 1+checkH	,
				this.player.angle = -1 * this.player.angle -180}
			//right border
			else if ( this.player.x +checkH > config.width )
				{ this.player.x = -1+config.width -checkH ,
					this.player.angle= -1 * this.player.angle -180}
		}

}//? end of PlayScene Class


//! Enemy Functions Start
class Enemy extends Phaser.GameObjects.Image {
	constructor(scene, x, y) {
		super(scene, x, y, "enemy") 
			scene.add.existing(this)
			this.baseSpeed=4,
			this.addedSpeed=1,
			this.life = 100
			
	}
		  
	preUpdate(time, delta) {
		super.update(time, delta)
		this.enemyBundle()
	}
			
		//? useful for later
		/*createEnemy(_numberOfEnemies) {
			const numerOfEnemies = _numberOfEnemies
			let enemies = []
			for(let i=0;i<numerOfEnemies;i++){
				const enemy = this.enemyCreate(250, 250, i);
				enemies.push(enemy)
			}
		}*/
		

	enemyBundle(){
		this.enemyMovement();
		this.enemyBoundaries();
				//this.enemyRotationManager(); 
	}


	//TODO learn how to access the information of player's position and update this function
	/*enemyRotationManager(){
		let rot = Phaser.Math.Angle.Between(this.x,this.y ,this.player.x, this.player.y)
		let dRot = (rot - this.rotation) *180/ Math.PI;

				//* izquierda
		if ((dRot < -5 && dRot > -175 ) || (dRot>185 && dRot< 355))
			{ this.rotation-= 0.15 }
	
				//* derecha			
		else if ((dRot < -185 && dRot > -355) || (dRot > 5 && dRot < 175))
			{ this.rotation+=0.15 }

		else 
			{} 
	}	*/
	
	enemyMovement(){
		this.x = this.x + Math.cos(this.rotation) * ( this.baseSpeed * this.addedSpeed );
		this.y = this.y + Math.sin(this.rotation) * ( this.baseSpeed * this.addedSpeed );

	}
	//! Enemy function END

		//? Global function START
		//TODO learn to make this.. global?
		enemyBoundaries(){
			let checkH = Math.max(Math.abs((this.width/2) * Math.cos(this.rotation)),this.height/2)
			let checkV = Math.max(Math.abs((this.width/2) * Math.sin(this.rotation)),this.height/2)
	
			//top left corner
			if ( this.y -checkV < 0 && this.x -checkH < 0) {
				this.y = 1+ checkV,
				this.x = 1+ checkH,
				this.angle= this.angle * -1,
				this.angle= -1 * this.angle -180
			}
			//top right corner
			else if( this.y -checkV < 0 && this.x +checkH > config.width ){
				this.y = 1+ checkV ,	
				this.x = -1+ config.width -checkH ,
				this.angle= this.angle * -1,
				this.angle= -1 * this.angle -180
			}
			//bottom left corner
			else if (this.y +checkV > config.height && this.x -checkH < 0){
				this.y = -1+ config.height -checkV ,
				this.x = 1+ checkH ,
				this.angle= this.angle * -1 ,
				this.angle = -1 * this.angle -180
			}
			//bottom right corner
			else if (this.y +checkV > config.height && this.x +checkH > config.width ){
				this.y = -1+ config.height -checkV ,
				this.x = -1+ config.width -checkH ,
				this.angle= this.angle * -1 ,
				this.angle= -1 * this.angle -180
			}
			//top border
			else if ( this.y -checkV < 0 )
				{ this.y = 1+ checkV ,	
				this.angle= this.angle * -1 }
			//bottom border
			else if ( this.y + checkV > config.height )
				{ this.y = -1+ config.height -checkV ,
					this.angle= this.angle * -1}
			//left border
			else if ( this.x -checkH < 0 )
				{ this.x = 1+checkH	,
				this.angle = -1 * this.angle -180}
			//right border
			else if ( this.x +checkH > config.width )
				{ this.x = -1+config.width -checkH ,
					this.angle= -1 * this.angle -180}
		}
		//? Global functions END
		
}	//! END of the Enemy class
//* end of the file

	