import { reactive } from 'vue';
import { describe, it, expect } from 'vitest';

import { usePasswordValidation } from '@/composables/password/usePasswordValidation';
import type { PasswordForm } from '@/types/password/passwordForm';

const createForm = (data?: Partial<PasswordForm>) =>
    reactive<PasswordForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        ...data,
    });

describe('usePasswordValidation', () => {
    it('requires current password', () => {
        const form = createForm({
            newPassword: 'ValidPassword1!',
            confirmPassword: 'ValidPassword1!',
        });

        const { errors } = usePasswordValidation(form);

        expect(errors.value.currentPassword).toBe('Current password required');
    });

    it('validates password rules', () => {
        const form = createForm({
            currentPassword: 'oldPass',
            newPassword: 'short',
            confirmPassword: 'short',
        });

        const { errors } = usePasswordValidation(form);

        expect(errors.value.newPassword).toBe('Minimum 12 characters');
    });

    it('detects password mismatch', () => {
        const form = createForm({
            currentPassword: 'oldPass',
            newPassword: 'ValidPassword1!',
            confirmPassword: 'DifferentPassword1!',
        });

        const { errors } = usePasswordValidation(form);

        expect(errors.value.confirmPassword).toBe('Passwords must match');
    });

    it('returns valid when all rules pass', () => {
        const form = createForm({
            currentPassword: 'oldPass',
            newPassword: 'ValidPassword1!',
            confirmPassword: 'ValidPassword1!',
        });

        const { isValid } = usePasswordValidation(form);

        expect(isValid.value).toBe(true);
    });
});
