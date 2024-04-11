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

class WorkPositionConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllWorkPositions = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkPosition.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkPositionById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.WorkPosition.findByPk(id);
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
   
    insertWorkPosition = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const WorkPosition = new models.WorkPosition(body);
            await WorkPosition.save();
            return WorkPosition.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteWorkPosition = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.WorkPosition.findByPk(id);
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
    updateFullWorkPosition= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let WorkPosition = await models.WorkPosition.findByPk(id);
            await WorkPosition.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = WorkPositionConexion;