const {
    response,
    request
} = require('express');
const Conexion = require('../database/workDayConexion');


const listAllWorkDays= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDays()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllWorkDaysOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDaysOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listWorkDayOfCompanyByDate= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkDayOfCompanyByDate(req.params.id,req.params.date)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}
const listWorkDayOfCompanyOfMonth= (req, res = response) => {
    const conexion = new Conexion()

    const date = new Date(req.params.date);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); 

    conexion.getWorkDayOfCompanyBetweenDates(req.params.id,firstDay,lastDay)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}
const listWorkDay= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkDayById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editWorkDay= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullWorkDay(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createWorkDay= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertWorkDay(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeWorkDay= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkDay(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })

    
}
const publish= (req, res = response)=>{
    const conexion = new Conexion()

    let list=req.body
    for (const day of list){
        day.published=true
    }
    conexion.updateListWorkDay(list)
    .then(data => {
        res.status(202).json('Actualizado correctamente')


    })
    .catch(err => {
        res.status(203).json('Error al actualizar')
    });

}

module.exports={
   removeWorkDay,
   editWorkDay,
   createWorkDay,
   listAllWorkDays,
   listWorkDay,
   listAllWorkDaysOfCompany,
   listWorkDayOfCompanyByDate,
   listWorkDayOfCompanyOfMonth,
   publish
}