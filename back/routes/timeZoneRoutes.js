require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/timeZoneController')

    router.get('/company/:id/day/:day',controller.listAllTimeZonesOfCompanyBydDayOfWeek)
    router.get('/company/:id',controller.listAllTimeZonesOfCompany)
    router.get('/:id',controller.listTimeZone)
    router.get('/',controller.listAllTimeZones)
    router.delete('/:id',controller.removeTimeZone)
    router.put('/:id',controller.editTimeZone)
    router.post('',controller.createTimeZone)
    module.exports = router;