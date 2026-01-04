export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    //PowerUpActivoAnia
    const powerUpActivoAnia = '';
    let indexAct = 0;

    // Objeto actual del gancho
    const tiposObjetos = ['Ataud', 'guadana', 'hueso', 'libro'];
    let currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
    let isObjectDropped = false;
    let objectDropPosition = { x: 0, y: 0 };

    setInterval(() => {
        //Bucle
        //Se envia las posiciones a todos los clientes si hubo un cambio
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: 'playerPosition',
                    Ania: ania,
                    Gancho: gancho,
                    Index: indexAct++,
                    // Se envían las posiciones y el estado del objeto a todos los clientes
                    currentObjectType: currentObjectType,
                    isObjectDropped: isObjectDropped,
                    objectDropPosition: objectDropPosition
                }));
            }
        });

    }, 33);

    wss.on('connection', (ws) => {

        // Enviar el objeto actual inmediatamente al nuevo cliente
        ws.send(JSON.stringify({
            type: 'initObject',
            objectType: currentObjectType
        }));
        
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
                        ania.x = data.x;
                        ania.y = data.y;

                    }
                } else {
                    if (gancho.x !== data.x || gancho.y !== data.y) {
                        gancho.x = data.x;
                    }
                }
            }

            if (data.type === 'requestDrop') {
                // El gancho solicita soltar el objeto
                if (!isObjectDropped) {
                    isObjectDropped = true;
                    objectDropPosition = { 
                        x: gancho.x,  // Usar la posicion actual del gancho del servidor
                        y: gancho.y + 50  // Ajustar segun la posicion del punto del gancho
                    };
                    
                    // Notificar a todos los clientes que el objeto se ha soltado
                    wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({
                                type: 'objectDropped',
                                x: objectDropPosition.x,
                                y: objectDropPosition.y,
                                objectType: currentObjectType
                            }));
                        }
                    });

                    // Despues de 1.5 segundos, generar un nuevo objeto
                    setTimeout(() => {
                        currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
                        isObjectDropped = false;
                        
                        // Notificar a todos los clientes del nuevo objeto
                        wss.clients.forEach((client) => {
                            if (client.readyState === 1) {
                                client.send(JSON.stringify({
                                    type: 'nextObject',
                                    objectType: currentObjectType
                                }));
                            }
                        });
                    }, 800);
                }
            }


        });


    });

    wss.on('close', () => {

    })

}