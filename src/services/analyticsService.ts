export function trackEvent(event: string, data?: Record<string, unknown>) {
    console.log('[analytics]', {
        event,
        timestamp: new Date().toISOString(),
        ...data,
    });
}
