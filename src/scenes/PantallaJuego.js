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

        this.load.spritesheet('AniaIdle', 'Assets/Sprites/Ania/Ania-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalk', 'Assets/Sprites/Ania/Ania-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('GanchoIdle', 'Assets/Sprites/gancho.png', { frameWidth: 108, frameHeight: 50 });

    }
    create() {   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'BackgroundGraveyard').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        //const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

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
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'Anim_AniaWalk',
            frames: this.anims.generateFrameNumbers('AniaWalk', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        //Gancho
        this.anims.create({
            key: 'Anim_GanchoIdle',
            frames: this.anims.generateFrameNumbers('GanchoIdle', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        //Crear Ania
        Ania = this.physics.add.sprite(42, 25, 'AniaIdle');
        Ania.setScale(1).setFrame(1);
        //Ania.setColliderWorldBounds(true);
        Ania.name = "Ania";
        Ania.canMove = true;

        //Botones
        keys = {
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            ENTER: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            Right:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            Left:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        }

        //Regiones
        //Piso
        floor ={x:480, y:230, width:480, height:40}


    }
    update(){
        if(Ania.canMove){
            if(keys.A.isDown){
                Ania.setVelocityx(160);
                Ania.anims.play(Anim_AniaWalk, true);
                Ania.flipX=true;
            }else if(keys.A.isDown){
                Ania.setVelocityx(-160);
                Ania.anims.play(Anim_AniaWalk,true);
                Ania.flipX=false;

            }else{
                Ania.setVelocityx(0);
                Ania.anims.play(Anim_AniaIdle,true);
            }
        }else{
            Ania.setVelocityx(0);
            Ania.anims.play(Anim_AniaIdle,true);
        }

        if(Ania.y<floor.y) Ania.y = floor.y;
    }
}