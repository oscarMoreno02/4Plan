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

class ParameterDetailConexion{
    constructor() {
 
        this.con= new Conexion()
    }
    getAllParameterDetailsWithDataOfParameter = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.ParameterDetail.findAll({
                where:{idParameter:id},
                include: [{
                    model: models.WorkPosition,
                    as: 'position',
                },{
                    model: models.WorkArea,
                    as: 'area',
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
   

    getAllParameterDetails = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.ParameterDetail.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getParameterDetailById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.ParameterDetail.findByPk(id,{
                include: [{
                    model: models.WorkPosition,
                    as: 'position',
                },{
                    model: models.WorkArea,
                    as: 'area',
                }, ]
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
   
    insertParameterDetail = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const ParameterDetail = new models.ParameterDetail(body);
            await ParameterDetail.save();
            return ParameterDetail.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteParameterDetail = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.ParameterDetail.findByPk(id);
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
    updateFullParameterDetail= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let ParameterDetail = await models.ParameterDetail.findByPk(id);
            await ParameterDetail.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = ParameterDetailConexion;