"use client";

import { useState } from 'react';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';

// The interface MUST include price and currency
interface HotelResult {
  id: string;
  name: string;
  city: string;
  mainImageUrl: string;
  tagline: string;
  price: number;
  currency: string;
}

export default function SearchPage() {
  const [destination, setDestination] = useState('PMI');
  const [checkIn, setCheckIn] = useState('2025-08-10');
  const [checkOut, setCheckOut] = useState('2025-08-12');
  const [adults, setAdults] = useState(2);
  
  const [results, setResults] = useState<HotelResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/hotel-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, checkIn, checkOut, adults })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch results.');
      }

      const data = await response.json();
      setResults(data.hotels);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="content-area">
        <h1>Your Next Adventure Awaits</h1>
        <p>Search for your perfect stay with the greatest booking engine ever created.</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination Code (e.g. PMI)" />
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          <input type="number" value={adults} min="1" onChange={e => setAdults(parseInt(e.target.value, 10))} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search Hotels'}
          </button>
        </form>

        {error && <div className="error-message">Error: {error}</div>}

        <section className="destinations-section">
          <h2>Results</h2>
          <div className="destinations-grid">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              results.length > 0 ? (
                results.map((hotel) => (
                  <DestinationCard
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    city={hotel.city}
                    tagline={hotel.tagline || 'Hotel'}
                    mainImageUrl={hotel.mainImageUrl}
                    // We must pass the price and currency here
                    price={hotel.price}
                    currency={hotel.currency}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    adults={adults}
                  />
                ))
              ) : (
                <p>No hotels found. Try searching for destination code 'PMI'.</p>
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}