declare module 'vue-tweet-embed';
declare module 'vue-youtube-embed';
declare module 'vue-instagram-embed';

declare module 'api-client' {
  export interface Api {
    getPosts: () => Promise<IGetPostReturn>;
    getPost: (id: string) => Promise<IPost>;
  }

  export interface IGetPostReturn {
    posts: IPost[];
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
