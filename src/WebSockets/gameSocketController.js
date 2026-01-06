export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    //PowerUpActivoAnia
    //const powerUpActivoAnia = '';
    
    const powerUps = new Map(); // id -> { id, type, x, y, active }

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

    
    function spawnPowerUp() {
        const x = 200 + Math.floor(Math.random() * 500); // rango simple
        const y = 100 + Math.floor(Math.random() * 300);
        const type = poweUpTypes[Math.floor(Math.random() * poweUpTypes.length)];
        const id = String(nextPowerUpId++);
        powerUps.set(id, { id, type, x, y, active: true });

        console.log('[SERVER] spawn_powerup', { id, x, y, type });
        broadcast({ type: 'spawn_powerup', id, x, y, puType: type });
    }

    
    function startSpawnLoop() {
        const delay = 10000 + Math.random() * 10000; // Entre 10 y 20 segundos
        setTimeout(() => {
          spawnPowerUp();
          startSpawnLoop();
        }, delay);
      }
      startSpawnLoop();

      
    function startEffect(effect) {
        // IMPORTANTE: si más tarde quieres que el objetivo no sea siempre Ania, cambia 'playerId'
        broadcast({ type: 'powerup_started', playerId: 'Ania', effect, duration: 5000 });
        setTimeout(() => {
          broadcast({ type: 'powerup_ended', playerId: 'Ania', effect });
        }, 5000);
      }

      
    function effectFromType(type) {
        switch (type) {
          case 'PowerUpAmarillo': return 'freeze';
          case 'PowerUpVerde':    return 'speed';
          case 'PowerUpAzul':     return 'double_jump';
          case 'PowerUpRojo':     return 'invulnerable';
          default: return '';
        }
      }

      let indexAct = 0;

    setInterval(() => {
        
        
        broadcast({
              type: 'playerPosition',
              Ania: ania,
              Gancho: gancho,
              Index: indexAct++,
            });
          }, 33);
      
        /*//Bucle
        //Se envia las posiciones a todos los clientes si hubo un cambio
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: 'playerPosition',
                    Ania: ania,
                    Gancho: gancho,
                    Index: indexAct++
                }));
            }
        });

    }, 33);*/
    wss.on('connection', (ws) => {
        
        for (const pu of powerUps.values()) {
              if (pu.active) {
                ws.send(JSON.stringify({ type: 'spawn_powerup', id: pu.id, x: pu.x, y: pu.y, puType: pu.type }));
              }
            }
        
        ws.on('message', (message) => {
            const data = JSON.parse(message);

            
            if (data.type === 'request_powerups') {
                    for (const pu of powerUps.values()) {
                      if (pu.active) {
                        ws.send(JSON.stringify({ type: 'spawn_powerup', id: pu.id, x: pu.x, y: pu.y, puType: pu.type }));
                      }
                    }
                    return;
                  }
          

            if (data.type === 'updatePosition') { 
                if (data.character) { // Ania
                    ania.x = data.x;
                    ania.y = data.y;

          // --- DETECCIÓN DE RECOGIDA DE POWERUP POR PROXIMIDAD (servidor) ---
                    for (const pu of powerUps.values()) {
                        if (!pu.active) continue;
                        if (Math.abs(ania.x - pu.x) < 30 && Math.abs(ania.y - pu.y) < 30) {
                          pu.active = false;
                          broadcast({ type: 'remove_powerup', id: pu.id, x: pu.x, y: pu.y, puType: pu.type });
                          startEffect(effectFromType(pu.type));
                        }

                    }
                } else {
                    gancho.x = data.x;
                    // Nota: tu versión inicial no actualizaba y; dejamos igual para no tocar nada ajeno
                }
            } else if (data.type === 'powerup_touch') {
                // Si el cliente avisa de toque explícito (redundante pero útil)
                const id = String(data.id); 
                const pu = powerUps.get(id);
                if (pu && pu.active) {
                    pu.active = false;
                    broadcast({ type: 'remove_powerup', id: pu.id, x:pu.x, y: pu.y, puType: pu.type });
                    startEffect(effectFromType(pu.type));
                }
      
  

                /*//Actualizar posicion
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
                }*/
            }
        });


    });

    /*wss.on('close', () => {

    })*/

}