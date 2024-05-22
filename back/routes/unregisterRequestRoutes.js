require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/unregisterRequestController')

    router.get('/company/:id',controller.listAllUnregisterRequestsOfCompany)
    router.get('/:id',controller.listUnregisterRequest)
    router.get('/',controller.listAllUnregisterRequests)
    router.delete('/:id',controller.removeUnregisterRequest)
    router.put('/:id',controller.editUnregisterRequest)
    router.post('',controller.createUnregisterRequest)
    module.exports = router;