export const httpErrorHandler = (opts?: any) => {

  const defaults = {
    logger: console.error
  };

  const options = Object.assign({}, defaults, opts);

  return ({
    onError: (handler, next) => {
      if (typeof options.logger === 'function') {
        options.logger(handler.error)
      }
      if (handler.error.statusCode && handler.error.message) {
        const errorResponse: any = {
          errors: [{ msg: handler.error.message }]
        };

        if (handler.error.details) {
          if (Array.isArray(handler.error.details) && handler.error.details.length) {
            errorResponse.errors = [{ msg: handler.error.details[0].message }];
          } else {
            errorResponse.errors = [{ msg: handler.error.details }];
          }
        }

        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify(errorResponse)
        };

        return next();
      }

      
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({ message: "Não foi possível processar a requisição no momento" })
      };

      return next();
    }
  });

};
