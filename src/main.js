import Phaser from 'phaser';
import { MenuPrincipal } from './scenes/MenuPrincipal.js';

const config = {
    type: Phaser.AUTO,  //Phaser elige WebGL, no canvas siemopre que sea posible
    width: 1200, //Tamaño del juego
    height: 720,
    parent: 'game-container',   //Div donde se renderiza el juego
    physics: {
        default: 'arcade',  //Sin gravedad, HABRA QUE CAMBIARLO EN EL FUTURO
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
    mode: Phaser.Scale.FIT,          // ajusta al tamaño de la ventana
    autoCenter: Phaser.Scale.CENTER_BOTH // centra automáticamente
  },
    scene: [MenuPrincipal],  //Lista de escenas del juego
    backgroundColor: '#1a1a2e', //Color de fondo del juego
}

const game = new Phaser.Game(config);   //Crea y lanza el juego con esa configuración