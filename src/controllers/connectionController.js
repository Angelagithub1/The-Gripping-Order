const connectedUsers = new Map();

const connectionController =() => { //Controlador para gestionar las conexiones de los usuarios
    const checkConnection = (req, res) => { //Nueva conexión o actualización de estado

        const username = req.body.username;

        if(!connectedUsers.has(username)){
            console.log(`Nuevo cliente conectado:${username}`);
        }
        connectedUsers.set(username, Date.now());

        res.json({
            username: username,
            connected: connectedUsers.size
        })
        
    }
    const userConnected = (req, res) =>{    //Comprobar si un usuario está conectado
        console.log(`${req.params.username} consulta su estado de conexión ${connectedUsers.has(req.params.username)}`);
        res.json({
            connected: connectedUsers.has(req.params.username)
        })
    }
    const usersConnected = (req, res) =>{   //Obtener número de usuarios conectados
        res.json({
            users: connectedUsers.size
        })
    }
    setInterval(() => { //Limpiar usuarios desconectados
        const now = Date.now();
        for(const[user,lastSeen] of connectedUsers.entries()){
            if(now -lastSeen>2000){
                console.log(now -lastSeen)
                connectedUsers.delete(user);
                console.log(`Cliente desconectado:${user}`);
            }
        }
            
    },1000);

    return {
        checkConnection,
        userConnected,
        usersConnected
    };
};

export default connectionController;
