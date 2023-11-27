const express = require('express')
const courseModel = require('../models/courseModel')
const mongoose = require('mongoose')
const router = express.Router()

//CONSULTAR
router.get('/' , async (req , res) => {

    try {
        const courses = await courseModel.find()
        if(courses.length === 0){
            res.status(400).json({
                success:false,
                msg: 'No hay cursos'
            })
        } else {
            res.status(200).json({
                success:true,
                data: courses
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
    try {
        const course = await courseModel.findById(req.params.id)
        if (!course) {
            res.status(400).json({
                success:false,
                msg: 'El curso no existe'
            })
        } else {
            res.status(200).json({
                success:true,
                data: course
            })
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
        const newCourse = await courseModel.create(req.body)

            res.status(201).json({
                success:true,
                data: newCourse
            })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `${error.mensage}`
        })
    }    
})

//EDITAR
router.put('/:id' , async(req , res) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const course = await courseModel.findByIdAndUpdate(req.params.id,
                                                                req.body,
                                                                {
                                                                    new:true
                                                                })
            if (!course) {
                res.status(400).json({
                    success:false,
                    msg: `El curso no existe ${error.mensage}`
                })
            } else {
                res.json({
                    success:true,
                    data: course
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
router.delete('/:id' , async(req , res) => {
    try {
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            success:false,
            msg: 'id invalido'
        })
        } else {
            const course = await courseModel.findByIdAndDelete(req.params.id)
            if (!course){
                res.status(400).json({
                    success:false,
                    msg: 'El curso no existe'
                })
            } else {
                res.json({
                    success:true,
                    data: course
                })
            }  
        } 
    } catch (error) {
        res.status(500).json({
            success:false,
            msg: `${error.mensage}`
        })
    }
    
    
})

module.exports = router