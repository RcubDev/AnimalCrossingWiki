export function KeepPropertyUndefinedElseValue(property: any, value: boolean): boolean | undefined{
    if(property === undefined){
        return undefined;
    }
    return value;
}

export function titleCase(str: string) {
    let returnStr = str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
    return returnStr;
  }