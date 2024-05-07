

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
class UserConexion{
    constructor() {
 
        this.con= new Conexion()
    }
    checkLogin = async (email) => {

        this.con.conectar();
        let user = await models.User.findOne(({
            where: {
                email
            }
        }));

        this.con.desconectar();
        if (!user) {
            throw new Error('Email no registrado');
        }

        return user;
    }

    

    getAllUsers = async () => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findAll({
                attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany']});
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar();
        }
    }

    getAllUsersOfCompany = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findAll({
                where:{idCompany:id},
                attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany']
            });
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar();
        }
    }

    getAllUsersWithAssignments = async (date) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findAll({
                where:{access:['manager','staff']},
                attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany'],
                include: [{
                    required: false,
                    model: models.Assignment,
                    as: 'assignments',
                    where:{idWorkDay:date}
                } ]
            });
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar();
        }
    }
    getUserWithAssignments = async (id,date) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findByPk(id,{
                
                attributes: ['id','firstName','lastName','email','access','salary','hiredHours','idCompany'],
                include: [{
                    required: false,
                    model: models.Assignment,
                    as: 'assignments',
                    where:{idWorkDay:date},
                    include: [{
                        model: models.WorkPosition,
                        as: 'position',
                    } ]
                } ]
            });
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.con.desconectar();
        }
    }

    getUser = async (id) => {
        try{
            let resultado = [];
            this.con.conectar();
            resultado = await models.User.findByPk(id);
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
    updateFullUser= async (id,body) => {
        try{
            let resultado = 0
            this.con.conectar();
            let User = await models.User.findByPk(id);
            await User.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.con.desconectar()
        }
    }
    insertUser = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const User = new models.User(body);
            await User.save();
            return User.id
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteUser = async (id) => {
        try{
            this.con.conectar();
            let resultado = await models.User.findByPk(id);
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
 
}

module.exports = UserConexion;