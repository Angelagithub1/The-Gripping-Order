import Phaser from 'phaser';
export class PantallaJuego extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('PantallaJuego'); //Asignación de un nombre interno
    }

    preload() {  //Se ejecuta antes de que empiece la escena
        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png');

        //Boton Salir
        this.load.image('BotonSalirN', 'Assets/Interfaz/Botones/salirNormal.png');
        this.load.image('BotonSalirE', 'Assets/Interfaz/Botones/salirEncima.png');
        this.load.image('BotonSalirP', 'Assets/Interfaz/Botones/salirPulsado.png');
        this.load.image('BackgroundGraveyard', 'Assets/Backgrounds/nivel1.png');
        this.load.image('PlataformasAltas', 'Assets/Backgrounds/plat2.png');
        this.load.image('PlataformasBajas', 'Assets/Backgrounds/plat1.png');

        //Sprites Ania y Gancho
        this.load.spritesheet('AniaIdle', 'Assets/Sprites/Ania/Ania-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalk', 'Assets/Sprites/Ania/Ania-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('GanchoIdle', 'Assets/Sprites/gancho.png', { frameWidth: 108, frameHeight: 50 });

    }
    create() {   

        //Fondo
        const background = this.add.image(0, 0, 'BackgroundGraveyard').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        //Boton Salir
        const botonSalir = this.add.image(130, 55, 'BotonSalirN').setScale(1.5).setInteractive();
        botonSalir.on('pointerover', () => { botonSalir.setTexture('BotonSalirE') });
        botonSalir.on('pointerout', () => { botonSalir.setTexture('BotonSalirN') });
        botonSalir.on('pointerdown', () => { botonSalir.setTexture('BotonSalirP') });
        botonSalir.on('pointerup', () => { this.scene.start('PantallaFinal'); });


        //Animaciones
        //Ania
        this.anims.create({
            key: 'Anim_AniaIdle',
            frames: this.anims.generateFrameNumbers('AniaIdle', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1 //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaWalk',
            frames: this.anims.generateFrameNumbers('AniaWalk', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1 //-1 para que se repita indefinidamente
        });

        //Gancho
        this.anims.create({
            key: 'Anim_GanchoIdle',
            frames: this.anims.generateFrameNumbers('GanchoIdle', { start: 0, end: 9 }),
            frameRate: 10, //numero de frames
            repeat: -1 //-1 para que se repita indefinidamente
        });

        //Regiones
        //Piso
        this.floor = this.add.rectangle(480, this.scale.height, this.scale.width, 150/*,0x00ff00*/); //Crear un rectángulo invisible que hará de suelo
        this.physics.add.existing(this.floor, true); // true para que sea estatico

        //Paredes
        //Lo mismo que piso pero para paredes
        this. LeftWall = this.add.rectangle(0, this.scale.height / 2, 180, this.scale.height/* ,0x00ff00*/);
        this.physics.add.existing(this.LeftWall, true); 
        this. RightWall = this.add.rectangle(this.scale.width, this.scale.height / 2, 180, this.scale.height/*,0x00ff00*/);
        this.physics.add.existing(this.RightWall, true);

        //Crear Ania
        this.Ania = this.physics.add.sprite(42, 25, 'AniaIdle'); //Crear sprite de Ania
        this.Ania.setScale(1.5).setFrame(1); //Escalar y poner frame inicial
        this.Ania.y = 150; //Posición inicial Y
        this.Ania.x=this.scale.width/2; //Posición inicial X
        this.Ania.name = "Ania";

        //Colisiones 
        //Ania con limites de mundo
        this.physics.add.collider(this.Ania, this.floor);
        this.physics.add.collider(this.Ania, this.LeftWall);
        this.physics.add.collider(this.Ania, this.RightWall/*, this.onHitFloor, null, this*/); //Lo ultimo es para llamara alguna funcion al chocar util para cuando choque con piezas


        //Botones
        this.keys = {
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            ENTER: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            Right:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            Left:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        }

    }
    update(){
            if(this.keys.D.isDown){ //Si presiona D
                this.Ania.setVelocityX(160); //Se mueve a la derecha
                this.Ania.anims.play('Anim_AniaWalk', true); //Reproducir animación de caminar
                this.Ania.flipX=false; //No voltear sprite
            }else if(this.keys.A.isDown){ //Si presiona A
                this.Ania.setVelocityX(-160);//se mueve a la izquierda
                this.Ania.anims.play('Anim_AniaWalk',true); //Reproducir animación de caminar
                this.Ania.flipX=true;//Voltear sprite

            }else{
                this.Ania.setVelocityX(0); //No se mueve
                this.Ania.anims.play('Anim_AniaIdle',true);//Reproducir animación de idle
            }
            if(this.keys.SPACE.isDown && this.Ania.body.touching.down){
                this.Ania.setVelocityY(-350);//Salto
            }
        
    }
}