
const bcrypt = require('bcrypt');
const userFactory = async (ctos=3) => {
    
 
    let factory = []
    let lista=[
        {firstName:'sysadmin',hiredHours:null,idCompany:null,salary:null, email: 'sysadmin@4plan.com'},
        {firstName:'owner',hiredHours:null,idCompany:null,salary:null, email: 'owner@4plan.com'},
        {firstName:'manager',hiredHours:40,idCompany:null,salary:1500, email: 'manager@4plan.com'},
    ]
    const password = await bcrypt.hash('1234', 10);
    for(let i = 0; i < ctos; i++) {
        let users = 
            {
            firstName: lista[i].firstName,
            lastName: lista[i].firstName,
            email: lista[i].email,
            password: password,
            access:lista[i].firstName,
            hiredHours: lista[i].hiredHours,
            idCompany:  lista[i].idCompany,
            salary:  lista[i].salary,
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