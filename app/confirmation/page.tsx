"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';

export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const bookingReference = searchParams.get('ref');

    return (
        <>
            <Header />
            <main className="content-area">
                <div className="confirmation-box">
                    <h1>Booking Confirmed!</h1>
                    <p>Thank you for booking with the greatest booking engine ever created.</p>
                    <p>Your booking reference is:</p>
                    <strong className="booking-ref">{bookingReference}</strong>
                    <Link href="/" className="cta-button">
                        Back to Home
                    </Link>
                </div>
            </main>
        </>
    );
}