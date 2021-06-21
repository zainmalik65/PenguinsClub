const express=require('express');

const router=express.Router();

const playerController=require('../controllers/player');


router.post('/register',playerController.addNewPlayer);

router.get('/playerdashboard',playerController.showOpponentGames);

router.post('/playerdashboard/setopponentranking',playerController.setOpponentRanking);




module.exports=router;