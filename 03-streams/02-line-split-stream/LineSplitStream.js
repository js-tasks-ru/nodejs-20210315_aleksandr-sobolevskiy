const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  #lastLine = ''

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {

    let lines = (this.#lastLine + chunk.toString()).split(os.EOL)
    this.#lastLine = lines.pop()
    lines.map(v => this.push(v))
    
    callback()
  }

  _flush(callback) {
    this.push(this.#lastLine)
    callback()
  }
}

module.exports = LineSplitStream;
