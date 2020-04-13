import PostModel, { PostTypes } from '../database/models/Post';

class Posts {
  static async fetch(params: any): Promise<any> {
    const limit = parseInt(params.limit) || parseInt(process.env.PAGINATION_MAX_RESULTS);
    const offset = parseInt(params.offset) || 0;
    const type = params.type || '';

    let posts: any;
    if (type)
      posts = await PostModel.paginate(
        { type },
        { offset, limit, sort: { date: -1 } }
      );
    else
      posts = await PostModel.paginate(
        {},
        { offset, limit, sort: { date: -1 } }
      );

    return {
      posts: posts.docs,
      total: posts.total,
      limit: posts.limit,
      offset: posts.offset,
    };
  }

  static async findOne(postId: string): Promise<any> {
    const post = await PostModel.findById(postId);

    if (post) return post;
    else return { errors: [{ msg: 'Post não encontrado' }] };
  }

  static async shareOne(postId: string): Promise<any> {
    const post = await PostModel.findById(postId);

    let shareTitle = process.env.SITE_TITLE;
    let shareImage = process.env.SITE_IMAGE;
    let shareImageWidth = 1200;
    let shareImageHeight = 628;

    if (post.type == PostTypes.instagram) {
      const json = JSON.parse(post.fullJson);
      shareImage = json.thumbnail_src;
      shareImageWidth = 640;
      shareImageHeight = 640;
    } else if (post.type == PostTypes.youtube) {
      const json = JSON.parse(post.fullJson);
      shareTitle += ` - ${json.snippet.title}`;
      shareImage = json.snippet.thumbnails.high.url;
      shareImageWidth = json.snippet.thumbnails.high.width;
      shareImageHeight = json.snippet.thumbnails.high.height;
    }

    if (post)
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="${post.text}" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:title" content="${shareTitle}" />
          <meta property="og:url" content="${process.env.SITE_API_ENDPOINT}/posts/share/${postId}" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="${shareImage}" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="${shareImageWidth}" />
          <meta property="og:image:height" content="${shareImageHeight}" />
          <meta property="og:description" content="${post.text}" />
          <meta property="og:site_name" content="${shareTitle}" />
          <title>${shareTitle}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content="${post.text}" />
          <meta name="twitter:title" content="${shareTitle}" />
          <meta name="twitter:image" content="${shareImage}" />
        </head>
        <body>
          <script>
            window.location.href = "${process.env.SITE_URL}/#/posts/${postId}"
          </script>
        </body>
      </html>
    `;
    else return { errors: [{ msg: 'Post não encontrado' }] };
  }
}

export default Posts;
