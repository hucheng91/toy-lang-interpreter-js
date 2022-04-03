import Tokenizer from "./tokenizer.mjs";

export default class Parser {

  _string = '';
  _tokenizer = new Tokenizer();

  parse(string) {
    this._string = string;
    this._tokenizer.init(string);
    this._lookahead = this._tokenizer.getNextToken();
    return this.Program();
  }

  Program() {
    return {
      type: 'Program',
      body: this.NumericLiteral()
    }
  }

  NumericLiteral() {
    const token = this._eat('NUMBER');
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    }
  }

  _eat(tokenType) {
    const token = this._lookahead;

    if (token === null) {
      throw new SyntaxError(
        `Unexpected end of input, excepted: "${tokenType}"`
      );
    }
    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", excepted: "${tokenType}"`
      );
    }
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
  

} 