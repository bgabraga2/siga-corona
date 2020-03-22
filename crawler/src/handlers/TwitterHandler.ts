import Twitter from "twitter";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Post from "../database/models/Post";
dotenv.config({ path: `src/env/.env.${process.env.NODE_ENV}` });
import { twitterAccounts } from "../data/data";

export class TwitterHandler {
  twitterClient: Twitter;

  tweetUrlBase: string = "https://twitter.com/i/web/status";

  constructor() {
    this.twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY || "",
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "",
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || "",
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ""
    });
  }

  async process() {
    console.log("Fetching tweeets...");
    const accounts = this.getAccounts();
    accounts.forEach(account => {
      this.getTweetsByAccount(account);
    });
  }

  getAccounts() {
    return twitterAccounts;
  }

  async getTweetById(socialId: string) {
    const tweet = await Post.findOne({
      socialId: socialId
    });
    return tweet;
  }

  async saveTweet(tweetObj: any) {
    return await Post.create({
      type: "twitter",
      user: tweetObj.user.screen_name,
      url: `${this.tweetUrlBase}/${tweetObj.id}`,
      socialId: tweetObj.id,
      text: tweetObj.text,
      fullJson: JSON.stringify(tweetObj)
    });
  }

  isAboutCovid(tweetText: string) {
    const specialWords = [
      "covid-19",
      "covid",
      "#coronavirus",
      "#covid-19",
      "#covid19",
      "corona"
    ];

    let isAbout = false;
    specialWords.forEach(word => {
      const n = tweetText.toLowerCase().search(word);
      if (n > 0) isAbout = true;
    });

    return isAbout;
  }

  async getTweetsByAccount(account: string) {
    var params = { screen_name: account };

    await this.twitterClient
      .get("statuses/user_timeline", params)
      .then(tweets => {
        tweets.forEach(async (tweet: any) => {
          if (
            !tweet.in_reply_to_status_id &&
            !tweet.in_reply_to_user_id &&
            !tweet.retweeted_status
          ) {
            this.getTweetById(tweet.id)
              .then(async res => {
                if (!res && this.isAboutCovid(tweet.text))
                  await this.saveTweet(tweet);
              })
              .catch(err => {
                console.error(
                  `Erro ao pegar tweets do usuário ${account}`,
                  err
                );
              });
          }
        });
        return;
      })
      .catch(err => {
        console.error(`Erro ao pegar tweets do usuário ${account}`, err);
      });
  }
}

export default new TwitterHandler();
