require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/workDayController')
router.get('/company/:id',controller.listAllWorkDaysOfCompany)
    router.get('/:id',controller.listWorkDay)
    router.get('/',controller.listAllWorkDays)
    router.delete('/:id',controller.removeWorkDay)
    router.put('/:id',controller.editWorkDay)
    router.post('',controller.createWorkDay)
    module.exports = router;