const VALUE = "value";
const NAME = "name";
export const KEYWORDS = [VALUE, NAME];
const AND = "&";
const OR = "|";
export const CONJUNCTION = [AND, OR];
const LIKE = "%"
const EQUALS = "=";
const LESSTHAN = "<";
const LESSTHANOREQUALTO = "<=";
const GREATERTHAN = ">";
const GREATERTHANOREQUALTO = ">=";
const STARTSWITH = "+";
const OTHER = ":";
export const OPERATION = [LIKE, EQUALS, LESSTHAN, LESSTHANOREQUALTO, GREATERTHANOREQUALTO, GREATERTHAN, STARTSWITH, OTHER];

export function GetNextToken(text:string): Token | undefined {
    let token: Token | undefined = undefined;
    let lexeme: string = "";
    let index = 0;
    //Can eventually rewirte with regexes
    while(index < text.length){
        lexeme = lexeme.concat(text[index]);
        if(OPERATION.includes(lexeme)){
            return token = {
                type: "operation",
                value: lexeme,
                startPos: 0,
                endPos: index - 1                            
            }
        }
        else if(CONJUNCTION.includes(lexeme)){
            return token = {
                type: "conjunction",
                value: lexeme,
                startPos: 0,
                endPos: index - 1
            }
        }
        else if(KEYWORDS.includes(lexeme)){
            return token = {
                type: "keyword",
                value: lexeme,
                startPos: 0,
                endPos: index - 1
            }
        }
        else if(EndOfValue(lexeme, index, text.length)){
            //peek
            return {
                type: "value",
                value: lexeme,
                startPos: 0,
                endPos: index - 1
            }
        }
        else {
            return undefined;
        }
        index++;
    }
    return token;
}

function EndOfValue(nextChar: string, currentIndex: number, textLength: number): boolean{
    return currentIndex + 1 > textLength || OPERATION.includes(nextChar[currentIndex + 1]);

}

export interface Token {
    type: TokenType,
    value: string,
    startPos: number,
    endPos: number
}

export interface Operation {
    operation: "%" | "=" | "<" | "<=" | ">" | ">=" | "+" | ":";
}

export type TokenType = "operation" | "conjunction" | "value" | "keyword";
