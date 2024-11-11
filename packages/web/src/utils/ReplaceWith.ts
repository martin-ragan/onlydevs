/**
 * Replaces the value of a key in a type with a new value.
 *
 * @example
 * ```ts
 * type Foo = {
 *  a: string;
 *  b: number;
 * }
 * // { a: boolean; b: number; }
 * type Bar = ReplaceWith<Foo, "a", boolean>;
 * ```
 *
 */
export type ReplaceWith<TType, TKey extends keyof TType, TNewValue> = Omit<TType, TKey> & {
  [K in TKey]: TNewValue;
};
