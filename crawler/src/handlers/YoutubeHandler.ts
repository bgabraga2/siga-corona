import Twitter from "twitter";
import Post from "../database/models/Post";
import { youtubeChannels, youtubeSpecialWords } from "../data/data";
import logger from "node-color-log";
import YoutubeClient from "youtube-channel-videos";
import moment from "moment";

export class YoutubeHandler {
  youtube_api: any;
  videoUrlBase = "https://www.youtube.com/watch?v=";

  constructor() {
    this.youtube_api = process.env.YOUTUBE_API_KEY;
  }

  async process() {
    logger.info("Fetching youtube vídeos...");
    const accounts = this.getAccounts();
    accounts.forEach(account => {
      this.getVideosByAccount(account);
    });
  }

  getAccounts() {
    return youtubeChannels;
  }

  async getVideoById(socialId: string) {
    const video = await Post.findOne({
      socialId: socialId
    });
    return video;
  }

  async saveVideo(videoObj: any) {
    return await Post.create({
      type: "youtube",
      date: videoObj.snippet.publishedAt,
      user: videoObj.snippet.channelTitle,
      url: `${this.videoUrlBase}${videoObj.id.videoId}`,
      socialId: videoObj.id.videoId,
      text: videoObj.snippet.title,
      fullJson: JSON.stringify(videoObj)
    });
  }

  isAboutCovid(videoText: string) {
    const specialWords = youtubeSpecialWords;

    let isAbout = false;
    specialWords.forEach(word => {
      const n = videoText.toLowerCase().search(word);
      if (n > 0) isAbout = true;
    });

    return isAbout;
  }

  async getVideosByAccount(account: string) {
    YoutubeClient.channelVideos(
      this.youtube_api,
      account,
      (channelItems: any) => {
        channelItems.forEach(async (video: any) => {
          this.getVideoById(video.id.videoId)
            .then(async res => {
              if (
                !res &&
                this.isAboutCovid(
                  `${video.snippet.title} ${video.snippet.description}`
                )
              )
                await this.saveVideo(video);
            })
            .catch(err => {
              console.error(`Erro ao pegar vídeos do canal ${account}`, err);
            });
        });
      }
    );
  }
}

export default new YoutubeHandler();
