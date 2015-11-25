export function assoc<T>(obj: T, other: any): T {
  return Object.assign({}, obj, other);
}

export const first = x => x.first();
export const last = x => x.last();
export const identity = x => x
