import Header from './components/Header';
import DestinationCard from './components/DestinationCard';
import { adminDb } from './lib/firebase-admin'; // <-- IMPORT our clean connection
import { DocumentData } from 'firebase-admin/firestore';

interface Destination {
  id: string;
  name: string;
  city: string;
  tagline: string;
  mainImageUrl: string;
}

async function getDestinations(): Promise<Destination[]> {
  const destinationSnapshot = await adminDb.collection('destinations').get();
  const destinationList = destinationSnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      name: data.name,
      city: data.city,
      tagline: data.tagline,
      mainImageUrl: data.mainImageUrl,
    };
  });
  return destinationList;
}

export default async function Home() {
  const destinations = await getDestinations();

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
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                id={dest.id}
                name={dest.name}
                city={dest.city}
                tagline={dest.tagline}
                mainImageUrl={dest.mainImageUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}