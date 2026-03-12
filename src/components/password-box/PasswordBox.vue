<script lang="ts" setup>
import { ref } from 'vue';
import PasswordForm from './PasswordForm.vue';

const showPasswordForm = ref(false);
</script>

<template>
    <div class="bg-blue-bg2 p-8 rounded-xl shadow w-full max-w-2xl">
        <div v-if="!showPasswordForm">
            <h2 class="text-xl font-semibold mb-6 text-white">PASSWORT</h2>
            <button
                @click="showPasswordForm = !showPasswordForm"
                class="cursor-pointer text-white"
            >
                Ändern
            </button>
        </div>

        <PasswordForm
            v-if="showPasswordForm"
            @return-to-initial-view="showPasswordForm = false"
        />
    </div>
</template>
<style scoped></style>
