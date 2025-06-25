import { NextResponse } from 'next/server';
import { getHotelAvailability } from '@/app/lib/hotelbeds-service';

// Set to 'true' if you want to use local data and save your API calls
const MOCK_MODE = false;

export async function POST(request: Request) {
    if (MOCK_MODE) {
      // Logic for mock mode will go here if we need it again
      // For now, we are skipping it
    }

    // --- LIVE API MODE ---
    try {
        const body = await request.json();
        const { destination, checkIn, checkOut, adults } = body;

        if (!destination || !checkIn || !checkOut || !adults) {
            return NextResponse.json({ message: "Missing required search parameters." }, { status: 400 });
        }
        
        const hotelbedsData = await getHotelAvailability({ destination, checkIn, checkOut, adults });

        if (!hotelbedsData.hotels || !hotelbedsData.hotels.hotels || hotelbedsData.hotels.hotels.length === 0) {
             return NextResponse.json({ hotels: [] });
        }

        // Using the verified paths from the live data you captured
        const simplifiedHotels = hotelbedsData.hotels.hotels.map((hotel: any) => ({
            id: hotel.code.toString(),
            name: hotel.name,
            city: hotel.destinationName,
            mainImageUrl: `https://placehold.co/400x300/5d3a9b/ffffff.png?text=${encodeURIComponent(hotel.name)}`,
            tagline: `Category: ${hotel.categoryName}`,
            price: hotel.minRate,
            currency: hotel.currency
        }));
        
        return NextResponse.json({ hotels: simplifiedHotels });

    } catch (error) {
        console.error("[API_HOTEL_SEARCH_ERROR]", error);
        return NextResponse.json({ message: "An error occurred while searching for hotels.", error: (error as Error).message }, { status: 500 });
    }
}