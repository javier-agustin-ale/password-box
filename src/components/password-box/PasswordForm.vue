<script lang="ts" setup>
import { reactive } from 'vue';
import DynInput from '../inputs/DynInput.vue';
import { usePasswordValidation } from '@/composables/password/usePasswordValidation';
import { usePasswordChange } from '@/composables/password/usePasswordChange';
import type { PasswordForm } from '@/types/password/passwordForm';
import { useToaster } from '@/composables/toaster/useToaster';

const form = reactive<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const { errors, isValid } = usePasswordValidation(form);
const { submitPassword, loading } = usePasswordChange();
const emit = defineEmits(['returnToInitialView']);
const toaster = useToaster();

async function handleSubmit(): Promise<void> {
    if (!isValid.value) return;

    const result = await submitPassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
    });

    if (result.success) {
        toaster.show(
            'Wir haben dir eine E-Mail zum Zurücksetzen deines Passwortes geschickt.',
            'success',
            'Code versendet!',
            5000,
        );

        console.log('Password Changed succesfully');

        form.currentPassword = '';
        form.newPassword = '';
        form.confirmPassword = '';
        returnToInitialView();
    } else {
        toaster.show('Error changing password', 'error');
        console.log('Error changing password');
    }
}

const returnToInitialView = () => {
    emit('returnToInitialView');
};
</script>

<template>
    <h1 class="text-white font-bold">PASSWORT ÄNDERN</h1>
    <p class="text-gray-60">
        Vorgaben: mind. 12 Zeichen, 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1
        Kleinbuchstabe
    </p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex items-end gap-4 py-5">
            <div class="flex flex-col gap-1 flex-1">
                <DynInput
                    v-model="form.currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    placeholder="Current Password"
                    :invalid="!!errors.currentPassword"
                />
                <p v-if="errors.currentPassword" class="text-red-alert text-xs">
                    {{ errors.currentPassword }}
                </p>
            </div>
            <button
                type="button"
                class="pb-2 text-white text-sm whitespace-nowrap"
            >
                Forgot password?
            </button>
        </div>

        <div class="grid grid-cols-2 gap-4 pb-8">
            <div class="flex flex-col gap-1">
                <DynInput
                    v-model="form.newPassword"
                    name="newPassword"
                    :label="'New Password'"
                    type="password"
                    placeholder="New Password"
                    :invalid="!!errors.newPassword"
                ></DynInput>
                <p v-if="errors.newPassword" class="text-red-alert text-xs">
                    {{ errors.newPassword }}
                </p>
            </div>

            <div class="flex flex-col gap-1">
                <DynInput
                    v-model="form.confirmPassword"
                    name="confirmPassword"
                    :label="'Confirm Password'"
                    type="password"
                    placeholder="Confirm Password"
                    :invalid="!!errors.confirmPassword"
                ></DynInput>
                <p v-if="errors.confirmPassword" class="text-red-alert text-xs">
                    {{ errors.confirmPassword }}
                </p>
            </div>
        </div>

        <div class="flex gap-3">
            <button
                @click="returnToInitialView()"
                type="button"
                class="border border-blue-active text-blue-active rounded px-4 py-2 text-sm cursor-pointer hover:bg-blue-xxx-45"
            >
                ABBRECHEN
            </button>
            <button
                type="submit"
                :disabled="!isValid || loading"
                class="bg-blue-active border rounded px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-blue-highlight enabled:cursor-pointer"
            >
                ÄNDERUNGEN SPEICHERN
            </button>
        </div>
    </form>
</template>
<style scoped></style>
