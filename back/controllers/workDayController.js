const {
    response,
    request
} = require('express');
const Conexion = require('../database/workDayConexion');
const ConexionTimeZone = require('../database/timeZoneConexion');
const ConexionVolumes = require('../database/workDayTimeZoneVolumeConexion');
const ConexionRequest=require('../database/staffRequestConexion')
const ConexionAssignment=require('../database/assignmentConexion')
const listAllWorkDays = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDays()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllWorkDaysOfCompany = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllWorkDaysOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listWorkDayOfCompanyByDate = (req, res = response) => {
    const conexion = new Conexion()
    const conexionTimeZone = new ConexionTimeZone()
    conexion.getWorkDayOfCompanyByDate(req.params.id, req.params.date)
        .then(data => {

            console.log(data)

            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}
const listWorkDayOfCompanyOfMonth = (req, res = response) => {
    const conexion = new Conexion()

    const date = new Date(req.params.date);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    conexion.getWorkDayOfCompanyBetweenDates(req.params.id, firstDay, lastDay)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}
const listNextWorkDays = (req, res = response) => {
    const conexion = new Conexion()

    let today=new Date()
    const date = new Date(today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate());
    const firstDay = new Date(date.getFullYear(), date.getMonth()+1, date.getDate());
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()+5);

    conexion.getWorkDayOfCompanyBetweenDates(req.params.id, firstDay, lastDay)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}
const listWorkDay = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getWorkDayById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editWorkDay = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateFullWorkDay(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {

            res.status(203).json('Error al actualizar')
        });

}

const createWorkDay = (req, res = response) => {
    const conexion = new Conexion()
    const conexionTimeZone = new ConexionTimeZone()
    const conexionVolume = new ConexionVolumes()
    const conexionAssignment=new ConexionAssignment()
    const conexionRequest=new ConexionRequest()
    let id=0
    conexion.insertWorkDay(req.body)
        .then(async data => {
            id=data
            timeZones = await conexionTimeZone.getAllTimeZonesOfCompanyByDayOfWeek(
                req.body.idCompany, new Date(req.body.date).getDay())

            let list = []
            for (const t of timeZones) {
                list.push({idWorkDay:id,idTimeZone:t.id})
            }
            conexionVolume.insertMultiple(list).then(async data=>{
                try{

                    let awaitingRequests = await conexionRequest.getStaffRequestByDate(req.body.idCompany,req.body.date)
                    let acceptedRequest=awaitingRequests.filter(req=>req.status==1)
                    let assignmentList=[]
                    for(const request of acceptedRequest){
                        let newAssignment={
                            idUser:request.idUser,
                        idCompany:request.idCompany,
                        idWorkDay:id,
                        type:request.type
                    }
                    assignmentList.push(newAssignment)
                }
                let result= await conexionAssignment.insertMultiple(assignmentList)
                res.status(201).json('Insertado correctamente')
            }catch(e){
                res.status(201).json('Insertado correctamente')

            }
            })


        })
        .catch(err => {
            console.log(err)
            res.status(203).json(err)
        })
}

const removeWorkDay = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteWorkDay(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {

            res.status(203).json('Error en la eliminacion')
        })


}
const publish = (req, res = response) => {
    const conexion = new Conexion()

    let list = req.body
    for (const day of list) {
        day.published = true
    }
    conexion.updateListWorkDay(list)
        .then(data => {
            res.status(202).json('Actualizado correctamente')


        })
        .catch(err => {
            res.status(203).json('Error al actualizar')
        });

}

module.exports = {
    removeWorkDay,
    editWorkDay,
    createWorkDay,
    listAllWorkDays,
    listWorkDay,
    listAllWorkDaysOfCompany,
    listWorkDayOfCompanyByDate,
    listWorkDayOfCompanyOfMonth,
    publish,
    listNextWorkDays
}