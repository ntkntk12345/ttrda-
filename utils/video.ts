
export const VideoUtils = {
    /**
     * Check if an HLS stream is alive (HEAD request)
     */
    checkHlsStream: async (url: string): Promise<boolean> => {
        if (!url) return false;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch(url, {
                method: 'HEAD',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            console.error('Error checking HLS stream:', error);
            return false;
        }
    }
};
