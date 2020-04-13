import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import middy from 'middy';
import {
  urlEncodeBodyParser,
  cors,
  httpEventNormalizer,
  doNotWaitForEmptyEventLoop,
} from 'middy/middlewares';
import { httpErrorHandler } from '../middlewares/httpErrorHandler';
import { validator } from '../middlewares/validator';
import { connect } from '../database/connect';
import PostController from '../controllers/Post';

connect();

const fetchHandler: APIGatewayProxyHandler = async (event, _context) => {
  const post = await PostController.findOne(event.pathParameters.id);

  if (post.errors){
    return {
      statusCode: 404,
      body: JSON.stringify(post),
    };
  }
  else{
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  }
};

const fetchSchema = {
  inputSchema: {
    type: 'object',
    properties: {
      pathParameters: {
        type: 'object',
        additionalProperties: false,
        required: ['id'],
        errorMessage: {
          additionalProperties: 'Parâmetros adicionais não são aceitos',
          required: {
            id: 'O id do post é obrigatório',
          },
        },
        properties: {
          id: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            minLength: 1,
            errorMessage: {
              pattern: 'O id do post é inválido',
              minLength: 'O id do post é obrigatório',
            },
          },
        },
      },
    },
  },
};

const handler = middy(fetchHandler)
  .use(doNotWaitForEmptyEventLoop())
  .use(httpEventNormalizer())
  .use(urlEncodeBodyParser())
  .use(validator(fetchSchema))
  .use(httpErrorHandler({ logger: (error) => console.error(error) }))
  .use(cors());

export { handler };
