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
import { PostTypes } from '../database/models/Post';
import PostController from '../controllers/Post';

connect();

const fetchHandler: APIGatewayProxyHandler = async (event, _context) => {
  const posts = await PostController.fetch(event.queryStringParameters);

  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};

const fetchSchema = {
  inputSchema: {
    type: 'object',
    properties: {
      queryStringParameters: {
        type: 'object',
        additionalProperties: false,
        errorMessage: {
          additionalProperties: 'Parâmetros adicionais não são aceitos',
        },
        properties: {
          type: {
            type: 'string',
            enum: Object.values(PostTypes),
            errorMessage: {
              enum: 'O parâmetro type deve ser twitter, instagram ou youtube',
            },
          },
          limit: {
            type: 'integer',
            default: parseInt(process.env.PAGINATION_MAX_RESULTS),
            minimum: 1,
            maximum: parseInt(process.env.PAGINATION_MAX_RESULTS),
            errorMessage: {
              type: 'O parâmetro "limit" deve ser um número inteiro',
              minimum: 'O parâmetro "limit" deve ser maior ou igual a 1',
              maximum: `O parâmetro "limit" deve ser menor ou igual a ${process.env.PAGINATION_MAX_RESULTS}`,
            },
          },
          offset: {
            type: 'number',
            default: 0,
            minimum: 0,
            errorMessage: {
              type: 'O parâmetro "offset" deve ser um número inteiro',
              minimum: 'O parâmetro "offset" deve ser maior ou igual a 0',
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
