

require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');
const Conexion =require('./connection.js')
class UserConexion{
    constructor() {
 
        this.con= new Conexion()
    }
    checkLogin = async (email) => {

        this.con.conectar();
        let user = await models.User.findOne(({
            where: {
                email
            }
        }));

        this.con.desconectar();
        if (!user) {
            throw new Error('Email no registrado');
        }

        return user;
    }

    

    getAllUsuarios = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar();
        }
    }

    getUsuario = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findByPk(id);
            if (!resultado) {
                throw new Error('error');
            }
            return resultado;
        }catch(error){
            throw error
        }
        finally{
            this.con.desconectar()
        }
    }

    

 
}

module.exports = UserConexion;