export class MenuReconexion extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuReconexion'); //Asignación de un nombre interno
        
    }

    create(){   //Se ejecuta al iniciar la escena
        //Fondo
        const background = this.add.image(0, 0, 'FondoReconexion').setOrigin(0).setScale(2); //Añadir imagen de fondo

        const SinConexion = this.add.image(
              this.scale.width / 2,
              this.scale.height /2 ,     
              'SinConexion'
            )
              .setScale(3)              // ajustar escala 
              .setOrigin(0.5)          // centro
              .setDepth(0);   
        //this.reconnectInterval = setInterval(() => this.checkServerBackOnline(), 2000);
        this.scene.moveBelow("ConnectionMenu");
    }

}