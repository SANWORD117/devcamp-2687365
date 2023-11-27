const mongoose = require('mongoose')

//Función de conexión
const conectarDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB conectado...".bgRed.green)
}

module.exports = conectarDB
