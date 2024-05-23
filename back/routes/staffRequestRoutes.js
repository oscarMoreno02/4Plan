require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/staffRequestController')

    router.put('/accept/:id',controller.acceptStaffRequest)
    router.get('/user/:id',controller.listStaffRequestByUser)
    router.get('/company/:id',controller.listAllStaffRequestsOfCompany)
    router.get('/:id',controller.listStaffRequest)
    router.get('/',controller.listAllStaffRequests)
    router.delete('/:id',controller.removeStaffRequest)
    router.put('/:id',controller.editStaffRequest)
    router.post('',controller.createStaffRequest)
    module.exports = router;