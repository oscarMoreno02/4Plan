const {response,request} = require('express');
const Conexion = require('../database/userConexion');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generate_jwt')
// const ConexionRol=require('../database/conexionRolesAsignados')

const login =  (req, res = response) => {
    const {email, password} = req.body;
    try{
        const conx = new Conexion();
        u = conx.checkLogin(email)    
            .then( usu => {
              
                bcrypt.compare(password, usu.password, (err, result) => {
                    if (result) {
                            const token = generarJWT(usu.id,usu.access,usu.firstName)
                            res.status(200).json({token});
                
                    } else {
                        
                        res.status(500).json({'msg':'La contraseña no es válida.'});
                    }
                 })
                 ;

            })
            .catch( err => {
                console.log(err)
                res.status(500).json({'msg':'Login incorrecto.'});
            });
    }
    catch(error){
        console.log(error)
        res.status(500).json({'msg':'Error en el servidor.'});
    }
    
}

const register =  (req, res = response) => {
    // try{
    //     const conx = new Conexion();
    //     conx.postUsuarios(req.body)    
    //     .then( usu => {
       
    //         let data={
    //             idUser: usu,
    //             idRol: 4
    //         }
    //             const conxRol=new ConexionRol()
    //             a=conxRol.rolesAsignadosPost(data)
    //             .then(a=>{

    //                 const token = generarJWT(usu,['Usuario'],req.body.nombre)
    //                 res.status(200).json({msg:'Registro correcto',token});
    //             })
    //             .catch(err=>{
    //                 res.status(400).json({msg:'Usuario registrado sin rol'})
    //             })
    //         })
    //         .catch( err => {

    //             res.status(500).json({'msg':err});
    //         });
    // }
    // catch(error){
       
    //     res.status(500).json({'msg':'Error en el servidor.'});
    // }
    
}

module.exports = {
  login,
  register
}