import Header from './components/Header';
import DestinationCard from './components/DestinationCard';
import admin from 'firebase-admin';

// Import the service account key from the file system
// The '../' is needed to go up one level from the 'app' directory to the root
import serviceAccount from '../serviceAccountKey.json';

// Define the shape of our destination data for TypeScript
interface Destination {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Initialize the Firebase Admin App (only if it hasn't been already)
// This check prevents errors during hot-reloading in development
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Get a reference to the admin instance of Firestore
const adminDb = admin.firestore();

// This function now uses the adminDb to fetch data
async function getDestinations(): Promise<Destination[]> {
  const destinationSnapshot = await adminDb.collection('destinations').get();
  const destinationList = destinationSnapshot.docs.map(doc => {
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