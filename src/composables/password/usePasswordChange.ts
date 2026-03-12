import { ref } from 'vue';
import { changePassword } from '@/services/passwordService';
import type { Password } from '@/types/password/password';

export function usePasswordChange() {
    const loading = ref(false);

    async function submitPassword(payload: Password) {
        loading.value = true;

        try {
            await changePassword(payload);
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        } finally {
            loading.value = false;
        }
    }

    return { submitPassword, loading };
}
