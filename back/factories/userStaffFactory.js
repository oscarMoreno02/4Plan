
const bcrypt = require('bcrypt');
const userStaffFactory = async (ctos=5) => {
    
 
    let factory = []
    let lista={firstName:'staff',hiredHours:40,idCompany:null,salary:1300}
    
    const password = await bcrypt.hash('1234', 10);
    for(let i = 0; i < ctos; i++) {
        let users = 
            {
            firstName: lista.firstName+' '+(i+1),
            lastName: lista.firstName,
            email: lista.firstName+(i+1)+'@4plan.com',
            password: password,
            access:lista.firstName,
            hiredHours: lista.hiredHours,
            idCompany:  lista.idCompany,
            salary:  lista.salary,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(users)
    }
    return Promise.all(factory);
}

module.exports = {
    userStaffFactory
}