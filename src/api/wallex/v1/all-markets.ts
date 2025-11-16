const WALLEX_BASE_URL = process.env.VITE_WALLEX_BASE_URL ?? "https://api.wallex.ir/";
const WALLEX_API_KEY = process.env.WALLEX_API_KEY;

export const config = {
    runtime: "edge"
};

export default async function handler(request: Request): Promise<Response> {
    try {
        const url = `${WALLEX_BASE_URL}/v1/all-markets`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (WALLEX_API_KEY) {
            headers["X-API-KEY"] = WALLEX_API_KEY;
        }

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
                "Cache-Control": "s-maxage=15, stale-while-revalidate=30"
            }
        });
    } catch (err) {
        console.error("all-markets proxy error:", err);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Wallex proxy error for all-markets"
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
