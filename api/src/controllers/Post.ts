import { Request, Response } from "express";
import { validationResult, query, param } from "express-validator";
import PostModel, { PostTypes } from '../database/models/Post';

class Posts {
  static listValidations = [
    query('limit')
      .optional()
      .isInt({ min: 1, max: parseInt(process.env.PAGINATION_MAX_RESULTS) })
      .withMessage(
        `O parâmetro limit deve ser no mínimo 1 e no máximo ${process.env.PAGINATION_MAX_RESULTS}`
      ),
    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage(`O parâmetro offset deve ser no mínimo 0`),
    query('type')
      .optional()
      .isIn(Object.values(PostTypes))
      .withMessage(`O parâmetro type deve ser twitter, instagram ou youtube`)
  ];

  static async list(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const limit =
      parseInt(req.query.limit) || parseInt(process.env.PAGINATION_MAX_RESULTS);
    const offset = parseInt(req.query.offset) || 0;

    const type = req.query.type || '';

    let posts;
    if (type) posts = await PostModel.paginate({ type }, { offset, limit, sort: { date: -1 } });
    else posts = await PostModel.paginate({}, { offset, limit, sort: { date: -1 } });

    res.json({
      posts: posts.docs,
      total: posts.total,
      limit: posts.limit,
      offset: posts.offset
    });
  }

  static findOneValidations = [
    param('id')
      .notEmpty()
      .withMessage('O id do post é obrigatório')
      .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, 'i')
      .withMessage('O id do post é inválido')
  ];

  static async findOne(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.id;

    const post = await PostModel.findById(postId);

    if (post) res.json(post);
    else res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] });
  }

  static async shareOne(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.id;

    const post = await PostModel.findById(postId);

    let shareTitle = process.env.SITE_TITLE;
    let shareImage = process.env.SITE_IMAGE;
    let shareImageWidth = 1200;
    let shareImageHeight = 628;

    if(post.type == PostTypes.instagram){
      const json = JSON.parse(post.fullJson);
      shareImage = json.thumbnail_src;
      shareImageWidth = 640;
      shareImageHeight = 640;
    }
    else if (post.type == PostTypes.youtube){
      const json = JSON.parse(post.fullJson);
      shareTitle += ` - ${json.snippet.title}`;
      shareImage = json.snippet.thumbnails.high.url;
      shareImageWidth = json.snippet.thumbnails.high.width;
      shareImageHeight = json.snippet.thumbnails.high.height;
    }

    if (post) res.send(`
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
            //window.location.href = "${process.env.SITE_URL}/#/posts/${postId}"
          </script>
        </body>
      </html>
    `);
    else res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] });
  }
}

export default Posts;
