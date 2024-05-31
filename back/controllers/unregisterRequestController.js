const {
    response,
    request
} = require('express');
const Conexion = require('../database/unregisterRequestConexion');


const listAllUnregisterRequests= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllUnregisterRequests()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listUnregisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getUnregisterRequestById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            
            res.status(404).json(err)
        })
}
const listUnregisterRequestActiveByUser= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getUnregisterRequestActiveByIdUser(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            
            res.status(404).json(err)
        })
}
const listAllUnregisterRequestsOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllUnregisterRequestsOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const editUnregisterRequest= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullUnregisterRequest(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createUnregisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertUnregisterRequest(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeUnregisterRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteUnregisterRequest(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeUnregisterRequest,
   editUnregisterRequest,
   createUnregisterRequest,
   listAllUnregisterRequests,
   listUnregisterRequest,
   listAllUnregisterRequestsOfCompany,
   listUnregisterRequestActiveByUser
}