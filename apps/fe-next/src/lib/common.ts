/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDefined = <T>(value: T | undefined | null): value is T => {
  return typeof value !== 'undefined' && value !== null;
};

export const isServer = () => typeof window === 'undefined';

export const isOfType = <T>(
  valueToCheck: unknown,
  propertyToCheckFor: keyof T
): valueToCheck is T => (valueToCheck as T)[propertyToCheckFor] !== undefined;

const getUnknownError = (error: unknown, defaultMessage: string) => {
  const message = (error as any).toString() as string;

  if (!message) {
    return defaultMessage;
  }

  if (message.includes('[object Object]')) {
    return defaultMessage;
  }

  return message;
};

export const getErrorMessage = (
  error: unknown,
  defaultMesssage?: string
): string => {
  const messsage =
    error instanceof Error
      ? error.message
      : defaultMesssage || getUnknownError(error, 'Error occurred');

  return messsage;
};
