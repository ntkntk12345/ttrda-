
const { OphimService } = require('../services/ophim');

// Mock fetch for Node.js environment if needed, or rely on Next.js polyfills if running in that context
// But since this is a standalone script, we might need to assume fetch is available (Node 18+)
// We need to point to the TS file source, but we can't run TS directly without ts-node.
// Simpler to just use a pure JS script that fetches the API directly.

const API_HOST = 'https://ophim1.com';

async function fetchMovie(slug) {
    console.log(`Fetching ${slug}...`);
    try {
        const res = await fetch(`${API_HOST}/v1/api/phim/${slug}`);
        const data = await res.json();

        if (data.status === 'success' || data.status === true) {
            const movie = data.data?.item || data.movie;
            const episodes = movie.episodes || data.episodes;

            console.log('Movie Name:', movie.name);
            console.log('Episodes Found:', episodes.length);

            if (episodes.length > 0) {
                const firstServer = episodes[0];
                console.log('Server Name:', firstServer.server_name);
                console.log('Sample Episodes:');
                firstServer.server_data.slice(0, 5).forEach(ep => {
                    console.log(` - Name: "${ep.name}", Slug: "${ep.slug}", Link: ${ep.link_m3u8 ? 'Has m3u8' : 'No m3u8'}`);
                });
            }
        } else {
            console.log('Failed:', data);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

fetchMovie('stargate-sg-1-phan-7');
