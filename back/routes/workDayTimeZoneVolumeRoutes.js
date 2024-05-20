require('express-group-routes')
const {Router} = require('express');
const router = Router();
const controller=require('../controllers/workDayTimeZoneVolumeController')
    router.get('/workday/:id',controller.listAllWorkDayTimeZoneVolumeByWorkDay)
    router.get('/:id',controller.listWorkDayTimeZoneVolume)
    router.get('/',controller.listAllWorkDayTimeZoneVolumes)
    router.delete('/:id',controller.removeWorkDayTimeZoneVolume)
    router.put('/:id',controller.editWorkDayTimeZoneVolume)
    router.post('',controller.createWorkDayTimeZoneVolume)
    module.exports = router;