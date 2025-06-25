"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router

type Room = {
    code: string;
    name: string;
    rates: any[];
};

interface RoomListProps {
    rooms: Room[];
    currency: string;
}

export default function RoomList({ rooms, currency }: RoomListProps) {
    const router = useRouter(); // Initialize the router
    const [loadingKey, setLoadingKey] = useState<string | null>(null);
    const [checkedRate, setCheckedRate] = useState<any | null>(null);
    const [error, setError] = useState('');

    // State for the booking form
    const [holderName, setHolderName] = useState('');
    const [holderSurname, setHolderSurname] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    const handleCheckRate = async (rateKey: string) => {
        setLoadingKey(rateKey);
        setError('');
        setCheckedRate(null);
        try {
            const response = await fetch('/api/check-rate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rateKey })
            });
            if (!response.ok) throw new Error("Failed to get a confirmed rate.");
            const data = await response.json();
            setCheckedRate(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoadingKey(null);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBooking(true);
        setError('');

        try {
            const response = await fetch('/api/book-hotel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rateKey: checkedRate.hotel.rooms[0].rates[0].rateKey,
                    holderName,
                    holderSurname
                })
            });

            if (!response.ok) throw new Error("Booking failed. Please try again.");

            const confirmation = await response.json();
            
            // Redirect to a confirmation page with the booking reference
            router.push(`/confirmation?ref=${confirmation.booking.reference}`);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred during booking.");
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="rooms-section">
            <h2>Available Rooms</h2>
            {rooms.map((room) => (
                <div key={room.code} className="room-card">
                    <h3>{room.name}</h3>
                    {room.rates.map((rate) => (
                        <div key={rate.rateKey} className="rate-info">
                            <p>{rate.boardName}</p>
                            <p><strong>Price: {rate.net} {currency}</strong></p>
                            <button
                                onClick={() => handleCheckRate(rate.rateKey)}
                                disabled={!!loadingKey}
                                className="cta-button"
                            >
                                {loadingKey === rate.rateKey ? 'Checking...' : 'Check Rate'}
                            </button>
                        </div>
                    ))}
                </div>
            ))}

            {error && <div className="error-message">{error}</div>}

            {checkedRate && (
                <div className="checked-rate-results">
                    <h3>Rate Confirmed!</h3>
                    <p><strong>Final Price: {checkedRate.hotel.rooms[0].rates[0].sellingRate} {checkedRate.hotel.currency}</strong></p>
                    
                    <form onSubmit={handleBooking} className="booking-form">
                        <h4>Enter Guest Details</h4>
                        <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="First Name" required />
                        <input type="text" value={holderSurname} onChange={(e) => setHolderSurname(e.target.value)} placeholder="Last Name" required />
                        <button type="submit" className="cta-button" disabled={isBooking}>
                            {isBooking ? 'Confirming...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}