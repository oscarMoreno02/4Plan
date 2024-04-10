
const bcrypt = require('bcrypt');
const userFactory = async (ctos=4) => {
    
 
    let factory = []
    let lista=[
        {nombre:'sysadmin', email: 'sysadmin@4plan.com'},
        {nombre:'owner', email: 'owner@4plan.com'},
        {nombre:'manager', email: 'manager@4plan.com'},
        {nombre:'staff', email: 'staff@4plan.com'}
    ]
    const password = await bcrypt.hash('1234', 10);
    for(let i = 0; i < ctos; i++) {
        let users = 
            {
            firstName: lista[i].nombre,
            email: lista[i].email,
            password: password,
   
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(users)
    }
    return Promise.all(factory);
}

module.exports = {
    userFactory
}