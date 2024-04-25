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

class WorkParameterConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllWorkParameters = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkParameter.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
     
            this.con.desconectar()
        }
    }
    getAllWorkParametersWithTimeZoneOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkParameter.findAll({
                where:{idCompany:id},
                include: [{
                    model: models.TimeZone,
                    as: 'timeZone',
                    include: [{
                        model: models.DayTimeZone,
                        as: 'days',
                    }, ]
                }, ]
            });
            return resultado;
        }catch(error){
            console.log(error)
          throw error
        }finally{
     
            this.con.desconectar()
        }
    }
    getWorkParameterById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.WorkParameter.findByPk(id);
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
   
    insertWorkParameter = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const WorkParameter = new models.WorkParameter(body);
            await WorkParameter.save();
            return WorkParameter.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteWorkParameter = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.WorkParameter.findByPk(id);
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
    updateFullWorkParameter= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let WorkParameter = await models.WorkParameter.findByPk(id);
            await WorkParameter.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = WorkParameterConexion;