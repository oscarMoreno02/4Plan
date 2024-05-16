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

class WorkDayTimeZoneVolumeConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllWorkDayTimeZoneVolumes = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkDayTimeZoneVolume.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkDayTimeZoneVolumeById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.WorkDayTimeZoneVolume.findByPk(id);
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
   
    insertWorkDayTimeZoneVolume = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const WorkDayTimeZoneVolume = new models.WorkDayTimeZoneVolume(body);
            await WorkDayTimeZoneVolume.save();
            return WorkDayTimeZoneVolume.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteWorkDayTimeZoneVolume = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.WorkDayTimeZoneVolume.findByPk(id);
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
    updateFullWorkDayTimeZoneVolume= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let WorkDayTimeZoneVolume = await models.WorkDayTimeZoneVolume.findByPk(id);
            await WorkDayTimeZoneVolume.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = WorkDayTimeZoneVolumeConexion;