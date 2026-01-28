export type ToastType = 'success' | 'error' | 'info';

export interface ToastEventDetail {
    message: string;
    type: ToastType;
    duration?: number;
}

const dispatchToast = (message: string, type: ToastType, duration: number = 3000) => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent<ToastEventDetail>('toast-notification', {
            detail: { message, type, duration }
        });
        window.dispatchEvent(event);
    }
};

export const toast = {
    success: (message: string, duration: number = 3000) => dispatchToast(message, 'success', duration),
    error: (message: string, duration: number = 4000) => dispatchToast(message, 'error', duration),
    info: (message: string, duration: number = 3000) => dispatchToast(message, 'info', duration)
};
