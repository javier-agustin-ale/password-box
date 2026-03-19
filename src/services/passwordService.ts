import type { Password } from '@/types/password/password';

export async function changePassword(
    payload: Password,
): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (Math.random() < 0.3) {
        console.log('Invalid current password');
        throw new Error('Invalid current password');
    }

    return { success: true };
}
