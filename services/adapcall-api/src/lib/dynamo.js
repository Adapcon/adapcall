const aws = require('aws-sdk');
const uuid = require('uuid/v4');

const TABLE_NAME = 'Adapcall.Ligacoes';

module.exports = class Dynamo {
  constructor() {
    this.db = new aws.DynamoDB.DocumentClient({
      region: process.env.region,
      endpoint: (
        process.env.IS_OFFLINE
          ? 'http://localhost:8000'
          : undefined
      ),
    });
  }

  // NUNCA USAR EM PROD (VAI CUSTAR TEU RIM)
  async scan({ LastEvaluatedKey, _items = [] } = {}) {
    try {
      const { Items, LastEvaluatedKey: lastKey } = await this.db.scan({
        TableName: TABLE_NAME,
        ExclusiveStartKey: LastEvaluatedKey,
      }).promise();

      if (lastKey) {
        return this.scan({
          LastEvaluatedKey: lastKey,
          _items: _items.concat(Items),
        });
      }

      return Items;
    } catch (err) {
      // TODO tratar erros
      throw err;
    }
  }

  async query() {
    try {
      const { Items } = await this.db.query().promise();

      return Items;
    } catch (err) {
      // TODO tratar erros
      throw err;
    }
  }

  async get() {
    try {
      const { Items } = await this.db.get().promise();

      return Items;
    } catch (err) {
      // TODO tratar erros
      throw err;
    }
  }

  /**
   * @param {Ligacao} ligacao 
   */
  async put({ solicitante, solicitado, urgente }) {
    const item = {
      id: uuid(),
      solicitante,
      solicitado,
      urgente: urgente || false,
    };

    await this.db.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();

    return item;
  }

  async update() {
    try {
      const { Items } = await this.db.update().promise();

      return Items;
    } catch (err) {
      // TODO tratar erros
      throw err;
    }
  }

  async delete() {
    try {
      const { Items } = await this.db.delete().promise();

      return Items;
    } catch (err) {
      // TODO tratar erros
      throw err;
    }
  }
};
