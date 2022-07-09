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
    return this.AdditiveExpression();
  }

   /**
    * AdditiveExpression
    * : MultiplicativeExpression
    * | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
    */
  AdditiveExpression() {
    let  left = this.MultiplicativeExpression();
    if (this._lookahead === null ) {
      return left;
    }
    while (this._lookahead.type === TokenType.ADDITIVE_OPERATOR) {
      const operator = this._eat(TokenType.ADDITIVE_OPERATOR).value;
      const right = this.MultiplicativeExpression();
      const node = {
        type: 'BinaryExpression',
        operator,
        left,
        right
      }
      left = node;
    }
    return left; 
  }

  /**
   * MultiplicativeExpression
   * : UnaryExpression
   * | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression
   */
  MultiplicativeExpression() {
    let left = this.PrimaryExpression();
    
    if (this._lookahead === null ) {
      return left;
    }
    
    while (this._lookahead.type === TokenType.MULTIPLICATIVE_OPERATOR) {
      const operator = this._eat(TokenType.MULTIPLICATIVE_OPERATOR).value;
      const right = this.PrimaryExpression();
      const node = {
        type: 'BinaryExpression',
        operator,
        left,
        right
      }
      left = node;
    }
    return left; 
  }

  _BinaryExpression(builderFunctionName, operatorType) {
    const builderFunction = this[builderFunctionName];

    const bindBuilderFunction = builderFunction.bind(this);

    let left = bindBuilderFunction();
    
    if (this._lookahead === null ) {
      return left;
    }
    
    while (this._lookahead.type === operatorType) {
      const operator = this._eat(operatorType).value;
      const right = bindBuilderFunction();
      const node = {
        type: 'BinaryExpression',
        operator,
        left,
        right
      }
      left = node;
    }
    return left; 
  }

  AdditiveBinaryExpression() {
    
  }

  PrimaryExpression() {
    if (this._isLiteral()){
      return this.Literal();
    }

    switch (this._lookahead.type) {
      case '(':
        return this.ParenthesizedExpression();
    
      default:
        throw new SyntaxError(
          `Unexpected token: "${token.value}"`
        );;
    }
  }

   /**
     * ParenthesizedExpression
     *  : '(' Expression ')'
     *  ;
     *
     */
  ParenthesizedExpression() {
    this._eat('(');
    const element = this.Expression();
    this._eat(')');
    return element;
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