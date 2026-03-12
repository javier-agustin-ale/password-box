export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
    duration: number;
    title?: string;
}
