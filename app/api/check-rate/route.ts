import { NextResponse } from 'next/server';
import { checkRate } from '@/app/lib/hotelbeds-service';

export async function POST(request: Request) {
    try {
        // Get the rateKey from the request sent by the component
        const body = await request.json();
        const { rateKey } = body;

        // Make sure we received a rateKey
        if (!rateKey) {
            return NextResponse.json({ message: "Missing rateKey parameter." }, { status: 400 });
        }

        // Call our secure service to get the confirmed rate from Hotelbeds
        const checkedRateData = await checkRate(rateKey);

        // Forward the successful response back to the component
        return NextResponse.json(checkedRateData);

    } catch (error) {
        console.error("[API_CHECK_RATE_ERROR]", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ message: "An error occurred during rate check.", error: errorMessage }, { status: 500 });
    }
}