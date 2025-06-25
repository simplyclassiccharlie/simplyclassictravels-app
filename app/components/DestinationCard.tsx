// in src/app/components/DestinationCard.tsx
import Image from 'next/image';

// Define the shape of the props our component will accept
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function DestinationCard({ title, description, imageUrl }: CardProps) {
  return (
    <div className="destination-card">
      <Image src={imageUrl} alt={`Image of ${title}`} width={400} height={300} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}