import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  // TODO
  return new Response(JSON.stringify({ method: "GET" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ( {params, request } ) => {
    // TODO
    const body = await request.json();
    return new Response(JSON.stringify({ method: "POST", body }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}
