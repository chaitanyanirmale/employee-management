import {Router} from 'express'
import { getDashboard } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.js';


const dashboardRouter = Router();

dashboardRouter.get('/', protect,  getDashboard);

export default dashboardRouter;