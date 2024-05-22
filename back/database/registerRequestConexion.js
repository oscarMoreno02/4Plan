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

class RegisterRequestConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllRegisterRequests = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.RegisterRequest.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getRegisterRequestById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.RegisterRequest.findByPk(id);
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
   
    insertRegisterRequest = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const RegisterRequest = new models.RegisterRequest(body);
            await RegisterRequest.save();
            return RegisterRequest.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteRegisterRequest = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.RegisterRequest.findByPk(id);
            if (!resultado) {
                throw error;
            }
            await resultado.destroy();
            return resultado;
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    updateFullRegisterRequest= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let RegisterRequest = await models.RegisterRequest.findByPk(id);
            await RegisterRequest.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    getAllRegisterRequestsOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.RegisterRequest.findAll({where:{idCompany:id},
                order: [
                    [ 'updatedAt', 'DESC'] 
                  ]});
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar()
        }
    }
}

module.exports = RegisterRequestConexion;