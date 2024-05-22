require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/registerRequestController')

    router.get('/company/:id',controller.listAllRegisterRequestsOfCompany)
    router.get('/:id',controller.listRegisterRequest)
    router.get('/',controller.listAllRegisterRequests)
    router.delete('/:id',controller.removeRegisterRequest)
    router.put('/:id',controller.editRegisterRequest)
    router.post('',controller.createRegisterRequest)
    module.exports = router;