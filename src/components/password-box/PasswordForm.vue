<script lang="ts" setup>
import { reactive } from 'vue';
import DynInput from '../inputs/DynInput.vue';
import { usePasswordValidation } from '@/composables/password/usePasswordValidation';
import { usePasswordChange } from '@/composables/password/usePasswordChange';
import type { PasswordForm } from '@/types/password/passwordForm';

const form = reactive<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const { errors, isValid } = usePasswordValidation(form);
const { submitPassword, loading } = usePasswordChange();

async function handleSubmit(): Promise<void> {
    if (!isValid.value) return;

    const result = await submitPassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
    });

    if (result.success) {
        // Show toaster success and go back to initial view
        console.log('Password Changed succesfully');

        form.currentPassword = '';
        form.newPassword = '';
        form.confirmPassword = '';
    } else {
        // show toaster error
        console.log('Error changing password');
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex items-end gap-4">
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
            <button type="button" class="pb-2 text-sm whitespace-nowrap">
                Forgot password?
            </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
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
                type="button"
                class="border rounded px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
                ABBRECHEN
            </button>
            <button
                type="submit"
                :disabled="!isValid || loading"
                class="border rounded px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
                ÄNDERUNGEN SPEICHERN
            </button>
        </div>
    </form>
</template>
<style scoped></style>
