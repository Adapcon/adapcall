// @ts-check
const Dynamo = require('../../lib/dynamo');

/** 
 * @typedef {import('../../../../../types/LambdaEvent').LambdaEvent} LambdaEvent
 * @typedef {import('../../../../../types/Ligacao').Ligacao} Ligacao
 */

/**
 * @param {LambdaEvent} event 
 */
const getParameters = event => {
  if (!event.body) {
    throw {
      statusCode: 400, message: 'Você deve passar um body',
    };
  }

  return {
    body: JSON.parse(event.body),
  };
};

/**
 * @param {Ligacao} ligacao 
 */
const validateLigacao = ligacao => {
  const errors = {};

  if (!ligacao.solicitante) errors.solicitante = 'undefined';
  else if (typeof ligacao.solicitante !== 'string') errors.solicitante = 'invalid';

  if (!ligacao.solicitado) errors.solicitado = 'undefined';
  else if (typeof ligacao.solicitado !== 'string') errors.solicitado = 'invalid';

  return (Object.keys(errors).length > 0) ? errors : undefined;
};

/**
 * @param {LambdaEvent} event
 */
module.exports.run = async event => {
  try {
    const { body } = getParameters(event);

    const errors = validateLigacao(body);

    if (errors) {
      throw {
        statusCode: 422,
        message: 'Ligação inválida',
        error: {
          invalidFields: errors,
        },
      };
    }

    const ligacaoCriada = await new Dynamo().put({
      ...body,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...ligacaoCriada,
      }),
    };
  } catch (err) {
    console.error('Erro', err);

    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        message: err.message || 'Internal Server Error',
        error: err.error,
      }),
    };
  }
};
