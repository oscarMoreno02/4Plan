const {
    response,
    request
} = require('express');
const Conexion = require('../database/assignmentConexion');


const listAllAssignments= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllAssignments()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listAllAssignmentsOfWorkDay= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllAssignmentsOfWorkday(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listAssignment= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAssignmentById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}


const editAssignment= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullAssignment(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createAssignment= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertAssignment(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeAssignment= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteAssignment(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeAssignment,
   editAssignment,
   createAssignment,
   listAllAssignments,
   listAssignment,
   listAllAssignmentsOfWorkDay
}