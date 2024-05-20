require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');
const Conexion =require('../database/connection')

class WorkAreaConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllWorkAreas = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkArea.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkAreaById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.WorkArea.findByPk(id);
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
   
    insertWorkArea = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const WorkArea = new models.WorkArea(body);
            await WorkArea.save();
            return WorkArea.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteWorkArea = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.WorkArea.findByPk(id);
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
    updateFullWorkArea= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let WorkArea = await models.WorkArea.findByPk(id);
            await WorkArea.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    getAllWorkAreasOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.WorkArea.findAll({where:{idCompany:id}});
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar()
        }
    }
}

module.exports = WorkAreaConexion;