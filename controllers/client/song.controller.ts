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
      topic : topic
    });
  } catch (error) {
    console.log(error);
  }
};
