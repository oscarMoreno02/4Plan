const {
    response,
    request
} = require('express');
const Conexion = require('../database/workPositionConexion');


const listAllWorkPositions= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkPositions()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllWorkPositionsOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkPositionsOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}


const listWorkPosition= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkPositionById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            
            res.status(404).json(err)
        })
}


const editWorkPosition= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullWorkPosition(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createWorkPosition= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertWorkPosition(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeWorkPosition= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkPosition(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeWorkPosition,
   editWorkPosition,
   createWorkPosition,
   listAllWorkPositions,
   listWorkPosition,
   listAllWorkPositionsOfCompany
}