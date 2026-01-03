export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    wss.on('connection', (ws) => {
        setInterval(() => {
            //Bucle
            //Se envia las posiciones a todos los clientes
            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({
                        type: 'playerPosition',
                        Ania: ania,
                        Gancho: gancho
                    }));
                }
            }, 500);
        });
        ws.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'updatePosition') {
                //Actualizar posicion
                if (data.character === 'Ania') {
                    ania.x = data.x;
                    ania.y = data.y;
                } else if (data.character === 'Gancho') {
                    gancho.x = data.x;
                }
            }
        });


    });

    wss.on('close', () => {

    })
}