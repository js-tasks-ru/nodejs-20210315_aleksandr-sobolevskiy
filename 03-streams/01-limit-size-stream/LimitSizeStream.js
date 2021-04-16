const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  #limit = 0
  #length = 0

  constructor(options) {
    super(options);
    this.#limit = options.limit
  }

  _transform(chunk, encoding, callback) {
    
    this.#length += chunk.length
    if (this.#length > this.#limit) {
      return callback(new LimitExceededError())
    }

    callback(null, chunk)
  }
}

module.exports = LimitSizeStream;


