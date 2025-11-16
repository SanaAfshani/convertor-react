const WALLEX_BASE_URL = process.env.VITE_WALLEX_BASE_URL ?? "https://api.wallex.ir/v1/currencies";

export default async function handler(request: Request): Promise<Response> {
    try {
        const url = `${WALLEX_BASE_URL}/currencies`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        const reqUrl = new URL(request.url);
        const qs = reqUrl.search;
        const targetUrl = qs ? url + qs : url;

        const res = await fetch(targetUrl, {
            method: "GET",
            headers
        });

        const text = await res.text();

        return new Response(text, {
            status: res.status,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=60, stale-while-revalidate=120"
            }
        });
    } catch (err) {
        console.error("currencies proxy error:", err);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Wallex proxy error for currencies"
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
