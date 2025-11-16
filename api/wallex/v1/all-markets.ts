const WALLEX_MARKETS_URL =
    process.env.WALLEX_MARKETS_URL ?? "https://api.wallex.ir/v1/all-markets";

export default async function handler(req: any, res: any) {
    try {
        const url = (req.url as string) || "";
        const search = url.includes("?") ? url.substring(url.indexOf("?")) : "";

        const targetUrl = `${WALLEX_MARKETS_URL}${search}`;

        const upstream = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const text = await upstream.text();

        res
            .status(upstream.status)
            .setHeader("Content-Type", "application/json")
            .send(text);
    } catch (err) {
        console.error("Wallex all-markets proxy error:", err);
        res
            .status(500)
            .setHeader("Content-Type", "application/json")
            .send(
                JSON.stringify({
                    success: false,
                    message: "Wallex proxy error for all-markets"
                })
            );
    }
}
