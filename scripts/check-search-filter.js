const fetch = require('node-fetch');

async function checkSearchFilter() {
    const baseUrl = 'https://ophim1.com/v1/api/tim-kiem';
    const keyword = 'yeu';
    // Try adding some filter params found in the category response
    const url = `${baseUrl}?keyword=${keyword}&filterCategory=tinh-cam`;

    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Status:', data.status);
        if (data.data && data.data.params) {
            console.log('Params returned:', data.data.params);
        } else {
            console.log('No params in response');
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

checkSearchFilter();
