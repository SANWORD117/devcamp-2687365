const express = require('express')
const bootcampModel = require('../models/bootcampModel')
const mongoose = require('mongoose')
const router = express.Router()

//CONSULTAR
router.get('/' , async (req , res) => {

    //Traigo todos los bootcamps
    try {
        const bootcamps = await bootcampModel.find()
        if(bootcamps.length === 0){
            res.status(400).json({
                success:false,
                msg: 'No hay bootcamps'
            })
        } else {
            res.status(200).json({
                success:true,
                data: bootcamps
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

    //Traer un bootcamp por id
    try {
        //Validar id para mongoose
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const bootcamp = await bootcampModel.findById(req.params.id)
            if (!bootcamp) {
                res.status(400).json({
                    success:false,
                    msg: 'El bootcamp no existe'
                })
            } else {
                res.status(200).json({
                    success:true,
                    data: bootcamp
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

    try{
        const newBootcamp = await bootcampModel.create(req.body)
            
        res.status(201).json({
            success:true,
            data: newBootcamp
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `${error.mensage}`
        })
    }
})

//EDITAR
router.put('/:id' , async (req , res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const bootcamp = await bootcampModel.findByIdAndUpdate(req.params.id, 
                                                                    req.body,
                                                                    {
                                                                        new:true
                                                                    })
            if (!bootcamp) {
                res.status(400).json({
                    success:false,
                    msg: `El bootcamp no existe ${error.mensage}`
                })
            } else {
                res.json({
                    success:true,
                    data: bootcamp
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

    try {
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const bootcamp = await bootcampModel.findByIdAndDelete(req.params.id)
            if (!bootcamp) {
                res.status(400).json({
                    success:false,
                    msg: 'El bootcamp no existe'
                })
            } else {
                res.json({
                    success:true,
                    data: bootcamp
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