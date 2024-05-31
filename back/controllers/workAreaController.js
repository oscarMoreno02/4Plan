const {
    response,
    request
} = require('express');
const Conexion = require('../database/workAreaConexion');


const listAllWorkAreas= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkAreas()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listWorkArea= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkAreaById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            
            res.status(404).json(err)
        })
}
const listAllWorkAreasOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkAreasOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const editWorkArea= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullWorkArea(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createWorkArea= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertWorkArea(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeWorkArea= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkArea(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeWorkArea,
   editWorkArea,
   createWorkArea,
   listAllWorkAreas,
   listWorkArea,
   listAllWorkAreasOfCompany
}