import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import connectionRoutes from './routes/connectionRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import ConfigurationRoutes from './routes/ConfigurationRoutes.js';
import { initGameSocketController } from './WebSockets/gameSocketController.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static('public'));

app.use('/connected',connectionRoutes);
app.use('/users',UserRoutes);
app.use('/configuration',ConfigurationRoutes);

initGameSocketController(wss);

server.listen(8080,()=>{
    console.log('Server is running on http://localhost:8080');
})
app.use((err, req, res, next) => {
  console.error(err.stack); // Esto imprimirá el error en la consola
  res.status(500).json({
    error: 'Error interno del servidor'
  });
});