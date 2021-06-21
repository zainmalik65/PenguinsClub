const express=require('express');

const router=express.Router();

const matchController=require('../controllers/match');


router.post('/registermatch',matchController.registerMatch);

router.get('/registermatch',matchController.showMatchesUser);




module.exports=router;