import { NextResponse } from 'next/server';
import { bookHotel } from '@/app/lib/hotelbeds-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rateKey, holderName, holderSurname } = body;

        if (!rateKey || !holderName || !holderSurname) {
            return NextResponse.json({ message: "Missing required booking details." }, { status: 400 });
        }

        const bookingConfirmation = await bookHotel({ rateKey, holderName, holderSurname });

        return NextResponse.json(bookingConfirmation);

    } catch (error) {
        console.error("[API_BOOK_HOTEL_ERROR]", error);
        return NextResponse.json({ message: "An error occurred during booking.", error: (error as Error).message }, { status: 500 });
    }
}