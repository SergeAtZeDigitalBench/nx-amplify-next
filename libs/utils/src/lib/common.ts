export const isDefined = <T>(value: T | undefined | null): value is T => {
  return typeof value !== 'undefined' && value !== null;
};

export const isServer = () => typeof window === 'undefined';

export const isOfType = <T>(
  valueToCheck: unknown,
  propertyToCheckFor: keyof T
): valueToCheck is T => (valueToCheck as T)[propertyToCheckFor] !== undefined;
