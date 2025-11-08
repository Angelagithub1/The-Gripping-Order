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
        this.load.image('BackgroundGraveyard', 'Assets/Backgrounds/Nivel1ConTubo.png');

        //Plataformas
        this.load.image('PlataformasAltas', 'Assets/Backgrounds/plat2.png');
        this.load.image('PlataformasBajas', 'Assets/Backgrounds/plat1.png');

        //Sprites Ania y Gancho
        this.load.spritesheet('AniaIdle', 'Assets/Sprites/Ania/Ania-IDLE.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('AniaWalk', 'Assets/Sprites/Ania/Ania-WALK.png', { frameWidth: 42, frameHeight: 25 });
        this.load.spritesheet('GanchoIdle', 'Assets/Sprites/gancho.png', { frameWidth: 108, frameHeight: 50 });

        //Vidas
        this.load.image('Heart','Assets/Interfaz/Otros/VidaEncendida.png')
        this.load.image('HeartEmpty','Assets/Interfaz/Otros/VidaApagada.png')

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
        this.LeftWall = this.add.rectangle(0, this.scale.height / 2, 180, this.scale.height/* ,0x00ff00*/);
        this.physics.add.existing(this.LeftWall, true);
        this.RightWall = this.add.rectangle(this.scale.width, this.scale.height / 2, 180, this.scale.height/*,0x00ff00*/);
        this.physics.add.existing(this.RightWall, true);

        //Tubo del gancho
        this.TuboGancho = this.add.rectangle(this.scale.width / 2, 74, this.scale.width - 180, 10/*, 0x00ff00*/);
        this.physics.add.existing(this.TuboGancho, true);
        this.TuboGancho.setAlpha(0.5); //Hacer el tubo semi-transparente

        //Crear Ania
        this.Ania = this.physics.add.sprite(42, 25, 'AniaIdle'); //Crear sprite de Ania
        this.Ania.setScale(1.5).setFrame(1); //Escalar y poner frame inicial
        this.Ania.y = this.scale.height/2; //Posición inicial Y
        this.Ania.x = this.scale.width / 2; //Posición inicial X
        this.Ania.name = "Ania";
        this.Ania.lives = 3; //Vidas de Ania

        //Vidas de ania
        this.hearts=[
            this.add.sprite(this.scale.width-120, 50,'Heart').setOrigin(0.5).setScale(1.5),
            this.add.sprite(this.scale.width-150, 50, 'Heart').setOrigin(0.5).setScale(1.5),
            this.add.sprite(this.scale.width-180, 50, 'Heart').setOrigin(0.5).setScale(1.5)
        ];
        //Crear Gancho
        this.Gancho = this.physics.add.sprite(108, 50, 'GanchoIdle').setImmovable(true).setDepth(1);
        this.Gancho.setScale(1.5).setFrame(1);
        this.Gancho.y = 80;
        this.Gancho.x = this.scale.width / 2;
        this.Gancho.setOrigin(0.5, 0.1); // 0.1 lo pone el pivote cerca de la parte superior
        this.Gancho.body.setAllowGravity(false); //Desactivar gravedad
        this.Gancho.anims.play('Anim_GanchoIdle', true);
        this.Gancho.objeto = null;
        this.Gancho.Soltar = false;

        // Punto visual que sigue la parte visible del gancho
        this.ganchoPoint = this.add.circle(this.Gancho.x, this.Gancho.y + 50, 5/*, 0x00ff00*/).setDepth(50);

        this.positions = [
            { x: 0, y: 0, z: 0 },
            { x: 20, y: -2, z: -30 },
            { x: 60, y: -15,z:-45 },
            { x: 55, y: -10, z: 30 },
            { x: 20, y: -2, z: 15 },
            { x: 0, y: 0, z: 0 },
            { x: -20, y: -2, z: -15 },
            { x: -60, y: -15, z:-45 },
            { x: -55, y: -10,z:30 },
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
        this.timerText = this.add.text(this.scale.width / 2, 30, "30", {
            fontSize: "32px",       // Tamaño de la fuente
            color: "#111111",       // Color del texto
            fontWeight: "bold",     // Hacer la fuente más gruesa
            stroke: "#000000",      // Color del contorno
            strokeThickness: 2     // Grosor del contorno (más alto = más grueso)
        });

        this.timerText.setOrigin(0.5, -0.2); // Centrar el texto horizontalmente
        this.timerText.setDepth(10);         // Establecer la profundidad para asegurarse de que se dibuje encima de otros elementos

        // Configurar el temporizador
        this.remainingTime = 90; // 30 segundos
        this.time.addEvent({
            delay: 1000, // Cada segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });

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






    }



    update() {

        if (this.Gancho.objeto == null) {
            //Si no hay objeto lo crea
            this.CreateObject(this.ganchoPoint.x, this.ganchoPoint.y);
        } else if (this.Gancho.Soltar == false) {
            // Si no ha soltado el objeto lo mantiene pegado al gancho
            this.Gancho.objeto.x=this.ganchoPoint.x;
            this.Gancho.objeto.y=this.ganchoPoint.y;
            //this.Gancho.objeto.rotation = Phaser.Math.DegToRad(this.ganchoPoint.z);
        }

        //Hay un bug si ania salta y colisiona con el gancho, este le empuja fuera de la pantalla
        if (this.Ania.x < this.Ania.width / 2 + 100) {
            console.log("Fuera");
            this.Ania.x = 121.5;
        }
        if (this.Ania.x > this.scale.width - this.Ania.width / 2 - 100) {
            console.log("Fuera");
            this.Ania.x = this.scale.width - 121.5;
        }
        if (this.keys.D.isDown) { //Si presiona D
            this.Ania.setVelocityX(160); //Se mueve a la derecha
            this.Ania.anims.play('Anim_AniaWalk', true); //Reproducir animación de caminar
            this.Ania.flipX = false; //No voltear sprite
        } else if (this.keys.A.isDown) { //Si presiona A
            this.Ania.setVelocityX(-160);//se mueve a la izquierda
            this.Ania.anims.play('Anim_AniaWalk', true); //Reproducir animación de caminar
            this.Ania.flipX = true;//Voltear sprite

        } else {
            this.Ania.setVelocityX(0); //No se mueve
            this.Ania.anims.play('Anim_AniaIdle', true);//Reproducir animación de idle
        }
        if (this.keys.SPACE.isDown && this.Ania.body.touching.down) {
            this.Ania.setVelocityY(-350);//Salto
        }

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
        if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER) && this.Gancho.objeto != null && this.Gancho.Soltar == false) {
            //Se avisa que se ha soltado el objeto y se activa la gravedad
            this.Gancho.Soltar = true;
            this.Gancho.objeto.body.setAllowGravity(true);
            this.time.delayedCall(800, () => {
                //Se espera un tiempo para avisar que no hay objeto para que no 
                //se cree uno nuevo inmediatamente
                this.Gancho.objeto = null;
                this.Gancho.Soltar = false;
            });
        }


    }
    updateTimer() {
        this.remainingTime -= 1; // Decrementar el tiempo restante

        // Actualizar el texto con el nuevo tiempo
        this.timerText.setText(this.remainingTime);

        // Verificar si el tiempo ha llegado a cero
        if (this.remainingTime <= 0) {
            this.timeUp(); // Llamar a la función para manejar el fin del tiempo
        }
    }

    timeUp() {

        this.scene.start("PantallaFinal"); // Cambiar a la escena ResultScreen
    }
    CreateObject(x, y) {
        let tipoObjeto = Phaser.Math.RND.pick(['Ataud', 'guadana', 'hueso', 'libro'])
        let objeto = this.objects.create(x, y + 30, tipoObjeto).setDepth(0);
        objeto.canDamage=true;
        objeto.setOrigin(0.5, 0.1);
        objeto.body.setAllowGravity(false);
        objeto.name = tipoObjeto;
        this.Gancho.objeto = objeto;
    }

    DamageAnia(ania,objeto) {
        if(!objeto.canDamage) return; // Evitar daño múltiple
        objeto.canDamage=false; // Marcar el objeto como ya usado para daño
        this.Ania.lives -= 1; // Restar una vida a Ania
        if(this.hearts.length > 0) {
            const heart = this.hearts.pop();
            heart.setTexture('HeartEmpty'); // Cambiar la textura a corazón vacío
        }else{
            this.scene.start("PantallaFinal"); // Cambiar a la escena ResultScreen
        }
        console.log("Ania ha sido dañada");
    }


    AparicionesPowerUp(){
        console.log("Funcion base PowerUp");
        const tiempo = Phaser.Math.Between(10000, 20000); // Tiempo aleatorio entre 10 y 20 segundos
        this.time.delayedCall(tiempo, () => { this.SpawnPowerUp(); this.AparicionesPowerUp(); }, [], this); //Se usa delayedCall en vez de loop pq cada vez se quiere un ritmo distinto
    }

    SpawnPowerUp(){
        console.log("Aparece Power Up");
        if(this.powerUps.countActive(true) >= this.maxPowerUps){
            return; //Si ya hay el maximo de power ups no hace nada
        }
        const margen = 30;
        const x = Phaser.Math.Between(margen, this.scale.width - margen);
        const y = Phaser.Math.Between(margen, this.scale.height - margen);
        const powerUpActual = this.powerUps.create(x, y, 'PowerUpAmarillo');
        powerUpActual.setOrigin(0.5, 0.5);
        //powerUpActual.body.setAllowGravity(true);
    }

    RecogerPowerUp(jugador, powerUp){
        powerUp.destroy(); //Eliminar el power up
        console.log("Power Up recogido");
        //Aquí se puede añadir el efecto del power up
    }

}
