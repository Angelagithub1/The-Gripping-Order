export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    //PowerUpActivoAnia
    const powerUpActivoAnia = '';


    setInterval(() => {
        //Bucle
        //Se envia las posiciones a todos los clientes si hubo un cambio
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: 'playerPosition',
                    Ania: ania,
                    Gancho: gancho
                }));
            }
        });

    }, 33);
    wss.on('connection', (ws) => {

        ws.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'updatePosition') {
                //Actualizar posicion
                if (data.character) {
                    if (powerUpActivoAnia == 'Congelación') {
                        //Si se envia una posicion cuando esta congelado no se actualiza
                        return;
                    }
                    if (ania.x !== data.x || ania.y !== data.y) {
                        //Verificar si el movimiento en X es posible
                        /*
                        let velocidadMax = 160;
                        if (powerUpActivoAnia == 'PowerUpVerde') {
                            //Si tiene el power up de velocidad aumentada
                            velocidadMax = 250;
                        }
                        const deltaX = ania.x - data.x;
                        const deltaY = ania.y - data.y;
                        const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY); //Se calcula la distancia

                        //Se calcula la distancia maxima que puede recorrer en 33ms
                        const distanciaMAx = velocidadMax * (33 / 1000); 

                        //Si la distancia es menor o igual a la maxima permitida, se actualiza la posicion
                        if (distancia <= distanciaMAx) {
                            ania.x = data.x;
                        } else {
                            //Si no, se mueve en la direccion del cliente pero solo la distancia maxima permitida
                            const ratio = distanciaMAx / distancia;
                            ania.x = ania.x + (deltaX * ratio);
                        }

                        */
                       //Falla algo con la velocidad, por ahora se actualiza directamente
                        ania.x = data.x;
                        //Falta verificar doble salto
                        ania.y = data.y;

                    }
                } else {
                    if (gancho.x !== data.x || gancho.y !== data.y) {
                        gancho.x = data.x;
                    }
                }
            }
        });


    });

    wss.on('close', () => {

    })

}