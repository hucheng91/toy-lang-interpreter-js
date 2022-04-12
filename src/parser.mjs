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
   * | EmptyStatement
   * | BlockStatement
   */
  Statement() {
    switch (this._lookahead.type) {
      case ';':
        return this.EmptyStatement();
      case '{':
        return this.BlockStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * EmptyStatement
   * ";"
   */
  EmptyStatement() {
    this._eat(';');
    return {
      type: 'EmptyStatement'
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

  /**
   * ExpressionStatement
   * 
   */
  ExpressionStatement() {
    const expression = this.Expression();
    if (this._lookahead && this._lookahead.type == ';') {
      this._eat(';');
    }
    return {
      type: 'ExpressionStatement',
      expression: expression
    }
  }  

  Expression() {
    if (this._isLiteral) {
      return this.Literal();
    }
    return this.Literal();
  }

  BinaryExpression() {
    const left = this.Literal();
    // while (this.) {
      
    // }
  }
  _isLiteral() {
    const type = this._lookahead.type;
    const ruleArray = [TokenType.NUMBER, TokenType.STRING];
    return ruleArray.some(ruleType => ruleType === type);
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