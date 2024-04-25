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
            
            resultado = await models.TimeZone.findAll({where:{idCompany:id},
                   include: [{
                model: models.DayTimeZone,
                as: 'days',
            }, ]});
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
            resultado = await models.TimeZone.findByPk(id,{
                include: [{
                
                    model: models.DayTimeZone,
                    as: 'days',
                } ]
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
   
    insertTimeZone = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const TimeZone = new models.TimeZone(body);
            await TimeZone.save();
            let newDays=body.days
            for(const d of newDays){
                d.idTimeZone=TimeZone.id
                let day=new models.DayTimeZone(d)
                await day.save()
            }

            return TimeZone.id
        } catch (error) {
            console.log(error)
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
            await resultado.destoy();
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

           let days = await models.DayTimeZone.findAll({ where: { idTimeZone: id } });

           if (days.length > 0) {
               for (const d of days) {
                   await d.destroy();
               }
           }
   
            let newDays=body.days
            for(const d of newDays){
                d.idTimeZone=id
                let day=new models.DayTimeZone(d)
                await day.save()
            }
            return resultado
        }catch(error){
            console.log(error)
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = TimeZoneConexion;