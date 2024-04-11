require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/timeZoneController')

    router.get('/:id',controller.listTimeZone)
    router.get('/',controller.listAllTimeZones)
    router.delete('/:id',controller.removeTimeZone)
    router.put('/:id',controller.editTimeZone)
    router.post('',controller.createTimeZone)
    module.exports = router;