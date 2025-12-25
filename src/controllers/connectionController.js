const connectedUsers = new Map();

const connectionController =() => {
    const checkConnection = (req, res) => {

        const username = req.body.username;

        if(!connectedUsers.has(username)){
            console.log(`Nuevo cliente conectado:${username}`);
        }
        connectedUsers.set(username, Date.now());
        //console.log(username,"enviando mensaje")

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
    const usersConnected = (req, res) =>{
        res.json({
            users: connectedUsers.size
        })
    }
    setInterval(() => {
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
