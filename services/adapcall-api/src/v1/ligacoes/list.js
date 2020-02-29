const dynamo = require('../../lib/dynamo');

module.exports.run = async event => {
  try {
    const ligacoes = await new dynamo().scan();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        ligacoes,
      }),
    };
  } catch (err) {
    console.error('Erro', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Deu erro',
      }),
    };
  }
};