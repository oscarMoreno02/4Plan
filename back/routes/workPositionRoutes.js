require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/workPositionController')

    router.get('/:id',controller.listWorkPosition)
    router.get('/',controller.listAllWorkPositions)
    router.delete('/:id',controller.removeWorkPosition)
    router.put('/:id',controller.editWorkPosition)
    router.post('',controller.createWorkPosition)
    module.exports = router;