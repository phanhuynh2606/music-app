import { Express} from 'express';

import { dashboardRoute } from './dashboard.route';
import { systemConfig } from '../../config/config';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { uploadRoute } from './upload.route';
import { sinngerRoute } from './singer.route';


const PATH_ADMIN = `/${systemConfig.prefixAmin}`;
const adminRoute = (app:Express) : void =>{
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, topicRoutes);
    app.use(`${PATH_ADMIN}/songs`,songRoutes);
    app.use(`${PATH_ADMIN}/upload`,uploadRoute);
    app.use(`${PATH_ADMIN}/singers`,sinngerRoute);
    
}

export default adminRoute;