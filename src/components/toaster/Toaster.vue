<script setup lang="ts">
import { useToaster } from '@/composables/toaster/useToaster';

const { toasts } = useToaster();
</script>

<template>
    <div class="fixed top-6 right-6 space-y-2">
        <div
            v-for="toast in toasts"
            :key="toast.id"
            class="px-4 py-2 rounded text-white shadow"
            :class="
                toast.type === 'success' ? 'bg-green-success' : 'bg-red-alert'
            "
        >
            {{ toast.message }}
        </div>
    </div>
</template>
<style scoped></style>
