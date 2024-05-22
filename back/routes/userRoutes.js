require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/userController')

    router.get('/email/:email',controller.listUserByEmail)
    router.get('/assignments/:date/required',controller.listAllUsersWithAssignmentsRequired)
    router.get('/assignments/:date/:id',controller.listUserWithAssignments)
    router.get('/assignments/:date',controller.listAllUsersWithAssignments)
    router.get('/company/:id',controller.listAllOfUsersOfCompany)
    router.get('/:id',controller.listUser)
    router.get('/',controller.listAllUsers)
    router.delete('/:id',controller.removeUser)
    router.put('/:id',controller.editUser)
    router.post('',controller.createUser)
    module.exports = router;