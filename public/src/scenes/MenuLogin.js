export class MenuLogin extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuLogin'); //Asignación de un nombre interno
    }

    preload() {  //Se ejecuta antes de que empiece la escena

        if (!this.scene.isActive('ConnectionMenu')) {
            //Si no esta activa la escena de conexion, crearla
            this.scene.launch('ConnectionMenu', { escenaActual: this.scene.key });

        } else {
            //Si ya esta activa se le asigna la escena actual
            this.scene.get('ConnectionMenu').escenaActual = this.scene.key;
        }

        //Assets de pantalla de reconexion   - PONER EN LOGIN
        this.load.image('FondoReconexion', 'Assets/Backgrounds/fondoTrans.png'); //Cargar imagen de fondo

        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/titulo.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');


        //Musica de fondo
        this.load.audio('MusicaFondo', 'Assets/Sonidos/MenuPrincipal.mp3');
        this.load.audio('Victoria', 'Assets/Sonidos/Victoria.mp3');

        //Musica botones
        this.load.audio('SonidoBotonE', 'Assets/Sonidos/BotonEncima.mp3');
        this.load.audio('SonidoBotonP', 'Assets/Sonidos/BotonPulsado.mp3');

        //Formulario HTML
        this.load.html('loginForm', 'Assets/loginform.html');
    }
    create() {   //Se ejecuta al iniciar la escena

        console.log("Menu Principal");
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        //const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        //Sonido
        const volumen = this.registry.get('volumen') ?? 0.2;
        let musica = this.sound.get('MusicaFondo');
        let musicaVictoria = this.sound.get('Victoria');

        if (musicaVictoria && musicaVictoria.isPlaying) {    //Parar la musica si está sonando
            musicaVictoria.stop();
            musicaVictoria.destroy();
        }

        if (!musica) {    //Si no existe la musica todavia
            musica = this.sound.add('MusicaFondo', {
                loop: true,
                volume: volumen,
            });
            musica.play();
        } else if (!musica.isPlaying) { //Si existe pero no se esta reproduciendo
            musica.setVolume(volumen);
            musica.play();
        }

        const volumenBotones = this.registry.get('volumen') ?? 0.5;

        this.sonidoE = this.sound.add('SonidoBotonE', { volume: volumenBotones });
        this.sonidoP = this.sound.add('SonidoBotonP', { volume: volumenBotones });


        //Boton Pausa
        const botonPausa = this.add.image(850, 55, 'BotonPausaN').setScale(1.5).setInteractive().setScale(2);
        botonPausa.on('pointerover', () => {
            this.sonidoE.play();
            botonPausa.setTexture('BotonPausaE')
        });
        botonPausa.on('pointerout', () => { botonPausa.setTexture('BotonPausaN') });
        botonPausa.on('pointerdown', () => {
            this.sonidoP.play();
            botonPausa.setTexture('BotonPausaP')
        });
        botonPausa.on('pointerup', () => {
            console.log("Pausa");
            this.scene.pause();
            this.scene.launch('MenuPausa', { escenaPrevia: this.scene.key });
        });

        const title = this.add.text(this.scale.width / 2 - 45, this.scale.height / 2 - 200, 'Inicio de sesion', { color: 'white', fontFamily: 'Arial', fontSize: '20px ' });
        this.isLogin = true;



        // Botón para alternar al modo de eliminación
        this.deleteModeButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 200, 'Eliminar Usuario', { fontSize: '30px Arial Black', color: '#ff0' })

            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.deleteModeButton.setColor('#888')) // Oscurece el texto
            .on('pointerout', () => this.deleteModeButton.setColor('#ff0'))  // Vuelve al color original
            .on('pointerdown', () => this.procesarEliminarUsuario(formulario));

        // Crear formulario HTML

        let formulario = this.add.dom(400, 250).createFromHTML(`
        <input type="text" name="user" placeholder="Usuario" style="width: 200px; height: 30px;">
        <br>
        <input type="password" name="pass" placeholder="Contraseña" style="width: 200px; height: 30px; margin-top: 10px;">
        `);

        let btnLogin = this.add.text(400, 300, 'Iniciar Sesion', { backgroundColor: '#afac14c8', padding: 10 })
            .setInteractive()
            .on('pointerover', () => {
                btnLogin.setStyle({ backgroundColor: '#afac1468' });
            })
            .on('pointerout', () => {
                btnLogin.setStyle({ backgroundColor: '#afac14c8' });
            })
            .on('pointerup', () => {
                if (this.isLogin) {
                    this.procesarLogin(formulario)
                } else {
                    this.procesarRegistro(formulario)
                }
                btnLogin.setStyle({ backgroundColor: '#ffffff' });
            });

        this.toggleButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 150, 'Cambiar para registrar', { fontSize: '30px Arial Black', color: '#ff0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.toggleButton.setColor('#888')) // Oscurece el texto
            .on('pointerout', () => this.toggleButton.setColor('#ff0'))  // Vuelve al color original
            .on('pointerdown', () => {
                //this.toggleForm();
                if (!this.isLogin) {
                    this.isLogin = true;
                    this.toggleButton.setText('Cambiar para registrar');
                    title.setText('Inicio de sesión');
                    btnLogin.setText('Iniciar Sesion');
                } else {
                    this.isLogin = false;
                    this.toggleButton.setText('Cambiar para iniciar sesión');
                    title.setText('Registro de usuario');
                    btnLogin.setText('Registrarse');
                }
                this.toggleButton.setColor('#fff'); // Aclara el texto al hacer clic

            });
        this.messageError = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, '', { color: 'red', fontFamily: 'Arial', fontSize: '20px ' }).setOrigin(0.5);
    }
    async procesarEliminarUsuario(formulario) {
        let username = formulario.getChildByName('user').value;
        let password = formulario.getChildByName('pass').value;
        if (username !== '' && password !== '') {
            try {
                console.log(username);
                const connectionrevision = await fetch(`/connected/userconnected/${username}`);
                const data = await connectionrevision.json();
                if (!data.connected) {
                    const response = await fetch('/users/delete', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    })
                    if (response.ok) {
                        formulario.getChildByName('user').value = '';
                        formulario.getChildByName('pass').value = '';
                        this.messageError.setText(`${username} eliminado correctamente`);
                    } else {
                        if (response.status === 404) {
                            this.messageError.setText("Usuario no registrado");
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else if (response.status === 401) {
                            this.messageError.setText('Contraseña incorrecta');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else if (response.status === 409) {
                            this.messageError.setText('Usuario ya conectado, no se puede eliminar');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else {
                            this.messageError.setText('Error en el servidor');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        }
                    }
                } else {
                    this.messageError.setText('No se puede eliminar un usuario conectado');
                    this.time.delayedCall(3000, () => {
                        this.messageError.setText('');
                    }, [], this);
                }
            } catch (error) {
                this.messageError.setText('Servidor no disponible');
                this.time.delayedCall(3000, () => {
                    this.messageError.setText('');
                }, [], this);

            }
        } else {
            this.messageError.setText('Rellena todos los campos');
            this.time.delayedCall(3000, () => {
                this.messageError.setText('');
            }, [], this);
        }
    }
    async procesarRegistro(formulario) {
        let username = formulario.getChildByName('user').value;
        let password = formulario.getChildByName('pass').value;

        if (username !== '' && password !== '') {
            try {
                const response = await fetch('/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                })
                if (response.ok) {
                    const data = await response.json();
                    this.messageError.setText('');
                    this.scene.get('ConnectionMenu').username = username;
                    this.scene.get('ConnectionMenu').password = password;
                    this.scene.start('MenuPrincipal');
                } else {
                    if (response.status === 409) {
                        this.messageError.setText("Usuario ya existente");
                        this.time.delayedCall(3000, () => {
                            this.messageError.setText('');
                        }, [], this);
                    }
                }
            } catch (error) {
                this.messageError.setText('Servidor no disponible');
                this.time.delayedCall(3000, () => {
                    this.messageError.setText('');
                }, [], this);

            }

        } else {
            this.messageError.setText('Rellena todos los campos');
            this.time.delayedCall(3000, () => {
                this.messageError.setText('');
            }, [], this);
        }
    }
    async procesarLogin(formulario) {
        let username = formulario.getChildByName('user').value;
        let password = formulario.getChildByName('pass').value;

        if (username !== '' && password !== '') {
            try {
                const connectionrevision = await fetch(`/connected/userconnected/${username}`);
                const data = await connectionrevision.json();
                if (!data.connected) {
                    const response = await fetch('/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    })
                    if (response.ok) {
                        const data = await response.json();
                        this.scene.get('ConnectionMenu').username = username;
                        this.scene.get('ConnectionMenu').password = password;
                        this.messageError.setText('');
                        this.scene.start('MenuPrincipal');
                    } else {
                        if (response.status === 404) {
                            this.messageError.setText("Usuario no registrado");
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else if (response.status === 401) {
                            this.messageError.setText('Contraseña incorrecta');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else if (response.status === 409) {
                            this.messageError.setText('Usuario ya conectado');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        } else {
                            this.messageError.setText('Error en el servidor');
                            this.time.delayedCall(3000, () => {
                                this.messageError.setText('');
                            }, [], this);
                        }
                    }
                }else{
                    this.messageError.setText('Usuario ya conectado');
                    this.time.delayedCall(3000, () => {
                        this.messageError.setText('');
                    }, [], this);
                }
            } catch (error) {
                this.messageError.setText('Servidor no disponible');
                this.time.delayedCall(3000, () => {
                    this.messageError.setText('');
                }, [], this);

            }
        } else {
            this.messageError.setText('Rellena todos los campos');
            this.time.delayedCall(3000, () => {
                this.messageError.setText('');
            }, [], this);
        }

    }
}
