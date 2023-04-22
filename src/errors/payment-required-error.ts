import { ApplicationError } from '@/protocols';

export function paymentRequired(): ApplicationError {
  return {
    name: 'PaymentRequired',
    message: 'You have not paid yet.',
  };
}
