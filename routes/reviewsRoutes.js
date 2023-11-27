const express = require('express')
const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const router = express.Router()

//CONSULTAR
router.get('/' , async (req , res) => {

    try {
        const reviews = await reviewModel.find()
        if(reviews.length === 0){
            res.status(400).json({
                success:false,
                msg: 'No hay reseñas'
            })
        } else {
            res.status(200).json({
                success:true,
                data: reviews
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
    try{
        const review = await reviewModel.findById(req.params.id)
        if (!review){
            res.status(400).json({
                success:false,
                msg: 'La reseña no existe'
            })
        } else {
            res.json({
            success:true,
            data: review
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
    const newReview = await reviewModel.create(req.body)
    
    res.status(201).json({
        success:true,
        data: newReview
    })
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
            res.status(400).json({
                success:false,
                msg: 'id invalido'
            })
        } else {
            const review = await reviewModel.findByIdAndUpdate(req.params.id,
                                                                req.body,
                                                                {
                                                                    new:true
                                                                })
            if (!review) {
                res.status(400).json({
                    success:false,
                    msg: `La review no existe ${error.mensage}`
                })
            } else {
                res.json({
                    success:true,
                    data: review
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
            const review = await reviewModel.findByIdAndDelete(req.params.id)
            if(!review){   
                res.status(400).json({
                    success:false,
                    msg: 'La review no existe'
                })
            } else{
                res.json({
                    success:true,
                    data: review
                })
            }
        }
    } catch {
        res.status(500).json({
            success:false,
            msg: `Error interno del servidor ${error.mensage}`
        })
    }
    
})

module.exports = router