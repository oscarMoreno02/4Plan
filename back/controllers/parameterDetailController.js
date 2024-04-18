const {
    response,
    request
} = require('express');
const Conexion = require('../database/parameterDetailConexion');


const listAllParameterDetails= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllParameterDetails()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listParameterDetail= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getParameterDetailById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editParameterDetail= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullParameterDetail(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createParameterDetail= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertParameterDetail(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeParameterDetail= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteParameterDetail(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}
const listAllParameterDetailsWithDataOfParameter= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllParameterDetailsWithDataOfParameter(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

module.exports={
   removeParameterDetail,
   editParameterDetail,
   createParameterDetail,
   listAllParameterDetails,
   listParameterDetail,
   listAllParameterDetailsWithDataOfParameter
}