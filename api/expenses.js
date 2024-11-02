export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const { pathname } = url;

        if (pathname === "/expenses" && request.method === "POST") {
            const data = await request.json();
            const { date, category, description, amount } = data;

            // Insert expense into the database
            await env.DB.prepare(
                "INSERT INTO expenses (date, category, description, amount) VALUES (?, ?, ?, ?)"
            ).bind(date, category, description, amount).run();

            return new Response(JSON.stringify({ status: "success" }), { status: 201 });
        }

        if (pathname === "/expenses" && request.method === "GET") {
            const expenses = await env.DB.prepare("SELECT * FROM expenses").all();
            return new Response(JSON.stringify(expenses.results), { status: 200 });
        }

        return new Response("Not found", { status: 404 });
    }
};
