import type { APIRoute } from "astro";
import { getEntry, getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const slug = params.slug;

    if (slug) {
        const post = await getEntry("blog", slug);

        if (post) {
            return new Response(JSON.stringify(post), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ error: `Post not found: ${slug}` }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ error: "Slug not provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
};