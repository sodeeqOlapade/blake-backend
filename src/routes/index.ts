import express, {Request, Response, NextFunction} from 'express'
var router = express.Router();

//@routes     GET api/
//@desc       Index route
//@access     Public
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('Hello world.....');
});

export default router;
