import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Since API Routes are separate entry points, we must ensure the admin app is initialized.
// Using an alias `@` is a clean way to reference the root of the 'src' or 'app' dir.
// Let's create this alias in the next step. For now, we'll use a relative path.
import serviceAccount from '../../../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const adminDb = admin.firestore();

export async function GET() {
  try {
    // Here is our data for the bulk add
    const destinationsData = [
      {
        name: "Hotel Eiffel Blomet",
        city: "Paris",
        countryCode: "FR",
        tagline: "Charming 4-star hotel in the 15th arrondissement.",
        mainImageUrl: "https://via.placeholder.com/400x300.png/a2d6c3/ffffff?text=Eiffel+Blomet"
      },
      {
        name: "The Ritz-Carlton, Kyoto",
        city: "Kyoto",
        countryCode: "JP",
        tagline: "Luxury riverside retreat with panoramic views.",
        mainImageUrl: "https://via.placeholder.com/400x300.png/c3a2d6/ffffff?text=Ritz-Kyoto"
      },
      {
        name: "Hotel Eden - Dorchester Collection",
        city: "Rome",
        countryCode: "IT",
        tagline: "Elegant luxury with breathtaking views of the Eternal City.",
        mainImageUrl: "https://via.placeholder.com/400x300.png/d6c3a2/ffffff?text=Hotel+Eden"
      }
    ];

    // Use a Firestore batch write for efficiency
    const batch = adminDb.batch();
    const destinationsRef = adminDb.collection('destinations');

    destinationsData.forEach(dest => {
      const docRef = destinationsRef.doc(); // Automatically generate a new document ID
      batch.set(docRef, dest);
    });

    // Commit the batch to the database
    await batch.commit();

    return NextResponse.json({ message: `Successfully added ${destinationsData.length} destinations.` }, { status: 200 });

  } catch (error) {
    console.error("Error seeding database:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: "Failed to seed database.", error: errorMessage }, { status: 500 });
  }
}