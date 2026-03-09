
export const OPhimUtils = {
    /**
     * Format movie content (remove HTML tags if needed, though OPhim usually returns clean text)
     */
    cleanContent: (content: string): string => {
        if (!content) return '';
        return content.replace(/<[^>]*>?/gm, '');
    },

    /**
     * Get full poster URL
     */
    getPosterUrl: (path: string): string => {
        if (!path) return '/images/no-poster.png'; // Placeholder needed
        if (path.startsWith('http')) return path;
        return `https://img.ophim.live/uploads/movies/${path}`;
    },

    /**
     * Get full thumbnail URL
     */
    getThumbUrl: (path: string): string => {
        if (!path) return '/images/no-thumb.png'; // Placeholder needed
        if (path.startsWith('http')) return path;
        return `https://img.ophim.live/uploads/movies/${path}`;
    },

    /**
     * Format duration
     */
    formatDuration: (time: string): string => {
        if (!time) return 'N/A';
        return time.replace('phút', ' min');
    }
};
