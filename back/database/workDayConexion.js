require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');
const Conexion = require('./connection.js')

class WorkDayConexion {
    constructor() {

        this.con = new Conexion()
    }


    getAllWorkDays = async () => {
        try {
            let resultado = [];
            this.con.conectar();

            resultado = await models.WorkDay.findAll();
            return resultado;
        } catch (error) {
            throw error
        } finally {
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getAllWorkDaysOfCompany = async (id) => {
        try {
            let resultado = [];
            this.con.conectar();

            resultado = await models.WorkDay.findAll({
                where: {
                    idCompany: id
                },
                include: [{
                    model: models.Assignment,
                    as: 'dayAssignments',
                }, ]
            });
            return resultado;
        } catch (error) {
            throw error
        } finally {
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkDayOfCompanyByDate = async (id, date) => {
        try {
            let resultado = [];
            this.con.conectar();

            resultado = await models.WorkDay.findOne({
                where: {
                    idCompany: id,
                    date: date
                },
                include: [{
                    model: models.Assignment,
                    as: 'dayAssignments',
                }, ]
            });
            return resultado;
        } catch (error) {
            throw error
        } finally {
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkDayOfCompanyBetweenDates = async (id, first,last) => {
        try {
            let resultado = [];
            this.con.conectar();

            resultado = await models.WorkDay.findAll({
                where: {
                    idCompany: id,
                    date:  {[Op.between]: [first, last]}
                },
                include: [{
                    model: models.Assignment,
                    as: 'dayAssignments',
                }, ]
            });
            return resultado;
        } catch (error) {
            throw error
        } finally {
            // this.con.desconectar();
            this.con.desconectar()
        }
    }
    getWorkDayById = async (id) => {
        try {
            let resultado = [];
            this.con.conectar();
            resultado = await models.WorkDay.findByPk(id, {
                include: [{
                    model: models.Assignment,
                    as: 'dayAssignments',
                }, ]
            });
            if (!resultado) {
                throw new Error('error');
            }
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.con.desconectar()
        }
    }

    insertWorkDay = async (body) => {
        let resultado = 0;
        this.con.conectar();
        try {
            const WorkDay = new models.WorkDay(body);
            await WorkDay.save();
            return WorkDay.id
        } catch (error) {
            throw error;
        } finally {
            this.con.desconectar();
        }
    }

    deleteWorkDay = async (id) => {
        try {
            this.con.conectar();
            let resultado = await models.WorkDay.findByPk(id);
            if (!resultado) {
                throw error;
            }
            await resultado.destroy();
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.con.desconectar()
        }
    }
    updateFullWorkDay = async (id, body) => {
        try {
            let resultado = 0
            this.con.conectar();
            let WorkDay = await models.WorkDay.findByPk(id);
            await WorkDay.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.con.desconectar()
        }
    }

    updateListWorkDay = async (list) => {
        try {
            let resultado = 0
            this.con.conectar();
            for(const day of list){
                let WorkDay = await models.WorkDay.findByPk(day.id);
                await WorkDay.update(day)
            }
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.con.desconectar()
        }
    }

}

module.exports = WorkDayConexion;