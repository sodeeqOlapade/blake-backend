import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

//@routes     GET api/auth
//@desc       Test route
//@access     Public
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});


//@routes     POST api/users
//@desc       Register new user
//@access     Public
router.post('/', (req: Request, res:Response) =>{

})

module.exports = router;
