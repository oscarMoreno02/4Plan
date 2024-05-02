const {
    response,
    request
} = require('express');
const Conexion = require('../database/userConexion');


const listAllUsers= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllOfUsersOfCompany= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllUsersOfCompany(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listAllUsersWithAssignments= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllUsersWithAssignments(req.params.date)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listUser= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getUser(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
}



const editUser= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullUser(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createUser= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertUser(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeUser= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteUser(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}


module.exports={
   removeUser,
   editUser,
   createUser,
   listAllUsers,
   listUser,
   listAllOfUsersOfCompany,
   listAllUsersWithAssignments
}