import { ref } from 'vue';
import { changePassword } from '@/services/passwordService';
import type { Password } from '@/types/password/password';
import { trackEvent } from '@/services/analyticsService';

export function usePasswordChange() {
    const loading = ref(false);

    async function submitPassword(payload: Password) {
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
