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

class StaffRequestConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllStaffRequests = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.StaffRequest.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getStaffRequestById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.StaffRequest.findByPk(id);
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
   
    insertStaffRequest = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const StaffRequest = new models.StaffRequest(body);
            await StaffRequest.save();
            return StaffRequest.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteStaffRequest = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.StaffRequest.findByPk(id);
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
    updateFullStaffRequest= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let StaffRequest = await models.StaffRequest.findByPk(id);
            await StaffRequest.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    getAllStaffRequestsOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.StaffRequest.findAll({where:{idCompany:id},
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

    getStaffRequestByIdUser = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.StaffRequest.findAll({where:{idUser:id},
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
    getStaffRequestByDate = async (id, date) => {
        try {
          
            this.con.conectar();

            const resultado = await models.StaffRequest.findAll({
                where: {
                  idCompany: id,
                  date: date,
                },
              });
            return resultado;
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
}

module.exports = StaffRequestConexion;