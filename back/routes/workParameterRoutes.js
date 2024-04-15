require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/workParameterController')

router.get('/timezone',controller.listAllWorkParametersWithTimeZone)
    router.get('/:id',controller.listWorkParameter)
    router.get('/',controller.listAllWorkParameters)
    router.delete('/:id',controller.removeWorkParameter)
    router.put('/:id',controller.editWorkParameter)
    router.post('',controller.createWorkParameter)
    module.exports = router;