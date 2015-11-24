export const isString = x => typeof x === 'string'

export function assoc<T>(obj: T, other: any): T {
  return Object.assign({}, obj, other);
}
