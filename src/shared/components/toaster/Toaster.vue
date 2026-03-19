<script setup lang="ts">
import { useToaster } from '@/shared/composables/toaster/useToaster';
import MailingIcon from '@/assets/svg-assets/mailing.svg?component';

const { toasts } = useToaster();
</script>

<template>
    <div
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
    >
        <div
            v-for="toast in toasts"
            :key="toast.id"
            class="flex items-center gap-4 rounded-xl bg-blue-xxx-24 px-6 py-5 shadow-lg border border-card-default"
        >
            <div v-if="toast.type === 'success'">
                <MailingIcon class="w-8 h-8 shrink-0 text-white" />
            </div>

            <div class="flex flex-col">
                <p class="text-lg font-semibold text-white">
                    {{ toast.title || 'Error' }}
                </p>

                <p class="text-sm text-gray text-white">
                    {{ toast.message }}
                </p>
            </div>
        </div>
    </div>
</template>
