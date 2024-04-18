require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/parameterDetailController')
router.get('/parameter/data/:id',controller.listAllParameterDetailsWithDataOfParameter)
    router.get('/:id',controller.listParameterDetail)
    router.get('/',controller.listAllParameterDetails)
    router.delete('/:id',controller.removeParameterDetail)
    router.put('/:id',controller.editParameterDetail)
    router.post('',controller.createParameterDetail)
    module.exports = router;