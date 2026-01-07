export const initGameSocketController = (wss) => {
  const ania = { x: 480, y: 270 };
  const gancho = { x: 480, y: 80 };

    //PowerUpActivoAnia
    //const powerUpActivoAnia = '';
    const powerUps = new Map(); // id -> { id, type, x, y, active }
    const poweUpTypes = ['PowerUpAmarillo', 'PowerUpVerde', 'PowerUpAzul', 'PowerUpRojo'];
    let nextPowerUpId = 1;

    // Variables para objetos
    const tiposObjetos = ['Ataud', 'guadana', 'hueso', 'libro'];
    let currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
    let isObjectDropped = false;
    let objectDropPosition = { x: 0, y: 0 };
    // --- CRONÓMETRO ---
    const MATCH_DURATION_MS = 60_000;
    let matchStarted = false;
    let matchEnded = false;
    let endTime = 0;
    let partida =false;

    let timerIntervalId = null;   // IMPORTANTÍSIMO
    let joinedPlayers = 0;        // para arrancar con 2

    function broadcast(obj){
        const msg = JSON.stringify(obj);
        wss.clients.forEach(c => {
            if (c.readyState === 1) {
                c.send(msg);
            }
        });
    }
    function startMatch() {
      // evita dobles arranques
      if (matchStarted) {
        return;
      }

      matchStarted = true;
      partida= true;
      matchEnded = false;
      endTime = Date.now() + MATCH_DURATION_MS;

      console.log("startMatch OK");
      broadcast({ type: "matchStart", durationMs: MATCH_DURATION_MS });

      // si existiera un timer anterior, lo limpias
      if (timerIntervalId) clearInterval(timerIntervalId);

      // manda timer 1 vez por segundo
      timerIntervalId = setInterval(() => {
        if (matchEnded) return;

        const remainingMs = Math.max(0, endTime - Date.now());
        const remainingSec = Math.ceil(remainingMs / 1000);


      broadcast({ type: "timer", remainingSec, remainingMs });

      if (remainingMs === 0) {
        matchEnded = true;
        console.log("matchEnd")
        broadcast({ type: "matchEnd", reason: "timeout" });

        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
    }, 1000);
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
              // Información del objeto
              currentObjectType: currentObjectType,
              isObjectDropped: isObjectDropped,
              objectDropPosition: objectDropPosition,
            });
          }, 33);
      
    wss.on('connection', (ws) => {
      
        
      for (const pu of powerUps.values()) {
        if (pu.active) {
          ws.send(JSON.stringify({ type: 'spawn_powerup', id: pu.id, x: pu.x, y: pu.y, puType: pu.type }));
        }
      }

      // Enviar información del objeto actual al nuevo cliente
      ws.send(JSON.stringify({
          type: 'initObject',
          objectType: currentObjectType,
      }));
      
      ws.on('message', (message) => {
          const data = JSON.parse(message);
          startMatch();
          
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
        } else if (data.type === 'requestDrop') { // Manejar solicitud de soltar objeto
            // El gancho solicita soltar el objeto
          if (!isObjectDropped) {
            isObjectDropped = true;
            objectDropPosition = { 
                x: gancho.x,  // Usar la posicion actual del gancho del servidor
                y: gancho.y + 50  // Ajustar segun la posicion del punto del gancho
            };
            
            console.log(`[SERVER] Soltando objeto en ${objectDropPosition.x}, ${objectDropPosition.y}`);

            // Notificar a todos los clientes que el objeto se ha soltado
            broadcast({
                type: 'objectDropped',
                x: objectDropPosition.x,
                y: objectDropPosition.y,
                objectType: currentObjectType
            });

            // Despues de un tiempo, generar un nuevo objeto
            setTimeout(() => {
                currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
                isObjectDropped = false;
                
                // Notificar a todos los clientes del nuevo objeto
                broadcast({
                    type: 'nextObject',
                    objectType: currentObjectType
                });
            }, 800);
          }
        }

      });

    });
  }