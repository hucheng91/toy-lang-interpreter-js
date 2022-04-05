import Tokenizer from "./tokenizer.mjs";
import { TokenType } from './constant.mjs';
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
      body: this.StatementList()
    }
  }

  StatementList(stopTokenType = null) {
    const statementList = [];

    while (this._lookahead !== null && this._lookahead.type !== stopTokenType) {
      const statement = this.Statement();
      statementList.push(statement);
    }

    return statementList;
  }

  /**
   * Statement
   * : ExpressionStatement
   * | BlockStatement
   */
  Statement() {
    switch (this._lookahead.type) {
      case '{':
        return this.BlockStatement();
      default:
        return this.ExpressionStatement();
    }
  }
  
  /**
   * BlockStatement
   * "{}"
   */
   BlockStatement() {
    this._eat('{');
    const body = this.StatementList("}");
    const result = {
      type: 'BlockStatement',
      body
    }
    this._eat('}');
    return result;
  }

  ExpressionStatement() {
    const expression = this.Expression();
    return {
      type: 'ExpressionStatement',
      expression: expression
    }
  }  

  Expression() {
    return this.Literal();
  }

  Literal() {
    switch (this._lookahead.type) {
      case TokenType.NUMBER:
        return this.NumericLiteral();
      case TokenType.STRING:
        return this.StringLiteral();
    }

    throw new SyntaxError(`Literal: unexcepted literal`);
  }

  StringLiteral() {
    const token = this._eat(TokenType.STRING);
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1)
    }
  }

  /**
   * NumericLiteral
   *  : NUMBER
   * ;
   */
  NumericLiteral() {
    const token = this._eat(TokenType.NUMBER);
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