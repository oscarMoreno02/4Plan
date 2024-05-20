const {
    response,
    request
} = require('express');
const Conexion = require('../database/workDayTimeZoneVolumeConexion');


const listAllWorkDayTimeZoneVolumes= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDayTimeZoneVolumes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listWorkDayTimeZoneVolume= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkDayTimeZoneVolumeById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}
const listAllWorkDayTimeZoneVolumeByWorkDay= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDayTimeZoneVolumeByWorkDay(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}

const editWorkDayTimeZoneVolume= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullWorkDayTimeZoneVolume(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createWorkDayTimeZoneVolume= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertWorkDayTimeZoneVolume(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeWorkDayTimeZoneVolume= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkDayTimeZoneVolume(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeWorkDayTimeZoneVolume,
   editWorkDayTimeZoneVolume,
   createWorkDayTimeZoneVolume,
   listAllWorkDayTimeZoneVolumes,
   listWorkDayTimeZoneVolume,
   listAllWorkDayTimeZoneVolumeByWorkDay
}