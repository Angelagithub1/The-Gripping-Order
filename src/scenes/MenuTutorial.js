import Phaser from 'phaser';
export class MenuTutorial extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuTutorial'); //Asignación de un nombre interno
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

        //Ania
        this.load.image('Ania', 'Assets/Sprites/Personajes/Ania.png');
        this.load.image('AniaTeclaA', 'Assets/Interfaz/Teclado/ANormal.png');
        this.load.image('AniaTeclaD', 'Assets/Interfaz/Teclado/DNormal.png');

        //Contenedor
        this.load.image('Contenedor', 'Assets/Interfaz/interfaz_grande.png');
        
    }
    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        const contenedorAnia = this.add.image(this.scale.width / 2 - 200, this.scale.height / 2 + 75, 'Contenedor');
        const contenedorGancho = this.add.image(this.scale.width / 2 + 200, this.scale.height / 2 + 75, 'Contenedor');

        const ania = this.add.image(290, this.scale.height / 2, 'Ania').setScale(2);
        const teclaA = this.add.image(200, 330, 'AniaTeclaA').setScale(2);
        const teclaD = this.add.image(360, 330, 'AniaTeclaD').setScale(2);

        //Boton Salir
        const botonSalir = this.add.image(130, 55, 'BotonSalirN').setScale(1.5).setInteractive(); 
        botonSalir.on('pointerover', () => { botonSalir.setTexture('BotonSalirE')}); 
        botonSalir.on('pointerout', () => { botonSalir.setTexture('BotonSalirN')});
        botonSalir.on('pointerdown', () => { botonSalir.setTexture('BotonSalirP') }); 
        botonSalir.on('pointerup', () => { this.scene.start('MenuPrincipal'); });
        
    }
}