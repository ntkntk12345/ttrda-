const fetch = require('node-fetch');

async function checkApi() {
    const url = 'https://ophim1.com/v1/api/danh-sach/phim-bo?page=1';
    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Status:', data.status);
        if (data.data) {
            console.log('Data keys:', Object.keys(data.data));
            if (data.data.params) {
                console.log('Params keys:', Object.keys(data.data.params));
                console.log('Pagination:', data.data.params.pagination);
            } else {
                console.log('Params is missing!');
            }
        } else {
            console.log('data.data is missing');
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

checkApi();
