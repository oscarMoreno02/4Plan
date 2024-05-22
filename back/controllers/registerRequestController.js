const {
    response,
    request
} = require('express');
const Conexion = require('../database/registerRequestConexion');


const listAllRegisterRequests= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllRegisterRequests()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listRegisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getRegisterRequestById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}
const listAllRegisterRequestsOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllRegisterRequestsOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const editRegisterRequest= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullRegisterRequest(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createRegisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertRegisterRequest(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeRegisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteRegisterRequest(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeRegisterRequest,
   editRegisterRequest,
   createRegisterRequest,
   listAllRegisterRequests,
   listRegisterRequest,
   listAllRegisterRequestsOfCompany
}