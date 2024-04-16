const jwt = require('jsonwebtoken')


const generarJWT = (uid,access,uname,company) => {
    
    let token = jwt.sign({ uid, access,uname ,company}, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}
