export const initGameSocketController = (wss) => {
    const ania = { x: 480, y: 270 };
    const gancho = { x: 480, y: 80 };

    // Estados de Ania
    let aniaLives = 3;
    let gameOver = false;
    let aniaInvulnerable = false;
    let aniaInvulnerableTimer = null;

    //PowerUpActivoAnia
    const powerUpActivoAnia = '';
    let indexAct = 0;

    // Sistema de PowerUps
    const powerUps = new Map(); // id -> { id, type, x, y, active }
    const poweUpTypes = ['PowerUpAmarillo', 'PowerUpVerde', 'PowerUpAzul', 'PowerUpRojo'];
    const MAX_ACTIVE_POWERUPS = 2;
    let nextPowerUpId = 1;

    // Sistema de Objetos
    const tiposObjetos = ['Ataud', 'guadana', 'hueso', 'libro'];
    let currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
    let isObjectDropped = false;
    let objectDropPosition = { x: 0, y: 0 };

    // Función para dañar a Ania
    function damageAnia() {
        if (gameOver || aniaInvulnerable || powerUpActivoAnia === 'Congelación') return;
        
        aniaLives--;
        console.log(`[SERVER] Ania golpeada. Vidas restantes: ${aniaLives}`);
        
        // Enviar actualización de vidas a todos los clientes
        broadcast({
            type: 'ania_life_update',
            lives: aniaLives,
            invulnerable: true
        });
        
        // Activar invulnerabilidad temporal
        aniaInvulnerable = true;
        if (aniaInvulnerableTimer) {
            clearTimeout(aniaInvulnerableTimer);
        }
        aniaInvulnerableTimer = setTimeout(() => {
            aniaInvulnerable = false;
            broadcast({
                type: 'ania_invulnerable_end'
            });
        }, 2000);
        
        // Verificar si el juego ha terminado
        if (aniaLives <= 0) {
            gameOver = true;
            console.log('[SERVER] Juego terminado. Ganador: Gancho');
            broadcast({
                type: 'game_over',
                winner: 'Gancho',
                reason: 'Ania se queda sin vidas'
            });
        }
    }

    // Función de broadcast
    function broadcast(obj){
        const msg = JSON.stringify(obj);
        wss.clients.forEach(c => {
            if (c.readyState === 1) {
                c.send(msg);
            }
        });
    }

    // Funciones de PowerUps
    function getActivePowerUpCount() {
        let count = 0;
        for (const pu of powerUps.values()) {
            if (pu.active) count++;
        }
        return count;
    }

    function spawnPowerUp() {
        const activeCount = getActivePowerUpCount();
        if (activeCount >= MAX_ACTIVE_POWERUPS) {
            console.log('[SERVER] spawn skipped, activeCount >=', MAX_ACTIVE_POWERUPS);
            return;
        }
        const x = 200 + Math.floor(Math.random() * 500);
        const y = 100 + Math.floor(Math.random() * 300);
        const type = poweUpTypes[Math.floor(Math.random() * poweUpTypes.length)];
        const id = String(nextPowerUpId++);
        powerUps.set(id, { id, type, x, y, active: true });

        console.log('[SERVER] spawn_powerup', { id, x, y, type });
        broadcast({ type: 'spawn_powerup', id, x, y, puType: type });
    }

    function startSpawnLoop() {
        const delay = 10000 + Math.random() * 10000;
        setTimeout(() => {
            spawnPowerUp();
            startSpawnLoop();
        }, delay);
    }

    function startEffect(effect) {
        broadcast({ type: 'powerup_started', playerId: 'Ania', effect, duration: 5000 });

        // Efecto de invulnerabilidad
        if (effect === 'invulnerable') {
            aniaInvulnerable = true;
            setTimeout(() => {
                aniaInvulnerable = false;
            }, 5000);
        }

        setTimeout(() => {
            broadcast({ type: 'powerup_ended', playerId: 'Ania', effect });
        }, 5000);
    }

    function effectFromType(type) {
        switch (type) {
            case 'PowerUpAmarillo': return 'freeze';
            case 'PowerUpVerde': return 'speed';
            case 'PowerUpAzul': return 'double_jump';
            case 'PowerUpRojo': return 'invulnerable';
            default: return '';
        }
    }

    function destroyPowerUp(id, reason = 'collision') {
        const pu = powerUps.get(id);
        if (pu && pu.active) {
            pu.active = false;
            console.log(`[SERVER] Destroying powerup ${id} due to ${reason}`);
            
            broadcast({ 
                type: 'remove_powerup', 
                id: pu.id, 
                x: pu.x, 
                y: pu.y, 
                puType: pu.type 
            });
            
            return true;
        }
        return false;
    }
    // Iniciar spawn de powerups
    startSpawnLoop();

    setInterval(() => {
        // Se envía las posiciones a todos los clientes si hubo un cambio
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: 'playerPosition',
                    Ania: ania,
                    Gancho: gancho,
                    Index: indexAct++,
                    currentObjectType: currentObjectType,
                    isObjectDropped: isObjectDropped,
                    objectDropPosition: objectDropPosition,
                }));
            }
        });

    }, 33);
    
    wss.on('connection', (ws) => {
        
        // Enviar estado inicial de Ania
        ws.send(JSON.stringify({
            type: 'ania_initial_state',
            lives: aniaLives
        }));
        
        // Enviar powerups activos al nuevo cliente
        for (const pu of powerUps.values()) {
            if (pu.active) {
                ws.send(JSON.stringify({ 
                    type: 'spawn_powerup', 
                    id: pu.id, 
                    x: pu.x, 
                    y: pu.y, 
                    puType: pu.type 
                }));
            }
        }

        // Enviar información del objeto actual al nuevo cliente
        ws.send(JSON.stringify({
            type: 'initObject',
            objectType: currentObjectType,
        }));

        ws.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'updatePosition') {
                // Actualizar posición
                if (data.character) {
                    // Mantener la lógica original de congelación
                    if (powerUpActivoAnia == 'Congelación') {
                        // Si se envía una posición cuando está congelado no se actualiza
                        return;
                    }
                    if (ania.x !== data.x || ania.y !== data.y) {
                        ania.x = data.x;
                        ania.y = data.y;

                        // Detección de recogida de powerup por proximidad (Ania)
                        for (const pu of powerUps.values()) {
                            if (!pu.active) continue;
                            
                            const distance = Math.sqrt(
                                Math.pow(ania.x - pu.x, 2) + 
                                Math.pow(ania.y - pu.y, 2)
                            );
                            
                            if (distance < 30) {
                                destroyPowerUp(pu.id, 'ania_collect');
                                startEffect(effectFromType(pu.type));
                            }
                        }
                    }
                } else {
                    if (gancho.x !== data.x || gancho.y !== data.y) {
                        gancho.x = data.x;
                        gancho.y = data.y;
                    }
                }
            }
            else if (data.type === 'powerup_y_positions') {
                for (const pos of data.positions) {
                    const pu = powerUps.get(pos.id);
                    if (pu && pu.active) {
                        pu.y = pos.y; // Solo actualizamos Y
                    }
                }
            }
            else if (data.type === 'object_hit_powerup') {
                // Cliente reporta colisión entre objeto y powerup
                const powerUpId = String(data.powerUpId);
                const objectX = data.objectX;
                const objectY = data.objectY;
            
                // Verificar que el powerup existe y está activo
                const pu = powerUps.get(powerUpId);
                if (pu && pu.active) {
                    // Verificar proximidad usando radio de colisión más realista
                    const distance = Math.sqrt(
                        Math.pow(objectX - pu.x, 2) + 
                        Math.pow(objectY - pu.y, 2)
                    );
                    
                    const collisionRadius = 60; // Radio de colisión ajustado para objetos medianos
                    
                    if (distance < collisionRadius) {
                        console.log(`[SERVER] Destruyendo powerup ${powerUpId} en (${objectX}, ${objectY})`);
                        destroyPowerUp(powerUpId, 'object_collision');
                        
                        ws.send(JSON.stringify({
                            type: 'powerup_destroyed',
                            id: powerUpId,
                            reason: 'object_collision'
                        }));
                    }
                }
            }
            else if (data.type === 'ania_hit') {
                // Cliente reporta que Ania fue golpeada por un objeto
                console.log('[SERVER] Ania fue golpeada por un objeto');
                damageAnia();
            }
            else if (data.type === 'requestDrop') {
                // El gancho solicita soltar el objeto
                if (!isObjectDropped) {
                    isObjectDropped = true;
                    objectDropPosition = { 
                        x: gancho.x,
                        y: gancho.y + 50
                    };
                    
                    console.log(`[SERVER] Soltando objeto en ${objectDropPosition.x}, ${objectDropPosition.y}`);

                    broadcast({
                        type: 'objectDropped',
                        x: objectDropPosition.x,
                        y: objectDropPosition.y,
                        objectType: currentObjectType
                    });

                    setTimeout(() => {
                        currentObjectType = tiposObjetos[Math.floor(Math.random() * tiposObjetos.length)];
                        isObjectDropped = false;
                        
                        broadcast({
                            type: 'nextObject',
                            objectType: currentObjectType
                        });
                    }, 800);
                }
            }
        });
    });

    wss.on('close', () => {

    })

}