const bcryptjs = require('bcrypt')
const mongoose = require('mongoose')

//Definir un modelo que trabaje para solo Mongo
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        unique: true,
        required: [true, "El usuario ya existe"],
        maxlenght: [20, "El nombre de usuario solo debe tener 20 caracteres"]
    },
    email : {
        type: String,
        unique: true,
        required: [true, "El correo ya esta siendo usado"],
    },
    address : {
        type: String,
        required: [true, "Dirección requerida"]
    },
    role : String,
    Password : {
        type: String,
        unique: true,
        required: [true, "La contraseña no esta disponible"],
        maxlenght: [20, "La contraseña solo debe tener 20 caracteres"]
    }
})

userSchema.pre('save', async function(next){
    //generar la sal para la password
    const sal = await bcryptjs.genSalt(10)
    //crear clave encriptada con sal y asignar password a la entidad
    this.Password = await bcryptjs.hash(this.Password , sal)

})

userSchema.methods.compararPassword = async function(Password){
    return await bcryptjs.compare(Password, this.Password)
}

const User = mongoose.model( "User", userSchema )
module.exports = User