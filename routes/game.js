const express=require('express');

const router=express.Router();

const gameController=require('../controllers/game');

const authMiddleware=require('../middleware/isAuth');

router.get('/register',gameController.showGames);



module.exports=router;