const {
    response,
    request
} = require('express');
const Conexion = require('../database/staffRequestConexion');
const ConexionWorkDay = require('../database/workDayConexion');
const AssignmentConexion=require('../database/assignmentConexion');
const { Association } = require('sequelize');
const listAllStaffRequests= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllStaffRequests()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listStaffRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getStaffRequestById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}
const listAllStaffRequestsOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllStaffRequestsOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const editStaffRequest= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullStaffRequest(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}
const acceptStaffRequest= (req, res = response)=>{
    const conexion = new Conexion()
    let workDayConexion=new ConexionWorkDay()
    let assignmentConexion=new AssignmentConexion()
    let request=req.body
    request.status=1
    conexion.updateFullStaffRequest(req.params.id,request)
    .then(async data => {

        // let workday= await workDayConexion.getWorkDayOfCompanyByDate(req.body.date)
        workDayConexion.getWorkDayOfCompanyByDate(request.idCompany,request.date).then(async data=>{

            if(data!=null){

                let assignments=data.dayAssignments.filter(a=>a.idUser==request.idUser)

                for (const assignment of assignments){

                   await assignmentConexion.deleteAssignment(assignment.id)
                }

                let newAssignment={
                    idUser:request.idUser,
                    idCompany:request.idCompany,
                    idWorkDay:data.id,
                    type:request.type
                
                }
                let result =await assignmentConexion.insertAssignment(newAssignment)
                res.status(202).json('Actualizado Correctamente')


            }else{
                
                res.status(202).json('Actualizado Correctamente')
            }
        }).catch(err=>{
            console.log(err)
            res.status(203).json('Error al actualizar')

        })

        // res.status(202).json(date)

    })
    .catch(err => {
        console.log(err)
        res.status(203).json('Error al actualizar')
    });

}

const createStaffRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertStaffRequest(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeStaffRequest= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteStaffRequest(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}

const listStaffRequestByUser= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getStaffRequestByIdUser(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}

module.exports={
   removeStaffRequest,
   editStaffRequest,
   createStaffRequest,
   listAllStaffRequests,
   listStaffRequest,
   listAllStaffRequestsOfCompany,
   listStaffRequestByUser,
   acceptStaffRequest
}