const ORIGIN = process.env.WALLEX_API_BASE_URL ?? 'https://api.wallex.ir';

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
} as const;

export const runtime = 'nodejs'; // Explicit (defaults to Node.js on Vercel)

export async function OPTIONS(): Promise<Response> {
    return new Response(null, { status: 204, headers: CORS as any });
}

function buildTarget(req: Request): URL {
    const url = new URL(req.url);
    const tail = (url.searchParams.get('path') || '').replace(/^\/+/, '');
    const sp = new URLSearchParams(url.search);
    sp.delete('path');
    const qs = sp.toString();
    return new URL(`/${tail}${qs ? `?${qs}` : ''}`, ORIGIN);
}

async function proxy(req: Request): Promise<Response> {
    try {
        const target = buildTarget(req);

        const headers = new Headers();
        const ct = req.headers.get('content-type');
        if (ct) headers.set('content-type', ct);
        const auth = req.headers.get('authorization');
        if (auth) headers.set('authorization', auth);

        const init: RequestInit = {
            method: req.method,
            headers,
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
            redirect: 'follow'
        };

        const upstream = await fetch(target, init);

        const out = new Headers(upstream.headers);
        Object.entries(CORS).forEach(([k, v]) => out.set(k, v as string));

        return new Response(upstream.body, {
            status: upstream.status,
            statusText: upstream.statusText,
            headers: out
        });
    } catch (e: any) {
        const message = e?.message || String(e);
        return new Response(
            JSON.stringify({ ok: false, error: 'UPSTREAM_ERROR', message }),
            { status: 502, headers: { 'content-type': 'application/json', ...CORS } }
        );
    }
}

export default { fetch: proxy };
export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as HEAD };
