//import Phaser from 'phaser';
export class MenuEleccionJugador extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuEleccionJugador'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena

        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;

        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/menu.png'); 

        //Personajes
        this.load.image('Ania', 'Assets/Sprites/Personajes/Ania.png'); 
        this.load.image('Gancho', 'Assets/Sprites/Personajes/Gancho.png');
        this.load.image('ContenedorNormal', 'Assets/Interfaz/interfazMedianoNormal.png');
        this.load.image('ContenedorPulsado', 'Assets/Interfaz/interfazMedianoPulsado.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');
        
        //Boton Volver
        this.load.image('MenuN', 'Assets/Interfaz/Botones/menuPNormal.png'); 
        this.load.image('MenuE', 'Assets/Interfaz/Botones/menuPEncima.png'); 
        this.load.image('MenuP', 'Assets/Interfaz/Botones/menuPPresionado.png');
    }
    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        const botonAnia = this.add.image(300, 350, 'ContenedorNormal').setScale(2).setInteractive(); 
        botonAnia.on('pointerdown', () => { botonAnia.setTexture('ContenedorPulsado') }); 
        botonAnia.on('pointerup', () => { this.scene.start('PantallaJuego'); });

        const Ania = this.add.image(300, 350, 'Ania').setScale(2);
        
        const botonGancho = this.add.image(650, 350, 'ContenedorNormal').setScale(2).setInteractive(); 
        botonGancho.on('pointerdown', () => { botonGancho.setTexture('ContenedorPulsado') }); 
        botonGancho.on('pointerup', () => { this.scene.start('PantallaJuego'); });

        const Gancho = this.add.image(650, 350, 'Gancho').setScale(2);

        //Boton Pausa
        const botonPausa = this.add.image(850, 55, 'BotonPausaN').setScale(1.5).setInteractive().setScale(2); 
        botonPausa.on('pointerover', () => { botonPausa.setTexture('BotonPausaE')}); 
        botonPausa.on('pointerout', () => { botonPausa.setTexture('BotonPausaN')});
        botonPausa.on('pointerdown', () => { botonPausa.setTexture('BotonPausaP') }); 
        botonPausa.on('pointerup', () => { this.scene.start('MenuPausa'); });

        //Boton Volver
        const botonVolver = this.add.image(110, 55, 'MenuN').setScale(1.5).setInteractive(); 
        botonVolver.on('pointerover', () => { botonVolver.setTexture('MenuE')}); 
        botonVolver.on('pointerout', () => { botonVolver.setTexture('MenuN')});
        botonVolver.on('pointerdown', () => { botonVolver.setTexture('MenuP') }); 
        botonVolver.on('pointerup', () => { this.scene.start('MenuPrincipal'); });
        


    }
}