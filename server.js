const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const conectarDB = require('./config/db')

//dependencias de rutas
const bootcampsRoutes = require('./routes/bootcampsRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const usersRoutes = require('./routes/usersRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')

//configurar variables de entorno
dotenv.config(
    {  path: './config/.env' }
)

conectarDB()

//construir el objeto app
const app = express()

app.use(express.json())

//vincular las rutas del proyecto
app.use('/bootcamps' , bootcampsRoutes)
app.use('/courses' , coursesRoutes)
app.use('/users' , usersRoutes)
app.use('/reviews' , reviewsRoutes)

//prueba de url
app.get('/prueba' , function(req , res) {
    res.send('Hola patron')
})

//prueba ruta parametrizada
app.get('/prueba/:id' , function(req , res) {
    res.send(`Parametro enviado: ${ req.params.id }`)
})

//Tomar variable puerto del entorno
const puerto = process.env.PUERTO


//servidor de desarrollo
app.listen( puerto , function() {
    console.log(`Servidor ejecutando... ${puerto}`.bgGreen.yellow.inverse)
} )