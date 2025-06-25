import crypto from 'crypto';

// These variables read the secret keys from your .env.local file
const API_KEY = process.env.HOTELBEDS_API_KEY;
const SECRET = process.env.HOTELBEDS_SECRET;

const BOOKING_API_BASE_URL = 'https://api.test.hotelbeds.com/hotel-api/1.0';
const CONTENT_API_BASE_URL = 'https://api.test.hotelbeds.com/hotel-content-api/1.0';

// This function generates the unique, required signature for every API call
function getSignature(): string {
    if (!API_KEY || !SECRET) {
        throw new Error("Hotelbeds API Key or Secret is not defined in .env.local");
    }
    const utcDate = Math.floor(new Date().getTime() / 1000);
    const signatureStr = `${API_KEY}${SECRET}${utcDate}`;
    
    return crypto.createHash('sha256').update(signatureStr).digest('hex');
}

// This function gets a list of available hotels
export async function getHotelAvailability(searchParams: { 
  checkIn: string, 
  checkOut: string, 
  destination?: string, 
  hotelCode?: string,
  adults: number 
}) {
  const endpoint = `${BOOKING_API_BASE_URL}/hotels`;

  const requestBody: any = {
    stay: {
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut
    },
    occupancies: [{
      rooms: 1,
      adults: searchParams.adults,
      children: 0
    }]
  };

  if (searchParams.destination) {
    requestBody.destination = { code: searchParams.destination };
  } else if (searchParams.hotelCode) {
    requestBody.hotels = { hotel: [parseInt(searchParams.hotelCode, 10)] };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Api-key': API_KEY!,
        'X-Signature': getSignature(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Hotelbeds API error response: ${response.status}`, errorBody);
      throw new Error(`Failed to fetch from Hotelbeds API: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error calling Hotelbeds service:", error);
    throw error;
  }
}

// This function gets the static content for a single hotel
export async function getHotelDetails(hotelCode: string) {
    const endpoint = `${CONTENT_API_BASE_URL}/hotels/${hotelCode}/details`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Api-key': API_KEY!,
                'X-Signature': getSignature(),
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip'
            },
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Hotelbeds Content API error: ${response.status}`, errorBody);
            throw new Error(`Failed to fetch hotel details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error calling getHotelDetails service:", error);
        throw error;
    }
}

// This function checks a specific rate before booking
export async function checkRate(rateKey: string) {
    const endpoint = `${BOOKING_API_BASE_URL}/checkrates`;
  
    const requestBody = {
      rooms: [{ rateKey: rateKey }]
    };
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Api-key': API_KEY!,
          'X-Signature': getSignature(),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Hotelbeds CheckRate API error: ${response.status}`, errorBody);
        throw new Error(`Failed to check rate: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error calling checkRate service:", error);
      throw error;
    }
  }
  // Add this new function to app/lib/hotelbeds-service.ts

interface BookingRequest {
    holderName: string;
    holderSurname: string;
    rateKey: string;
  }
  
  export async function bookHotel(bookingDetails: BookingRequest) {
    const endpoint = `${BOOKING_API_BASE_URL}/bookings`;
  
    const requestBody = {
      holder: {
        name: bookingDetails.holderName,
        surname: bookingDetails.holderSurname
      },
      rooms: [
        {
          rateKey: bookingDetails.rateKey,
          paxes: [
            {
              roomId: 1,
              type: "AD", // Adult
              name: bookingDetails.holderName,
              surname: bookingDetails.holderSurname
            }
          ]
        }
      ],
      clientReference: `SimplyClassicTravels-${new Date().getTime()}` // A unique reference for this booking
    };
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Api-key': API_KEY!,
          'X-Signature': getSignature(),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Hotelbeds Booking API error: ${response.status}`, errorBody);
        throw new Error(`Failed to book hotel: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error calling bookHotel service:", error);
      throw error;
    }
  }