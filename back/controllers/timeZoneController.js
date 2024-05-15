const {
    response,
    request
} = require('express');
const Conexion = require('../database/timeZoneConexion');


const listAllTimeZones= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllTimeZones()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllTimeZonesOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllTimeZonesOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllTimeZonesOfCompanyBydDayOfWeek= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllTimeZonesOfCompanyByDayOfWeek(req.params.id,req.params.day)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listTimeZone= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getTimeZoneById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editTimeZone= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullTimeZone(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createTimeZone= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertTimeZone(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeTimeZone= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteTimeZone(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeTimeZone,
   editTimeZone,
   createTimeZone,
   listAllTimeZones,
   listTimeZone,
   listAllTimeZonesOfCompany,
   listAllTimeZonesOfCompanyBydDayOfWeek
}