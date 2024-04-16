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

class TimeZoneConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllTimeZones = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.TimeZone.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getAllTimeZonesOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.TimeZone.findAll({where:{idCompany:id}});
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getTimeZoneById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.TimeZone.findByPk(id);
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
   
    insertTimeZone = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const TimeZone = new models.TimeZone(body);
            await TimeZone.save();
            return TimeZone.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteTimeZone = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.TimeZone.findByPk(id);
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
    updateFullTimeZone= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let TimeZone = await models.TimeZone.findByPk(id);
            await TimeZone.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = TimeZoneConexion;