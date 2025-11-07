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

        //Plataformas
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

        //Tubo del gancho
        this.TuboGancho = this.add.rectangle(this.scale.width/2, 80, this.scale.width-180, 20, 0x00ff00);
        this.physics.add.existing(this.TuboGancho, true);

        //Crear Ania
        this.Ania = this.physics.add.sprite(42, 25, 'AniaIdle'); //Crear sprite de Ania
        this.Ania.setScale(1.5).setFrame(1); //Escalar y poner frame inicial
        this.Ania.y = 150; //Posición inicial Y
        this.Ania.x=this.scale.width/2; //Posición inicial X
        this.Ania.name = "Ania";

        //Crear Gancho
        this.Gancho = this.physics.add.sprite(108, 50, 'GanchoIdle').setImmovable(true);
        this.Gancho.setScale(1.5).setFrame(1);
        this.Gancho.y = 80;
        this.Gancho.x = this.scale.width/2;
        this.Gancho.setOrigin(0.5, 0.1); // 0.1 lo pone el pivote cerca de la parte superior
        this.Gancho.body.setAllowGravity(false); //Desactivar gravedad
        this.Gancho.anims.play('Anim_GanchoIdle', true);

        //Crear plataformas
        this.platform1 = this.physics.add.image(146, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform1.body.setAllowGravity(false);
        this.platform1.x=250;
        this.platform1.y=420;

        this.platform2 = this.physics.add.image(146, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform2.body.setAllowGravity(false);
        this.platform2.x=this.scale.width-250;
        this.platform2.y=420;

        this.platform3 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform3.body.setAllowGravity(false);
        this.platform3.x=this.scale.width/2-35;
        this.platform3.y=330;

        this.platform4 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform4.body.setAllowGravity(false);
        this.platform4.x=this.scale.width/2+35;
        this.platform4.y=330;

        this.platform5 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform5.body.setAllowGravity(false);
        this.platform5.x=315;
        this.platform5.y=265;

        this.platform6 = this.physics.add.image(183, 14, 'PlataformasAltas').setScale(1.5).setImmovable(true);
        this.platform6.body.setAllowGravity(false);
        this.platform6.x=this.scale.width - 315;
        this.platform6.y=265;

        this.platform7 = this.physics.add.image(this.scale.width/2, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform7.body.setAllowGravity(false);
        this.platform7.x= 150;
        this.platform7.y=220;

        this.platform8 = this.physics.add.image(this.scale.width/2 + 100, 14, 'PlataformasAltas').setScale(1.5).setImmovable(true);
        this.platform8.body.setAllowGravity(false);
        this.platform8.x= this.scale.width -150;
        this.platform8.y=220;

        //Colisiones 
        //Ania con limites de mundo
        this.physics.add.collider(this.Ania, this.floor);
        this.physics.add.collider(this.Ania, this.LeftWall);
        this.physics.add.collider(this.Ania, this.RightWall/*, this.onHitFloor, null, this*/); //Lo ultimo es para llamara alguna funcion al chocar util para cuando choque con piezas
        this.physics.add.collider(this.Ania, this.TuboGancho);
        this.physics.add.collider(this.Ania, this.Gancho);

        //Colision Ania con plataformas
        this.physics.add.collider(this.Ania, this.platform1);
        this.physics.add.collider(this.Ania, this.platform2);
        this.physics.add.collider(this.Ania, this.platform3);
        this.physics.add.collider(this.Ania, this.platform4);
        this.physics.add.collider(this.Ania, this.platform5);
        this.physics.add.collider(this.Ania, this.platform6);
        this.physics.add.collider(this.Ania, this.platform7);
        this.physics.add.collider(this.Ania, this.platform8);

        //Gancho con limites de mundo
        this.physics.add.collider(this.Gancho, this.LeftWall);
        this.physics.add.collider(this.Gancho, this.RightWall);

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

            // Mover el gancho
            if (this.keys.Right.isDown) {
                this.Gancho.setVelocityX(160);
            }
            else if (this.keys.Left.isDown) {
                this.Gancho.setVelocityX(-160);
            }else{
                this.Gancho.setVelocityX(0);
            }
        
    }
}