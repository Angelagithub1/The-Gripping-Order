//import Phaser from 'phaser';
export class MenuTutorial extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuTutorial'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png'); 

        //Boton Volver
        this.load.image('MenuN', 'Assets/Interfaz/Botones/menuPNormal.png'); 
        this.load.image('MenuE', 'Assets/Interfaz/Botones/menuPEncima.png'); 
        this.load.image('MenuP', 'Assets/Interfaz/Botones/menuPPresionado.png');

        //Ania
        this.load.image('Ania', 'Assets/Sprites/Personajes/Ania.png');
        this.load.image('AniaTeclaA', 'Assets/Interfaz/Teclado/ANormal.png');
        this.load.image('AniaTeclaD', 'Assets/Interfaz/Teclado/DNormal.png');
        this.load.image('AniaEspacio', 'Assets/Interfaz/Teclado/EspacioNormal.png');

        //Gancho
        this.load.image('Gancho', 'Assets/Sprites/Personajes/Gancho.png');
        this.load.image('GanchoFlechaIzq', 'Assets/Interfaz/Teclado/IzquierdaNormal.png');
        this.load.image('GanchoFlechaDer', 'Assets/Interfaz/Teclado/DerechaNormal.png');
        this.load.image('GanchoEnter', 'Assets/Interfaz/Teclado/EnterNormal.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');

        //Contenedor
        this.load.image('Contenedor', 'Assets/Interfaz/interfaz_grande.png');

        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');
        
    }
    create(){   //Se ejecuta al iniciar la escena
        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        const contenedorAnia = this.add.image(this.scale.width / 2 - 200, this.scale.height / 2 + 75, 'Contenedor');
        const contenedorGancho = this.add.image(this.scale.width / 2 + 200, this.scale.height / 2 + 75, 'Contenedor');

        const ania = this.add.image(290, this.scale.height / 2+10, 'Ania').setScale(2);
        const teclaA = this.add.image(200, 330, 'AniaTeclaA').setScale(2);
        const teclaD = this.add.image(360, 330, 'AniaTeclaD').setScale(2);
        const espacio = this.add.image(280, 400, 'AniaEspacio').setScale(2);


        const gancho = this.add.image(680, this.scale.height / 2+30, 'Gancho').setScale(2);
        const flechaIzq = this.add.image(600, 330, 'GanchoFlechaIzq').setScale(2);
        const flechaDer = this.add.image(760, 330, 'GanchoFlechaDer').setScale(2);
        const enter = this.add.image(677, 400, 'GanchoEnter').setScale(2);

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

                this.scene.moveBelow("ConnectionMenu");

    }
}