import Phaser from 'phaser';
export class MenuPrincipal extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuPrincipal'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
        this.load.image('Menus', 'Assets/Backgrounds/Menus.JPG'); //Cargar imagen de fondo
        
    }
    create(){   //Se ejecuta al iniciar la escena
        this.add.image(400, 300, 'Menus'); //Añadir imagen de fondo
    }
    /*
    update(){  //Bucle de la escena, se ejecuta continuamente
    }*/
}

    