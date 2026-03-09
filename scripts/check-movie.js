const fetch = require('node-fetch');

const API_HOST = 'https://ophim1.com';

async function checkMovieDetail(slug) {
    console.log(`\nTesting Movie Detail: ${slug}`);
    try {
        const url = `${API_HOST}/v1/api/phim/${slug}`;
        console.log(`Fetching: ${url}`);
        const res = await fetch(url);
        const data = await res.json();

        console.log('Status:', data.status);
        if (data.status === 'success' || data.status === true) {
            console.log('Movie found:', data.data?.item?.name);
            console.log('Episodes:', data.data?.item?.episodes?.length);
        } else {
            console.log('Movie NOT found or error.');
            console.log('Msg:', data.msg);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

// Test with the problematic slug from user log
const problematicSlug = '%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%B5';
// Decode it to see what it is
const decodedSlug = decodeURIComponent(problematicSlug);
console.log('Decoded Slug:', decodedSlug);

checkMovieDetail(problematicSlug);
checkMovieDetail(decodedSlug);
