import Image from 'next/image';
import Header from './components/Header';
import DestinationCard from './components/DestinationCard'; // <-- 1. IMPORT the new component

export default function Home() {
  return (
    <>
      <Header />

      <main className="content-area">
        <h1>Your Next Adventure Awaits</h1>
        <p>Discover timeless destinations with Simply Classic Travels. Our curated tours offer a blend of luxury, culture, and history.</p>
        <a href="#" className="cta-button">Explore Tours</a>

        <section className="destinations-section">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            {/* 2. USE the new component three times with different "props" */}
            <DestinationCard
              title="Paris, France"
              description="The city of light, art, and romance."
              imageUrl="https://via.placeholder.com/400x300.png/a2d6c3/ffffff?text=Paris"
            />
            <DestinationCard
              title="Kyoto, Japan"
              description="Experience the heart of ancient Japan."
              imageUrl="https://via.placeholder.com/400x300.png/c3a2d6/ffffff?text=Kyoto"
            />
            <DestinationCard
              title="Rome, Italy"
              description="Walk through history in the eternal city."
              imageUrl="https://via.placeholder.com/400x300.png/d6c3a2/ffffff?text=Rome"
            />
          </div>
        </section>
      </main>
    </>
  );
}