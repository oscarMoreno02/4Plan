require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/workAreaController')

    router.get('/:id',controller.listWorkArea)
    router.get('/',controller.listAllWorkAreas)
    router.delete('/:id',controller.removeWorkArea)
    router.put('/:id',controller.editWorkArea)
    router.post('',controller.createWorkArea)
    module.exports = router;