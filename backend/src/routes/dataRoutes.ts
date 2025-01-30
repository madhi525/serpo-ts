import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};


// Use asyncHandler in authRoutes
import express from 'express';
import { 
  createPmLink,
  getAllPmLinks,
  getPmLinkById,
  updatePmLink,
  deletePmLink
} from '../../controllers/dataControllers'
const router = express.Router();

router.post('/createpmlink', asyncHandler(createPmLink));
router.get('/getallpmlink', asyncHandler(getAllPmLinks));
router.get('/getpmlinkbyid/:id', asyncHandler(getPmLinkById));
router.put('/updatepmlink/:id', asyncHandler(updatePmLink));
router.delete('/deletepmlink/:id', asyncHandler(deletePmLink));

export default router;
