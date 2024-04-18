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

class AssignmentConexion{
    constructor() {
 
        this.con= new Conexion()
    }
   

    getAllAssignments = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            
            resultado = await models.Assignment.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getAssignmentById = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.Assignment.findByPk(id);
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
   
    insertAssignment = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const Assignment = new models.Assignment(body);
            await Assignment.save();
            return Assignment.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteAssignment = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.Assignment.findByPk(id);
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
    updateFullAssignment= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let Assignment = await models.Assignment.findByPk(id);
            await Assignment.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
   
}

module.exports = AssignmentConexion;