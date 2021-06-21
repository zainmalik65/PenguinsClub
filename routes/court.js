const express=require('express');

const router=express.Router();

const courtController=require('../controllers/court');

router.get('/court',courtController.showCourt);



module.exports=router;