const fetch = require('node-fetch');

const API_HOST = 'https://ophim1.com';

async function testFilter() {
    console.log('--- Testing Type & Sort Filters ---');

    async function checkEndpoint(name, url) {
        console.log(`\nTesting ${name}: ${url}`);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.data && data.data.items) {
                const count = data.data.items.length;
                console.log(`Found ${count} items.`);
                if (count > 0) {
                    const first = data.data.items[0];
                    console.log(`Name: ${first.name}`);
                    console.log(`Year: ${first.year}`);
                    // format time might vary
                    console.log(`Modified: ${first.modified?.time}`);
                }
            } else {
                console.log('No items or error:', data.status);
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    // 1. Check if 'type' is actually handled via 'category'
    await checkEndpoint('Category=phim-le', `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?category=phim-le`);
    await checkEndpoint('Category=phim-bo', `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?category=phim-bo`);

    // 2. Check sort
    await checkEndpoint('Sort=year', `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?sort=year`);
    await checkEndpoint('Sort=view', `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?sort=view`); // usually not supported publicly but let's check

    // 3. Search with category (re-verify)
    await checkEndpoint('Search + Category', `${API_HOST}/v1/api/tim-kiem?keyword=a&category=hanh-dong`);
}

testFilter();
