// In src/app/components/Header.tsx

export default function Header() {
  return (
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
  );
}