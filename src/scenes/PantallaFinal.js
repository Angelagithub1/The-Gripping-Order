import Phaser from 'phaser';
export class PantallaFinal extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('PantallaFinal'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
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

        //Musica de fondo
        this.load.audio('MusicaJuego', 'Assets/Sonidos/Juego.mp3');
        this.load.audio('Victoria', 'Assets/Sonidos/Victoria.mp3');

        //Boton Volver
        this.load.image('MenuN', 'Assets/Interfaz/Botones/menuPNormal.png'); 
        this.load.image('MenuE', 'Assets/Interfaz/Botones/menuPEncima.png'); 
        this.load.image('MenuP', 'Assets/Interfaz/Botones/menuPPresionado.png');

        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');
        
    }
    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        //Musica
        const volumen = this.registry.get('volumen') ?? 0.2;
        let musica =this.sound.get('MusicaJuego');

        if(musica && musica.isPlaying){    //Parar la musica si está sonando
            musica.stop();
            musica.destroy();
        } 

        const musicaVictoria=this.sound.add('Victoria',{
            loop: true,
            volume: volumen,
        });
        musicaVictoria.play();

        //Sonido botones
        const volumenBotones = this.registry.get('volumen') ?? 0.5;
        this.sonidoE = this.sound.add('SonidoBotonE',{  volume: volumenBotones });
        this.sonidoP = this.sound.add('SonidoBotonP',{  volume: volumenBotones });

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
        
         //Boton Volver
        const botonVolver = this.add.image(110, 55, 'MenuN').setScale(1.5).setInteractive(); 
        botonVolver.on('pointerover', () => { 
            this.sonidoE.play();
            botonVolver.setTexture('MenuE')}); 
        botonVolver.on('pointerout', () => { botonVolver.setTexture('MenuN')});
        botonVolver.on('pointerdown', () => { 
            this.sonidoP.play();
            botonVolver.setTexture('MenuP') }); 
        botonVolver.on('pointerup', () => { this.scene.start('MenuPrincipal'); });


        


    }
}