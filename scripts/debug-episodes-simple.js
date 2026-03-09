
const API_HOST = 'https://ophim1.com';

async function fetchMovie(slug) {
    console.log(`Fetching ${slug}...`);
    try {
        const res = await fetch(`${API_HOST}/v1/api/phim/${slug}`);
        const data = await res.json();

        if (data.status === 'success' || data.status === true) {
            const movie = data.data?.item || data.movie;
            // The API structure for 'phim' endpoint puts episodes in data.data.item.episodes
            // But let's check what we actually get

            console.log('Main Data Keys:', Object.keys(data));
            if (data.data) console.log('Data Keys:', Object.keys(data.data));
            if (data.data?.item) console.log('Item Keys:', Object.keys(data.data.item));

            const episodes = data.data?.item?.episodes || data.episodes || [];

            console.log('Movie Name:', data.data?.item?.name);
            console.log('Episodes Count:', episodes.length);

            if (episodes.length > 0) {
                const firstServer = episodes[0];
                console.log('Server Name:', firstServer.server_name);
                console.log('Sample Episodes (first 5):');
                firstServer.server_data.slice(0, 5).forEach(ep => {
                    console.log(` - Name: "${ep.name}", Slug: "${ep.slug}"`);
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
