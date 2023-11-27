const mongoose = require('mongoose')

//Definir un modelo que trabaje para solo Mongo
const bootcampSchema = new mongoose.Schema({
    name : {
        type:String,
        unique: true,
        required: [true, "El Bootcamp ya esta repetido"],
        maxlenght: [20, "El nombre solo debe tener 20 caracteres"]
    },
    phone : {
        type: Number,
        required: ["El telefono ya esta repetido"],
        max: [9999999999, "El telefono solo debe tener 10 digitos"]
    },
    address : {
        type: String,
        required: ["Dirección requerida"]
    },
    topics : {
        type:[String],
        enum: [ "AI" , "Backend" , "Frontend" , "Devops" ]
    },
    averageRating : Number,
    createAt : {
        type: Date,
        required: [true, "Debe ingresarse fecha de creación"],
        default: Date.now
    }
})

const Bootcamp = mongoose.model( "Bootcamp", bootcampSchema )
module.exports = Bootcamp