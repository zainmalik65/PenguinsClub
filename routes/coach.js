const express=require('express');

const router=express.Router();

const coachController=require('../controllers/coach');

router.get('/coach',coachController.showCoach);
router.get('/coachdashboard',coachController.getCoachGames);



module.exports=router;