import { ApplicationError } from '@/protocols';

export function invalidDataFormatError(): ApplicationError {
  return {
    name: 'InvalidDataFormatError',
    message: 'The provided data format is invalid.',
  };
}
