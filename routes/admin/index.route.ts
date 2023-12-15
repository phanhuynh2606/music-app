import { Express, Request, Response } from 'express';

import { dashboardRoute } from './dashboard.route';
import { systemConfig } from '../../config/config';
import { topicRoutes } from './topic.route';
const PATH_ADMIN = `/${systemConfig.prefixAmin}`;
const adminRoute = (app:Express) : void =>{
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, topicRoutes);
    
}

export default adminRoute;