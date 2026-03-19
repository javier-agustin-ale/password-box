import { describe, it, expect, vi } from 'vitest';
import { usePasswordChange } from '../composables/usePasswordChange';
import * as passwordService from '../services/passwordService';

vi.mock('@/services/passwordService');

describe('usePasswordChange', () => {
    it('returns success when password change works', async () => {
        vi.spyOn(passwordService, 'changePassword').mockResolvedValueOnce({
            success: true,
        });

        const { submitPassword } = usePasswordChange();

        const result = await submitPassword({
            currentPassword: 'oldPass',
            newPassword: 'NewPassword123!',
        });

        expect(result.success).toBe(true);
    });

    it('returns failure when password change fails', async () => {
        vi.spyOn(passwordService, 'changePassword').mockRejectedValueOnce({
            success: false,
        });

        const { submitPassword } = usePasswordChange();

        const result = await submitPassword({
            currentPassword: 'oldPass',
            newPassword: 'NewPassword123!',
        });

        expect(result.success).toBe(false);
    });
});
