import Link from 'next/link';
import Header from './components/Header'; // We'll still use the same header

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome To Simply Classic Travels</h1>
          <p>Unforgettable journeys begin here. Discover and book your perfect stay.</p>
          <Link href="/search" className="cta-button hero-button">
            Start Your Search
          </Link>
        </div>
      </div>
    </>
  );
}