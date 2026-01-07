const ConfigurationController = () => { //Controlador para manejar las solicitudes de cambio de escena y seleccion de personajes
    let selectscene = false;
    let back = false;
    const playersready = new Set();
    const mapusers = new Map([
        ['ania', ''],
        ['gancho', '']]
    );


    const usersConfirmed = new Set();
    const requestChangeScreen = (req, res) => {
        const { username, actscene, next } = req.body; //next true es para siguiente y back para volver
        console.log(selectscene);
        if (next) {
            if (actscene === 'MenuPrincipal' && !selectscene) {
                // Si se esta en el menu principal y es la primera persona en darle a pasar a la escena de seleccion
                selectscene = true;
                res.json({ message: "Solicitud recibida" });
            } else if (actscene === 'MenuEleccionJugador') {
                // Si se esta en la seleccion de personaje y es la primera persona en darle a pasar a la escena de inicio
                if (playersready.has(username)) {
                    console.log("Solicitud ya recibida de antes")
                    res.status(409).json({ message: "Porfavor espere al otro jugador" });
                } else {
                    console.log("Solicitud ha llegado");
                    playersready.add(username);
                    res.status(201).json({ message: "Confirmacion recibida" });
                }
            }
        } else {
            //Si quiere volver a la pantalla de inicio
            back = true;
            res.json({ message: "Solicitud de volver recibida" })
        }

    };
    const canChangeScreen = (req, res) => {
        if (back) { //Si se ha mandado una solicitud de volver
            res.json({ canChange: 'MenuPrincipal' });
        } 
        if (playersready.size === 2) { //Si los dos jugadores estan listos para iniciar
            res.json({ canChange: 'PantallaJuego' });

        } 
        if (selectscene) { //Si ya se ha solicitado el paso a la escena de seleccion
            res.json({ canChange: 'MenuEleccionJugador' });
        } else {
            res.json({ canChange: '' }); 
        }
    };
    const setChangesCharacters = (req, res) => {
        const { username, ania } = req.body; //ania: true si eligió ania, false si eligió gancho
        if (ania) {
            //Se solicito escoger a ania
            if (mapusers.get('ania') == '') {
                //Si no se ha escogido antes a ania
                mapusers.set('ania', username)
                if (mapusers.get('gancho') == username) {
                    mapusers.set('gancho', '');
                }
                res.json({ message: "Eres ania" })
                //console.log("Solicitud llegada de una ania afirmativa")
            } else if (mapusers.get('ania') == username) {
                res.status(409).json({ message: "Ya eres Ania" })
            } else {
                res.status(409).json({ message: "Ania ya ha sido elegida" })
            }

        } else {
            //Se solicito escoger al gancho
            if (mapusers.get('gancho') == '') {
                //Si no se ha escogido antes a ania
                mapusers.set('gancho', username)
                if (mapusers.get('ania') == username) {
                    mapusers.set('ania', '');
                }
                res.json({ message: "Eres el gancho" })
            } else if (mapusers.get('gancho') == username) {
                res.status(409).json({ message: "Ya eres el gancho" })
            } else {
                res.status(409).json({ message: "El gancho ya ha sido elegido" })
            }
        }
    };
    const LimpiezaPorEliminacion = (req, res) => { //Limpieza de datos cuando se elimina un jugador
        const { actScene } = req.body
            console.log("Limpieza")
            back = false;
            selectscene = false;
            playersready.clear()
            mapusers.set('gancho', '');
            mapusers.set('ania', ''); 
    }
    const confirmChange = (req, res) => { //Confirmar que se ha cambiado de escena
        const { username, actScene } = req.body
        if (!usersConfirmed.has(username)) {
            usersConfirmed.add(username)
            if (usersConfirmed.size === 2) { //Si los dos usuarios han confirmado que cambiaron de escena
                usersConfirmed.clear();
                    console.log("Limpieza")
                    back = false;
                    selectscene = false;
                    playersready.clear()
                    mapusers.set('gancho', '');
                    mapusers.set('ania', '');
            } else if (usersConfirmed.size === 1) {
                //Si es solo uno
            }
            res.json({ message: "Confirmacion recibida" })
        } else {
            res.json({ message: "Confirmación ya registrada" })
        }
    }
    const choosen = (req, res) => { //Obtener los personajes elegidos
        res.json({
            ania: mapusers.get('ania'),
            gancho: mapusers.get('gancho'),
        })
    }
    const getCharacter = (req, res) => { //Obtener el personaje de un usuario
        const username = req.params.username
        if (mapusers.get('ania') == username) {
            res.json({ character: "ania" })
        } else if (mapusers.get('gancho') == username) {
            res.json({ character: "Gancho" })
        } else {
            console.log("No encontro al usuario")
            res.status(404);
        }
    }
    return { 
        shouldChangeScreen: canChangeScreen,
        requestScreenChange: requestChangeScreen,
        selectCharacter: setChangesCharacters,
        getSelectedCharacter: getCharacter,
        confirmScreenChange: confirmChange,
        chosenCharacters: choosen,
        cleanupOnDisconnect: LimpiezaPorEliminacion
    };
}
export default ConfigurationController;