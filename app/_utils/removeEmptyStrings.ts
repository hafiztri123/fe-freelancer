// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyStrings<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "")
  ) as Partial<T>;
}
