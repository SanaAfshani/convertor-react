const WALLEX_API_BASE_URL =
    process.env.WALLEX_API_BASE_URL ?? "https://api.wallex.ir";

export default async function handler(req: any, res: any) {
    try {
        const url = (req.url as string) || "";
        const search = url.includes("?") ? url.substring(url.indexOf("?")) : "";

        const targetUrl = `${WALLEX_API_BASE_URL}/v1/currencies${search}`;

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
        console.error("Wallex currencies proxy error:", err);
        res
            .status(500)
            .setHeader("Content-Type", "application/json")
            .send(
                JSON.stringify({
                    success: false,
                    message: "Wallex proxy error for currencies"
                })
            );
    }
}
