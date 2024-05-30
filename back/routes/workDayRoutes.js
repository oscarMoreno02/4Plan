require('express-group-routes')
const {
    Router
} = require('express');
const router = Router();
const controller = require('../controllers/workDayController')

router.get('/user/:id/month/:date', controller.listWorkDayOfUserOfMonth)
router.get('/user/:id/week/:date', controller.listWorkDayOfUserOfWeek)
router.get('/user/:id/next', controller.listNextWorkDaysOfUser)
router.get('/company/:id/next', controller.listNextWorkDays)
router.get('/company/:id/month/:date', controller.listWorkDayOfCompanyOfMonth)
router.get('/company/:id/date/:date', controller.listWorkDayOfCompanyByDate)
router.get('/company/:id', controller.listAllWorkDaysOfCompany)
router.get('/:id', controller.listWorkDay)
router.get('/', controller.listAllWorkDays)
router.delete('/:id', controller.removeWorkDay)
router.put('/publish', controller.publish)
router.put('/:id', controller.editWorkDay)
router.post('', controller.createWorkDay)
module.exports = router;