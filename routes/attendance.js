const express=require('express');

const router=express.Router();

const attendanceController=require('../controllers/attendance');

router.post('/attendance',attendanceController.addAttendance);

router.get('/attendance',attendanceController.getAttendance);



module.exports=router;
