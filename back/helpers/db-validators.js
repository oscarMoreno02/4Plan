const {response,request} = require('express');
const Conexion = require('../database/userConexion');



const emailExist = (email = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.checkLogin(email)
        .then(msg => {
          reject(new Error('Email registrado'));
        })
        .catch(err => {
          resolve(true);
        });
    });
   };


 
module.exports = {
    emailExist,

}

