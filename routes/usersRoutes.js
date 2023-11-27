const express = require('express')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const router = express.Router()

//CONSULTAR
router.get('/' , async (req , res) => {

    //Traigo todos los usuarios
    try{
        const users = await userModel.find()
        if (users.length === 0) {
            res.status(400).json({
                success:false,
                msg: 'No hay usuarios'
            })
        } else {
            res.status(200).json({
                success:true,
                data: users
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }
})

router.get('/:id' , async (req , res) => {

    //Traer un user por id
    try {
        //Validar id para mongoose
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const user = await userModel.findById(req.params.id)
            if (!user) {
                res.status(400).json({
                    success:false,
                    msg: 'El usuario no existe'
                })
            } else {
                res.status(200).json({
                    success:true,
                    data: user
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }   
})

//CREAR
router.post('/' , async (req , res) => {

    try {
        const newUser = await userModel.create(req.body)
        res.status(201).json({
            success:true,
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }    
})

//REGISTER
router.post('/register' , async (req , res) => {

    try {
        const User = await userModel.create(req.body)
        res.status(201).json({
            success:true,
            data: User
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error: `${error.mensage}`
        })
    }    
})

//LOGIN
router.post('/login' , async (req , res) => {

    try {
        //Separar email y password
        const {email, Password} = req.body

        //buscar usuario con email
        const User = await userModel.findOne({email}).select("+Password")
        console.log(User)
        if(!User){
            res.status(404).json({
                success: false,
                msg: 'User not found'
            })
        } else {
            //Comparar Password
            const isMatch = await User.compararPassword(Password)
            if(isMatch){
                res.status(200).json({
                    success:true,
                    msg: 'Usuario logeado correctamente'
                })
            } else {
                res.status(401).json({
                    success:false,
                    msg:'Credenciales invalidas'
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }    
})

//EDITAR
router.put('/:id' , async (req , res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            
        } else {
            const user = await userModel.findByIdAndUpdate(req.params.id,
                                                            req.body,
                                                            {
                                                                new:true
                                                            })
            if (!user) {
                res.status(400).json({
                    success:false,
                    msg: `El bootcamp no existe ${error.mensage}`
                })
            } else {
                res.json({
                    success:true,
                    data: user
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }

})

//ELIMINAR
router.delete('/:id' , async (req , res) => {

    try{

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const user = await userModel.findByIdAndDelete(req.params.id)
            if (!user){
                res.status(400).json({
                    success:false,
                    msg: 'El usuario no existe'
                })
            } else {
                res.json({
                    success:true,
                    data: user
                }) 
            }    
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }
        
})

module.exports = router