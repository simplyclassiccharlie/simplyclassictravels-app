import { getHotelDetails, getHotelAvailability } from '@/app/lib/hotelbeds-service';
import Image from 'next/image';
import Link from 'next/link';
import RoomList from '@/app/components/RoomList'; // We will use our interactive component

// This page now receives two sets of parameters from the URL:
// params: for dynamic path segments like the [hotelCode]
// searchParams: for query parameters like ?checkIn=...
export default async function HotelDetailPage({ params, searchParams }: {
  params: { hotelCode: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { hotelCode } = params;
  const { checkIn, checkOut, adults } = searchParams;

  // Set up the options for our API calls, with defaults
  const searchOptions = {
    hotelCode: hotelCode,
    checkIn: typeof checkIn === 'string' ? checkIn : '',
    checkOut: typeof checkOut === 'string' ? checkOut : '',
    adults: typeof adults === 'string' ? parseInt(adults, 10) : 2,
  };

  try {
    // For performance, we fetch both the static details and the live availability at the same time
    const [detailsData, availabilityData] = await Promise.all([
      getHotelDetails(hotelCode),
      getHotelAvailability({ ...searchOptions }) // Pass the full options here
    ]);

    const hotelDetails = detailsData?.hotel;
    const availableHotel = availabilityData?.hotels?.hotels[0];

    // If either API call fails to find the hotel, show a not found message
    if (!hotelDetails || !availableHotel) {
      return (
        <div className="destination-detail-container">
          <Link href="/search" className="back-link">← Back to Search</Link>
          <h1>Hotel Not Found</h1>
          <p>Details or availability for this hotel could not be loaded for the selected dates.</p>
        </div>
      );
    }

    return (
      <div className="destination-detail-container">
        <Link href="/search" className="back-link">← Back to Search</Link>
        
        <h1 className="destination-title">{hotelDetails.name.content}</h1>
        
        {hotelDetails.images?.[0]?.path && (
          <div className="image-container">
            <Image 
              src={`http://photos.hotelbeds.com/giata/${hotelDetails.images[0].path}`} 
              alt={`Image of ${hotelDetails.name.content}`} 
              fill 
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        
        <div className="destination-description">
          <h2>Description</h2>
          <p>{hotelDetails.description.content}</p>
        </div>

        {/* We render our interactive Client Component, passing the server-fetched room data to it */}
        <RoomList rooms={availableHotel.rooms} currency={availableHotel.currency} />

      </div>
    );
  } catch (error) {
    console.error("Failed to render hotel detail page:", error);
    return (
      <div className="destination-detail-container">
        <Link href="/search" className="back-link">← Back to Search</Link>
        <h1>Error</h1>
        <p>Could not load details for this hotel. Please try again.</p>
      </div>
    );
  }
}