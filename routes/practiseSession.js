const express=require('express');

const router=express.Router();

const practiseSessionController=require('../controllers/practise-session');


router.post('/practisesession',practiseSessionController.registerSession);

router.get('/practisesession',practiseSessionController.showSessionUser);




module.exports=router;