import { NextRequest, NextResponse } from 'next/server';

const API_HOST = 'https://ophim1.com';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const res = await fetch(`${API_HOST}/v1/api/phim/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from OPhim' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
