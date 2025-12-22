
export class ConnectionMenu extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('ConnectionMenu'); //Asignación de un nombre interno
    }
    init(data) {
        this.escenaActual = data.escenaActual; // Guardar el nombre de la escena en pausa
        this.username = '';
        this.password = '';
    }
    create() {

        //Conexion
        this.statusText = this.add.text(16, this.scale.height - 32, '', { fontSize: '20px', fill: '#ffffff' });
        this.connectionInterval = setInterval(() => this.checkServerStatus(), 500);
        this.scene.bringToTop();

    }
    async checkServerStatus() {
        //console.log('Comprobando estado del servidor...');
        try {
            if (this.username !== '') {
                const response = await fetch(`/connected/keepalive/${this.username}`);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                if (this.escenaActual !== 'MenuLogin') {
                    this.statusText.setText(`${data.username} - Usuarios: ${data.connected}`);
                }
                if (this.scene.isPaused(this.escenaActual)) {
                    this.scene.resume(this.escenaActual);
                }
                if (this.scene.isActive('MenuReconexion')) {
                    this.scene.stop('MenuReconexion');
                    //Se ha reconectado, volver a iniciar sesion
                    try {
                        const response = await fetch('/users/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username: this.username, password: this.password })
                        })
                    } catch (error) {
                        console.error('Error al reintentar el inicio de sesión:', error);
                        this.scene.start('MenuLogin');
                        this.escenaActual = 'MenuLogin';
                    }
                }
            } else {
                this.statusText.setText(``);
            }
        } catch (error) {
            this.handleConnectionUpdate(false);
        }
    }
    handleConnectionUpdate(isConnected) {
        if (!isConnected) {
            this.statusText.setText(`Servidor:Reconectando...`);
            if(this.escenaActual==='MenuLogin'){
                return;
            }
            if (!this.scene.isPaused(this.escenaActual)) {
                this.scene.pause(this.escenaActual);
            }
            if (!this.scene.isActive('MenuReconexion')) {
                this.scene.launch('MenuReconexion');
            }
        }
    }
}