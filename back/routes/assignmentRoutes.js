require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/assignmentController')

    router.get('/workday/:id',controller.listAllAssignmentsOfWorkDay)
    router.get('/free/:id',controller.listAllFreeAssignments)

    router.get('/:id',controller.listAssignment)
    router.get('/',controller.listAllAssignments)
    router.delete('/:id',controller.removeAssignment)
    router.put('/:id',controller.editAssignment)
    router.post('',controller.createAssignment)
    module.exports = router;