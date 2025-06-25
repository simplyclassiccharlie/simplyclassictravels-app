import { adminDb } from '@/app/lib/firebase-admin';
import { DocumentData } from 'firebase-admin/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface Destination {
  name: string;
  tagline: string;
  mainImageUrl: string;
}

async function getDestination(slug: string): Promise<Destination | null> {
  const docRef = adminDb.collection('destinations').doc(slug);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return docSnap.data() as Destination;
  } else {
    return null;
  }
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = await getDestination(params.slug);

  if (!destination) {
    return <div>Destination not found.</div>;
  }

  return (
    <div className="destination-detail-container">
      <Link href="/" className="back-link">← Back to Home</Link>
      <h1 className="destination-title">{destination.name}</h1>
      <div className="image-container">
        {/* This is the updated Image component */}
        <Image src={destination.mainImageUrl} alt={`Image of ${destination.name}`} fill style={{ objectFit: 'cover' }} />
      </div>
      <p className="destination-description">{destination.tagline}</p>
    </div>
  );
}