//import Phaser from 'phaser';
export class MenuEleccionJugador extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuEleccionJugador'); //Asignación de un nombre interno
    }
    init() {
        this.readyToPlay = false;
        this.isAniaC = false;
        this.isGanchoC = false;

        this.valorAnia = 0;
        this.valorGancho = 0;


    }
    preload() {  //Se ejecuta antes de que empiece la escena

        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;

        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/menu.png');

        //Personajes
        this.load.image('Ania', 'Assets/Sprites/Personajes/Ania.png');
        this.load.image('AniaSombrero', 'Assets/Sprites/Personajes/AniaSombrero.png');
        this.load.image('AniaLazo', 'Assets/Sprites/Personajes/AniaLazo.png');
        this.load.image('Gancho', 'Assets/Sprites/Personajes/Gancho.png');
        this.load.image('GanchoNaranja', 'Assets/Sprites/Personajes/Gancho1.png');
        this.load.image('GanchoRosado', 'Assets/Sprites/Personajes/Gancho2.png');
        this.load.image('ContenedorNormal', 'Assets/Interfaz/interfazMedianoNormal.png');
        this.load.image('ContenedorPulsado', 'Assets/Interfaz/interfazMedianoPulsado.png');

        //Boton Pausa
        this.load.image('BotonPausaN', 'Assets/Interfaz/Botones/pausarNormal.png');
        this.load.image('BotonPausaE', 'Assets/Interfaz/Botones/pausarEncima.png');
        this.load.image('BotonPausaP', 'Assets/Interfaz/Botones/pausarPulsado.png');

        //Boton Volver
        this.load.image('MenuN', 'Assets/Interfaz/Botones/menuPNormal.png');
        this.load.image('MenuE', 'Assets/Interfaz/Botones/menuPEncima.png');
        this.load.image('MenuP', 'Assets/Interfaz/Botones/menuPPresionado.png');

        //Boton Jugar
        this.load.image('BotonJugarN', 'Assets/Interfaz/Botones/jugarNormal.png');
        this.load.image('BotonJugarE', 'Assets/Interfaz/Botones/jugarEncima.png');
        this.load.image('BotonJugarP', 'Assets/Interfaz/Botones/jugarPulsado.png');

        //Flecha Derecha
        this.load.image('flechaDerN', 'Assets/Interfaz/Botones/derechaNormal.png');
        this.load.image('flechaDerE', 'Assets/Interfaz/Botones/derechaEncima.png');
        this.load.image('flechaDerP', 'Assets/Interfaz/Botones/derechaPulsado.png');

        //Flecha Izquierda
        this.load.image('flechaIzqN', 'Assets/Interfaz/Botones/izquierdaNormal.png');
        this.load.image('flechaIzqE', 'Assets/Interfaz/Botones/izquierdaEncima.png');
        this.load.image('flechaIzqP', 'Assets/Interfaz/Botones/izquierdaPulsado.png');
    }
    create() {   //Se ejecuta al iniciar la escena
        this.ready = false;
        console.log("Menu de eleccion");
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        this.botonAnia = this.add.image(300, 350, 'ContenedorNormal').setScale(1, 2).setInteractive();
        this.botonAnia.on('pointerdown', () => { this.botonAnia.setTexture('ContenedorPulsado') });
        this.botonAnia.on('pointerup', () => {
            this.chooseCharacter(true);
        });
        this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorNormal') })

        this.Ania = this.add.image(300, 350, 'Ania').setScale(2);

        this.botonGancho = this.add.image(650, 350, 'ContenedorNormal').setScale(1, 2).setInteractive();
        this.botonGancho.on('pointerdown', () => { this.botonGancho.setTexture('ContenedorPulsado') });
        this.botonGancho.on('pointerup', () => {
            this.chooseCharacter(false);
        });
        this.botonGancho.on('pointerout', () => { this.botonGancho.setTexture('ContenedorNormal') })

        this.Gancho = this.add.image(650, 350, 'Gancho').setScale(2);

        //Flecha derecha Ania
        this.flechDerAnia = this.add.image(400, 350, 'flechaDerN').setScale(1).setInteractive();
        this.flechDerAnia.on('pointerover', () => { this.flechDerAnia.setTexture('flechaDerE') });
        this.flechDerAnia.on('pointerout', () => { this.flechDerAnia.setTexture('flechaDerN') });
        this.flechDerAnia.on('pointerdown', () => { this.flechDerAnia.setTexture('flechaDerP') });
        this.flechDerAnia.on('pointerup', () => {
            let nuevo = this.valorAnia + 1
            if (nuevo > 2) {
                nuevo = 0
            }
            this.setSkin(true, nuevo)
        });
        this.flechDerAnia.setVisible(false);

        //Flecha izquierda Ania
        this.flechIzqAnia = this.add.image(200, 350, 'flechaIzqN').setScale(1).setInteractive();
        this.flechIzqAnia.on('pointerover', () => { this.flechIzqAnia.setTexture('flechaIzqE') });
        this.flechIzqAnia.on('pointerout', () => { this.flechIzqAnia.setTexture('flechaIzqN') });
        this.flechIzqAnia.on('pointerdown', () => { this.flechIzqAnia.setTexture('flechaIzqP') });
        this.flechIzqAnia.on('pointerup', () => {
            let nuevo = this.valorAnia - 1
            if (nuevo < 0) {
                nuevo = 2
            }
            this.setSkin(true, nuevo)
        });
        this.flechIzqAnia.setVisible(false);

        //Flecha derecha Gancho
        this.flechDerGancho = this.add.image(750, 350, 'flechaDerN').setScale(1).setInteractive();
        this.flechDerGancho.on('pointerover', () => { this.flechDerGancho.setTexture('flechaDerE') });
        this.flechDerGancho.on('pointerout', () => { this.flechDerGancho.setTexture('flechaDerN') });
        this.flechDerGancho.on('pointerdown', () => { this.flechDerGancho.setTexture('flechaDerP') });
        this.flechDerGancho.on('pointerup', () => {
            let nuevo = this.valorGancho + 1
            if (nuevo > 2) {
                nuevo = 0
            }
            this.setSkin(false, nuevo)
        });
        this.flechDerGancho.setVisible(false);

        //Flecha izquierda Gancho
        this.flechIzqGancho = this.add.image(550, 350, 'flechaIzqN').setScale(1).setInteractive();
        this.flechIzqGancho.on('pointerover', () => { this.flechIzqGancho.setTexture('flechaIzqE') });
        this.flechIzqGancho.on('pointerout', () => { this.flechIzqGancho.setTexture('flechaIzqN') });
        this.flechIzqGancho.on('pointerdown', () => { this.flechIzqGancho.setTexture('flechaIzqP') });
        this.flechIzqGancho.on('pointerup', () => {
            let nuevo = this.valorGancho - 1
            if (nuevo < 0) {
                nuevo = 2
            }
            this.setSkin(false, nuevo)
        });
        this.flechIzqGancho.setVisible(false);

        //Boton Pausa
        const botonPausa = this.add.image(850, 55, 'BotonPausaN').setScale(1.5).setInteractive().setScale(2);
        botonPausa.on('pointerover', () => { botonPausa.setTexture('BotonPausaE') });
        botonPausa.on('pointerout', () => { botonPausa.setTexture('BotonPausaN') });
        botonPausa.on('pointerdown', () => { botonPausa.setTexture('BotonPausaP') });
        botonPausa.on('pointerup', () => { this.scene.start('MenuPausa', { escenaPrevia: this.scene.key }); });

        //Boton Volver
        const botonVolver = this.add.image(110, 55, 'MenuN').setScale(1.5).setInteractive();
        botonVolver.on('pointerover', () => { botonVolver.setTexture('MenuE') });
        botonVolver.on('pointerout', () => { botonVolver.setTexture('MenuN') });
        botonVolver.on('pointerdown', () => { botonVolver.setTexture('MenuP') });
        botonVolver.on('pointerup', () => { this.back() });
        this.scene.moveBelow("ConnectionMenu");

        this.botonJugar = this.add.image(this.scale.width / 2, 450, 'BotonJugarN').setScale(2);
        this.botonJugar.on('pointerover', () => {
            botonJugar.setTexture('BotonJugarE')
        }); //Efecto hover
        this.botonJugar.on('pointerout', () => { this.botonJugar.setTexture('BotonJugarN') }); //Efecto salir
        this.botonJugar.on('pointerdown', () => {
            this.botonJugar.setTexture('BotonJugarP')
        }); //Efecto encima
        this.botonJugar.on('pointerup', () => {
            this.Ready();
        }); //Al hacer click, iniciar escena principal
        this.botonJugar.disableInteractive()

        this.ChoosedInterval = setInterval(() => this.ChoosedOne(), 500);

        this.messageChoosen = this.add.text(this.scale.width / 2 - 250, this.scale.height - 65, '', { fontSize: '20px', fill: '#ff0000ff' });
    }
    async back() {
        try {
            const response = await fetch('/configuration/requestChangeScreen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.scene.get('ConnectionMenu').username, actscene: this.scene.key, next: false })
            });
        } catch (error) {
            console.error('Error al solicitar el cambio de escena:', error);
        }
    }

    async Ready() {
        //Incluir envio de skin escogida
        try {
            const response = await fetch('configuration/requestChangeScreen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.scene.get('ConnectionMenu').username, actscene: this.scene.key, next: true })
            })
            const data = await response.json();

            if (response.status === 201) {
                this.readyToPlay = true;
                console.log("Solicitud recibida", this.readyToPlay)
            } else {
                console.log("Respuesta no recibida")

                console.log(data)
            }
        } catch (error) {
            console.error('Error al confirmar que el jugador esta listo:', error);
        }
    }

    async chooseCharacter(isAnia) { //Elegir personaje
        try {
            const response = await fetch('configuration/setChangesCharacters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.scene.get('ConnectionMenu').username, ania: isAnia })
            })
            const data = await response.json();

            if (response.ok) {
                //console.log("Se puede")
                const response = await fetch(`users/getSkins/${this.scene.get('ConnectionMenu').username}`)
                const data = await response.json();
                if (isAnia) {
                    this.isAniaC = true;
                    this.isGanchoC = false;
                    this.setSkin(true, data.ania)

                } else {
                    this.isGanchoC = true;
                    this.isAniaC = false;
                    this.setSkin(false, data.gancho)
                }
                this.botonJugar.setInteractive();
            } else if (response.status == "409") {
                this.messageChoosen.setText(data.message)
                //console.log("Mensaje:", data.message)
            } 

        } catch (error) {
            console.error('Error al confirmar que el jugador esta listo:', error);
        }
    }
    async setSkin(isAnia, skin) { //Cambiar skin

        if (isAnia) {
            if (!this.isAniaC) {
                console.log("No puedes cambiar a ania");
                return;
            }
            try {
                console.log("Intentando cambiar a ania");
                const response = await fetch(`users/changeSkinAnia/${this.scene.get('ConnectionMenu').username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        skin: skin
                    })
                })
                if (response.ok) {
                    console.log("Ania:", skin)
                    this.localSkinChange(true, skin)
                } else {
                    console.log("mensaje:", response)
                }
            } catch (error) {
            }
        } else {
            if (!this.isGanchoC) {
                console.log("No puedes cambiar al gancho");
                return;
            }
            console.log("Intentando cambiar al gancho");

            try {
                const response = await fetch(`users/changeSkinGancho/${this.scene.get('ConnectionMenu').username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        skin: skin
                    })
                })
                if (response.ok) {
                    console.log("Gancho:", skin)
                    this.localSkinChange(false, skin)
                } else {
                    console.log("mensaje:", response)
                }

            } catch (error) {

            }
        }
    }

    async ChoosedOne() { //Comprobar si alguien ha escogido personaje
        try {
            const response = await fetch('configuration/choosen');
            const data = await response.json();

            if (data.ania == '') {
                //Si no es escogido por nadie
                this.botonAnia.setTexture('ContenedorNormal')
                this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorNormal') })
                this.flechDerAnia.setVisible(false);
                this.flechIzqAnia.setVisible(false);
                console.log("Ania no escogida")
                this.getPlayerSkin(true);//Si no se ha elegido por nadie se ponen las skins que el jugador tenia guardadas
                this.botonAnia.setInteractive()

            } else {
                this.botonAnia.disableInteractive()

                if (this.scene.get('ConnectionMenu').username != data.ania) {
                    //Si es escogido por el otro
                    this.botonAnia.setTexture('ContenedorPulsado')
                    this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorPulsado') })

                    this.flechDerAnia.setVisible(false);
                    this.flechIzqAnia.setVisible(false);

                    //Se busca la skin que le ha puesto el otro jugador
                    const searchSkin = await fetch('users/AllPlayersSkins');
                    const result = await searchSkin.json()

                    this.localSkinChange(true, result.AniaSkin)

                } else {
                    this.flechDerAnia.setVisible(true);
                    this.flechIzqAnia.setVisible(true);
                }
            }

            if (data.gancho == '') {
                this.botonGancho.setTexture('ContenedorNormal')
                this.botonGancho.on('pointerout', () => { this.botonGancho.setTexture('ContenedorNormal') })
                this.flechDerGancho.setVisible(false);
                this.flechIzqGancho.setVisible(false);
                this.getPlayerSkin(false);//Si no se ha elegido por nadie se ponen las skins que el jugador tenia guardadas
                this.botonGancho.setInteractive();
                console.log("Gancho no escogido")

            } else {
                this.botonGancho.disableInteractive();
                if (this.scene.get('ConnectionMenu').username != data.gancho) {
                    //Si es escogido por el otro
                    this.botonGancho.setTexture('ContenedorPulsado')
                    this.botonGancho.on('pointerout', () => { this.botonGancho.setTexture('ContenedorPulsado') })

                    this.flechDerGancho.setVisible(false);
                    this.flechIzqGancho.setVisible(false);

                    //Se busca la skin que le ha puesto el otro jugador
                    const searchSkin = await fetch('users/AllPlayersSkins');
                    const result = await searchSkin.json()
                    this.localSkinChange(false, result.GanchoSkin)


                } else {
                    //Aqui poner los brillitos
                    this.flechDerGancho.setVisible(true);
                    this.flechIzqGancho.setVisible(true);
                }
            }

        } catch (error) {

        }
    }

    async getPlayerSkin(isAnia) { //Obtener skin del jugador
        try {
            const response = await fetch(`users/getSkins/${this.scene.get('ConnectionMenu').username}`)
            const data = await response.json();
            if (response.ok) {
                if (isAnia) {
                    this.localSkinChange(true, data.ania)
                } else {
                    this.localSkinChange(false, data.gancho)
                }

            }
        } catch (error) {

        }
    }
    localSkinChange(isAnia, skin) { //Cambiar skin localmente
        if (isAnia) {
            this.valorAnia = skin;
            switch (skin) {
                case 2:
                    this.Ania.setTexture('AniaLazo');
                    break;
                case 1:
                    this.Ania.setTexture('AniaSombrero')
                    break;
                case 0:
                    this.Ania.setTexture('Ania')
                    break;
            }
        } else {
            this.valorGancho = skin;
            switch (skin) {
                case 2:
                    this.Gancho.setTexture('GanchoRosado');
                    break;
                case 1:
                    this.Gancho.setTexture('GanchoNaranja');
                    break;
                case 0:
                    this.Gancho.setTexture('Gancho');
                    break;
            }
        }
    }
}