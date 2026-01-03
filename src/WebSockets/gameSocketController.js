export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    //PowerUpActivoAnia
    //const powerUpActivoAnia = '';
    const powerUps = new Map(); // id, tipo, x, y, activo
    const poweUpTypes = ['PowerUpAmarillo', 'PowerUpVerde', 'PowerUpAzul', 'PowerUpRojo'];
    let nextPowerUpId = 1;

    function broadcast(obj){
        const msg = JSON.stringify(obj);
        wss.clients.forEach(c => {
            if (c.readyState === 1) {
                c.send(msg);
            }
        });
    }

    function spawnPowerUp(){
        const x = 200 + Math.floor(Math.random() * 500);//rango simple
        const y = 100 + Math.floor(Math.random() * 300);
        const type = poweUpTypes[Math.floor(Math.random() * poweUpTypes.length)];
        const id = String(nextPowerUpId++);
        powerUps.set(id, { id, type, x, y, active: true });
        broadcast({ type: 'spawn_powerup', id, x, y, type });
    }

    function startSpawnLoop(){
        const delay = 10000 + Math.random() * 10000; //Entre 10 y 20 segundos
        setTimeout(() => {
            spawnPowerUp();
            startSpawnLoop();
        }, delay);
    }
    startSpawnLoop();

    function startEffect(effect){
        broadcast({ type: 'powerup_started', playerId: 'Ania', effect, duration: 5000  });
        setTimeout(() => {
            broadcast({ type: 'powerup_ended', playerId: 'Ania', effect });
        }, 5000);
    }

    function effectFromType(type){
        switch(type){
            case 'PowerUpAmarillo': return 'freeze';
            case 'PowerUpVerde': return 'speed';
            case 'PowerUpAzul': return 'double_jump';
            case 'PowerUpRojo': return 'invulnerable';
        }
    }

    setInterval(() => {
        
        /*//Bucle
        //Se envia las posiciones a todos los clientes si hubo un cambio
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: 'playerPosition',
                    Ania: ania,
                    Gancho: gancho
                }));
            }
        });*/

        broadcast({
            type: 'playerPosition',
            Ania: ania,
            Gancho: gancho
        });
    }, 33);

    wss.on('connection', (ws) => {
        for (const pu of powerUps.values()){
            if (pu.active) {
                ws.send(JSON.stringify({ type: 'spawn_powerup', id: pu.id, x: pu.x, y: pu.y, type: pu.type }));
            }
        }
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            if (data.type === 'updatePosition') {
                //Actualizar posicion
                if (data.character) {//Ania
                    /*if (powerUpActivoAnia == 'Congelación') {
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

                        
                       //Falla algo con la velocidad, por ahora se actualiza directamente
                        ania.x = data.x;
                        //Falta verificar doble salto
                        ania.y = data.y;*/
                    ania.x = data.x;
                    ania.y = data.y;
                    //detección de powerUp
                    for (const pu of powerUps.values()) {
                        if (!pu.active) continue;
                        if (Math.abs(ania.x - pu.x) < 30 && Math.abs(ania.y - pu.y) < 30) {
                            pu.active = false;
                            broadcast({ type: 'remove_powerup', id: pu.id });
                            startEffect(effectFromType(pu.type));
                        }
                    }
                /*} else {
                    if (gancho.x !== data.x || gancho.y !== data.y) {
                        gancho.x = data.x;
                    }
                }*/
                } else {
                    gancho.x = data.x;
                }
            }
        });
    });

    /*wss.on('close', () => {

    })*/

}