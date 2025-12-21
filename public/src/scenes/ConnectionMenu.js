export class ConnectionMenu extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('ConnectionMenu'); //Asignación de un nombre interno
    }
    init(data) {
        this.escenaActual = data.escenaActual; // Guardar el nombre de la escena en pausa
    }
    create() {

        //Conexion
        this.statusText = this.add.text(16, this.scale.height - 32, 'Servidor:Conectando...', { fontSize: '20px', fill: '#ffffff' });
        this.connectionInterval = setInterval(() => this.checkServerStatus(), 500);
        this.scene.bringToTop(); 

    }
    async checkServerStatus() {
        //console.log('Comprobando estado del servidor...');
        try {
            const response = await fetch('/connected');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            if(this.scene.isPaused(this.escenaActual)){
                this.scene.resume(this.escenaActual);
            }
            if(this.scene.isActive('MenuReconexion')) {
                this.scene.stop('MenuReconexion');
            }
            const data = await response.json();
            this.statusText.setText(`Servidor:Online - Usuarios: ${data.connected}`);
        } catch (error) {
            this.handleConnectionUpdate(false);
        }
    }
    handleConnectionUpdate(isConnected) {
        if (!isConnected) {
            this.statusText.setText(`Servidor:Desconectado`);
            if(!this.scene.isPaused(this.escenaActual)){
                this.scene.pause(this.escenaActual);
            }
            if(!this.scene.isActive('MenuReconexion')) {
                this.scene.launch('MenuReconexion');
            }
        }
    }
}