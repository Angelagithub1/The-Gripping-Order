import express from 'express';
import connectionRoutes from './routes/connectionRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/connected',connectionRoutes);
app.use('/users',UserRoutes);

app.listen(8080,()=>{
    console.log('Server is running on http://localhost:8080');
})
app.use((err, req, res, next) => {
  console.error(err.stack); // Esto imprimirá el error detallado en tu terminal [3]
  res.status(500).json({
    error: 'Error interno del servidor'
  });
});