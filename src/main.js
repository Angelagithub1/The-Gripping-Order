import Phaser from 'phaser';
import { MenuPrincipal } from './scenes/MenuPrincipal.js';

const config = {
    type: Phaser.AUTO,  //Phaser elige WebGL, no canvas siemopre que sea posible
    width: 800, //Tamaño del juego
    height: 600,
    parent: 'game-container',   //Div donde se renderiza el juego
    physics: {
        default: 'arcade',  //Sin gravedad, HABRA QUE CAMBIARLO EN EL FUTURO
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuPrincipal],  //Lista de escenas del juego
    backgroundColor: '#1a1a2e', //Color de fondo del juego
}

const game = new Phaser.Game(config);   //Crea y lanza el juego con esa configuración