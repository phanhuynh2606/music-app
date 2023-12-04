import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";


// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
 try {
   const slug = req.params.slugTopic;

   const topic = await Topic.findOne({
      slug : slug,
      deleted:false
   });
   const songs = await Song.find({
      topicId : topic.id,
      status : "active",
      deleted : false
   }).select("title avatar singerId like createAt slug");

   for (const song of songs) {
      const infoSinger = await Singer.findOne({
         _id : song.singerId,
         deleted : false
      }).select("fullName");
      song["infoSinger"] = infoSinger;
   };
   res.render("client/pages/songs/list", {
     pageTitle: topic.title,
     songs : songs
   });
 } catch (error) {
   
 }
};
