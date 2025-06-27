import { z } from 'zod';

export const SignupFormSchema = z.object({
    firstName: z.string().min(2, { message: 'firstName is required ' }).trim(),
    lastName: z.string().min(2, { message: 'lastName is required ' }).trim(),
    email: z.string().email().min(2, { message: 'email is required ' }).trim(),
    password: z.string().min(2, { message: 'password is required' }).trim(),
});

export type FormState =
    | {
          errors?: {
              firstName: string[];
              lastName: string[];
              email: string[];
              password: string[];
          };
          message?: string;
      }
    | undefined;
