export async function POST(request) {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwv7SJiVAQucmz_A3J_qQgq1xTBdzmfYaTTDsZ7Gx8tcfk6y0ka915fyKbH7GHnbMTx/exec' 

    try {
        const body = await request.json();

        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error('Failed to submit');

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

