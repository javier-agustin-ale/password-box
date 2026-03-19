import { computed, type ComputedRef } from 'vue';
import type { PasswordForm } from '@/types/password/passwordForm';

export function usePasswordValidation(form: PasswordForm): {
    errors: ComputedRef<PasswordForm>;
    isValid: ComputedRef<boolean>;
} {
    const errors = computed(() => {
        const err: PasswordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };

        if (!form.currentPassword) {
            err.currentPassword = 'Current password required';
        }

        const newPass = form.newPassword || '';

        if (newPass.length < 12) {
            err.newPassword = 'Minimum 12 characters';
        } else if (!/[0-9]/.test(newPass)) {
            err.newPassword = 'Must contain a number';
        } else if (!/[^a-zA-Z0-9]/.test(newPass)) {
            err.newPassword = 'Must contain a special character';
        } else if (!/[A-Z]/.test(newPass)) {
            err.newPassword = 'Must contain an uppercase letter';
        } else if (!/[a-z]/.test(newPass)) {
            err.newPassword = 'Must contain a lowercase letter';
        }

        if (form.newPassword !== form.confirmPassword) {
            err.confirmPassword = 'Passwords must match';
        }

        return err;
    });

    const isValid = computed(() =>
        Object.values(errors.value).every((msg) => msg === ''),
    );

    return { errors, isValid };
}
