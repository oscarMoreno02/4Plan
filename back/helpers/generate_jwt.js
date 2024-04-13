const jwt = require('jsonwebtoken')


const generarJWT = (uid,access,uname) => {
    
    let token = jwt.sign({ uid, access,uname }, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}
