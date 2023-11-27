const mongoose = require('mongoose')

//Definir un modelo que trabaje para solo Mongo
const reviewSchema = new mongoose.Schema({
    title : {
        type:String,
        unique: true,
        required: ["Favor de ingresar un titulo a la review"],
        maxlenght: [20, "Tu titulo no debe pasar de los 20 caracteres"]
    },
    comment : {
        type:String,
        required: ["Ingrese un comentario de minimo 5 caracteres"],
        minlenght: [5,"Tu comentario no pasa de los 5 caracteres"],
        maxlenght: [50, "Tu comentario no debe pasar de los 50 caracteres"]
    },
    rating : {
        type:Number,
        required: ["Dejar calificación del curso, por favor"],
        max: [10, "Puedes dejar una calificación del 1 al 10"]
    }
})

const Review = mongoose.model( "Review", reviewSchema )
module.exports = Review