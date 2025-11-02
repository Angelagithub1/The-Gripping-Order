import Phaser from 'phaser';
export class MenuCreditos extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuCreditos'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png'); 

        //Boton Salir
        this.load.image('BotonSalirN', 'Assets/Interfaz/Botones/salirNormal.png'); 
        this.load.image('BotonSalirE', 'Assets/Interfaz/Botones/salirEncima.png'); 
        this.load.image('BotonSalirP', 'Assets/Interfaz/Botones/salirPulsado.png');
        
    }
    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(1.5);  //Nombre del juego
        
        //Boton Salir
        const botonSalir = this.add.image(130, 55, 'BotonSalirN').setScale(1.5).setInteractive(); 
        botonSalir.on('pointerover', () => { botonSalir.setTexture('BotonSalirE')}); 
        botonSalir.on('pointerout', () => { botonSalir.setTexture('BotonSalirN')});
        botonSalir.on('pointerdown', () => { botonSalir.setTexture('BotonSalirP') }); 
        botonSalir.on('pointerup', () => { this.scene.start('MenuPrincipal'); });


    }
}