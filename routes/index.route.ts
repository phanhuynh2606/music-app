import { Express } from "express";
import { topicRoutes } from "./client/topic.route";

const clientRoutes = (app :Express):void => {

   app.use("/topics",topicRoutes);

}

export default clientRoutes;
