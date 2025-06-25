// In src/app/components/DestinationCard.tsx
import Image from 'next/image';
import Link from 'next/link'; // <-- 1. Import Link

interface CardProps {
  id: string; // <-- 2. We now need the ID for the link
  title: string;
  description: string;
  imageUrl: string;
}

export default function DestinationCard({ id, title, description, imageUrl }: CardProps) {
  // 3. Wrap everything in a Link component
  return (
    <Link href={`/destinations/${id}`} className="destination-card-link">
      <div className="destination-card">
        <Image src={imageUrl} alt={`Image of ${title}`} width={400} height={300} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}