<script lang="ts" setup>
import { ref } from 'vue';

const showPasswordForm = ref(false);
</script>

<template>
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <div v-if="!showPasswordForm">
            <h2 class="text-xl font-semibold mb-6">PASSWORT</h2>
            <button @click="showPasswordForm = !showPasswordForm">
                Ändern
            </button>
        </div>

        <PasswordForm v-if="showPasswordForm" />
    </div>
</template>
<style scoped></style>
