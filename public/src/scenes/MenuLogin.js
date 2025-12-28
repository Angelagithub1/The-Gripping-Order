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

        //Assets de pantalla de reconexion 
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

        //Botones de login y registro
        this.load.image('BtnLoginN',  'Assets/Interfaz/Sesion_I_Normal.png');
        this.load.image('BtnLoginE',  'Assets/Interfaz/Sesion_I_Encima.png');
        this.load.image('BtnLoginP',  'Assets/Interfaz/Sesion_I_Presionado.png');
        this.load.image('BtnRegisterN',  'Assets/Interfaz/Sesion_R_Normal.png');
        this.load.image('BtnRegisterE',  'Assets/Interfaz/Sesion_R_Encima.png');
        this.load.image('BtnRegisterP',  'Assets/Interfaz/Sesion_R_Presionado.png');

        //Cambio entre login y registro
        this.load.image('TxtToggleAInicioN',  'Assets/Interfaz/Sesion_I_CambioNormal.png');
        this.load.image('TxtToggleAInicioE',  'Assets/Interfaz/Sesion_I_CambioEncima.png');
       
        this.load.image('TxtToggleARegistroN',  'Assets/Interfaz/Sesion_R_CambioNormal.png');
        this.load.image('TxtToggleARegistroE',  'Assets/Interfaz/Sesion_R_CambioEncima.png');

        //Eliminar sesion
        this.load.image('TxtDeleteN',  'Assets/Interfaz/Sesion_EliminarNormal.png');
        this.load.image('TxtDeleteE',  'Assets/Interfaz/Sesion_EliminarEncima.png');

        //Títulos
        this.load.image('TituloLogin',  'Assets/Interfaz/Sesion_I_Titulo.png');
        this.load.image('TituloRegister',  'Assets/Interfaz/Sesion_R_Titulo.png');

        //Constraseña y usuario
        this.load.image('TxtUsuario',  'Assets/Interfaz/Sesion_Usuario.png');
        this.load.image('TxtContrasena',  'Assets/Interfaz/Sesion_Contrasena.png');

        //Assets de pantalla de reconexion, esa escena no puede cargar sus propios assets
        this.load.image('SinConexion', 'Assets/Interfaz/Sesion_ConexionPerdida.png');
        
    }

    create() {
      // Fondo, audio y pausa
      const bg = this.add.image(0, 0, 'Menus').setOrigin(0);
      bg.setScale(Math.max(this.scale.width / bg.width, this.scale.height / bg.height));

      const volMus = this.registry.get('volumen') ?? 0.2;
      let musica = this.sound.get('MusicaFondo');
      const musicaVictoria = this.sound.get('Victoria');
      if (musicaVictoria && musicaVictoria.isPlaying) { musicaVictoria.stop(); musicaVictoria.destroy(); }
      if (!musica) { musica = this.sound.add('MusicaFondo', { loop: true, volume: volMus }); musica.play(); }
      else if (!musica.isPlaying) { musica.setVolume(volMus); musica.play(); }

      const volBtns = this.registry.get('volumen') ?? 0.5;
      this.sonidoE = this.sound.add('SonidoBotonE', { volume: volBtns });
      this.sonidoP = this.sound.add('SonidoBotonP', { volume: volBtns });

      const btnPause = this.add.image(850, 55, 'BotonPausaN').setScale(2).setInteractive();
      btnPause.on('pointerover', () => { this.sonidoE.play(); btnPause.setTexture('BotonPausaE'); });
      btnPause.on('pointerout',  () => { btnPause.setTexture('BotonPausaN'); });
      btnPause.on('pointerdown', () => { this.sonidoP.play(); btnPause.setTexture('BotonPausaP'); });
      btnPause.on('pointerup',   () => { this.scene.pause(); this.scene.launch('MenuPausa', { escenaPrevia: this.scene.key }); });

      //Layout base 
      const cx = this.scale.width / 2;
      const cy = this.scale.height / 2;
      const formCx = cx-80; // Ajuste para centrar el formulario DOM

      // Ajustes rápidos
      const UI = {
        titleScale: 2.0,        // Título
        titleY: cy - 180,       // Título 
        labelScale: 2.0,        // Tamaño “USUARIO / CONTRASEÑA”
        labelAboveOffset: 20,   // Distancia de la etiqueta al borde superior del input
        inputWidth: 300,        // Ancho del input DOM 
        inputHeight: 40,        // Alto del input DOM 
        inputsGap: 100,          // Separación vertical entre los dos inputs
        inputsTopY: cy - 80,    // Y del input de “usuario” 
        buttonScale: 1.35,      // Tamaño del botón principal
        toggleScale: 2.0,       // Tamaño del texto 
        deleteScale: 2.0,       // Tamaño del texto 
        afterInputsToButton: 60 // Espacio entre el segundo input y el botón
      };

      // Estado inicial 
      this.isLogin = true;

      //Título
      // En modo login: 'TituloLogin' / en registro: 'TituloRegister'
      this.titleImg = this.add.image(cx, UI.titleY, 'TituloLogin')
        .setOrigin(0.5)
        .setScale(UI.titleScale);

      // Inputs DOM 
      // Contenedor del tamaño del canvas para posicionar por left/top
      const formulario = this.add.dom(0, 0).createFromHTML(`
        <div id="login-form" style="position:absolute; left:0; top:0; width:100%; height:100%;"></div>
      `);

      const makeDomInput = (name) => {
        const input = document.createElement('input');
        input.type = (name === 'pass') ? 'password' : 'text';
        input.name = name;
        input.placeholder = ''; // no placeholder
        Object.assign(input.style, {
          position: 'absolute',
          width: UI.inputWidth + 'px',
          height: UI.inputHeight + 'px',
          background: '#f3d05a',    // recuadro amarillo 
          border: '2px solid #8a4a12',
          borderRadius: '6px',
          outline: 'none',
          color: '#3b1b00',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          textAlign: 'left',
          padding: '6px 0px',
          boxShadow: '0 2px 0 #3b1b00',
        });
        input.tabIndex = 0;
        return input; 
      };

      const root = formulario.node.querySelector('#login-form');
      const inputUser = makeDomInput('user');
      const inputPass = makeDomInput('pass');
      root.appendChild(inputUser);
      root.appendChild(inputPass);

      // Posicionar inputs 
      const placeDomCentered = (domEl, x, y) => {
        domEl.style.left = (x - UI.inputWidth / 2) + 'px';
        domEl.style.top  = (y - UI.inputHeight / 2) + 'px';
      };

      const userY = UI.inputsTopY;
      const passY = userY + UI.inputsGap;
      placeDomCentered(inputUser, cx, userY);
      placeDomCentered(inputPass, cx, passY);

      //Etiquetas “USUARIO / CONTRASEÑA”
      const placeLabelAbove = (key, centerX, inputTopY) => {
        return this.add.image(centerX, inputTopY - UI.labelAboveOffset, key)
          .setOrigin(0.5)
          .setScale(UI.labelScale);
      };
      this.lblUser = placeLabelAbove('TxtUsuario', cx, userY - (UI.inputHeight / 2));
      this.lblPass = placeLabelAbove('TxtContrasena', cx, passY - (UI.inputHeight / 2));

      // Botón principal (Login/Registro con tres estados)
      const mainY = passY + (UI.inputHeight / 2) + UI.afterInputsToButton;
      this.btnMain = this.add.image(cx, mainY, 'BtnLoginN')
        .setScale(UI.buttonScale)
        .setInteractive();

      const setMainTextures = (isLogin) => {
        const base = isLogin ? 'BtnLogin' : 'BtnRegister';
        this.btnMain.setTexture(`${base}N`);
        
        this.btnMain.removeAllListeners();
        this.btnMain
          .on('pointerover', () => { this.sonidoE.play(); this.btnMain.setTexture(`${base}E`); })
          .on('pointerout',  () => { this.btnMain.setTexture(`${base}N`); })
          .on('pointerdown', () => { this.sonidoP.play(); this.btnMain.setTexture(`${base}P`); })
          .on('pointerup',   () => {
            if (this.isLogin) this.procesarLogin({ getChildByName: (n) => (n === 'user' ? inputUser : inputPass) });
            else              this.procesarRegistro({ getChildByName: (n) => (n === 'user' ? inputUser : inputPass) });
            this.btnMain.setTexture(`${base}N`);
          });
      };
      setMainTextures(true);

      // Cambiar para registrar / Cambiar para iniciar sesión
      this.toggleImg = this.add.image(cx, mainY + 60, 'TxtToggleARegistroN') // modo login 
        .setOrigin(0.5)
        .setScale(UI.toggleScale)
        .setInteractive();

      const setToggleTextures = (isLogin) => {
        const base = isLogin ? 'TxtToggleARegistro' : 'TxtToggleAInicio';
        this.toggleImg.setTexture(`${base}N`);
        this.toggleImg.removeAllListeners();
        this.toggleImg
          .on('pointerover', () => { this.sonidoE.play(); this.toggleImg.setTexture(`${base}E`); })
          .on('pointerout',  () => { this.toggleImg.setTexture(`${base}N`); })
          .on('pointerdown', () => { this.sonidoP.play(); })
          .on('pointerup',   () => {
            this.isLogin = !this.isLogin;
            // Título y botón principal
            this.titleImg.setTexture(this.isLogin ? 'TituloLogin' : 'TituloRegister');
            setMainTextures(this.isLogin);
            // El toggle cambia de texto
            setToggleTextures(this.isLogin);
          });
      };
      setToggleTextures(true);

      // Eliminar cuenta 
      const deleteY = mainY + 115; 
      const deleteImg = this.add.image(cx, deleteY, 'TxtDeleteN')
        .setOrigin(0.5)
        .setScale(UI.deleteScale)
        .setInteractive();

      deleteImg
        .on('pointerover', () => { this.sonidoE.play(); deleteImg.setTexture('TxtDeleteE'); })
        .on('pointerout',  () => { deleteImg.setTexture('TxtDeleteN'); })
        .on('pointerdown', () => { this.sonidoP.play(); })
        .on('pointerup',   () => {
          // mismos inputs al handler
          this.procesarEliminarUsuario({ getChildByName: (n) => (n === 'user' ? inputUser : inputPass) });
        });

      // Mensajes dinámicos 
      this.messageError = this.add.text(cx, cy - 145, '', {
        color: 'red', fontFamily: 'Arial', fontSize: '20px'
      }).setOrigin(0.5);

      // Orden con ConnectionMenu
      this.scene.moveBelow('ConnectionMenu');
    }

    async procesarEliminarUsuario(formulario) { // Eliminar usuario
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
                        this.time.delayedCall(3000, () => {
                            this.messageError.setText('');
                        }, [], this);
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
    async procesarRegistro(formulario) { //Registrar usuario

        let username = formulario.getChildByName('user').value;
        username=username.toLowerCase();
        let password = formulario.getChildByName('pass').value;
        password=password.toLowerCase();

        if (username !== '' && password !== '') {

            try {
                const usersconnected = await fetch(`/connected/users`);
                const result = await usersconnected.json();
                if (result.users === 2) {
                    this.messageError.setText('Ya hay dos jugadores jugando, espere a que se libere un puesto');
                    this.time.delayedCall(3000, () => {
                        this.messageError.setText('');
                    }, [], this);
                } else {

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
    async procesarLogin(formulario) { //Iniciar sesion

        let username = formulario.getChildByName('user').value;
        username=username.toLowerCase();
        let password = formulario.getChildByName('pass').value;
        password=password.toLowerCase();

        if (username !== '' && password !== '') {

            try {
                const response = await fetch(`/connected/users`);
                const result = await response.json();
                if (result.users === 2) {
                    this.messageError.setText('Ya hay dos jugadores jugando, espere a que se libere un puesto');
                    this.time.delayedCall(3000, () => {
                        this.messageError.setText('');
                    }, [], this);

                } else {
                    const connectionrevision = await fetch(`/connected/userconnected/${username}`);
                    const data = await connectionrevision.json();
                    if (!data.connected) {
                        const response = await fetch(`/users/login/${username}/${password}`)
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
                    } else {
                        this.messageError.setText('Usuario ya conectado');
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
}
