const connectedUsers = new Map();

const connectionController =() => {
    const checkConnection = (req, res) => {

        const username = req.params.username;

        if(!connectedUsers.has(username)){
            console.log(`Nuevo cliente conectado:${username}`);
        }
        connectedUsers.set(username, Date.now());

        res.json({
            username: username,
            connected: connectedUsers.size
        })
    }
    const userConnected = (req, res) =>{
        console.log(`${req.params.username} consulta su estado de conexión ${connectedUsers.has(req.params.username)}`);
        res.json({
            connected: connectedUsers.has(req.params.username)
        })
    }
    setInterval(() => {
        const now = Date.now();
        for(const[user,lastSeen] of connectedUsers.entries()){
            if(now -lastSeen>2000){
                connectedUsers.delete(user);
                console.log(`Cliente desconectado:${user}`);
            }
        }
            
    },500);

    return {
        checkConnection,
        userConnected
    };
};

export default connectionController;
