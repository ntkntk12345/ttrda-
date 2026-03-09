const fetch = require('node-fetch');

async function checkListKeyword() {
    const baseUrl = 'https://ophim1.com/v1/api/danh-sach/phim-moi-cap-nhat';
    const keyword = 'yeu';
    // Try adding keyword to list endpoint
    const url = `${baseUrl}?keyword=${keyword}`;

    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('Status:', data.status);
        if (data.data && data.data.params) {
            console.log('Params returned:', data.data.params);
        } else {
            console.log('No params, raw data keys:', Object.keys(data.data || {}));
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

checkListKeyword();
