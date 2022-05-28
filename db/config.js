const mongoose = require("mongoose");

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Erro al ejecutar la base de datos');
    }
}

module.exports = {
    dbConnection
}