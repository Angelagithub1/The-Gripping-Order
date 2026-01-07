//import Phaser from 'phaser';
export class PantallaJuego extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('PantallaJuego');                     //Asignación de un nombre interno
    }

    init(data) {
        this.AniaSkin = data.AniaSkin;
        /* 
        2 -> AniaLazo
        1 -> AniaSombrero
        0 -> Ania
        */
        this.GanchoSkin = data.GanchoSkin;
        /*
        2 -> GanchoRosado
        1 -> GanchoNaranja
        0 -> Gancho
        */
        this.isAnia = data.isAnia; //Booleano para saber si el jugador es Ania o Gancho
        console.log("Es Ania:", this.isAnia);
    }

    preload() {  //Se ejecuta antes de que empiece la escena
        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');

        //Boton Salir
        this.load.image('BotonSalirN', 'Assets/Interfaz/Botones/salirNormal.png');
        this.load.image('BotonSalirE', 'Assets/Interfaz/Botones/salirEncima.png');
        this.load.image('BotonSalirP', 'Assets/Interfaz/Botones/salirPulsado.png');
        this.load.image('BackgroundGraveyard', 'Assets/Backgrounds/Nivel1ConTubo.png');

        //Plataformas
        this.load.image('PlataformasAltas', 'Assets/Backgrounds/plat2.png');
        this.load.image('PlataformasBajas', 'Assets/Backgrounds/plat1.png');

        //Sprites Ania
        this.load.spritesheet('AniaIdle', 'Assets/Sprites/Ania/Ania-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalk', 'Assets/Sprites/Ania/Ania-WALK.png', { frameWidth: 42, frameHeight: 25 });

        //Sprites Ania Lazo IDLE
        this.load.spritesheet('AniaLazoIdle', 'Assets/Sprites/Ania/SKINS/RIBBON/AniaLazo-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoIdleAmarillo', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/AmarilloLazo-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoIdleAzul', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/AzulLazo-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoIdleRojo', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/RojoLazo-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoIdleVerde', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/VerdeLazo-IDLE.png', { frameWidth: 42, frameHeight: 32 });

        //Sprite Ania Lazo Walk
        this.load.spritesheet('AniaLazoWalk', 'Assets/Sprites/Ania/SKINS/RIBBON/AniaRibbon-WALK.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoWalkAmarillo', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/AmarilloLazo-WALK.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoWalkAzul', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/AzulLazo-WALK.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoWalkRojo', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/RojoLazo-WALK.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaLazoWalkVerde', 'Assets/Sprites/Ania/SKINS/RIBBON/Color/VerdeLazo-WALK.png', { frameWidth: 42, frameHeight: 32 });

        //Sprites Ania sombrero IDLE
        this.load.spritesheet('AniaSombreroIdle', 'Assets/Sprites/Ania/SKINS/HAT/AniaHat-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaSombreroIdleAmarillo', 'Assets/Sprites/Ania/SKINS/HAT/Color/AmarilloHat-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaSombreroIdleAzul', 'Assets/Sprites/Ania/SKINS/HAT/Color/AzulHat-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaSombreroIdleRojo', 'Assets/Sprites/Ania/SKINS/HAT/Color/RojoHat-IDLE.png', { frameWidth: 42, frameHeight: 32 });
        this.load.spritesheet('AniaSombreroIdleVerde', 'Assets/Sprites/Ania/SKINS/HAT/Color/VerdeHat-IDLE.png', { frameWidth: 42, frameHeight: 32 });

        //Sprite Ania sombrero Walk
        this.load.spritesheet('AniaSombreroWalk', 'Assets/Sprites/Ania/SKINS/HAT/AniaHat-WALK.png', { frameWidth: 42, frameHeight: 36 });
        this.load.spritesheet('AniaSombreroWalkAmarillo', 'Assets/Sprites/Ania/SKINS/HAT/Color/AmarilloHat-WALK.png', { frameWidth: 42, frameHeight: 36 });
        this.load.spritesheet('AniaSombreroWalkAzul', 'Assets/Sprites/Ania/SKINS/HAT/Color/AzulHat-WALK.png', { frameWidth: 42, frameHeight: 36 });
        this.load.spritesheet('AniaSombreroWalkRojo', 'Assets/Sprites/Ania/SKINS/HAT/Color/RojoHat-WALK.png', { frameWidth: 42, frameHeight: 36 });
        this.load.spritesheet('AniaSombreroWalkVerde', 'Assets/Sprites/Ania/SKINS/HAT/Color/VerdeHat-WALK.png', { frameWidth: 42, frameHeight: 36 });
        //Sprite Gancho
        this.load.spritesheet('GanchoIdle', 'Assets/Sprites/gancho.png', { frameWidth: 108, frameHeight: 50 });
        this.load.spritesheet('GanchoIdleNaranja', 'Assets/Sprites/Gancho/Color/ganchoNaranja.png', { frameWidth: 108, frameHeight: 50 });
        this.load.spritesheet('GanchoIdleRosa', 'Assets/Sprites/Gancho/Color/ganchoRosa.png', { frameWidth: 108, frameHeight: 50 });

        //Sprites Ania PowerUps
        this.load.spritesheet('AniaIdleAmarillo', 'Assets/Sprites/Ania/Color/Amarillo-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalkAmarillo', 'Assets/Sprites/Ania/Color/Amarillo-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaIdleAzul', 'Assets/Sprites/Ania/Color/Azul-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalkAzul', 'Assets/Sprites/Ania/Color/Azul-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaIdleRojo', 'Assets/Sprites/Ania/Color/Rojo-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalkRojo', 'Assets/Sprites/Ania/Color/Rojo-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaIdleVerde', 'Assets/Sprites/Ania/Color/Verde-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalkVerde', 'Assets/Sprites/Ania/Color/Verde-WALK.png', { frameWidth: 42, frameHeight: 25 });

        //Vidas
        this.load.image('Heart', 'Assets/Interfaz/Otros/VidaEncendida.png')
        this.load.image('HeartEmpty', 'Assets/Interfaz/Otros/VidaApagada.png')

        //Objetos
        this.load.image('Ataud', 'Assets/Piezas/ataúd.png');
        this.load.image('guadana', 'Assets/Piezas/guadaña.png');
        this.load.image('hueso', 'Assets/Piezas/hueso.png');
        this.load.image('libro', 'Assets/Piezas/libro.png');

        //Power Ups
        this.load.image('PowerUpAmarillo', 'Assets/PowerUps/amarillo.png');
        this.load.image('PowerUpAzul', 'Assets/PowerUps/azul.png');
        this.load.image('PowerUpRojo', 'Assets/PowerUps/rojo.png');
        this.load.image('PowerUpVerde', 'Assets/PowerUps/verde.png');

        //Musica de fondo
        this.load.audio('MusicaJuego', 'Assets/Sonidos/Juego.mp3');
        this.load.audio('MusicaFondo', 'Assets/Sonidos/MenuPrincipal.mp3');

        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');

        //Sonidos juego
        this.load.audio('AniaDanada', 'Assets/Sonidos/AniaHurt.mp3');
        this.load.audio('GanchoSuelta', 'Assets/Sonidos/GanchoDisparo.mp3');
        this.load.audio('PowerUp', 'Assets/Sonidos/Powerup.mp3');

    }
    create() {
        //console.log("Ania:",this.AniaSkin, "gancho:",this.GanchoSkin);
        console.log(">>> ENTER GAME", Date.now());

        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;
        //Fondo
        const background = this.add.image(0, 0, 'BackgroundGraveyard').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

        //Musica
        const volumen = this.registry.get('volumen') ?? 0.5;
        let musica = this.sound.get('MusicaFondo');

        if (musica && musica.isPlaying) {    //Parar la musica si está sonando
            musica.stop();
            musica.destroy();
        }

        const musicaJuego = this.sound.add('MusicaJuego', {
            loop: true,
            volume: volumen,
        });
        musicaJuego.play();

        //Sonido botones
        const volumenBotones = this.registry.get('volumen') ?? 0.5;
        this.sonidoE = this.sound.add('SonidoBotonE', { volume: volumenBotones });
        this.sonidoP = this.sound.add('SonidoBotonP', { volume: volumenBotones });

        //Sonidos juego
        this.sonidoAniaDanada = this.sound.add('AniaDanada', { volume: volumenBotones });
        this.sonidoGanchoSuelta = this.sound.add('GanchoSuelta', { volume: volumenBotones });
        this.sonidoPowerUp = this.sound.add('PowerUp', { volume: volumenBotones });


        //Boton Pausa
        const botonPausa = this.add.image(850, 55, 'BotonPausaN').setScale(1.5).setInteractive().setScale(2);
        botonPausa.on('pointerover', () => {
            this.sonidoE.play();
            botonPausa.setTexture('BotonPausaE')
        });
        botonPausa.on('pointerout', () => { botonPausa.setTexture('BotonPausaN') });
        botonPausa.on('pointerdown', () => {
            this.sonidoP.play();
            botonPausa.setTexture('BotonPausaP')
        });
        botonPausa.on('pointerup', () => {
            console.log("Pausa");
            this.scene.pause();
            this.scene.launch('MenuPausa', { escenaPrevia: this.scene.key });
        });

        //Animaciones
        //Ania Normal
        this.anims.create({
            key: 'Anim_AniaIdle',
            frames: this.anims.generateFrameNumbers('AniaIdle', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        this.anims.create({
            key: 'Anim_AniaWalk',
            frames: this.anims.generateFrameNumbers('AniaWalk', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Amarillo
        this.anims.create({
            key: 'Anim_AniaIdleAmarillo',
            frames: this.anims.generateFrameNumbers('AniaIdleAmarillo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaWalkAmarillo',
            frames: this.anims.generateFrameNumbers('AniaWalkAmarillo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Azul
        this.anims.create({
            key: 'Anim_AniaIdleAzul',
            frames: this.anims.generateFrameNumbers('AniaIdleAzul', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaWalkAzul',
            frames: this.anims.generateFrameNumbers('AniaWalkAzul', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Rojo
        this.anims.create({
            key: 'Anim_AniaIdleRojo',
            frames: this.anims.generateFrameNumbers('AniaIdleRojo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaWalkRojo',
            frames: this.anims.generateFrameNumbers('AniaWalkRojo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Verde
        this.anims.create({
            key: 'Anim_AniaIdleVerde',
            frames: this.anims.generateFrameNumbers('AniaIdleVerde', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaWalkVerde',
            frames: this.anims.generateFrameNumbers('AniaWalkVerde', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania Lazo
        this.anims.create({
            key: 'Anim_AniaLazoIdle',
            frames: this.anims.generateFrameNumbers('AniaLazoIdle', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        this.anims.create({
            key: 'Anim_AniaLazoWalk',
            frames: this.anims.generateFrameNumbers('AniaLazoWalk', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Amarillo
        this.anims.create({
            key: 'Anim_AniaLazoIdleAmarillo',
            frames: this.anims.generateFrameNumbers('AniaLazoIdleAmarillo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaLazoWalkAmarillo',
            frames: this.anims.generateFrameNumbers('AniaLazoWalkAmarillo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Azul
        this.anims.create({
            key: 'Anim_AniaLazoIdleAzul',
            frames: this.anims.generateFrameNumbers('AniaLazoIdleAzul', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaLazoWalkAzul',
            frames: this.anims.generateFrameNumbers('AniaLazoWalkAzul', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Rojo
        this.anims.create({
            key: 'Anim_AniaLazoIdleRojo',
            frames: this.anims.generateFrameNumbers('AniaLazoIdleRojo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaLazoWalkRojo',
            frames: this.anims.generateFrameNumbers('AniaLazoWalkRojo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Verde
        this.anims.create({
            key: 'Anim_AniaLazoIdleVerde',
            frames: this.anims.generateFrameNumbers('AniaLazoIdleVerde', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaLazoWalkVerde',
            frames: this.anims.generateFrameNumbers('AniaLazoWalkVerde', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania Lazo
        this.anims.create({
            key: 'Anim_AniaSombreroIdle',
            frames: this.anims.generateFrameNumbers('AniaSombreroIdle', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        this.anims.create({
            key: 'Anim_AniaSombreroWalk',
            frames: this.anims.generateFrameNumbers('AniaSombreroWalk', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Amarillo
        this.anims.create({
            key: 'Anim_AniaSombreroIdleAmarillo',
            frames: this.anims.generateFrameNumbers('AniaSombreroIdleAmarillo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaSombreroWalkAmarillo',
            frames: this.anims.generateFrameNumbers('AniaSombreroWalkAmarillo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Azul
        this.anims.create({
            key: 'Anim_AniaSombreroIdleAzul',
            frames: this.anims.generateFrameNumbers('AniaSombreroIdleAzul', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaSombreroWalkAzul',
            frames: this.anims.generateFrameNumbers('AniaSombreroWalkAzul', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Rojo
        this.anims.create({
            key: 'Anim_AniaSombreroIdleRojo',
            frames: this.anims.generateFrameNumbers('AniaSombreroIdleRojo', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaSombreroWalkRojo',
            frames: this.anims.generateFrameNumbers('AniaSombreroWalkRojo', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Ania-Verde
        this.anims.create({
            key: 'Anim_AniaSombreroIdleVerde',
            frames: this.anims.generateFrameNumbers('AniaSombreroIdleVerde', { start: 0, end: 7 }),
            frameRate: 8, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });
        this.anims.create({
            key: 'Anim_AniaSombreroWalkVerde',
            frames: this.anims.generateFrameNumbers('AniaSombreroWalkVerde', { start: 0, end: 4 }),
            frameRate: 5, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Gancho
        this.anims.create({
            key: 'Anim_GanchoIdle',
            frames: this.anims.generateFrameNumbers('GanchoIdle', { start: 0, end: 9 }),
            frameRate: 10, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Gancho Naranja
        this.anims.create({
            key: 'Anim_GanchoIdleNaranja',
            frames: this.anims.generateFrameNumbers('GanchoIdleNaranja', { start: 0, end: 9 }),
            frameRate: 10, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Gancho Rosado
        this.anims.create({
            key: 'Anim_GanchoIdleRosa',
            frames: this.anims.generateFrameNumbers('GanchoIdleRosa', { start: 0, end: 9 }),
            frameRate: 10, //numero de frames
            repeat: -1    //-1 para que se repita indefinidamente
        });

        //Regiones
        //Piso
        this.floor = this.add.rectangle(480, this.scale.height, this.scale.width, 150/*,0x00ff00*/); //Crear un rectángulo invisible que hará de suelo
        this.physics.add.existing(this.floor, true); // true para que sea estatico

        //Paredes
        //Lo mismo que piso pero para paredes
        this.LeftWall = this.add.rectangle(0, this.scale.height / 2, 180, this.scale.height/* ,0x00ff00*/);
        this.physics.add.existing(this.LeftWall, true);
        this.RightWall = this.add.rectangle(this.scale.width, this.scale.height / 2, 180, this.scale.height/*,0x00ff00*/);
        this.physics.add.existing(this.RightWall, true);

        //Tubo del gancho
        this.TuboGancho = this.add.rectangle(this.scale.width / 2, 74, this.scale.width - 180, 10/*, 0x00ff00*/);
        this.physics.add.existing(this.TuboGancho, true);
        this.TuboGancho.setAlpha(0.5); //Hace el tubo semi-transparente

        //Crear Ania
        if (this.AniaSkin == 2) {
            this.Ania = this.physics.add.sprite(42, 32, 'AniaLazoIdle'); //Crear sprite de Ania Lazo
        } else if (this.AniaSkin == 1) {
            this.Ania = this.physics.add.sprite(42, 32, 'AniaSombreroIdle'); //Crear sprite de Ania Sombrero
        } else {
            this.Ania = this.physics.add.sprite(42, 25, 'AniaIdle'); //Crear sprite de Ania
        }

        this.Ania.setScale(1.5).setFrame(1); //Escalar y poner frame inicial
        this.Ania.y = this.scale.height / 2; //Posición inicial Y
        this.Ania.x = this.scale.width / 2;  //Posición inicial X
        this.Ania.name = "Ania";
        this.Ania.lives = 3;                 //Vidas de Ania
        this.Ania.currentSkin = 'Normal';     //Skin actual de Ania
        this.Ania.canDoubleJump = false;     //Capacidad de doble salto
        this.Ania.canMove = true;            //Capacidad de moverse
        this.Ania.invulnerable = false;      //Estado de invulnerabilidad
        this.Ania.masVelocidad = false;      //Estado de aumento de velocidad
        this.Ania.directionRight = true;        //Dirección inicial

        //Vidas de ania
        this.hearts = [
            this.add.sprite(this.scale.width - 220, 50, 'Heart').setOrigin(0.5).setScale(1.5),
            this.add.sprite(this.scale.width - 250, 50, 'Heart').setOrigin(0.5).setScale(1.5),
            this.add.sprite(this.scale.width - 280, 50, 'Heart').setOrigin(0.5).setScale(1.5)
        ];
        //Crear Gancho
        if (this.GanchoSkin == 2) {
            this.Gancho = this.physics.add.sprite(108, 50, 'GanchoIdleRosa').setImmovable(true).setDepth(1);
            this.Gancho.anims.play('Anim_GanchoIdleRosa', true);

        } else if (this.GanchoSkin == 1) {
            this.Gancho = this.physics.add.sprite(108, 50, 'GanchoIdleNaranja').setImmovable(true).setDepth(1);
            this.Gancho.anims.play('Anim_GanchoIdleNaranja', true);

        } else {
            this.Gancho = this.physics.add.sprite(108, 50, 'GanchoIdle').setImmovable(true).setDepth(1);
            this.Gancho.anims.play('Anim_GanchoIdle', true);

        }

        this.Gancho.setScale(1.5).setFrame(1);
        this.Gancho.y = 80;
        this.Gancho.name = "Gancho";
        this.Gancho.x = this.scale.width / 2;
        this.Gancho.setOrigin(0.5, 0.1);         // 0.1 lo pone el pivote cerca de la parte superior
        this.Gancho.body.setAllowGravity(false); //Desactivar gravedad
        this.Gancho.objeto = null;

        // Punto visual que sigue la parte visible del gancho
        this.ganchoPoint = this.add.circle(this.Gancho.x, this.Gancho.y + 50, 5/*, 0x00ff00*/).setDepth(50);

        this.positions = [
            { x: 0, y: 0, z: 0 },
            { x: 20, y: -2, z: -30 },
            { x: 60, y: -15, z: -45 },
            { x: 55, y: -10, z: 30 },
            { x: 20, y: -2, z: 15 },
            { x: 0, y: 0, z: 0 },
            { x: -20, y: -2, z: -15 },
            { x: -60, y: -15, z: -45 },
            { x: -55, y: -10, z: 30 },
            { x: -20, y: -2, z: 15 }
        ]
        //Cambia la posicion del punto dependiendo del frame
        this.Gancho.on(Phaser.Animations.Events.ANIMATION_UPDATE, (animation, frame) => {
            this.ganchoPoint.x = this.Gancho.x + this.positions[frame.index - 1].x;
            this.ganchoPoint.y = this.Gancho.y + 50 + this.positions[frame.index - 1].y;
        });


        //Crear plataformas
        this.platform1 = this.physics.add.image(146, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform1.body.setAllowGravity(false);
        this.platform1.x = 250;
        this.platform1.y = 420;

        this.platform2 = this.physics.add.image(146, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform2.body.setAllowGravity(false);
        this.platform2.x = this.scale.width - 250;
        this.platform2.y = 420;

        this.platform3 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform3.body.setAllowGravity(false);
        this.platform3.x = this.scale.width / 2 - 35;
        this.platform3.y = 330;

        this.platform4 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform4.body.setAllowGravity(false);
        this.platform4.x = this.scale.width / 2 + 35;
        this.platform4.y = 330;

        this.platform5 = this.physics.add.image(183, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform5.body.setAllowGravity(false);
        this.platform5.x = 315;
        this.platform5.y = 265;

        this.platform6 = this.physics.add.image(183, 14, 'PlataformasAltas').setScale(1.5).setImmovable(true);
        this.platform6.body.setAllowGravity(false);
        this.platform6.x = this.scale.width - 315;
        this.platform6.y = 265;

        this.platform7 = this.physics.add.image(this.scale.width / 2, 14, 'PlataformasBajas').setScale(1.5).setImmovable(true);
        this.platform7.body.setAllowGravity(false);
        this.platform7.x = 150;
        this.platform7.y = 220;

        this.platform8 = this.physics.add.image(this.scale.width / 2 + 100, 14, 'PlataformasAltas').setScale(1.5).setImmovable(true);
        this.platform8.body.setAllowGravity(false);
        this.platform8.x = this.scale.width - 150;
        this.platform8.y = 220;

        //Objetos
        this.objects = this.physics.add.group();

        //Colisiones 
        //Ania con limites de mundo
        this.physics.add.collider(this.Ania, this.floor);
        this.physics.add.collider(this.Ania, this.LeftWall);
        this.physics.add.collider(this.Ania, this.RightWall/*, this.onHitFloor, null, this*/); //Lo ultimo es para llamara alguna funcion al chocar util para cuando choque con piezas
        this.physics.add.collider(this.Ania, this.TuboGancho);
        this.physics.add.collider(this.Ania, this.Gancho);
        this.physics.add.overlap(this.Ania, this.objects, this.DamageAnia, null, this);

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
            Right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            Left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        }

        //Cronometro
        this.timerText = this.add.text(this.scale.width / 2, 30, "60", {
            fontSize: "32px",       // Tamaño de la fuente
            color: "#111111",       // Color del texto
            fontWeight: "bold",     // Hacer la fuente más gruesa
            stroke: "#000000",      // Color del contorno
            strokeThickness: 2     // Grosor del contorno (más alto = más grueso)
        });

        this.timerText.setOrigin(0.5, -0.2); // Centrar el texto horizontalmente
        this.timerText.setDepth(10);         // Establecer la profundidad para asegurarse de que se dibuje encima de otros elementos
        this.matchFinished = false;

        // Configurar el temporizador
       /* this.remainingTime = 90; // 30 segundos
        this.time.addEvent({
            delay: 1000,         // Cada segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: rue,
        });*/

        //PowerUps
        this.powerUps = this.physics.add.group();
        this.physics.add.overlap(this.Ania, this.powerUps, this.RecogerPowerUp, null, this); //Colision Ania con PowerUps
        this.maxPowerUps = 2;   //Limite de PowerUps en pantalla
        this.AparicionesPowerUp(); //Evento para crear PowerUps cada cierto tiempo

        this.physics.add.collider(this.powerUps, this.floor);
        this.physics.add.collider(this.powerUps, this.platform1);
        this.physics.add.collider(this.powerUps, this.platform2);
        this.physics.add.collider(this.powerUps, this.platform3);
        this.physics.add.collider(this.powerUps, this.platform4);
        this.physics.add.collider(this.powerUps, this.platform5);
        this.physics.add.collider(this.powerUps, this.platform6);
        this.physics.add.collider(this.powerUps, this.platform7);
        this.physics.add.collider(this.powerUps, this.platform8);

        this.physics.add.overlap(this.powerUps, this.objects, this.DestroyPowrUp, null, this);

        this.powerUpsLista = ['PowerUpAmarillo', 'PowerUpAzul', 'PowerUpRojo', 'PowerUpVerde'];
        this.scene.moveBelow("ConnectionMenu");

        this.connection = new WebSocket('ws://localhost:8080');
        this.connection.onopen = () => {
            console.log("Conectado al servidor");

            const mensajeInicial = {
                type: 'player_join',
                character: this.isAnia
            }
            this.connection.send(JSON.stringify(mensajeInicial));
        }

        this.connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WS recibido:", event.data);
            if (this.matchFinished) return;

            if (data.type === 'playerPosition') {
                this.ProcessMovement(data);
                return;
            }

            if (data.type === 'timer') {
                const sec = data.remainingSec ?? Math.ceil((data.remainingMs ?? 0) / 1000);
                this.timerText.setText(String(sec));
                return;
            }

            if (data.type === 'matchEnd') {
                this.matchFinished = true;
                console.log("WS recibido matchEnd, cerrando socket");

                //cerrar WS para que no sigan entrando playerPosition
                try { this.connection.close(); } catch (e) {}

                this.timeUp();
                return;
            }
            };
       /*
       this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // si ya terminó, ignora TODO lo que llegue
        if (this.matchFinished) return;

        if (data.type === 'playerPosition') {
            this.ProcessMovement(data);
            return;
        }

        if (data.type === 'timer') {
            const sec = data.remainingSec ?? Math.ceil((data.remainingMs ?? 0) / 1000);
            this.timerText.setText(String(sec));
            return;
        }

        if (data.type === 'matchEnd') {
            this.matchFinished = true;
                this.timeUp();
                return;
        }
        };
        
*/
    }

    async ProcessMovement(data) {
        //console.log("Nueva informacion recibida")
        const umbralDeError = 5;
        const suavizado = 0.15;

        if (!this.isAnia) {
            if (Math.abs(this.Gancho.x - data.Gancho.x) > umbralDeError) {
                //Si es el gancho se hace una aproximacion al Gancho
                const nuevoX = this.Gancho.x + (data.Gancho.x - this.Gancho.x) * suavizado;
                this.Gancho.x = nuevoX;
            }

            const AntiguoX = this.Ania.x;
            this.Ania.x = data.Ania.x;
            //this.Ania.y = data.Ania.y;
            this.Ania.y += (data.Ania.y - this.Ania.y) * (0.5); //Suavizado en Y
            //Se actualiza la posicion tal cual de ania
            if (AntiguoX > this.Ania.x) {
                // Se mueve a la izquierda
                if (this.Ania.directionRight) {//Si estaba mirando a la derecha
                    //Voltear sprite
                    this.Ania.flipX = true;
                    this.Ania.directionRight = false;
                }
                this.updateWalkAnimation(this.Ania);

            } else if (AntiguoX < this.Ania.x) {
                //Se mueve a la derecha
                if (!this.Ania.directionRight) {//Si estaba mirando a la izquierda
                    //Voltear sprite
                    this.Ania.flipX = false;
                    this.Ania.directionRight = true;
                }
                this.updateWalkAnimation(this.Ania);
            } else {
                //No se mueve
                this.updateIdleAnimation(this.Ania);//Reproducir animación de idle
            }


        } else {
            if (Math.abs(this.Ania.x - data.Ania.x) > umbralDeError ||
                Math.abs(this.Ania.y - data.Ania.y) > umbralDeError) {
                //Si es Ania se hace una aproximacion a Ania
                const nuevoX = this.Ania.x + (data.Ania.x - this.Ania.x) * suavizado;
                const nuevoY = this.Ania.y + (data.Ania.y - this.Ania.y) * suavizado;

                this.Ania.x = nuevoX;
                this.Ania.y = nuevoY;

            }
            //Se actualiza la posicion tal cual del gancho
            this.Gancho.x = data.Gancho.x;
        }
    }
    async sendPosition() {
        //const socket = new WebSocket('ws://localhost:8080');
        if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
            return; // Salir si la conexión no está abierta
        }
        if (this.isAnia) {
            //console.log("Enviando posicion de ania");
            this.connection.send(JSON.stringify({
                type: 'updatePosition',
                character: true,
                x: this.Ania.x,
                y: this.Ania.y,
            }));
        } else {
            //console.log("Enviando posicion de gancho");
            this.connection.send(JSON.stringify({
                type: 'updatePosition',
                character: false,
                x: this.Gancho.x,
                y: this.Gancho.y,
            }));
        }
    }

    update() {

        if (this.Gancho.objeto == null) {
            //Si no hay objeto lo crea
            this.CreateObject(this.ganchoPoint.x, this.ganchoPoint.y);
        } else if (this.Gancho.objeto.Soltar == false) {
            // Si no ha soltado el objeto lo mantiene pegado al gancho
            this.Gancho.objeto.x = this.ganchoPoint.x;
            this.Gancho.objeto.y = this.ganchoPoint.y;
        }
        if (this.isAnia && this.Ania) {
            //Hay un bug si ania salta y colisiona con el gancho, este le empuja fuera de la pantalla
            if (this.Ania.x < this.Ania.width / 2 + 100) {
                console.log("Fuera");
                this.Ania.x = 121.5;
            }
            if (this.Ania.x > this.scale.width - this.Ania.width / 2 - 100) {
                console.log("Fuera");
                this.Ania.x = this.scale.width - 121.5;
            }
            if (this.keys.D.isDown && this.Ania.canMove) { //Si presiona D
                this.Ania.directionRight = true;
                if (!this.Ania.masVelocidad) {
                    this.Ania.setVelocityX(160); //Se mueve a la derecha
                } else {
                    this.Ania.setVelocityX(250); //Se mueve a la derecha
                }
                this.updateWalkAnimation(this.Ania);    //Reproducir animación de caminar segun skin y color
                this.Ania.flipX = false; //No voltear sprite

            } else if (this.keys.A.isDown && this.Ania.canMove) { //Si presiona A
                this.Ania.directionRight = false;
                if (!this.Ania.masVelocidad) {
                    this.Ania.setVelocityX(-160);//se mueve a la izquierda  
                } else {
                    this.Ania.setVelocityX(-250); //Se mueve a la izquierda
                }
                this.updateWalkAnimation(this.Ania);
                this.Ania.flipX = true;//Voltear sprite
            } else if (!this.Ania.canMove) {
                this.Ania.setVelocityX(0); //No se mueve
                this.updateIdleAnimation(this.Ania);//Reproducir animación de idle
            } else {
                this.Ania.setVelocityX(0); //No se mueve
                this.updateIdleAnimation(this.Ania);//Reproducir animación de idle
            }

            //Salto de Ania
            if (this.keys.SPACE.isDown && this.Ania.body.touching.down && !this.Ania.canDoubleJump && this.Ania.canMove) {
                this.Ania.setVelocityY(-350);//Salto
            } else if (this.keys.SPACE.isDown && this.Ania.body.touching.down && this.Ania.canDoubleJump && this.Ania.canMove) {
                this.Ania.setVelocityY(-550);
            }
            this.sendPosition();
        }

        if (!this.isAnia) {
            // Mover el gancho
            if (this.keys.Right.isDown && this.Gancho.x < this.Gancho.width / 2 + this.scale.width - 225) {
                this.Gancho.setVelocityX(160);
            }
            else if (this.keys.Left.isDown && this.Gancho.x > this.Gancho.width / 2 + 115) {
                this.Gancho.setVelocityX(-160);
            } else {
                this.Gancho.setVelocityX(0);
            }

            //Solo detecta una pulsación
            if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER) && this.Gancho.objeto != null && this.Gancho.objeto.Soltar == false) {
                //Se avisa que se ha soltado el objeto y se activa la gravedad
                this.Gancho.objeto.Soltar = true;
                this.sonidoGanchoSuelta.play();
                this.Gancho.objeto.body.setAllowGravity(true);
                this.time.delayedCall(800, () => {
                    //Se espera un tiempo para avisar que no hay objeto para que no se cree uno nuevo inmediatamente
                    this.Gancho.objeto = null;
                });
            }
            this.sendPosition();
        }
    }
/*
    updateTimer() {
        this.remainingTime -= 1; // Decrementar el tiempo restante

        // Actualizar el texto con el nuevo tiempo
        this.timerText.setText(this.remainingTime);

        // Verificar si el tiempo ha llegado a cero
        if (this.remainingTime <= 0) {
            this.timeUp(); // Llamar a la función para manejar el fin del tiempo
        }
    }*/

    timeUp() {
        console.log("Juego terminado");

        //if (this.matchFinished) return;
        this.matchFinished = true;

        console.log("Juego terminado");
        this.finalJuego(this.Ania);
    }

    CreateObject(x, y) { //Crea un objeto en las coordenadas dadas
        let tipoObjeto = Phaser.Math.RND.pick(['Ataud', 'guadana', 'hueso', 'libro'])
        let objeto = this.objects.create(x, y + 30, tipoObjeto).setDepth(0);
        objeto.canDamage = true;
        objeto.setOrigin(0.5, 0.5);
        objeto.body.setAllowGravity(false);
        objeto.body.setSize(objeto.width, objeto.height, true);
        objeto.body.setOffset(0, 0);
        objeto.name = tipoObjeto;
        objeto.Soltar = false;
        this.Gancho.objeto = objeto;
    }

    DamageAnia(ania, objeto) {
        if (objeto.Soltar == false) {
            console.log("Gancho no ha soltado");
            return; // Evitar daño si el gancho no ha soltado el objeto
        }
        if (!objeto.canDamage || ania.invulnerable) {
            console.log("Ya daño a ania");
            return; // Evitar daño múltiple
        }
        this.sonidoAniaDanada.play();
        objeto.canDamage = false; // Marcar el objeto como ya usado para daño
        this.Ania.lives = this.Ania.lives - 1; // Restar una vida a Ania
        if (this.hearts.length > 1) {
            const heart = this.hearts.pop();
            heart.setTexture('HeartEmpty'); // Cambiar la textura a corazón vacío

        } else {
            this.finalJuego(this.Gancho);
            // Cambiar a la escena ResultScreen
        }
        console.log("Ania ha sido dañada");
    }
    DestroyPowrUp(powerUp, objeto) {
        if (objeto.Soltar == false) return; // Evitar daño si el gancho no ha soltado el objeto
        powerUp.destroy();
    }

    AparicionesPowerUp() {
        console.log("Funcion base PowerUp");
        const tiempo = Phaser.Math.Between(10000, 20000); // Tiempo aleatorio entre 10 y 20 segundos
        this.time.delayedCall(tiempo, () => { this.SpawnPowerUp(); this.AparicionesPowerUp(); }, [], this); //Se usa delayedCall en vez de loop pq cada vez se quiere un ritmo distinto
    }

    SpawnPowerUp() {
        console.log("Aparece Power Up");
        if (this.powerUps.countActive(true) >= this.maxPowerUps) {
            return; //Si ya hay el maximo de power ups no hace nada
        }
        //Aparicion
        const margen = 30;

        const x = Phaser.Math.Between(this.LeftWall.getBounds().right, this.RightWall.getBounds().left);
        const y = Phaser.Math.Between(this.TuboGancho.getBounds().bottom, this.floor.getBounds().top - 50);

        console.log("Power Up en: " + x + ", " + y); //Posición aleatoria dentro de los límites
        const tipoPowerUp = Phaser.Math.RND.pick(this.powerUpsLista);
        const powerUpActual = this.powerUps.create(x, y, tipoPowerUp);
        powerUpActual.setOrigin(0.5, 0.5).setScale(1.5);
        powerUpActual.type = tipoPowerUp;

    }

    RecogerPowerUp(jugador, powerUp) { //Efecto al recoger Power Up
        this.sonidoPowerUp.play();
        switch (powerUp.type) {
            case 'PowerUpAmarillo':
                // Congelación
                console.log("Efecto Power Up Amarillo");
                this.Congelación(jugador);
                break;
            case 'PowerUpAzul':
                //Doble salto
                console.log("Efecto Power Up Azul");
                this.DobleSalto(jugador);
                break;
            case 'PowerUpRojo':
                //Invulnerabilidad
                console.log("Efecto Power Up Rojo");
                this.Invulnerabilidad(jugador);
                break;
            case 'PowerUpVerde':
                //Aumento de velocidad
                console.log("Efecto Power Up Verde");
                this.AumentoVelocidad(jugador);
                break;
            default:
                console.log("Power Up desconocido");
        }

        powerUp.destroy(); //Eliminar el power up
        console.log("Power Up recogido");
    }

    DobleSalto(jugador) {
        console.log("Efecto Doble Salto");
        jugador.canDoubleJump = true; // Permitir doble salto
        this.time.delayedCall(5000, () => {
            jugador.canDoubleJump = false; // Desactivar doble salto después de 15 segundos
        });
    }

    Congelación(jugador) {
        console.log("Efecto Congelación");
        jugador.canMove = false; // Detener el movimiento
        this.time.delayedCall(5000, () => {
            jugador.canMove = true; // Desactivar doble salto después de 15 segundos
        });
    }

    Invulnerabilidad(jugador) {
        console.log("Efecto Invulnerabilidad");
        jugador.invulnerable = true; // Detener el movimiento
        this.time.delayedCall(5000, () => {
            jugador.invulnerable = false; // Desactivar doble salto después de 15 segundos
        });
    }

    AumentoVelocidad(jugador) {
        console.log("Efecto Aumento Velocidad");
        jugador.masVelocidad = true; // Detener el movimiento
        this.time.delayedCall(5000, () => {
            jugador.masVelocidad = false; // Desactivar doble salto después de 15 segundos
        });
    }

    updateWalkAnimation(jugador) {
        if (this.AniaSkin == 2) {   //Ania con Lazo
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaLazoWalkAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaLazoWalkVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaLazoWalkRojo', true);
            } else {
                jugador.anims.play('Anim_AniaLazoWalk', true);
            }
        } else if (this.AniaSkin == 1) {    //Ania con Sombrero
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaSombreroWalkAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaSombreroWalkVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaSombreroWalkRojo', true);
            } else {
                jugador.anims.play('Anim_AniaSombreroWalk', true);
            }
        } else { //Ania normal
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaWalkAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaWalkVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaWalkRojo', true);
            } else {
                jugador.anims.play('Anim_AniaWalk', true);
            }
        }
    }
    updateIdleAnimation(jugador) {
        if (this.AniaSkin == 2) {   //Ania con Lazo
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaLazoIdleAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaLazoIdleVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaLazoIdleRojo', true);
            } else if (!jugador.canMove) {
                jugador.anims.play('Anim_AniaLazoIdleAmarillo', true);
            } else {
                jugador.anims.play('Anim_AniaLazoIdle', true);
            }
        } else if (this.AniaSkin == 1) {    //Ania con Sombrero
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaSombreroIdleAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaSombreroIdleVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaSombreroIdleRojo', true);
            } else if (!jugador.canMove) {
                jugador.anims.play('Anim_AniaSombreroIdleAmarillo', true);
            } else {
                jugador.anims.play('Anim_AniaSombreroIdle', true);
            }
        } else { //Ania normal
            if (jugador.canDoubleJump) {
                jugador.anims.play('Anim_AniaIdleAzul', true);
            } else if (jugador.masVelocidad) {
                jugador.anims.play('Anim_AniaIdleVerde', true);
            } else if (jugador.invulnerable) {
                jugador.anims.play('Anim_AniaIdleRojo', true);
            } else if (!jugador.canMove) {
                jugador.anims.play('Anim_AniaIdleAmarillo', true);
            } else {
                jugador.anims.play('Anim_AniaIdle', true);
            }
        }
    }

    finalJuego(jugador) {
  // cerrar YA (no esperar al shutdown)
       try {
    if (this.connection) {
      this.connection.onmessage = null;
      this.connection.close();
    }
  } catch (e) {}

  this.matchFinished = true;

  console.log("SCENE CHANGE -> Victory from", this.scene.key);

  // Para TODO lo que pueda estar activo
  this.time.removeAllEvents();
  this.tweens.killAll();

  // Para la escena de juego explícitamente
  this.scene.stop('PantallaJuego');

  // Y arranca la final
  this.scene.start('PantallaFinal', { ganador: jugador.name });
    }
}
