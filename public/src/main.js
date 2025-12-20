//import Phaser from 'phaser';
import { MenuPrincipal } from './scenes/MenuPrincipal.js';
import { MenuCreditos } from './scenes/MenuCreditos.js';
import { MenuEleccionJugador } from './scenes/MenuEleccionJugador.js';
import { MenuPausa } from './scenes/MenuPausa.js';
import { PantallaJuego } from './scenes/PantallaJuego.js';
import { MenuTutorial } from './scenes/MenuTutorial.js';
import { PantallaFinal} from './scenes/PantallaFinal.js';

const config = {
    type: Phaser.AUTO,  //Phaser elige WebGL, no canvas siemopre que sea posible
    width: 960, //Tamaño del juego ESENCIAL QUE SEA ESTA MEDIDA PORQUE QUEDA PROPORCIONADO
    height: 540,
    parent: 'game-container',   //Div donde se renderiza el juego
    physics: {
        default: 'arcade',  //Sin gravedad, HABRA QUE CAMBIARLO EN EL FUTURO
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scale: {
    mode: Phaser.Scale.FIT,          // ajusta al tamaño de la ventana
    autoCenter: Phaser.Scale.CENTER_BOTH // centra automáticamente
  },
    scene: [MenuPrincipal, MenuCreditos, MenuTutorial, MenuEleccionJugador, MenuPausa, PantallaJuego, PantallaFinal],  //Lista de escenas del juego
    backgroundColor: '#1a1a2e', //Color de fondo del juego
}

const game = new Phaser.Game(config);   //Crea y lanza el juego con esa configuración
