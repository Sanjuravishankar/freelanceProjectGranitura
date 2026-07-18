import "./Hero.css"


import Image from "next/image";


export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">Est. 2008 · Bangalore, India</p>

        <h1 className="hero-title">
          Stone of <br />
          <em>Timeless</em>
          <br />
          Character
        </h1>

        <p className="hero-subtitle">
          Premium Italian marble, granite, Bangalore stone and Kota stone —
          sourced with precision, crafted for spaces that endure.
        </p>

        <div className="hero-actions">
          <a href="#catalog" className="btn-primary">
            Explore Catalog
          </a>

          <a href="#process" className="btn-outline">
            How We Work

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="18"
              height="18"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">500+</div>
            <div className="hero-stat-label">Projects Delivered</div>
          </div>

          <div>
            <div className="hero-stat-num">40+</div>
            <div className="hero-stat-label">Stone Varieties</div>
          </div>

          <div>
            <div className="hero-stat-num">15yr</div>
            <div className="hero-stat-label">Expertise</div>
          </div>
        </div>
      </div>

      <div className="hero-right">
  <div className="hero-stone-grid">

    <div className="stone-panel">
      <Image
        src="/assets/ItalianMarbles.jpg"
        alt="Italian Carrara White"
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="stone-image"
      />
      <div className="stone-label">
        Italian Carrara White
      </div>
    </div>

    <div className="stone-panel">
      <Image
        src="/assets/Granites.jpg"
        alt="Green Italian Marble"
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="stone-image"
      />
      <div className="stone-label">
        Green Italian Marble
      </div>
    </div>

    <div className="stone-panel">
      <Image
        src="/assets/BangloreStone.jpg"
        alt="Black Granite"
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="stone-image"
      />
      <div className="stone-label">
        Black Granite
      </div>
    </div>

    <div className="stone-panel">
      <Image
        src="/assets/KotaBlackStone.jpg"
        alt="Kota Blue Stone"
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="stone-image"
      />
      <div className="stone-label">
        Kota Blue Stone
      </div>
    </div>

  </div>

  <div className="scroll-hint">
    <span>Scroll</span>
    <div className="scroll-line"></div>
  </div>
</div>
    </section>
  );
}
