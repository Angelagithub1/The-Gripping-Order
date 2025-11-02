import Phaser from 'phaser';
export class MenuPrincipal extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuPrincipal'); //Asignación de un nombre interno
    }

    preload(){  //Se ejecuta antes de que empiece la escena
        this.load.image('Menus', 'Assets/Backgrounds/nivel1.png'); //Cargar imagen de fondo
        
    }
    create(){   //Se ejecuta al iniciar la escena
        const background = this.add.image(0, 0, 'Menus').setOrigin(0, 0); //Añadir imagen de fondo
        background.setScale(
            Math.max(this.scale.width / background.width, this.scale.height / background.height)
        );
    }
    /*
    update(){  //Bucle de la escena, se ejecuta continuamente
    }*/
}

    