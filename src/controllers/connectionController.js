
const connectedUsers = new Map();

const connectionController =() => {
    const checkConnection = (req, res) => {
        const ip = req.ip || req.connection.remoteAddress;

        if(!connectedUsers.has(ip)){
            console.log(`Nuevo cliente conectado:${ip}`);
        }
        connectedUsers.set(ip, Date.now());

        res.json({
            connected: connectedUsers.size
        })
    }

    setInterval(() => {
        const now = Date.now();
        for(const[ip,lastSeen] of connectedUsers.entries()){
            if(now -lastSeen>2000){
                connectedUsers.delete(ip);
                console.log(`Cliente desconectado:${ip}`);
            }
        }
            
    },500);

    return {
        checkConnection
    };
};

export default connectionController;
