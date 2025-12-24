// Paso de pantalla al mismo tiempo
// Si puede elegir un personaje o no

const ConfigurationController = () => {
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
        //const { actscene } = req.body;
        if (back) { //Si se ha mandado una solicitud de volver
            res.json({ canChange: 'MenuPrincipal' });
        } else if (playersready.size === 2) { //Si los dos jugadores estan listos para iniciar
            res.json({ canChange: 'PantallaJuego' });

        } else if (selectscene) { //Si ya se ha solicitado el paso a la escena de seleccion
            res.json({ canChange: 'MenuEleccionJugador' });
        } else {
            res.json({ canChange: '' }); //No se puede cambiar de pantalla aun
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
                //console.log("Solicitud llegada de un gancho afirmativa")
            } else if (mapusers.get('gancho') == username) {
                res.status(409).json({ message: "Ya eres el gancho" })
            } else {
                res.status(409).json({ message: "El gancho ya ha sido elegido" })
            }
        }
    };
    const confirmChange = (req, res) => {
        const { username, actScene } = req.body
        if (!usersConfirmed.has(username)) {
            usersConfirmed.add(username)
            if (usersConfirmed.size === 2) { //Si los dos usuarios han confirmado que cambiaron de escena
                usersConfirmed.clear();
                if (actScene == 'MenuPrincipal') { //Se reinician los datos de seleccion si es que volvio a menu principal
                    back = false;
                    selectscene = false;
                } else if (actScene == 'MenuEleccionJugador') { //Se reinician los datos para cambiar a selectscene si esta ya
                    selectscene = false;
                    back = false;
                }
                if (actScene != 'MenuEleccionJugador') {
                    console.log("Limpieza")
                    mapusers.set('gancho', '');
                    mapusers.set('ania', '');
                    playersready.clear()
                }
            }
            res.json({ message: "Confirmacion recibida" })
        } else {
            res.json({ message: "Confirmación ya registrada" })
        }
    }
    const choosen = (req, res) => {
        res.json({
            ania: mapusers.get('ania'),
            gancho: mapusers.get('gancho'),
        })
    }
    const resetParams = () => {
        selectscene = false;
        playersready.clear();
        mapusers.clear();
    }
    return {
        canChangeScreen,
        requestChangeScreen,
        setChangesCharacters,
        resetParams,
        confirmChange,
        choosen
    };
}
export default ConfigurationController;