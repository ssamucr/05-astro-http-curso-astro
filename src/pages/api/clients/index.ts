import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async () => {
  
    const clients = await db.select().from(Clients);

  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ( {params, request } ) => {
    try {
        const {id, ...body} = await request.json();

        const { lastInsertRowid } = await db.insert(Clients).values(body);

        return new Response(JSON.stringify({ id: lastInsertRowid?.toString(), ...body }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new Response(JSON.stringify({ msg: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
