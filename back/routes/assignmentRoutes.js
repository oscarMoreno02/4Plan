require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/assignmentController')

    router.get('/:id',controller.listAssignment)
    router.get('/',controller.listAllAssignments)
    router.delete('/:id',controller.removeAssignment)
    router.put('/:id',controller.editAssignment)
    router.post('',controller.createAssignment)
    module.exports = router;