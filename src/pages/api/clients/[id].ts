import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ( {params} ) => {
    // TODO
    const { id } = params;
    return new Response(JSON.stringify({ method: "GET", id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export const PUT: APIRoute = async ( {params, request } ) => {
    // TODO
    const { id } = params;
    const body = await request.json();
    return new Response(JSON.stringify({ method: "PUT", id, body }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export const DELETE: APIRoute = async ( {params} ) => {
    // TODO
    const { id } = params;
    return new Response(JSON.stringify({ method: "DELETE", id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export const PATCH: APIRoute = async ( {params, request } ) => {
    // TODO
    const { id } = params;
    const body = await request.json();
    return new Response(JSON.stringify({ method: "PATCH", id, body }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}   