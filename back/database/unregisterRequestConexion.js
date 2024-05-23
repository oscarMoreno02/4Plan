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
/**
 * The function `listUnregisterRequest` retrieves an unregister request by ID from a database and sends
 * the data as a JSON response.
 * @param req - The `req` parameter in the `listUnregisterRequest` function is an object that
 * represents the HTTP request. It contains information about the request made by the client, such as
 * the request headers, parameters, body, and other relevant data. In this function, `req` is used to
 * extract
 * @param [res] - The `res` parameter in the `listUnregisterRequest` function is the response object
 * that is used to send a response back to the client in an Express route handler. It is typically
 * provided by Express and contains methods for sending various HTTP responses. In this case, it is set
 * to a default
 */
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
    getUnregisterRequestActiveByIdUser = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.UnregisterRequest.findAll({where:{idUser:id,status:[Op.in,[1,0]]},
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