<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { usePasswordValidation } from '@/features/password/composables/usePasswordValidation';
import { usePasswordChange } from '@/features/password/composables/usePasswordChange';
import { useToaster } from '@/shared/composables/toaster/useToaster';
import EyeIcon from '@/assets/svg-assets/eye.svg?component';
import EyeClosedIcon from '@/assets/svg-assets/eye-closed.svg?component';
import type { PasswordForm } from '../types/passwordForm';
import DynInput from '@/shared/components/inputs/DynInput.vue';

const form = reactive<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});
const showPassword = reactive({
    current: false,
    new: false,
    confirm: false,
});
const inputTouched = reactive({
    current: false,
    new: false,
    confirm: false,
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

const returnToInitialView = (): void => {
    emit('returnToInitialView');
};
</script>

<template>
    <h1 class="text-white text-2xl font-bold">PASSWORT ÄNDERN</h1>
    <p class="text-gray-60 text-sm">
        Vorgaben: mind. 12 Zeichen, 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1
        Kleinbuchstabe
    </p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex items-center gap-4 py-5">
            <div class="flex flex-col gap-1 flex-1">
                <DynInput
                    v-model="form.currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    @keydown="inputTouched.current = true"
                    :type="showPassword.current ? 'text' : 'password'"
                    placeholder="Current Password"
                    :invalid="!!errors.currentPassword && inputTouched.current"
                >
                    <template #append>
                        <button
                            type="button"
                            class="text-white flex items-center justify-center w-full h-full"
                            @click="
                                showPassword.current = !showPassword.current
                            "
                        >
                            <EyeIcon
                                v-if="!showPassword.current"
                                class="w-4 h-4 text-white fill-current"
                            />
                            <EyeClosedIcon
                                v-else
                                class="w-4 h-4 text-white fill-current"
                            />
                        </button>
                    </template>
                </DynInput>
                <p
                    v-if="errors.currentPassword && inputTouched.current"
                    class="text-red-alert text-xs"
                >
                    {{ errors.currentPassword }}
                </p>
            </div>
            <button
                type="button"
                class="text-blue-active text-sm whitespace-nowrap"
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
                    :type="showPassword.new ? 'text' : 'password'"
                    placeholder="New Password"
                    :invalid="!!errors.newPassword && inputTouched.new"
                    @keydown="inputTouched.new = true"
                >
                    <template #append>
                        <button
                            type="button"
                            class="text-white flex items-center justify-center w-full h-full"
                            @click="showPassword.new = !showPassword.new"
                        >
                            <EyeIcon
                                v-if="!showPassword.new"
                                class="w-4 h-4 text-white fill-current"
                            />
                            <EyeClosedIcon
                                v-else
                                class="w-4 h-4 text-white fill-current"
                            />
                        </button>
                    </template>
                </DynInput>
                <p
                    v-if="errors.newPassword && inputTouched.new"
                    class="text-red-alert text-xs"
                >
                    {{ errors.newPassword }}
                </p>
            </div>

            <div class="flex flex-col gap-1">
                <DynInput
                    v-model="form.confirmPassword"
                    name="confirmPassword"
                    :label="'Confirm Password'"
                    :type="showPassword.confirm ? 'text' : 'password'"
                    placeholder="Confirm Password"
                    @keydown="inputTouched.confirm = true"
                    :invalid="!!errors.confirmPassword && inputTouched.confirm"
                >
                    <template #append>
                        <button
                            type="button"
                            class="text-white flex items-center justify-center w-full h-full"
                            @click="
                                showPassword.confirm = !showPassword.confirm
                            "
                        >
                            <EyeIcon
                                v-if="!showPassword.confirm"
                                class="w-4 h-4 text-white fill-current"
                            />
                            <EyeClosedIcon
                                v-else
                                class="w-4 h-4 text-white fill-current"
                            />
                        </button>
                    </template>
                </DynInput>
                <p
                    v-if="errors.confirmPassword && inputTouched.confirm"
                    class="text-red-alert text-xs"
                >
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
                class="flex items-center justify-center gap-2 border rounded px-4 py-2 text-sm bg-blue-active text-white disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-blue-highlight enabled:cursor-pointer"
            >
                <svg
                    v-if="loading"
                    class="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>

                <span>
                    {{ loading ? 'Speichern...' : 'ÄNDERUNGEN SPEICHERN' }}
                </span>
            </button>
        </div>
    </form>
</template>
<style scoped></style>
