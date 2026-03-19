import { ref, type Ref } from 'vue';
import { changePassword } from '@/features/password/services/passwordService';
import { trackEvent } from '@/shared/services/analyticsService';
import type { Password } from '../types/password';

export function usePasswordChange(): {
    submitPassword: (payload: Password) => Promise<{ success: boolean }>;
    loading: Ref<boolean>;
} {
    const loading = ref(false);

    async function submitPassword(
        payload: Password,
    ): Promise<{ success: boolean }> {
        trackEvent('password_change_submit');
        loading.value = true;

        try {
            await changePassword(payload);
            trackEvent('password_change_success');
            return { success: true };
        } catch (error) {
            trackEvent('password_change_error');
            return { success: false };
        } finally {
            loading.value = false;
        }
    }

    return { submitPassword, loading };
}
