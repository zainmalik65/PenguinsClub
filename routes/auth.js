const express=require('express');

const router=express.Router();

const authController=require('../controllers/auth');

router.post('/login',authController.islogin);

router.post('/logout',authController.logout);

module.exports=router;