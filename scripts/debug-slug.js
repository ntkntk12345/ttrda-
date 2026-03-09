
const { OphimService } = require('../services/ophim');

async function debug() {
    const slug = 'phon-hoa-lui-tan';
    console.log(`Debugging getMovieBySlug for slug: "${slug}"...`);

    try {
        const data = await OphimService.getMovieBySlug(slug);
        console.log('Result status:', data ? data.status : 'null');
        console.log('Result msg:', data ? data.msg : 'null');
        console.log('Movie Name:', data?.movie?.name);

        if (!data || !data.movie) {
            console.log('❌ OPhimService returned null or missing movie data.');
        } else {
            console.log('✅ Data fetched successfully.');
        }
    } catch (err) {
        console.error('❌ Error during fetch:', err);
    }
}

debug();
