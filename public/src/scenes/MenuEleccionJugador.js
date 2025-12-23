//import Phaser from 'phaser';
export class MenuEleccionJugador extends Phaser.Scene {   //Crear clase que hereda de Phaser
    constructor() {
        super('MenuEleccionJugador'); //Asignación de un nombre interno
    }
    init() {
        this.readyToPlay = false;
        this.isAniaC =false;
        this.isGanchoC=false;
    }
    preload() {  //Se ejecuta antes de que empiece la escena

        this.scene.get('ConnectionMenu').escenaActual = this.scene.key;

        //Fondo
        this.load.image('Menus', 'Assets/Backgrounds/Menus.jpeg'); //Cargar imagen de fondo

        //Nombre del juego
        this.load.image('NombreJuego', 'Assets/Interfaz/menu.png');

        //Personajes
        this.load.image('Ania', 'Assets/Sprites/Personajes/Ania.png');
        this.load.image('Gancho', 'Assets/Sprites/Personajes/Gancho.png');
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
    }
    create() {   //Se ejecuta al iniciar la escena
        this.ready = false;
        console.log("Menu de eleccion")
        //Fondo
        const background = this.add.image(0, 0, 'Menus').setOrigin(0); //Añadir imagen de fondo
        background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));
        const nombreJuego = this.add.image(this.scale.width / 2, this.scale.height / 4, 'NombreJuego').setScale(2);  //Nombre del juego

        this.botonAnia = this.add.image(300, 350, 'ContenedorNormal').setScale(2).setInteractive();
        this.botonAnia.on('pointerdown', () => { this.botonAnia.setTexture('ContenedorPulsado') });
        this.botonAnia.on('pointerup', () => {
            this.chooseCharacter(true);
        });
        this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorNormal') })

        const Ania = this.add.image(300, 350, 'Ania').setScale(2);

        this.botonGancho = this.add.image(650, 350, 'ContenedorNormal').setScale(2).setInteractive();
        this.botonGancho.on('pointerdown', () => { this.botonGancho.setTexture('ContenedorPulsado') });
        this.botonGancho.on('pointerup', () => {
            this.chooseCharacter(false);
        });
        this.botonGancho.on('pointerout', () => { this.botonGancho.setTexture('ContenedorNormal') })

        const Gancho = this.add.image(650, 350, 'Gancho').setScale(2);

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

    async chooseCharacter(isAnia) {
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
                console.log("Se puede")
                if(isAnia){
                    this.isAniaC=true;
                    this.isGanchoC=false;
                }else{
                    this.isGanchoC=true;
                    this.isAniaC=false;
                }
                this.botonJugar.setInteractive();
            } else if (response.status == "409") {
                this.messageChoosen.setText(data.message)
                //console.log("Mensaje:", data.message)
            } else {
                console.log("NO SE QUE PASA")
            }

        } catch (error) {
            console.error('Error al confirmar que el jugador esta listo:', error);
        }
    }

    async ChoosedOne() {
        try {
            const response = await fetch('configuration/choosen');
            const data = await response.json();

            if (data.ania == '') {
                this.botonAnia.setTexture('ContenedorNormal')
                this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorNormal') })
            }else {
                if (this.scene.get('ConnectionMenu').username != data.ania) {
                    //Si es escogido por el otro
                    this.botonAnia.setTexture('ContenedorPulsado')
                    this.botonAnia.on('pointerout', () => { this.botonAnia.setTexture('ContenedorPulsado') })

                } else {
                    //Aqui poner los brillitos
                }
            } 

            if (data.gancho == '') {
                this.botonGancho.setTexture('ContenedorNormal')
                this.botonGancho.on('pointerout', () => { this.botonAnia.setTexture('ContenedorNormal') })
            } else {
                if (this.scene.get('ConnectionMenu').username != data.gancho) {
                    //Si es escogido por el otro
                    this.botonGancho.setTexture('ContenedorPulsado')
                    this.botonGancho.on('pointerout', () => { this.botonAnia.setTexture('ContenedorPulsado') })

                } else {
                    //Aqui poner los brillitos
                }
            }

        } catch (error) {

        }
    }
}