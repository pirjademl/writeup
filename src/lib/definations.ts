import { z } from 'zod';

export const SignupFormSchema = z.object({
    firstName: z.string().min(2, { message: 'firstName is required ' }).trim(),
    lastName: z.string().min(2, { message: 'lastName is required ' }).trim(),
    email: z.string().email().min(2, { message: 'email is required ' }).trim(),
    userName: z
        .string()
        .min(2, { message: 'username must be more than 2 characters' })
        .trim()
        .toLowerCase(),
    password: z.string().min(2, { message: 'password is required' }).trim(),
});
export type FormState =
    | {
          errors: {
              firstName?: string[];
              lastName?: string[];
              email?: string[];
              userName?: string[];
              password?: string[];
              general?: string[];
          };
          success?: undefined;
      }
    | {
          success: true;
          errors?: undefined;
      }
    | undefined;
