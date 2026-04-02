import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	console.log("Seeding database...");

	await db.insert(Clients).values([
		{ name: "Kasim", age: 30, isActive: true },
		{ name: "Mina", age: 25, isActive: false },
		{ name: "Liam", age: 28, isActive: true },
		{ name: "Sophia", age: 22, isActive: true },
		{ name: "Ethan", age: 35, isActive: false },
	]);

}
