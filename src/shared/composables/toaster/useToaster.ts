import type { Toast } from '@/shared/types/toast/toast';
import { ref, type Ref } from 'vue';

const toasts = ref<Toast[]>([]);

export function useToaster(): {
    toasts: Ref<Toast[]>;
    show: (
        message: string,
        type: 'success' | 'error',
        title?: string,
        duration?: number,
    ) => void;
} {
    function show(
        message: string,
        type: 'success' | 'error',
        title?: string,
        duration = 3000,
    ): void {
        const id = new Date().toISOString();

        toasts.value.push({
            id,
            message,
            type,
            duration,
            title,
        });

        setTimeout(() => {
            toasts.value = toasts.value.filter((t) => t.id !== id);
        }, duration);
    }

    return { toasts, show };
}
