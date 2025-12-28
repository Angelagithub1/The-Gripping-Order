import fs from 'fs';
//const usersConnected = new Set();
const UserController = () => {
    const skins = new Map([
        ['ania', 0],
        ['gancho', 0]]
    )

    const loginUser = (req, res) => { //Iniciar sesión de un usuario
        const { username, password } = req.params;
        const ruta = `./src/data/${username}.json`;
        if (!fs.existsSync(ruta)) {
            return res.status(404).json({ message: "Usuario no registrado" });
        }
        const usuario = JSON.parse(fs.readFileSync(ruta));
        if (usuario.password === password) {
            res.json({ message: "Inicio de sesión exitoso" });
            console.log(`Usuario conectado: ${username} - IP: ${req.ip || req.connection.remoteAddress}`);
        } else {
            res.status(401).json({ message: "Contraseña incorrecta" });
        }
    }
    const registerUser = (req, res) => { //Registrar un nuevo usuario
        const { username, password } = req.body;
        const ruta = `./src/data/${username}.json`;
        if (fs.existsSync(ruta)) {
            res.status(409).json({ message: "El usuario ya existe" });
        } else {
            const nuevousuario = {
                username: username,
                password: password,
                ania: 0,
                gancho: 0,
            };
            fs.writeFileSync(ruta, JSON.stringify(nuevousuario, null, 2));
            res.status(201).json({ message: "Usuario registrado exitosamente" });
            console.log(`Usuario conectado: ${username} - IP: ${req.ip || req.connection.remoteAddress}`);
        }

    }
    const deleteUser = (req, res) => { //Eliminar un usuario
        const { username, password } = req.body;

        const ruta = `./src/data/${username}.json`;
        if (!fs.existsSync(ruta)) {
            return res.status(404).json({ message: "Usuario no registrado" });
        }
        const usuario = JSON.parse(fs.readFileSync(ruta));
        if (usuario.password === password) {
            fs.unlinkSync(ruta);
            res.json({ message: "Usuario eliminado exitosamente" });
        } else {
            res.status(401).json({ message: "Contraseña incorrecta" });
        }
    }

    const changeSkinAnia = (req, res) => { //Cambiar skin de Ania
        const username = req.params.username;
        const skin = req.body.skin;
        const ruta = `./src/data/${username}.json`;
        if (!fs.existsSync(ruta)) {
            return res.status(404).json({ message: "Usuario no registrado" });
        }
        const usuario = JSON.parse(fs.readFileSync(ruta));
        usuario.ania = skin;
        skins.set('ania', skin)
        console.log("asignando skin a ania", skin, "nuevo valor:", skins.get('ania'))
        fs.writeFileSync(ruta, JSON.stringify(usuario, null, 2));
        res.json({ message: "Skin de Ania cambiada exitosamente" });

    }
    const changeSkinGancho = (req, res) => { //Cambiar skin de Gancho
        const username = req.params.username;
        const skin = req.body.skin;
        const ruta = `./src/data/${username}.json`;
        if (!fs.existsSync(ruta)) {
            return res.status(404).json({ message: "Usuario no registrado" });
        }
        const usuario = JSON.parse(fs.readFileSync(ruta));
        usuario.gancho = skin;
        skins.set('gancho', skin)
        console.log("asignando skin al gancho", skin, "nuevo valor:", skins.get('gancho'))

        fs.writeFileSync(ruta, JSON.stringify(usuario, null, 2));
        res.json({ message: "Skin de Gancho cambiada exitosamente" });

    }
    const getSkins = (req, res) => { //Obtener skins de un usuario
        const username = req.params.username
        const ruta = `./src/data/${username}.json`;
        if (!fs.existsSync(ruta)) {
            console.log(`${username} no encontrado`)
            return res.status(404).json({ message: "Usuario no registrado" });
        }

        const usuario = JSON.parse(fs.readFileSync(ruta));

        res.json({
            ania: usuario.ania,
            gancho: usuario.gancho
        })
    }
    const AllPlayersSkins = (req, res) => { //Obtener skins actuales de todos los jugadores
        res.json({
            AniaSkin: skins.get('ania'),
            GanchoSkin: skins.get('gancho')
        })
    }
    return {
        loginUser,
        registerUser,
        deleteUser,
        changeSkinAnia,
        changeSkinGancho,
        getSkins,
        AllPlayersSkins
    };

}

export default UserController;