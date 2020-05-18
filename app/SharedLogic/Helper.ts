export function KeepPropertyUndefinedElseValue(property: any, value: boolean): boolean | undefined{
    if(property === undefined){
        return undefined;
    }
    return value;
}