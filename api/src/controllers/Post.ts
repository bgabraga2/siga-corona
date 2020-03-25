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
    if (type) posts = await PostModel.paginate({ type }, { offset, limit });
    else posts = await PostModel.paginate({}, { offset, limit });

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
}

export default Posts;
