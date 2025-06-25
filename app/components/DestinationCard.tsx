import Link from 'next/link';

// The interface MUST accept price and currency
interface CardProps {
  id: string;
  name: string;
  city: string;
  tagline: string;
  mainImageUrl: string;
  price: number;
  currency: string;
  checkIn: string;
  checkOut: string;
  adults: number;
}

export default function DestinationCard({ id, name, city, tagline, mainImageUrl, price, currency, checkIn, checkOut, adults }: CardProps) {
  const hotelUrl = `/hotel/${id}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`;
  
  return (
    <Link href={hotelUrl} className="destination-card-link">
      <div className="destination-card">
        <img src={mainImageUrl} alt={`Image of ${name}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <h3>{name}</h3>
        <p>{city}</p>
        <p className="tagline">{tagline}</p>
        {/* We render the price here */}
        <div className="price-container">
          From <strong>{price} {currency}</strong>
        </div>
      </div>
    </Link>
  );
}