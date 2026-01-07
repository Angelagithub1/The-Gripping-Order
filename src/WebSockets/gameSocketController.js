export const initGameSocketController = (wss) => {
  const ania = { x: 480, y: 270 };
  const gancho = { x: 480, y: 80 };

  // PowerUpActivoAnia
  const powerUpActivoAnia = '';

  // --- CRONÓMETRO ---
  const MATCH_DURATION_MS = 60_000;
  let matchStarted = false;
  let matchEnded = false;
  let endTime = 0;
  let partida =false;

  let timerIntervalId = null;   // IMPORTANTÍSIMO
  let joinedPlayers = 0;        // para arrancar con 2

  function broadcast(obj) {
    const msg = JSON.stringify(obj);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(msg);
    });
  }

  function startMatch() {
    // evita dobles arranques
    if (matchStarted) {
      console.log("startMatch ignorado (ya empezó)");
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

  // --- LOOP DE POSICIONES (SOLO POSICIONES) ---
  setInterval(() => {
    if (matchEnded) return;
    broadcast({
      type: 'playerPosition',
      Ania: ania,
      Gancho: gancho
    });
  }, 33);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      let data;
      try {
        data = JSON.parse(message);
      } catch (e) {
        console.log("Mensaje no JSON:", message);
        return;
      }

      //JOIN (arranque del match cuando haya 2)
      if (data.type === 'player_join') {
        joinedPlayers += 1;
        console.log("player_join. total:", joinedPlayers);

        if (joinedPlayers >= 2) {
            console.log("startMatch")
            startMatch();
            
        }
        return;
      }

      // Movimiento (lo de tu compi)
      if (data.type === 'updatePosition') {
        if (data.character) {
          if (powerUpActivoAnia === 'Congelación') {
            return;
          }

          if (ania.x !== data.x || ania.y !== data.y) {
            ania.x = data.x;
            ania.y = data.y;
          }
        } else {
          if (gancho.x !== data.x || gancho.y !== data.y) {
            gancho.x = data.x;
            gancho.y = data.y; // por si acaso también enviáis y
          }
        }
        return;
      }

      // (Opcional) si queréis arrancar por mensaje de escena:
      // if (data.type === 'start_match') startMatch();
    });

    ws.on('close', () => {
      joinedPlayers = Math.max(0, joinedPlayers - 1);

      // Opcional: si se va alguien, puedes terminar la partida
      // if (matchStarted && !matchEnded) {
      //   matchEnded = true;
      //   broadcast({ type: "matchEnd", reason: "disconnect" });
      // }
    });
  });
};
