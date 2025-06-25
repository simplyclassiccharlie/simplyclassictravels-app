import Header from './components/Header';
import DestinationCard from './components/DestinationCard';
import { db } from './firebase'; // <-- Import our database connection
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

// Define the shape of our destination data for TypeScript
interface Destination {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// This is an async function that fetches data from Firestore
async function getDestinations(): Promise<Destination[]> {
  const destinationsCol = collection(db, 'destinations');
  const destinationSnapshot = await getDocs(destinationsCol);
  const destinationList = destinationSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
    };
  });
  return destinationList;
}

// This page is now an async Server Component!
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
            {/* We now MAP over the live data to create the cards dynamically */}
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                title={dest.title}
                description={dest.description}
                imageUrl={dest.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}