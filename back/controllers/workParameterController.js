const {
    response,
    request
} = require('express');
const Conexion = require('../database/workParameterConexion');


const listAllWorkParameters= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkParameters()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllWorkParametersWithTimeZoneOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkParametersWithTimeZoneOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listWorkParameter= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkParameterById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editWorkParameter= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullWorkParameter(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createWorkParameter= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertWorkParameter(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeWorkParameter= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkParameter(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeWorkParameter,
   editWorkParameter,
   createWorkParameter,
   listAllWorkParameters,
   listWorkParameter,
   listAllWorkParametersWithTimeZoneOfCompany
}