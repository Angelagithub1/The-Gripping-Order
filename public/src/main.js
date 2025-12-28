//import Phaser from 'phaser';
import { MenuPrincipal } from './scenes/MenuPrincipal.js';
import { MenuCreditos } from './scenes/MenuCreditos.js';
import { MenuEleccionJugador } from './scenes/MenuEleccionJugador.js';
import { MenuPausa } from './scenes/MenuPausa.js';
import { PantallaJuego } from './scenes/PantallaJuego.js';
import { MenuTutorial } from './scenes/MenuTutorial.js';
import { PantallaFinal } from './scenes/PantallaFinal.js';
import { MenuReconexion } from './scenes/MenuReconexion.js';
import { ConnectionMenu } from './scenes/ConnectionMenu.js';
import { MenuLogin } from './scenes/MenuLogin.js';

const config = {
    type: Phaser.AUTO,          //Phaser elige WebGL, no canvas siempre que sea posible
    width: 960,                 //Tamaño del juego 
    height: 540,
    pixelArt: true,             //Para evitar que las imagenes se vean borrosas    
    parent: 'game-container',   //Div donde se renderiza el juego
    physics: {
        default: 'arcade',      //Sin gravedad
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,              // ajusta al tamaño de la ventana
        autoCenter: Phaser.Scale.CENTER_BOTH // centra automáticamente
    },
    dom: {
        createContainer: true               // Habilita el uso de elementos DOM en las escenas
    },
    scene: [MenuLogin, MenuPrincipal, MenuCreditos, MenuTutorial, MenuEleccionJugador, MenuPausa, PantallaJuego, PantallaFinal, ConnectionMenu, MenuReconexion,],  //Lista de escenas del juego
    backgroundColor: '#1a1a2e',           //Color de fondo del juego
}

const game = new Phaser.Game(config);       //Crea y lanza el juego con esa configuración
