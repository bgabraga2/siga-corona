declare module 'vue-tweet-embed/src/index';
declare module 'vue-youtube-embed';
declare module 'vue-instagram-embed/src/instaEmbed';
declare module 'moment-timezone';
declare module 'vue-moment';
declare module 'vue-infinite-loading';

declare module 'api-client' {
  export interface Api {
    getPosts: (offset: number, type: string) => Promise<IGetPostReturn>;
    getPost: (id: string) => Promise<IPost>;
  }

  export interface IGetPostReturn {
    posts: IPost[];
    total: number;
    limit: number;
    offset: number;
  }

  export interface IPost {
    _id: string;
    type: string;
    date: Date | string;
    user: string;
    url: string;
    socialId: string;
    text: string;
    fullJson: any;
    createdAt: Date | string;
    updatedAt: Date | string;
  }
}
