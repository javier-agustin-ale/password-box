import type { Toast } from '@/types/toast/toast';
import { ref } from 'vue';

const toasts = ref<Toast[]>([]);

export function useToaster() {
    function show(message: string, type: 'success' | 'error', duration = 3000) {
        const id = new Date().toISOString();

        toasts.value.push({
            id,
            message,
            type,
            duration,
        });

        setTimeout(() => {
            toasts.value = toasts.value.filter((t) => t.id !== id);
        }, duration);
    }

    return { toasts, show };
}
