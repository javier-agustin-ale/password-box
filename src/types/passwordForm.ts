import type { Password } from './password';

export interface PasswordForm extends Password {
    confirmPassword: string;
}
