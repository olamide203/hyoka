/**
 * check if a property exists on an object
 * @param obj the object to check
 * @param prop the property to check for
 * @returns true if the property exists on the object
 */
export function isValidProp<T>(prop:string|number|symbol, obj:T):prop is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export const a = 'hello';
