import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slugTopic;

    const topic = await Topic.findOne({
      slug: slug,
      deleted: false,
    });
    const songs = await Song.find({
      topicId: topic.id,
      status: "active",
      deleted: false,
    }).select("title avatar singerId like createAt slug");

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      }).select("fullName");
      song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
      pageTitle: topic.title,
      songs: songs,
    });
  } catch (error) {}
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong: string = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      status: "active",
      deleted: false,
    });
    if(song){
       const singer = await Singer.findOne({
         _id: song.singerId,
         status: "active",
         deleted: false,
       }).select("fullName");

       const topic = await Topic.findOne({
         _id: song.topicId,
       }).select("title");
       res.render("client/pages/songs/detail", {
         pageTitle: song.title,
         song: song,
         singer: singer,
         topic: topic,
       });
    }
   
  } catch (error) {
    console.log(error);
  }
};

// [PATCH] /songs/like/:idSong
export const like = async (req: Request, res: Response) => {

  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike; // Like or dislike
  const song = await Song.findOne({
    _id : idSong,
    status : "active",
    deleted : false
  });
  const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
  await Song.updateOne({
    _id : idSong,
  },{
    like : newLike
  });
  
  res.send({
    code : 200,
    message : "Thành công",
    like : newLike
  });
}