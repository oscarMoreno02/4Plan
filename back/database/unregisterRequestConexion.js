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

class UnregisterRequestConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllUnregisterRequests = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.UnregisterRequest.findAll({
                include:[{
                    attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany'],
                    model: models.User,
                    as: 'user',
                    
                }]
            });
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getUnregisterRequestById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.UnregisterRequest.findByPk(id,{
                include:[{
                    attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany'],
                    model: models.User,
                    as: 'user',
                    
                }]
            });
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
   
    insertUnregisterRequest = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const UnregisterRequest = new models.UnregisterRequest(body);
            await UnregisterRequest.save();
            return UnregisterRequest.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteUnregisterRequest = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.UnregisterRequest.findByPk(id);
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
    updateFullUnregisterRequest= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let UnregisterRequest = await models.UnregisterRequest.findByPk(id);
            await UnregisterRequest.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    getAllUnregisterRequestsOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.UnregisterRequest.findAll({where:{idCompany:id},
                order: [
                    [ 'updatedAt', 'DESC'] 
                  ],
                include:[{
                    attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany'],
                    model: models.User,
                    as: 'user',
                    
                }]});
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar()
        }
    }
}

module.exports = UnregisterRequestConexion;