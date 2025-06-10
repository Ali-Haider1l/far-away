export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('token', 'assets/token.png');
  }

  create() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '18px',
      fill: '#ffffff'
    });

    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 580, 'ground').setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tokens = this.physics.add.group();
    this.physics.add.overlap(this.player, this.tokens, this.collectToken, null, this);

    this.spawnToken();
    this.tokenTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnToken,
      callbackScope: this,
      loop: true
    });
  }

  update() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-300);
    }
  }

  spawnToken() {
    const x = Phaser.Math.Between(800, 1000);
    const y = Phaser.Math.Between(200, 500);
    const token = this.tokens.create(x, y, 'token');
    token.setVelocityX(-200);
    token.setCollideWorldBounds(false);
  }

  collectToken(player, token) {
    token.destroy();
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
  }
}
