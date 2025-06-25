import Image from 'next/image'; // We need this for the <img> tags to work best in Next.js

export default function Home() {
  return (
    <>
      <header className="main-header">
        <nav className="main-nav">
          <a href="#" className="nav-logo">SCT</a>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="content-area">
        <h1>Your Next Adventure Awaits</h1>
        <p>Discover timeless destinations with Simply Classic Travels. Our curated tours offer a blend of luxury, culture, and history.</p>
        <a href="#" className="cta-button">Explore Tours</a>

        <section className="destinations-section">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300.png/a2d6c3/ffffff?text=Paris" alt="Romantic street in Paris" />
              <h3>Paris, France</h3>
              <p>The city of light, art, and romance.</p>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300.png/c3a2d6/ffffff?text=Kyoto" alt="Ancient temple in Kyoto" />
              <h3>Kyoto, Japan</h3>
              <p>Experience the heart of ancient Japan.</p>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300.png/d6c3a2/ffffff?text=Rome" alt="The Colosseum in Rome" />
              <h3>Rome, Italy</h3>
              <p>Walk through history in the eternal city.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}