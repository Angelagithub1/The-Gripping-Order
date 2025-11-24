import Phaser from 'phaser';
export class MenuPrincipal extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuPrincipal'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
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

        //Musica de fondo
        this.load.audio('MusicaFondo', 'Assets/Sonidos/MenuPrincipal.mp3');
        this.load.audio('Victoria', 'Assets/Sonidos/Victoria.mp3');

        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');
    }
    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

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
        }

        const volumenBotones = this.registry.get('volumen') ?? 0.5;

        this.sonidoE = this.sound.add('SonidoBotonE',{  volume: volumenBotones });
        this.sonidoP = this.sound.add('SonidoBotonP',{  volume: volumenBotones });

        //Boton Jugar
        const botonJugar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'BotonJugarN').setScale(2).setInteractive(); 
        botonJugar.on('pointerover', () => { 
            this.sonidoE.play();
            botonJugar.setTexture('BotonJugarE')}); //Efecto hover
        botonJugar.on('pointerout', () => { botonJugar.setTexture('BotonJugarN')}); //Efecto salir
        botonJugar.on('pointerdown', () => { 
            this.sonidoP.play();
            botonJugar.setTexture('BotonJugarP')}); //Efecto encima
        botonJugar.on('pointerup', () => { this.scene.start('PantallaJuego'); }); //Al hacer click, iniciar escena principal

        //Boton Tutorial
        const botonTutorial = this.add.image(this.scale.width / 2, this.scale.height / 2 + 80, 'BotonTutorialN').setScale(2).setInteractive(); 
        botonTutorial.on('pointerover', () => { 
            this.sonidoE.play();
            botonTutorial.setTexture('BotonTutorialE')}); //Efecto hover
        botonTutorial.on('pointerout', () => { botonTutorial.setTexture('BotonTutorialN')});
        botonTutorial.on('pointerdown', () => { 
            this.sonidoP.play();
            botonTutorial.setTexture('BotonTutorialP') }); 
        botonTutorial.on('pointerup', () => { this.scene.start('MenuTutorial'); });

        //Boton Creditos
        const botonCreditos = this.add.image(this.scale.width / 2, this.scale.height / 2 + 160, 'BotonCreditosN').setScale(2).setInteractive(); 
        botonCreditos.on('pointerover', () => { 
            this.sonidoE.play();
            botonCreditos.setTexture('BotonCreditosE')}); 
        botonCreditos.on('pointerout', () => { botonCreditos.setTexture('BotonCreditosN')});
        botonCreditos.on('pointerdown', () => { 
            this.sonidoP.play();
            botonCreditos.setTexture('BotonCreditosP') }); 
        botonCreditos.on('pointerup', () => { this.scene.start('MenuCreditos'); });

        //Boton Pausa
        const botonPausa = this.add.image(850, 55, 'BotonPausaN').setScale(1.5).setInteractive().setScale(2); 
        botonPausa.on('pointerover', () => { 
            this.sonidoE.play();
            botonPausa.setTexture('BotonPausaE')}); 
        botonPausa.on('pointerout', () => { botonPausa.setTexture('BotonPausaN')});
        botonPausa.on('pointerdown', () => { 
            this.sonidoP.play();
            botonPausa.setTexture('BotonPausaP') }); 
        botonPausa.on('pointerup', () => {
            console.log("Pausa");
            this.scene.pause();
            this.scene.launch('MenuPausa', { escenaPrevia: this.scene.key });
        });
        /*
        //Boton Salir
        const botonSalir = this.add.image(130, 55, 'BotonSalirN').setScale(1.5).setInteractive(); 
        botonSalir.on('pointerover', () => { 
            this.sonidoE.play();
            botonSalir.setTexture('BotonSalirE')}); 
        botonSalir.on('pointerout', () => { botonSalir.setTexture('BotonSalirN')});
        botonSalir.on('pointerdown', () => { 
            this.sonidoP.play();
            botonSalir.setTexture('BotonSalirP') }); 
*/
        


    }
}

    