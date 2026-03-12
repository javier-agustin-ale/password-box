<script lang="ts" setup>
import { reactive } from 'vue';
import DynInput from '../inputs/DynInput.vue';

import type { PasswordForm } from '@/types/password/passwordForm';

const form = reactive<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const handleSubmit = (): void => {
    console.log(form);
};
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
                />
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
                ></DynInput>
            </div>

            <div class="flex flex-col gap-1">
                <DynInput
                    v-model="form.confirmPassword"
                    name="confirmPassword"
                    :label="'Confirm Password'"
                    type="password"
                    placeholder="Confirm Password"
                ></DynInput>
            </div>
        </div>

        <div class="flex gap-3">
            <button type="button" class="border rounded px-4 py-2 text-sm">
                ABBRECHEN
            </button>
            <button type="submit" class="border rounded px-4 py-2 text-sm">
                ÄNDERUNGEN SPEICHERN
            </button>
        </div>
    </form>
</template>
<style scoped></style>
