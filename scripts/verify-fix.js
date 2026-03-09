const fetch = require('node-fetch');

const API_HOST = 'https://ophim1.com';

async function verifyFix() {
    console.log('--- Verifying Fix Logic ---');

    async function checkFilter(params) {
        console.log(`\nTesting Params: ${JSON.stringify(params)}`);

        const queryParams = new URLSearchParams();
        if (params.category) queryParams.set('category', params.category);
        if (params.country) queryParams.set('country', params.country);
        if (params.year) queryParams.set('year', params.year);
        if (params.sort) queryParams.set('sort', params.sort);
        queryParams.set('page', (params.page || 1).toString());

        let endpoint = 'phim-moi-cap-nhat';
        if (params.type) {
            endpoint = params.type;
        }

        const url = `${API_HOST}/v1/api/danh-sach/${endpoint}?${queryParams.toString()}`;
        console.log(`Generated URL: ${url}`);

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.data && data.data.items) {
                const count = data.data.items.length;
                console.log(`Found ${count} items.`);
                if (count > 0) {
                    const first = data.data.items[0];
                    console.log(`First item: ${first.name}`);
                    if (first.category) console.log(`Categories: ${JSON.stringify(first.category)}`);
                }
            } else {
                console.log('No items or error:', data.status);
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    // 1. Category only (Hành Động)
    await checkFilter({ category: 'hanh-dong' });

    // 2. Type only (Phim Lẻ) -> Should use phim-le endpoint
    await checkFilter({ type: 'phim-le' });

    // 3. Type + Category (Phim Lẻ + Hành Động)
    await checkFilter({ type: 'phim-le', category: 'hanh-dong' });

    // 4. Country + Year
    await checkFilter({ country: 'trung-quoc', year: '2024' });
}

verifyFix();
