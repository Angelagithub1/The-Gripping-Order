//import Phaser from 'phaser';
export class MenuPrincipal extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuPrincipal'); //Asignación de un nombre interno
    }

    preload() {  //Se ejecuta antes de que empiece la escena
        /*
           if(!this.scene.isActive('ConnectionMenu')){
            //Si no esta activa la escena de conexion, crearla
            this.scene.launch('ConnectionMenu', { escenaActual: this.scene.key });

        }else{
            //Si ya esta activa se le asigna la escena actual
            this.scene.get('ConnectionMenu').escenaActual = this.scene.key;
        }*/
        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;

        //Assets de pantalla de reconexion   - PONER EN LOGIN
        this.load.image('FondoReconexion', 'Assets/Backgrounds/fondoTrans.png'); //Cargar imagen de fondo

        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png');

        //Boton Jugar
        this.load.image('BotonJugarN', 'Assets/Interfaz/Botones/jugarNormal.png');
        this.load.image('BotonJugarE', 'Assets/Interfaz/Botones/jugarEncima.png');
        this.load.image('BotonJugarP', 'Assets/Interfaz/Botones/jugarPulsado.png');

        //Boton Tutorial
        this.load.image('BotonTutorialN', 'Assets/Interfaz/Botones/tutorialNormal.png');
        this.load.image('BotonTutorialE', 'Assets/Interfaz/Botones/tutorialEncima.png');
        this.load.image('BotonTutorialP', 'Assets/Interfaz/Botones/tutorialPulsado.png');

        //Boton Creditos
        this.load.image('BotonCreditosN', 'Assets/Interfaz/Botones/creditosNormal.png');
        this.load.image('BotonCreditosE', 'Assets/Interfaz/Botones/creditosEncima.png');
        this.load.image('BotonCreditosP', 'Assets/Interfaz/Botones/creditosPulsado.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');

        //Boton Salir
        this.load.image('BotonSalirN', 'Assets/Interfaz/Botones/salirNormal.png');
        this.load.image('BotonSalirE', 'Assets/Interfaz/Botones/salirEncima.png');
        this.load.image('BotonSalirP', 'Assets/Interfaz/Botones/salirPulsado.png');


        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');
    }
    create() {   //Se ejecuta al iniciar la escena
        console.log("Menu Principal");
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego
        /*
                //Sonido
                const volumen = this.registry.get('volumen') ?? 0.2;
                let musica =this.sound.get('MusicaFondo');
                let musicaVictoria =this.sound.get('Victoria');
        
                if(musicaVictoria && musicaVictoria.isPlaying){    //Parar la musica si está sonando
                    musicaVictoria.stop();
                    musicaVictoria.destroy();
                } 
        
                if(!musica){    //Si no existe la musica todavia
                    musica=this.sound.add('MusicaFondo',{
                        loop: true,
                        volume: volumen,
                    });
                    musica.play();
                } else if (!musica.isPlaying){ //Si existe pero no se esta reproduciendo
                    musica.setVolume(volumen);
                    musica.play();
                }*/

        const volumenBotones = this.registry.get('volumen') ?? 0.5;

        this.sonidoE = this.sound.add('SonidoBotonE', { volume: volumenBotones });
        this.sonidoP = this.sound.add('SonidoBotonP', { volume: volumenBotones });

        //Boton Jugar
        const botonJugar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'BotonJugarN').setScale(2).setInteractive();
        botonJugar.on('pointerover', () => {
            this.sonidoE.play();
            botonJugar.setTexture('BotonJugarE')
        }); //Efecto hover
        botonJugar.on('pointerout', () => { botonJugar.setTexture('BotonJugarN') }); //Efecto salir
        botonJugar.on('pointerdown', () => {
            this.sonidoP.play();
            botonJugar.setTexture('BotonJugarP')
        }); //Efecto encima
        botonJugar.on('pointerup', () => {
            this.RequestButtonPlay();
            //this.scene.start('MenuEleccionJugador'); 
        }); //Al hacer click, iniciar escena principal

        //Boton Tutorial
        const botonTutorial = this.add.image(this.scale.width / 2, this.scale.height / 2 + 80, 'BotonTutorialN').setScale(2).setInteractive();
        botonTutorial.on('pointerover', () => {
            this.sonidoE.play();
            botonTutorial.setTexture('BotonTutorialE')
        }); //Efecto hover
        botonTutorial.on('pointerout', () => { botonTutorial.setTexture('BotonTutorialN') });
        botonTutorial.on('pointerdown', () => {
            this.sonidoP.play();
            botonTutorial.setTexture('BotonTutorialP')
        });
        botonTutorial.on('pointerup', () => { this.scene.start('MenuTutorial'); });

        //Boton Creditos
        const botonCreditos = this.add.image(this.scale.width / 2, this.scale.height / 2 + 160, 'BotonCreditosN').setScale(2).setInteractive();
        botonCreditos.on('pointerover', () => {
            this.sonidoE.play();
            botonCreditos.setTexture('BotonCreditosE')
        });
        botonCreditos.on('pointerout', () => { botonCreditos.setTexture('BotonCreditosN') });
        botonCreditos.on('pointerdown', () => {
            this.sonidoP.play();
            botonCreditos.setTexture('BotonCreditosP')
        });
        botonCreditos.on('pointerup', () => { this.scene.start('MenuCreditos'); });

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
        this.scene.moveBelow("ConnectionMenu");
    }

    async RequestButtonPlay() {
        const response = await fetch(`/connected/users`);
        const result = await response.json();
        if (result.users === 2) {
            this.passNextScene();
        } else {
            this.statusText = this.add.text(this.scale.width / 2-250, this.scale.height -65, 'Porfavor espere a que se conecte otro jugador', { fontSize: '20px', fill: '#ff0000ff' });
            this.time.delayedCall(3000, () => {
                this.statusText.setText('');
            }, [], this);
        }
    }

    async passNextScene() {
        try {
            const response = await fetch('/configuration/requestChangeScreen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.scene.get('ConnectionMenu').username, actscene: this.scene.key, next: true })
            });
        } catch (error) {
            console.error('Error al solicitar el cambio de escena:', error);
        }
    }
}



