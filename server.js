const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB exitosamente'))
  .catch(err => console.error('Error conectando a MongoDB:', err));
//Rutas de la API

//Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Rutas de pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);


const port = process.env.PORT;

//'0.0.0.0' permite conexiones desde emulador/dispositivo, no solo desde el propio PC
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});