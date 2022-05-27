const express = require('express');
const cors = require('cors');
require('dotenv').config();

// crear servidor
const app = express();

// directorio publico
app.use(express.static('public'));

// CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// asignar puerto de ejecucion
app.listen(process.env.PORT, ()=>{
    console.log(`servidor ejecutandose en el puerto ${process.env.PORT}`);
});

// rutas
app.use('/api/auth', require('./routes/auth'));


