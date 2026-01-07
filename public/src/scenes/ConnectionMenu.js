export class ConnectionMenu extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('ConnectionMenu'); //Asignación de un nombre interno
    }
    init(data) {
        this.escenaActual = data.escenaActual; // Guardar el nombre de la escena en pausa
        this.username = '';
        this.password = '';
        this.ready = false;
        this.intentos = 0;
        this.pendingChange = false;
    }
    create() {

        //Conexion
        this.statusText = this.add.text(16, this.scale.height - 32, '', { fontSize: '20px', fill: '#ffffff' });
        this.messageNotEnoughPlayers = this.add.text(this.scale.width / 2 - 250, this.scale.height - 65, '', { fontSize: '20px', fill: '#ff0000ff' });

        //Verificacion de conexion con el servidor
        this.connectionInterval = setInterval(() => this.checkServerStatus(), 500);

        //Verificacion si hay que cambiar de pantalla
        this.PassSceneInterval = setInterval(() => this.CanPassNextScene(), 500);

        //this.scene.bringToTop();

    }
    async checkServerStatus() { //Verificar estado del servidor
        try {
            if (this.username !== '') {
                //Si ya se ha registrado o iniciado sesion
                const response = await fetch(`/connected/keepalive`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username })
                });
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                this.statusText.setText(`${data.username} - Usuarios: ${data.connected}`);
                if (data.connected < 2) {
                    //Si hay menos de dos jugadores

                    //Los intentos es para dar tiempo a los clientes de reconectarse en caso de que se caiga el servidor
                    this.intentos++;
                    if (this.intentos > 2) { //Si se ha intentado ya dos veces verificar a los dos jugadores
                        this.intentos = 0;

                        //Si esta en el menu de seleccion se vuelve al menu principal y se imprime un mensaje por pantalla
                        if (this.escenaActual == 'MenuEleccionJugador') {
                            this.scene.stop(this.escenaActual)
                            this.escenaActual = 'MenuPrincipal'
                            this.scene.launch('MenuPrincipal')
                            this.messageNotEnoughPlayers.setText('Faltan jugadores, espere a que se conecte alguien')
                            this.time.delayedCall(3000, () => {
                                this.messageNotEnoughPlayers.setText('');
                            }, [], this);
                        }

                        //Si esta en la pantalla de juego se da la victoria al jugador activo
                        if (this.escenaActual == 'PantallaJuego') {
                            this.scene.stop(this.escenaActual)
                            this.escenaActual = 'PantallaFinal'
                            const getCharacter = await fetch(`/configuration/getCharacter/${this.username}`)
                            const data = await getCharacter.json()
                            console.log("Result:", data.character)
                            this.scene.launch('PantallaFinal', {
                                ganador: data.character,
                            });

                            const response = await fetch('/configuration/LimpiezaPorEliminacion', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ actScene: 'PantallaFinal' })
                            })

                        }
                    }
                } else {
                    this.intentos = 0;
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
                    if (this.escenaActual == 'MenuEleccionJugador' && this.scene.get(this.escenaActual).readyToPlay) {
                        console.log('Mandando aviso que dio a aceptar')
                        //Si esta en el menu de eleccion de jugador y estaba listo entonces se reenvia
                        try {
                            const reenvio = await fetch('configuration/requestChangeScreen', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ username: this.scene.get('ConnectionMenu').username, actscene: this.escenaActual, next: true })
                            })
                        } catch (error) {
                            console.error('Error al confirmar que el jugador esta listo:', error);
                        }
                    }
                    if (this.escenaActual == 'MenuEleccionJugador') {
                        if (this.scene.get(this.escenaActual).isAniaC) {
                            try {
                                const response = await fetch('configuration/setChangesCharacters', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ username: this.username, ania: true })
                                })
                            } catch (error) {
                                console.log("No se pudo recuperar personaje elegido")
                                this.scene.get(this.escenaActual).isAniaC = false;
                            }
                        }
                        if (this.scene.get(this.escenaActual).isGanchoC) { //Si habia elegido gancho
                            try {
                                const response = await fetch('configuration/setChangesCharacters', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ username: this.username, ania: false })
                                })
                            } catch (error) {
                                console.log("No se pudo recuperar personaje elegido")
                                this.scene.get(this.escenaActual).isGanchoC = false;
                            }
                        }
                    }

                }
                if (this.escenaActual !== 'MenuEleccionJugador' && this.ready) {
                    console.log('Reiniciando ready...')
                    this.ready = false;
                }
            } else {
                this.statusText.setText(`Servidor: Conectado`);
            }
        } catch (error) {
            this.statusText.setText(`Servidor:Reconectando...`);
            if (this.escenaActual === 'MenuLogin') {
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
    async CanPassNextScene() {
        if ((this.escenaActual === 'PantallaFinal' || this.escenaActual === 'MenuPrincipal') && !this.pendingChange) {
            console.log("No se puede cambiar de escena desde PantallaFinal o MenuPrincipal");
            return;
        }
        if (this.escenaActual === 'PantallaJuego' || this.username == '') {
            //Si no esta en la pantalla de juego porque no se puede cambiar de alli
            //O no ha iniciado sesion
            return;
        }
        try {
            //Se pregunta al servidor si se puede cambiar de escena
            const response = await fetch('/configuration/canChangeScreen');
            const data = await response.json();
            console.log(data)

            if (data.canChange !== '') {
                if (this.escenaActual == data.canChange) {
                    //si es la misma no hacer nada
                    return;
                }

                this.scene.stop(this.escenaActual);
                this.escenaActual = data.canChange;
                if (this.scene.isActive('MenuPausa')) {
                    this.scene.get('MenuPausa').escenaPrevia = data.canChange
                }
                if (this.escenaActual == 'PantallaJuego') {
                    const searchSkin = await fetch('users/AllPlayersSkins');
                    const result = await searchSkin.json()

                    const getCharacter = await fetch(`/configuration/getCharacter/${this.username}`)
                    const character = await getCharacter.json()

                    this.scene.launch('PantallaJuego', { AniaSkin: result.AniaSkin, GanchoSkin: result.GanchoSkin, isAnia: character.character === 'ania' });

                } else {
                    this.scene.launch(data.canChange);
                }
                const response = await fetch('/configuration/confirmChange', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, actScene: this.escenaActual })
                })
            }
        } catch (error) {
        }
    }
}